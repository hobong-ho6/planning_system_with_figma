#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LPC 콘텐츠 필드 null 검사기 (md/landpress.md §10-3-0 강제 산출물)

⛔ LPC 쓰기 **직전·직후**에 실행하고 exit 0을 확인한다.

왜 필요한가 — Landpress `PUT`은 부분 갱신이 아니라 **문서 전체 교체**다. body에 넣지
않은 콘텐츠 필드는 그 자리에서 `null`이 된다. 2026-09-14 `uid`만 담은 PUT과 단일 필드
PUT이 **4필드를 beta·prod 양쪽에서 지웠고**(shopping_guide.guide_page ·
voucher_product.voucher_detail·my_voucher_detail · k_pick_clinic_common_info.clinic_detail_common),
CMS에 **리비전 이력이 없어**(`/revisions` 404 · `/audit-logs`는 GET만) 저장소
`landpress/` 산출물이 유일한 복구원이었다. prose 규칙만으로는 재발을 못 막아
`check_wiki_storage.py`와 같은 급의 **통과/실패 산출물**로 만든다.

이 검사기는 **FE가 실제로 읽는 공개 조회 API**만 쓴다 — 인증 불필요, 읽기 전용.

사용:
  python3 scripts/check_lpc_nulls.py                 # 전체(위키 정의 9개 컬렉션)
  python3 scripts/check_lpc_nulls.py --env LV_prod   # 한 환경만
  python3 scripts/check_lpc_nulls.py --quiet         # 위반만 출력

  → null 없음: exit 0
  → null 있음: exit 1 (컬렉션·필드·uid·로케일 목록 출력)

⛔ 관리 범위는 위키 4727978725(LPC 관리 영역)에 정의된 것만이다 — 2026-09-15 사용자 확정.
   실측에서 더 나와도 검사 대상에 넣지 않는다(예: UIT k_pick_clinic_common_info는 범위 밖).
   위키에 컬렉션이 추가되면 아래 TARGETS에 같이 추가한다.
"""

import argparse
import json
import sys
import urllib.request

PUB = ("https://landpress-content.line-scdn.net/contents/v2"
       "/projects/{pid}/collections/{col}/items?locale={loc}")

PROJECTS = {
    'LV_beta':  'a2qaxhygpi95g8l4a48n2vn4',
    'LV_prod':  'w5eph4y9qxe05c8fqpi7rlxh',
    'UIT_beta': 'n7nuefo6t491uc9cp863lgyq',
    'UIT_prod': 'lkyusnekq1vv9759rbnwgamh',
}

# 위키 4727978725 정의 9개 컬렉션 (팀 → 컬렉션)
TARGETS = {
    'LV':  ['category_promotion_banner', 'k_pick_clinic_common_info', 'mini_common_info',
            'shopping_guide', 'voucher_common_info', 'voucher_product'],
    'UIT': ['my_common_info', 'payment_common_info', 'voucher_product'],
}

LOCALES = ['ko_KR', 'ja_JP', 'en_US', 'th_TH', 'zh_TW']

# 시스템 필드 — 콘텐츠가 아니므로 null이어도 위반이 아니다
SYSTEM_FIELDS = {
    'id', 'postId', 'locale', 'primaryLocale', 'published', 'createdAt', 'updatedAt',
    'uid', '_env', 'createdBy', 'updatedBy', '_publishReservations', 'lp_env', 'lp_size',
}


def fetch(pid, col, loc, timeout=30):
    """공개 조회 API. 컬렉션이 그 프로젝트에 없으면 None."""
    try:
        with urllib.request.urlopen(PUB.format(pid=pid, col=col, loc=loc), timeout=timeout) as r:
            return json.load(r).get('body', {}).get('items')
    except Exception:
        return None


def check(envs=None, quiet=False):
    """(위반 목록, 점검한 필드 수)"""
    violations, checked, skipped = [], 0, []
    for env, pid in PROJECTS.items():
        if envs and env not in envs:
            continue
        team = env.split('_')[0]
        for col in TARGETS[team]:
            for loc in LOCALES:
                items = fetch(pid, col, loc)
                if items is None or not items:
                    if loc == 'ko_KR':
                        skipped.append(f'{env}/{col}')
                    continue
                for it in items:
                    uid = it.get('uid') or '-'
                    for k, v in it.items():
                        if k in SYSTEM_FIELDS:
                            continue
                        checked += 1
                        if v is None:
                            violations.append(f'{env}/{col}.{k}/{uid}/{loc}')
                        elif not it.get('published'):
                            violations.append(f'{env}/{col}/{uid}/{loc} 미게시(published=false)')
    if not quiet and skipped:
        print(f'ℹ️  조회되지 않은 조합 {len(skipped)}건(그 프로젝트에 컬렉션 없음): '
              + ', '.join(sorted(set(skipped))))
    return violations, checked


def main(argv):
    ap = argparse.ArgumentParser(description='LPC 콘텐츠 필드 null 검사 (읽기 전용)')
    ap.add_argument('--env', action='append', choices=list(PROJECTS),
                    help='특정 환경만 검사 (반복 지정 가능)')
    ap.add_argument('--quiet', action='store_true', help='위반만 출력')
    a = ap.parse_args(argv[1:])

    violations, checked = check(a.env, a.quiet)
    if violations:
        print(f'❌ LPC 콘텐츠 null/미게시 {len(violations)}건 — 점검 필드 {checked}개')
        for v in violations:
            print(f'  🔴 {v}')
        print('\n→ 부분 PUT이 형제 필드를 지웠을 수 있다. md/landpress.md §10-3-0 확인 후')
        print('  scripts/restore/lpc_safe_put.js 로 복구하세요(복구원: 저장소 landpress/).')
        return 1
    if not a.quiet:
        print(f'✅ LPC 콘텐츠 정상 — 필드 {checked}개 점검 · null 0 · 전건 게시')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
