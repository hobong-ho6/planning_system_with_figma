# -*- coding: utf-8 -*-
"""복구 검증 — FE가 실제로 읽는 공개 조회 API로 4필드 × 4프로젝트 × 5개 언어 전건 대조"""
import json, urllib.request
L=['ko_KR','ja_JP','en_US','th_TH','zh_TW']
PUB='https://landpress-content.line-scdn.net/contents/v2/projects/{pid}/collections/{col}/items?locale={loc}'
P={'LV_beta':'a2qaxhygpi95g8l4a48n2vn4','LV_prod':'w5eph4y9qxe05c8fqpi7rlxh',
   'UIT_beta':'n7nuefo6t491uc9cp863lgyq','UIT_prod':'lkyusnekq1vv9759rbnwgamh'}
BR={'cu':'VOUCHER_CU','daiso':'VOUCHER_DAISO','emart':'VOUCHER_EMART24','oliveyoung':'VOUCHER_OLIVE_YOUNG'}
def get(pid,col,loc):
    try:
        with urllib.request.urlopen(PUB.format(pid=pid,col=col,loc=loc), timeout=25) as r:
            return json.load(r)['body']['items']
    except Exception as e:
        return []
def art(p):
    return json.load(open(p))

checks=[]   # (env, col, field, uid, locale, 기대 파일)
for loc in L:
    for env in ['LV_beta','LV_prod']:
        e='beta' if 'beta' in env else 'prod'
        checks.append((env,'shopping_guide','guide_page','VOUCHER_CU',loc,
                       f'landpress/shopping_guide_cu/{e}_CU_guide_page_{loc}.json'))
        checks.append((env,'shopping_guide','guide_page','VOUCHER_OLIVE_YOUNG',loc,
                       f'landpress/shopping_guide/guide_page_oliveyoung_{loc}.json'))
        checks.append((env,'shopping_guide','guide_page','VOUCHER_DAISO',loc,
                       f'landpress/shopping_guide/guide_page_daiso_{loc}.json'))
        for b,uid in BR.items():
            checks.append((env,'voucher_product','voucher_detail',uid,loc,
                           f'landpress/voucher_product/draft/voucher_detail_{b}_{loc}.json'))
            checks.append((env,'voucher_product','my_voucher_detail',uid,loc,
                           f'landpress/voucher_product/draft/my_voucher_detail_{b}_{loc}.json'))
        checks.append((env,'k_pick_clinic_common_info','clinic_detail_common',None,loc,
                       f'landpress/clinic/clinic_detail_common_{loc}.json'))
    for env in ['UIT_beta','UIT_prod']:
        e='beta' if 'beta' in env else 'prod'
        for b,uid in BR.items():
            checks.append((env,'voucher_product','my_voucher_detail',uid,loc,
                           f'landpress/voucher_product_uit/{e}_{b}_my_voucher_detail_{loc}.json'))

cache={}
ok=nul=diff=miss=0; bad=[]
for env,col,field,uid,loc,path in checks:
    k=(env,col,loc)
    if k not in cache: cache[k]=get(P[env],col,loc)
    items=cache[k]
    it=[x for x in items if (x.get('uid')==uid if uid else True)]
    if not it: miss+=1; bad.append(f'{env}/{col}/{uid}/{loc} 항목없음'); continue
    live=it[0].get(field)
    if live is None: nul+=1; bad.append(f'{env}/{col}.{field}/{uid}/{loc} 여전히 null'); continue
    if live==art(path): ok+=1
    else: diff+=1; bad.append(f'{env}/{col}.{field}/{uid}/{loc} 값 불일치')
print(f'검증 {len(checks)}건 — ✅ 일치 {ok} · 🔴 null {nul} · ⚠️ 불일치 {diff} · ❓ 항목없음 {miss}')
if bad:
    print('\n문제 목록:')
    for b in bad[:30]: print('  ', b)
    if len(bad)>30: print(f'   … 외 {len(bad)-30}건')
else:
    print('\n전건 일치 — 복구 완료')
# 게시 상태
print('\npublished 확인:')
for (env,col,loc),items in list(cache.items()):
    if loc!='ko_KR': continue
    print(f'  {env:<9} {col:<26} ' + ' '.join(f'{x.get("uid") or "-"}:{x.get("published")}' for x in items))
