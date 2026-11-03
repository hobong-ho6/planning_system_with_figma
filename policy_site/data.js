window.POLICY_DATA = {
 "meta": {
  "baseline": "Unifi v1.14.0.1 (10-30) · Unifi mini v2.2.0.1 (11-02)",
  "checkedAt": "2026-11-03",
  "deploySource": "https://now.linenextcorp.com/unifi/production.html#deploy",
  "deployFetchedAt": "2026-11-03"
 },
 "areas": [
  {
   "key": "point",
   "label": "포인트",
   "desc": "적립률·적립 시기·유효기간·소멸·사용 한도·이관"
  },
  {
   "key": "payment",
   "label": "결제",
   "desc": "결제 수단 조합·JPYC 결제 대상·결제 오류 처리"
  },
  {
   "key": "voucher",
   "label": "상품권",
   "desc": "구매·발권·활성화·사용 기한·한도·판매 주체·유의사항"
  },
  {
   "key": "refund",
   "label": "환불·취소",
   "desc": "미활성 자동 환불·활성화 전후 환불·공급 중단 환불"
  },
  {
   "key": "account",
   "label": "계정·회원",
   "desc": "가입·탈퇴·재가입·간편 로그인·개인정보 파기"
  },
  {
   "key": "display",
   "label": "화면·표시",
   "desc": "상품가 표시·홈·헤더·노출·진입 동선"
  },
  {
   "key": "promo",
   "label": "프로모션·리워드·미션",
   "desc": "100엔딜·이벤트·리워드 탭·미션·광고 리워드"
  },
  {
   "key": "message",
   "label": "메시지·고지",
   "desc": "OA 발송 규칙·약관·사용자 문구·운영 고지"
  },
  {
   "key": "asset",
   "label": "이자·스테이블코인",
   "desc": "JPYC·KAIA·USDT 이자·락업·부스트·SR/CR"
  }
 ],
 "policies": [
  {
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "related": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "N Point Platform > NPP 기본 규칙"
    },
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "my_point_guide_01_01 G-3 · G-8"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "3. 복합결제 > 단위 · 범위"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-01: GuideKim 1P = 1 JPYC(환급 기준) → Unifi 1P = 1엔(결제 차감 기준)"
   ],
   "conflicts": [],
   "details": [
    "적립 금액 = floor(실결제 엔화 × 적립률) — 선할인 적용 후 실결제 기준",
    "계산 단위는 상품(상품권 1장). v2.1은 한 번에 1개씩 결제해 주문 단위와 결과가 같다(10/19 · B/E)",
    "적립률은 주문 시점 값으로 박제한다(요율을 바꿔도 소급하지 않는다)",
    "NPP는 비율을 관리하지 않는다 — 환산은 Unifi가 한다",
    "JPYC 환급(2단계)의 교환 비율은 별도(미결정 · v2.1 범위 밖)"
   ],
   "id": "point-unit-rounding",
   "area": "point",
   "title": "포인트 가치·단위(1P = 1엔 · 버림)",
   "summary": "1P = 1엔. 적립과 결제 차감 모두 엔화 1엔 단위로 계산하고 포인트는 정수만 쓴다. 적립 시 1P 미만은 버린다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 포인트 단위 · 가치 / 적립 금액"
   },
   "keywords": [
    "1P",
    "1엔",
    "버림",
    "floor",
    "정수",
    "환산"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "",
   "status": "변경됨",
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "2. 구매 > 적립(캐시백) · 페이백 → 할인 전환(PL-9)"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "Claude 작업 로그 > 다음 세션 확인 사항 ② (D2)"
    },
    {
     "pageId": "4845874905",
     "title": "Unifi mini - 결제",
     "version": 55,
     "section": "결제 페이지 사용자 안내 문구 보완 PAY-3"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-19: PL-9 페이백 → 할인 전환은 T205(UNIFY-12385 · 할인 5% + 적립 5%)로 갈음",
    "2026-10-21: 적립률 10% → 5% 확정(Admin 5% 설정 · 사용자 결정)"
   ],
   "conflicts": [],
   "details": [
    "10/21 리뷰 안건 「적립률 기준값 — 10%(Admin · 이 문서 · v2.1) ↔ PL-9 T205」를 사용자가 5%로 결정",
    "결제 화면 문구는 변수로 노출 — UF_voucher_pay_cashback 「{{0}}% 포인트 적립」 · 안내 G-8 「상품별 적립률」",
    "신용카드 · JPYC 결제 모두 같은 적립률(2026-10-01 결정)",
    "1건 · 월 · 1인 적립 상한 없음(2026-10-02 · 사업 — 클리닉이 들어오면 다시 본다)",
    "낡은 서술 주의 — v2.1 사용자 흐름 ①에 「floor(실결제 엔화 × 10%)」 · 결제·환불·정산 3장 예시 · 결제 PAY-3 예시는 종전 10% 기준(예시에 「현행 5%」 주석 있음)"
   ],
   "id": "point-accrual-rate",
   "area": "point",
   "title": "포인트 적립률(상품권)",
   "summary": "상품권 적립률은 5%다(Admin에 5%로 설정 · T205 UNIFY-12385 「할인 5% + 적립 5%」). 결제 수단별 차등은 없고 적립률은 Unifi Admin에서 설정한다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 리뷰 안건(10/21) 적립률 기준값"
   },
   "keywords": [
    "적립률",
    "5%",
    "10%",
    "T205",
    "UNIFY-12385",
    "캐시백",
    "Admin"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "문서 불일치",
    "question": "적립률 5%(10/21 결정)인데 v2.1 사용자 흐름 ① 「floor(실결제 엔화 × 10%)」 · 결제·환불·정산 3장 예시 · 결제 PAY-3 예시에 10%가 남아 있다 — 해당 문서 정리 필요."
   }
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "포인트 상태 정의 1 적립 예정 · 2 구매 적립"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "2. 구매 > 적립(캐시백)"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "사용자 흐름 ① ~ ②"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-12: 10/08 「사용 확인 또는 유효기간 종료일 + 1일」 기준 → 바코드 활성화(발권 성공) 시 적립완료",
    "2026-10-15: 미활성 낙전 건 적립 → 80% 자동 환불 · 적립예정 취소(Redeem D13)"
   ],
   "conflicts": [],
   "details": [
    "발권 실패 · 품절이면 적립하지 않는다(적립완료 전환 없음) — 상품권은 활성화 전 상태로 남아 재시도 · 환불 신청 가능",
    "결제일 + 90일 안에 활성화하지 않으면 다음 날 결제 금액(포인트 결제분 제외)의 80% 자동 환불 · 적립예정 취소(적립 없음 · 탈퇴 계정 포함)",
    "활성화 후 쓰지 않고 상품별 사용 기간({{usage_period_days}}일)이 지나도 이미 적립완료라 그대로 둔다",
    "적립 완료 OA는 활성화 시 발송 · 관리자 승인 없이 자동 지급(테스트 주문 · PG 심사용 상품은 지급하지 않음)",
    "적용 범위는 내재화 배포 이후 구매분 — 배포 전 발급 상품권(GuideKim 구매분 포함)은 기존 정책(활성화 단계 없음)"
   ],
   "id": "point-accrual-timing",
   "area": "point",
   "title": "포인트 적립 시기(적립예정 → 적립완료)",
   "summary": "상품권 결제가 끝나면 「적립예정」(사용 불가 · Unifi 보관)이 생기고, 바코드 활성화(발권 성공) 시 NPP에 발행해 「적립완료」가 된다. 이때부터 결제에 쓸 수 있고 180일 유효기간이 시작된다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 적립 시기 · 발생 포인트 → 가용 포인트"
   },
   "keywords": [
    "적립예정",
    "적립완료",
    "바코드 활성화",
    "발권",
    "Redeem",
    "가용 포인트",
    "발생 포인트"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4845874905",
     "title": "Unifi mini - 결제",
     "version": 55,
     "section": "payment_01 (포인트 전액 결제) 정책 1 · PAY-8"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "3. 복합결제 > 적립 · 9-1 #6"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-07: JPYC 결제도 포인트와 함께 쓸 수 있게 되며 JPYC 실결제분도 적립 · 포인트 차감분 미적립"
   ],
   "conflicts": [],
   "details": [
    "적립 = 실결제(포인트 사용분 제외) × 적립률 · 1P 미만 버림",
    "결제 수단(카드 · JPYC)별 차등 없음",
    "「일부 사용 시 적립 기준」 항목은 삭제 — 실결제 완료분만 적립(10/07 회의)",
    "결제 화면 적립 행에 「포인트로 결제한 금액은 적립 대상에서 제외돼요」 고지 제안(PAY-8)"
   ],
   "id": "point-accrual-base",
   "area": "point",
   "title": "적립 대상 금액(포인트 차감분 미적립)",
   "summary": "신용카드 · JPYC로 낸 실결제분에만 적립한다. 포인트로 결제한 금액은 적립하지 않으며, 포인트 전액 결제면 적립 0이다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 사용 방안 > 적립 · 포인트로 결제한 주문의 적립"
   },
   "keywords": [
    "실결제",
    "포인트 차감분",
    "미적립",
    "전액 포인트 결제",
    "적립 대상"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "my_point_guide_01_01 G-1 · G-5"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "사용자 흐름 ⑤ 소멸"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-01: 3개월(90일) 기술 → 180일 확정"
   ],
   "conflicts": [],
   "details": [
    "기산점 = 적립완료(바코드 활성화) 시점 — 적립예정 기간은 유효기간에 들어가지 않는다",
    "「6개월」 대신 180일(법무 「발행일로부터 6개월 이내」 요건 · 달력 6개월은 정시 올림으로 넘칠 수 있음)",
    "예: 1월 1일 13:10 적립 → 6월 30일 14:00 만료(평년) · 만료 처리는 NPP 배치(시간 단위)",
    "고객 표시는 일 단위 — 표시 날짜 = 사용 가능한 마지막 날(만료 시각 − 1초의 기기 시간대 날짜)",
    "고지는 포인트 안내(UI)에만 — 약관에는 넣지 않는다(10/01)"
   ],
   "id": "point-expiry",
   "area": "point",
   "title": "포인트 유효기간·만료 시각",
   "summary": "적립(발행)일로부터 180일. 만료 시각은 기산점 + 180일을 다음 정시로 올린다. 기한 연장 · 리셋은 없고 만료가 가까운 포인트부터 쓴다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 만료기간"
   },
   "keywords": [
    "유효기간",
    "만료",
    "소멸",
    "180일",
    "정시",
    "리셋",
    "연장"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 만료기간 > My 표시 · 시간대 원칙"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-19: 적립예정 합계 「미표시」(10/06) → My에 표시(MP-1)"
   ],
   "conflicts": [],
   "details": [
    "표시 날짜 = 사용 가능한 마지막 날 — 예: UTC+9 기기에서 4월 7일 00:00 만료 → 「4월 6일」",
    "FE가 기기 시간대를 B/E에 전달하고 B/E가 NPP 만료 시각(UTC+0)을 변환해 일별 합산 · 60일 판정(2026-10-13 B/E 제안 · FE 전달 가능 여부는 문서상 「확인 중」)",
    "소멸 예정이 없으면 토스트 「{{0}}일 이내 소멸 예정 포인트가 없어요」({{0}} = 60)",
    "결제 취소 반환 행에는 소멸일을 보이지 않는다 — 소멸 예정 바텀시트에서 확인(10/08)",
    "적립예정 포인트 합계도 My에 표시(MP-1 · 사용자 10/19)"
   ],
   "id": "point-expiring-display",
   "area": "point",
   "title": "소멸 예정 포인트 표시(My)",
   "summary": "My 소멸 예정 영역은 기기 시간대 기준 소멸 60일 전 포인트(오늘 ~ 오늘 + 60일 포함)를 보여 준다. 같은 표시 날짜의 포인트는 1행으로 일별 합산하고 적립예정 포인트는 포함하지 않는다.",
   "source": {
    "pageId": "4845874900",
    "title": "Unifi mini - 포인트",
    "version": 47,
    "section": "my_point_01 정책 8 · my_point_expiring_01_01 정책 1"
   },
   "keywords": [
    "소멸 예정",
    "60일",
    "일별 합산",
    "기기 시간대",
    "My",
    "적립예정 합계"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "related": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 만료기간 > 사전 알림"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 포인트 알림",
     "says": "✅ 채널 = OA · 정의는 OA 위키(O-5 · O-8 · O-9) (10/19 정리) · 초안: 만료 7일 전 · 1일 전 OA + 앱 푸시"
    },
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 리뷰 안건(10/21)",
     "says": "소멸 예정 알림 — 앱 푸시 병행 · 최소 포인트 · 발송 시각 · 적립 재처리 배치 건 O-5 일괄 발송(B/E 확인 중) — 결정 없음"
    }
   ],
   "details": [
    "대상은 NPP 「만료 예정 포인트가 있는 계정 조회」 API · 발송은 Unifi",
    "적립 · 소멸 예정 · 이관은 거래 알림(수신 동의와 무관)",
    "OA 메시지는 JST 고정(서버 발송)",
    "상품권 바코드 활성화 기한 알림(D-7 · D-1)과는 별개"
   ],
   "id": "point-expiry-notice",
   "area": "point",
   "title": "포인트 소멸 예정 알림",
   "summary": "소멸 예정 알림은 만료 7일 전 · 1일 전 OA(+ 앱 푸시) 초안이고 채널 정의는 OA 위키(O-5 · O-8 · O-9)에 있다. 앱 푸시 병행 · 최소 포인트 · 발송 시각은 아직 정해지지 않았다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 포인트 알림 · 리뷰 안건(10/21) 소멸 예정 알림"
   },
   "keywords": [
    "소멸 알림",
    "7일 전",
    "1일 전",
    "OA",
    "앱 푸시"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "소멸 예정 알림의 앱 푸시 병행 · 최소 포인트 기준 · 발송 시각을 정한다."
   }
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "5. 복합결제 후 환불 시나리오 ① ② ⑤-2 ⑥"
    },
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "포인트 상태 정의 4 결제 취소 반환 · 결정(10/08)"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-06: NPP 소진 취소(기한 초기화) → 원래 만료 시각으로 재발행",
    "2026-10-15: 미활성 낙전 → 80% 자동 환불 · 포인트 결제분 반환 없음 · 적립예정 취소"
   ],
   "conflicts": [],
   "details": [
    "NPP 소진 취소는 만료기한을 초기화하므로 쓰지 않고, Issue Points(expiredAt = 원 만료 시각)로 재발행 · 만료 시각이 다르면 건별 발행",
    "미활성 자동 환불(결제일 + 90일 다음 날 80%)은 포인트 결제분을 반환하지 않고 적립예정만 취소",
    "포인트 전액 결제 후 활성화 전 환불 → 사용 포인트 전부 원 만료 시각으로 재발행",
    "부분 환불 없음 — 예외: 공급 중단 시 리딤 후 미사용 · 일부 사용 잔액은 원결제수단 환불(포인트 환불은 발생하지 않음 · 사용자 10/21)",
    "내역 행 「결제 취소 반환」(PAYMENT_RETURN) · 반환 사실은 환불 알림 · 환불 상세에 함께 표기"
   ],
   "id": "point-refund-return",
   "area": "point",
   "title": "환불 시 포인트 처리(적립예정 취소 · 사용 포인트 반환)",
   "summary": "바코드 활성화 전 환불이면 적립예정을 취소하고(내역 미표시 · NPP 회수 없음), 결제에 쓴 포인트는 원래 만료 시각 그대로 신규 발행해 즉시 반환한다. 환불 시점에 이미 만료된 포인트는 반환하지 않는다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 사용 방안 > 포인트로 결제한 주문의 환불 · 만료기간 > 결제 취소로 되돌린 포인트"
   },
   "keywords": [
    "환불",
    "적립예정 취소",
    "포인트 반환",
    "재발행",
    "원 만료 시각",
    "PAYMENT_RETURN"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "related": [
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "my_point_guide_01_01 G-6 UF_my_point_guide_desc7"
    },
    {
     "pageId": "4845874905",
     "title": "Unifi mini - 결제",
     "version": 55,
     "section": "payment_01 XLT 11 UF_voucher_pay_refund_desc2"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "my_point_guide_01_01 G-6",
     "says": "단, 당사의 귀책 사유로 환불이 처리되는 경우에는 유효기간이 지난 포인트도 복원될 수 있어요(라이브 고지)"
    },
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 리뷰 안건(10/21)",
     "says": "고지 문구는 「복원될 수 있어요」 · 귀책 판정 주체 · 발행 유형 · 유효기간 등 운영 절차가 없다"
    }
   ],
   "details": [
    "원칙은 「환불 시점에 이미 만료된 포인트는 재발행하지 않는다」",
    "Unifi 사정 취소 보상 포인트안은 시나리오 소멸로 종결(10/16)"
   ],
   "id": "point-fault-expired-restore",
   "area": "point",
   "title": "당사 귀책 환불 시 만료 포인트 복원",
   "summary": "고지 문구(10/15 리스크 코멘트 · 10/16 라이브)에는 「당사의 귀책 사유로 환불이 처리되는 경우 유효기간이 지난 포인트도 복원될 수 있어요」가 있으나, 귀책 판정 주체 · 발행 유형 · 유효기간 등 운영 절차가 없다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 리뷰 안건(10/21) 당사 귀책 시 만료 포인트 복원"
   },
   "keywords": [
    "당사 귀책",
    "만료 포인트",
    "복원",
    "예외"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "「당사 귀책 시 만료 포인트 복원」 고지는 라이브인데 운영 절차가 없다 — 귀책 판정 주체 · 발행 유형 · 유효기간을 정한다."
   }
  },
  {
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "5. 복합결제 후 환불 > 적립 후 예외 환불 · 4. 환불 > 과거권 환불"
    },
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "포인트 상태 정의 7 적립 취소"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 환불 시 처리",
     "says": "✅ 만료 포인트 회수는 만료 기일이 빠른 것부터 (사용자 10/19)"
    },
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 리뷰 안건(10/21)",
     "says": "이미 만료돼 회수하지 못한 포인트(expiredPoints)도 환불 금액에서 빼는지 · 「만료 기일이 빠른 것부터(10/19)」가 무엇에 대한 답인지(근거 문서 미확인)"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "5. 복합결제 후 환불 > 적립 후 예외 환불",
     "says": "확인 필요: 이미 만료돼 회수하지 못한 포인트(expiredPoints)도 빼는지"
    }
   ],
   "details": [
    "부족분 = NPP 응답 insufficientPoint · Unifi는 환불 거절 · 마이너스 포인트를 쓰지 않는다",
    "GuideKim 구매 상품권 환불(GuideKim 페이지 · GuideKim 정책) 시에는 재부여 포인트에서 잔고만큼 회수 · 부족분은 Unifi 손실(사용자 10/19) · 회수 데이터 전달 방식은 ⏸ 종결",
    "Stripe 차지백은 별도 정책 없이 개별 대응(10/13)",
    "결제에 쓴 포인트 반환과 회수의 처리 순서(B/E) ⏸ 종결 — 추적하지 않음",
    "내역 행 「적립 취소」(CLAWBACK)"
   ],
   "id": "point-clawback",
   "area": "point",
   "title": "적립 후 예외 환불 시 포인트 회수",
   "summary": "바코드 활성화 후 포인트가 이미 적립된 주문을 CS 예외로 환불하면 그 주문으로 적립된 포인트를 NPP 원 발행 건 기준으로 회수하고, 잔고가 부족하면 부족분(1P = 1엔)을 환불 금액에서 빼고 환불한다. 이미 만료돼 회수하지 못한 포인트(expiredPoints)를 빼는지는 근거가 분명하지 않다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 환불 시 처리 > 적립 후 예외 환불(10/13)"
   },
   "keywords": [
    "회수",
    "예외 환불",
    "CLAWBACK",
    "insufficientPoint",
    "expiredPoints",
    "차지백",
    "GuideKim 환불"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "상충",
    "question": "이미 만료돼 회수하지 못한 포인트도 환불 금액에서 빼는가? 「만료 기일이 빠른 것부터(10/19)」는 어떤 질문에 대한 결정인가?"
   }
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "포인트 상태 정의 3 GuideKim 포인트 이관"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "릴리즈 기준 과제 2 · 사용자 흐름 예외 흐름"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "9-1 #9 · #10"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-01: 전량 Unifi 마이그레이션",
    "2026-10-02: 이관분 만료 = 이관일부터 180일",
    "2026-10-07: 이관 대신 오픈 시 소멸 + 신규 무상 부여",
    "2026-10-08: 신규 부여분 유효기간 「6개월」 → 180일"
   ],
   "conflicts": [],
   "details": [
    "대상: 미환급 잔여(9/23 실측 44,902P · 이관 시점 재측정) · GuideKim 적립 대기 건은 목록으로 받아 Unifi가 지급(MG-9 · 10/19) · 이미 신청한 JPYC 환급 대기분은 GuideKim이 송금",
    "고지: 오픈 당일 OA(O-9 · GuideKim 포인트 보유 계정) + 포인트 내역 「GuideKim 포인트 이관」 행 — 안내 바텀시트 · My 1회성 안내 · 지급 완료 알림은 두지 않는다(B안 · 10/08)",
    "GuideKim 약관 30일 사전 고지는 별도로 하지 않는다(OA 안내 + GuideKim 안내 · 10/19)",
    "어포메이션 부담분 포함 포인트 비용은 LINE NEXT 부담(10/07) · NPP 발행 후 빌링 전송(부채 계상)",
    "「N월 혜택」 집계에서 GuideKim 이관분 제외"
   ],
   "id": "point-guidekim-migration",
   "area": "point",
   "title": "GuideKim 잔여 포인트 처리(소멸 + 신규 부여)",
   "summary": "GuideKim 포인트는 이관하지 않고 신규 포인트 시스템 오픈 시점에 소멸시키며, 같은 시점에 보유분만큼 Unifi 무상 포인트를 새로 부여한다. 유효기간은 부여일부터 180일이다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "기존 GuideKim 포인트 이관 · 사용자 고지(2026-10-08)"
   },
   "keywords": [
    "GuideKim",
    "이관",
    "소멸",
    "신규 부여",
    "44,902P",
    "O-9",
    "MG-9"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "변경됨",
   "related": [
    {
     "pageId": "4845874900",
     "title": "Unifi mini - 포인트",
     "version": 47,
     "section": "포인트 상태 정의 10 제휴 적립"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "Claude 작업 로그 ⑩ (D8)"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-21: GuideKim 전달 → Unifi 발행(임시안 · 10/01) → 운영자 Admin 수동 지급(PARTNER_CASHBACK)"
   ],
   "conflicts": [],
   "details": [
    "「N월 혜택」 집계에서 제외",
    "내역 행 「제휴 적립」(PARTNER_CASHBACK) — 발생하면 노출",
    "여행(WAUG)은 v2.1 범위에서 제외(10/06)"
   ],
   "id": "point-clinic-accrual",
   "area": "point",
   "title": "클리닉 포인트 적립",
   "summary": "클리닉 적립은 운영자가 Unifi Admin에서 대상 · 금액을 입력해 수동 지급(PARTNER_CASHBACK · 「제휴 적립」)하고 NPP에 발행한다(FREE · 발행일부터 180일). GuideKim 전달 → Unifi 발행 임시안(10/01)은 폐기됐다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 클리닉 적립(임시) · 리뷰 안건(10/21)"
   },
   "keywords": [
    "클리닉",
    "제휴 적립",
    "PARTNER_CASHBACK",
    "Admin 수동 지급"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "3. 복합결제 > 조합 · 차감 시점 · 동시 결제 1건"
    },
    {
     "pageId": "4845874905",
     "title": "Unifi mini - 결제",
     "version": 55,
     "section": "payment_01 (포인트 전액 결제) 정책 1 · PAY-2"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-07: 포인트 + JPYC 복합결제 불가 → 가능(Slack 10/06)"
   ],
   "conflicts": [],
   "details": [
    "포인트는 결제가 실제로 완료될 때 NPP Redeem(paymentId)으로 차감 — 결제 미완료 · 이탈 · 다른 결제 시도로 취소돼도 보유 포인트 변동 없음(포인트 락 없음)",
    "계정당 결제는 동시에 1건 — 다른 결제를 시도하면 Stripe가 잡고 있던 이전 미완료 결제를 취소",
    "소진 순서는 만료가 가까운 포인트부터(NPP 기본)",
    "포인트 전액 결제 시 결제 수단은 비활성(GA is_point_full = Y)",
    "가용 포인트(적립완료 · 만료분 제외)만 쓸 수 있고 적립예정은 쓸 수 없다"
   ],
   "id": "payment-point-combination",
   "area": "payment",
   "title": "결제 수단 조합(포인트 + 카드 · 포인트 + JPYC)",
   "summary": "포인트는 신용카드 · JPYC 모두와 함께 쓸 수 있고 포인트 전액 결제도 가능하다. 카드와 JPYC를 섞는 결제는 없다.",
   "source": {
    "pageId": "4802743195",
    "title": "포인트 시스템",
    "version": 93,
    "section": "Policy > 사용 방안 > 결제 수단 조합 · 차감 · 반환 · 포인트 락"
   },
   "keywords": [
    "복합결제",
    "포인트+카드",
    "포인트+JPYC",
    "전액 포인트",
    "Redeem",
    "포인트 락",
    "동시 결제"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 사용 방안 > 차감 방식 · 비교 표 사용 한도 PL-14"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "3. 복합결제 > 1회 사용 한도 · 최소 단위"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-16: 「최소 사용 단위 제한 없음」(10/06)에 신용카드 50엔 자동 조정 예외 추가"
   ],
   "conflicts": [],
   "details": [
    "보유보다 크게 입력하면 보유 포인트와 결제 금액 중 작은 값으로 자동 조정",
    "신용카드 「전액 사용」: 보유 ≥ 결제 금액 → 결제 금액만큼(포인트 전액 결제) / 결제 금액 − 50엔 < 보유 < 결제 금액 → 결제 금액 − 50엔 / 그 이하 → 보유 전액",
    "직접 입력: 결제 금액보다 1 ~ 49엔 적게 입력한 경우만 결제 금액 − 50엔으로 조정 · 같게 입력하면 포인트 전액 결제",
    "안내 문구 「신용카드는 ¥50부터 결제할 수 있어요.」(UF_voucher_pay_card_min_notice)"
   ],
   "id": "payment-point-limit",
   "area": "payment",
   "title": "포인트 사용 한도 · 신용카드 50엔 자동 조정",
   "summary": "1회 사용 한도 · 최소 사용 단위는 없다 — 가용 포인트 범위 안에서 1P부터 결제액 전액까지 쓸 수 있다. 단, 신용카드 결제는 카드 결제액이 50엔 이상이어야 하며 미만이면 50엔을 남기도록 포인트 수량을 자동 조정한다(Unifi Pay는 최소 금액 없음).",
   "source": {
    "pageId": "4845874905",
    "title": "Unifi mini - 결제",
    "version": 55,
    "section": "payment_01 정책 3 · 4"
   },
   "keywords": [
    "사용 한도",
    "최소 단위",
    "50엔",
    "자동 조정",
    "전액 사용",
    "신용카드"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4802743195",
     "title": "포인트 시스템",
     "version": 93,
     "section": "Policy > 사용 방안 > 결제 완료 후 포인트 차감 실패"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "3. 복합결제 > 결제 완료 후 차감 실패"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "details": [
    "포인트 부족은 같은 계정으로 여러 기기에서 번갈아 포인트 결제할 때 생길 수 있다(동시 결제 1건 제한으로 드묾 · B/E)",
    "가용 포인트는 결제 페이지 진입 시 조회",
    "팝업 문구 「보유 포인트가 부족합니다.」 · 「보유 포인트를 확인해주세요.」",
    "결제 완료 후 NPP 차감 실패(NPP 장애 · 그 사이 만료) 처리는 정의 없이 ⏸ 종결(10/19 — 추적하지 않음)"
   ],
   "id": "payment-point-error",
   "area": "payment",
   "title": "포인트 부족 · NPP 장애 처리",
   "summary": "결제 생성이 PAYMENT_POINT_INSUFFICIENT로 실패하면 포인트 부족 팝업을 띄우고 가용 포인트를 다시 조회해 화면을 갱신한다. NPP 일시 장애(PAYMENT_POINT_UNAVAILABLE)는 이 팝업이 아니라 공통 에러로 처리하며 「포인트 없이 결제」 안내는 하지 않는다.",
   "source": {
    "pageId": "4845874905",
    "title": "Unifi mini - 결제",
    "version": 55,
    "section": "payment_01_01 포인트 부족 팝업"
   },
   "keywords": [
    "포인트 부족",
    "PAYMENT_POINT_INSUFFICIENT",
    "PAYMENT_POINT_UNAVAILABLE",
    "NPP 장애",
    "공통 에러"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책",
     "version": 37,
     "section": "1. 사업 구조 > 결제 수단 · 2. 구매 > 결제 수단"
    },
    {
     "pageId": "4808980947",
     "title": "JPYC EX 인증유저 기반 > JPYC 결제 기능 재오픈",
     "version": 26,
     "section": "Policy > 3. 기존 사용자 영향 · 확인 필요사항"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-09-21: Unifi mini 전체 상품 JPYC 결제 임시 제거(이상 결제 반복 · 최대 74건)",
    "2026-10-20: JPYC EX 연동 유저 한정으로 재오픈(UNIFY-11824)"
   ],
   "conflicts": [],
   "details": [
    "과거 연동 기록 · JP 신용카드 결제 이력 · 100엔딜 결제 이력은 판정에 쓰지 않는다",
    "결제수단 목록(신용카드 / JPYC)은 연동 여부와 무관하게 똑같이 노출 · JPYC를 선택했을 때만 보유 잔액 표시",
    "안내 문구에 국적 표현 · 카드 조건을 쓰지 않고, JPYC 동선 안에서 신용카드를 대안으로 유도하지 않으며, 판정 세부 규칙은 공개하지 않는다",
    "JPYC 보유만 하고 연동 이력이 없는 유저(외부 지갑 입금 · 프로모션)는 인증 완료 전까지 결제 불가",
    "미결: 방한 중(한국 IP) JPYC 채우기 동선 IP 조건 · 리스크 레벨 미충족(E-B-1801009) 연동 실패 안내 문구"
   ],
   "id": "payment-jpyc-eligibility",
   "area": "payment",
   "title": "JPYC 결제 대상(JPYC EX 연동 유저)",
   "summary": "JPYC 결제는 현재 Unifi와 JPYC EX가 연동된 유저(토큰 상태 READY)에게만 열린다. 결제 화면 진입 시와 Step 2 로그인 후 복귀 시(최대 60초 재조회) 판정하며, 미연동이면 「인증 필요」 배지와 JPYC EX 인증(Step 1 본인확인 → Step 2 로그인)을 안내하고 결제 버튼을 비활성화한다.",
   "source": {
    "pageId": "4808980947",
    "title": "JPYC EX 인증유저 기반 > JPYC 결제 기능 재오픈",
    "version": 26,
    "section": "Policy > 1. JPYC 결제 이용 조건 · 2. 결제수단 노출 정책"
   },
   "keywords": [
    "JPYC",
    "JPYC EX",
    "일본인 한정",
    "연동",
    "READY",
    "LOGIN_REQUIRED",
    "Unifi Pay",
    "인증 필요"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "voucher-issue-on-activation",
   "area": "voucher",
   "title": "상품권 발권 시점 (결제 시 vs 활성화 시)",
   "summary": "결제할 때는 발권하지 않는다. 사용자가 상품권 상세에서 [바코드 활성화]를 누를 때 비즈콘(SK플래닛)에서 1건 발권하고, 바코드 표시 · LINE(OA) 발송 · 사용 기한이 그때 시작된다.",
   "details": [
    "활성화 흐름: [바코드 활성화] → 확인 팝업(사용 기한 · 활성화 후 환불 불가) → 발권 · 바코드 · LINE(OA) 발송",
    "적용 범위: 내재화 배포 이후 구매분. 배포 전 발급 상품권은 활성화 단계 없이 기존 정책 그대로(My에서 바로 「사용 가능」)",
    "SK 비용은 발권 성공 순간(=활성화 시점) 확정 — 활성화 전 환불 · 미활성 자동 환불 건은 SK 비용 없음",
    "바코드 실제 사용 가능 여부는 SK 상태 기준 — SK에서 폐기 · 만료되기 전까지는 캡처 · 저장한 바코드로도 사용 가능",
    "발권 업체는 현재 SK플래닛이며 바뀔 수 있어 정책은 업체와 무관하게 쓴다"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "1. 개요 · 2. 확정 정책 > 활성화"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "2. 구매 > 발권"
    },
    {
     "pageId": "4802741642",
     "title": "비즈콘(모바일 바우처)",
     "version": 66,
     "section": "정산 시스템 구축 > SK플래닛(벤더) 정산 규칙"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "사용자 흐름 ② 포인트 적립"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "발권",
    "Redeem",
    "리딤",
    "바코드 활성화",
    "결제 시 발권",
    "SK플래닛",
    "비즈콘"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "voucher-activation-deadline",
   "area": "voucher",
   "title": "활성화 기한 (결제일 + 90일)",
   "summary": "바코드 활성화 기한은 결제일 + 90일(날짜 기준 · 시각 없음 · 당일 포함)이다. 화면 · OA 모두 날짜만 표시하고 상세와 My 목록에 D-n을 보여 준다.",
   "details": [
    "사용자에게는 「유효기간(사용 가능 기간) 90일」로 안내 — 활성화 후 사용 기한과 구분해 고지",
    "기한 알림 OA: D-7 · D-1 · 활성화하거나 환불하면 보내지 않음",
    "My 목록 라벨: 「활성화 필요 · D-n」(발행 대기 필터) · 기한 경과 「활성화 기한 만료」(「전체」에만)",
    "기한 안에 활성화하지 않으면 사용 불가 → 결제일 + 90일 다음 날 80% 자동 환불(환불 영역 카드)",
    "결제 후 10일째 활성화 → 40일까지 · 89일째 → 119일까지 사용(사용 기간 30일 상품 예시)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 유효기간 · 표시 · 부록 D7"
   },
   "related": [
    {
     "pageId": "4880031081",
     "title": "상품권 한도 정책",
     "version": 38,
     "section": "4. 단계별 동작 > 리딤 기한"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "2. 구매 > 발권"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "90일",
    "활성화 기한",
    "유효기간",
    "D-n",
    "D-7",
    "D-1",
    "리딤 기한"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "voucher-usage-period",
   "area": "voucher",
   "title": "활성화 후 사용 기한 (상품별)",
   "summary": "활성화한 뒤의 사용 기한은 상품별 사용 기간({{usage_period_days}}일 · LV는 {usablePeriodDays})이다. 30일 고정이 아니며, 최장 90일 + 사용 기간까지 쓸 수 있다.",
   "details": [
    "사용 기한 = 활성화일 + 상품별 사용 기간 · 날짜만 표시",
    "확인 팝업 · 특상법 최종 확인의 일수도 상품별 값",
    "현재 기존 4브랜드(CU · 올리브영 · 다이소 · 이마트24)의 LPC 등록 문구는 「바코드 활성화 후 사용 기한: 30일」 — 이 4종의 사용 기간이 30일",
    "사용 기한 내 미사용 만료는 환불 불가(낙전 · SK 원가 확정)",
    "「30일 고정」 서술은 낡은 것으로 정리(11-02 사용자 흐름 · 화면 흐름도 이미지도 「상품권마다 정해진 사용 기한」으로 교체)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "변경됨",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "1. 개요 > 기간 · 2. 확정 정책 > 활성화"
   },
   "related": [
    {
     "pageId": "4865399718",
     "title": "(관리)Unifi mini v2.1 - LPC 관리 콘텐츠 (상품권 · 브랜드별)",
     "version": 32,
     "section": "2-0 LPC 필드 → 노출 화면 · 3장 공통표 유효기간"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "추가 정리 필요 항목 · Claude 작업 로그 ① (사용자 10/21 · D1)"
    },
    {
     "pageId": "4880031081",
     "title": "상품권 한도 정책",
     "version": 38,
     "section": "4. 단계별 동작 · 8. 확인 필요 > 리딤 유효기간"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-21: 활성화 후 30일 고정 → 상품별 사용 기간({{usage_period_days}}일 · 사용자 D1)",
    "2026-11-02: 사용자 흐름 · 화면 흐름도 이미지의 「30일」 → 「상품권마다 정해진 사용 기한」"
   ],
   "conflicts": [],
   "keywords": [
    "사용 기한",
    "사용 기간",
    "30일",
    "usage_period_days",
    "usablePeriodDays",
    "상품별"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "문서 불일치",
    "question": "사용 기한이 상품별로 바뀌었는데(10/21) 기존 4브랜드 LPC 문구는 「사용 기한: 30일」 — 4종 모두 실제 30일인지 확인."
   }
  },
  {
   "id": "voucher-sales-limit",
   "area": "voucher",
   "title": "판매 한도 (비즈콘 월 한도 · 품절 전환)",
   "summary": "비즈콘 월 한도(공급가 기준 · 전체 단일 한도 · KST)를 리딤 기준으로 관리하되, 판매 판단은 사용률 = (발급 완료액 + 발급 예정액) ÷ 월 한도로 결제 전에 한다. 사용률이 100% − 버퍼(월 한도의 5%)에 닿으면 신규 판매를 자동 중단(「품절」)하고 증액 반영 시 자동 재개한다.",
   "details": [
    "원칙: 결제 후 리딤은 언제나 즉시 보장 — 한도가 부족하면 결제를 받지 않고 「품절」",
    "알림: 사용률 50%부터 10%p 오를 때마다 Slack 자동 알림(운영팀 모니터링) · 70% 사업팀이 비즈콘과 증액 협의(약 4영업일 · 증액분 선입금) · 90% 긴급 알림",
    "월 전환: 매월 1일 0시(KST) 발급 완료액 0으로 초기화 · 발급 예정액은 이월 · 새 한도 미반영이면 반영 전까지 신규 판매 중단",
    "결제 취소 · 환불 · 리딤 기한 만료(80% 자동 환불) 시 발급 예정액 해제 · 리딤 실패 시 유지한 채 재시도",
    "운영팀 모니터링 「한도 소진율」이 이 사용률과 같은 기준인지는 「확인 필요(운영팀)」로 남아 있다"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "변경됨",
   "source": {
    "pageId": "4880031081",
    "title": "상품권 한도 정책",
    "version": 38,
    "section": "1. 핵심 원칙 · 2. 용어 · 3. 판매 조건 · 5. 월 중간 증액 · 6. 월 전환"
   },
   "related": [
    {
     "pageId": "4822778759",
     "title": "바우처/Waug 직접판매 진행을 위한 사업구조 (10.20 오픈 버전)",
     "version": 12,
     "section": "한도관리(보증보험)"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-11-02: 5. 월 중간 증액에 사용률 50%부터 10%p마다 Slack 자동 알림 · 운영팀 선수금 한도 모니터링(10-29) 추가"
   ],
   "conflicts": [],
   "keywords": [
    "한도",
    "월 한도",
    "품절",
    "버퍼",
    "5%",
    "사용률",
    "증액",
    "발급 예정액"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "세부 미결",
    "question": "운영팀 모니터링 「한도 소진율」이 이 정책의 사용률과 같은 기준인지 확인(운영팀)."
   }
  },
  {
   "id": "voucher-purchase-limit",
   "area": "voucher",
   "title": "구매 제한 · 품절 판정",
   "summary": "Unifi Admin에서 상품별 인당 구매 제한 · 총 판매 한도를 설정한다(인당 기간은 전체(ALL) 고정 · 월 단위 없음). 판정은 인당 제한을 먼저 보고 다음에 품절(총 판매 한도)을 보며, 주문이 몰려도 한도를 넘겨 팔지 않는다.",
   "details": [
    "판매 누계는 환불이 완료될 때만 되돌린다 — 발권 실패는 자동 환불하지 않아 주문이 남으므로 되돌리지 않음",
    "「품절」 원인 3가지: ① 자체 판매 한도 소진 ② SK 상품 판매 중지(카탈로그 동기화로 감지) ③ SK 상품별 발권 한도 도달(무통보 · HTTP 500)",
    "잔여 수량 = 자체 설정 판매 한도 − 판매 수량 · 「추가 주문」은 한도 상향(설정 변경) — SK는 재고를 주지 않는다",
    "구매 제한 사용자 안내 문구(인당 제한 초과 · 품절)와 노출 화면은 디자인팀 논의 후 정리 필요로 남아 있다"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4802741642",
    "title": "비즈콘(모바일 바우처)",
    "version": 66,
    "section": "Unifi 어드민에서 추가 제공 필요한 기능 > 상품 · 가이드킴 대비 정책 비교 > 구매 제한"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "2. 구매 > 구매 제한"
    },
    {
     "pageId": "4770505327",
     "title": "Voucher disclaimer 추가 및 기타 문구 수정",
     "version": 21,
     "section": "Ⅰ-1-1 한계 · 5. 미확정 6항"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "구매 제한",
    "인당",
    "총 판매 한도",
    "품절",
    "판매 누계",
    "잔여 수량"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "세부 미결",
    "question": "인당 제한 초과 · 품절 사용자 안내 문구와 노출 화면 정리(디자인팀)."
   }
  },
  {
   "id": "voucher-activation-failure",
   "area": "voucher",
   "title": "활성화 시 발권 실패 · 품절 처리",
   "summary": "자동 환불하지 않는다. [활성화]를 누르면 3초 동안 가능한 만큼 자동 재시도 → 실패하면 「30분 뒤에 다시 시도해 주세요」 → 30분 뒤 다시 실패하면 고객센터 문의 안내. 품절(SK 판매 중지 · 발권 한도 초과 · 단종)은 「품절」 상태로 따로 안내한다.",
   "details": [
    "상품권은 활성화 전 상태로 남아 기한 안에 다시 시도하거나 사용자가 활성화 전 환불을 신청할 수 있다",
    "발권 실패면 포인트 적립 없음(적립예정 유지)",
    "「품절」 상품권은 My 「전체」 필터에만 표시(사용자 10/21)",
    "결제 직후 「상품권 발행 실패 → 결제 취소」는 더 이상 생기지 않는다",
    "타임아웃 건은 SK에서 발권됐을 수 있어 TR_ID로 발권 여부 대사 필요"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 발권 실패 · 품절 · 부록 D4"
   },
   "related": [
    {
     "pageId": "4802741642",
     "title": "비즈콘(모바일 바우처)",
     "version": 66,
     "section": "Unifi 어드민 > 주문 · 환불"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "2. 구매 > 발권 실패"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4853251770",
     "version": 51,
     "section": "2. 확정 정책 > 발권 실패 · 품절",
     "says": "3초 자동 재시도 → 30분 뒤 재시도 → 고객센터 2단계 안내 · 품절은 별도 「품절」 상태"
    },
    {
     "pageId": "4802741598",
     "version": 291,
     "section": "추가 정리 필요 항목 · Claude 작업 로그 > Redeem 스레드 후속(10/13 · 10/19 현재 ☐)",
     "says": "R1 품절 = 발권 실패로 통합 · R2 안내 단계 통합(30분 뒤 재시도 + 고객센터 한 문구) · R6 SK 품절 처리는 SK 미팅 결과 대기 — 디자인 나오면 반영, 지금 정책 본문은 고치지 않는다"
    }
   ],
   "keywords": [
    "발권 실패",
    "품절",
    "재시도",
    "30분",
    "고객센터",
    "CS",
    "3초"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "상충",
    "question": "발권 실패와 품절을 하나로 합치고 안내를 한 문구로 줄이는 안(v2.1 작업 로그 R1·R2)을 Redeem 정본에 반영할지, 현행 2단계 안내를 유지할지?"
   }
  },
  {
   "id": "voucher-seller",
   "area": "voucher",
   "title": "판매 주체 (직접 판매)",
   "summary": "LINE NEXT Inc.가 SK플래닛(비즈콘)과 직접 공급계약을 맺고 판매자(Seller)이자 Store 운영자로 이용자에게 직접 판매한다(NEXT Corp 제외 · Inc ↔ Corp 정산 없음). 특상법 표시의 사업자 명칭은 Line Next Start Corporation(10/19 법무 문서)으로 판매 주체 표기와 다르다.",
   "details": [
    "Inc 담당: Store 운영 · 판매계약 · 상품 게시 · 바우처 발급(비즈콘 API → 바코드) · 환불 결정 및 집행 · CS",
    "10/20 기준 판매 범위는 금액형 디지털 바우처(비즈콘) — 여행(WAUG)은 제외, 클리닉은 기존 유지",
    "결제수단: JPY 신용카드(Stripe) · JPYC(Unifi Pay · 일본인 한정) · 포인트",
    "벤더 정산: 발송 기준 월 정산 · 익월 말 후불 · VAT 없음",
    "특상법 사업자 명칭이 판매 주체와 다른 것은 사용자 결정으로 확정(사용자 10/21 · D9)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4822778759",
    "title": "바우처/Waug 직접판매 진행을 위한 사업구조 (10.20 오픈 버전)",
    "version": 12,
    "section": "[10/20 변경] · Inc 역할"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "1. 사업 구조 (10/20 기준)"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "추가 정리 필요 항목 · Claude 작업 로그 ⑤ (사용자 10/21 · D9)"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "판매 주체",
    "직접 판매",
    "직판",
    "LINE NEXT Inc.",
    "Seller",
    "특상법",
    "Line Next Start Corporation"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "voucher-purchase-notice",
   "area": "voucher",
   "title": "구매 전 고지 · 특상법 최종 확인",
   "summary": "구매 전(상품 상세 · 결제)에 90일(활성화 기한)과 상품별 사용 기간을 구분해 안내하고, 환불 조건(활성화 전 전액 · 90일 경과 시 결제 금액(포인트 사용분 제외)의 20%를 수수료로 차감 후 자동 환불 · 활성화 후 환불 불가)을 고지한다. 결제 직전 특상법 최종 확인에 인도 시기(바코드 활성화 시 발급) · 90일 · 사용 기간 · 활성화 후 환불 불가를 표시한다.",
   "details": [
    "법무 검토 완료(LNS-1689 · 10/19) — 수수료 20% 명기 · 특상법 표시 = 결제 페이지 하단 B-10",
    "XLT 라이브 문구(UF_voucher_pay_refund_desc2 · UF_voucher_detail_activation_info_3 · UF_voucher_detail_redeem_expired_desc · UF_settings_delete_notice_voucher 등)와 LPC voucher_product 환불 문장(LV · UIT × beta · prod × 5개 언어)에 20% 반영(10/21 확인)",
    "OA O-1 · O-2 · O-3: 「기한이 지나면 수수료 20%를 뺀 금액이 자동으로 환불돼요.」(10/21) · 자동 환불 완료 OA(O-10)는 비율을 적지 않는다 — 의도된 것",
    "「사용하는 시점에 활성화하세요」 안내",
    "선불식 지급수단(前払式支払手段) 비해당 — 법무 확인 완료(사용자 10/21 · D4)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 고지 원칙 · 기한 알림"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "2. 구매 > 결제 시 약관 동의"
    },
    {
     "pageId": "4865420584",
     "title": "(변경)상품권 미활성 자동 환불(80%) — 바뀐 정책 모음",
     "version": 14,
     "section": "4-2. OA"
    },
    {
     "pageId": "4865399718",
     "title": "(관리)Unifi mini v2.1 - LPC 관리 콘텐츠 (상품권 · 브랜드별)",
     "version": 32,
     "section": "3장 공통표"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "고지",
    "특상법",
    "최종 확인",
    "20%",
    "수수료",
    "유의사항",
    "OA"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "voucher-cu-flow",
   "area": "voucher",
   "title": "CU 상품권 전용 동선 (QR 특가)",
   "summary": "QR 코드 스캔으로 진입하면 CU 1만원권을 정가 대비 91% 할인된 ¥100에 구매할 수 있다(1인 1회 한정 · 1,000엔 할인 쿠폰 적용). LINE OA 친구추가가 안 됐으면 친구추가 바텀시트가 먼저 노출되고, 이미 QR 특가 쿠폰을 쓴 사용자에게는 안내 팝업 후 일반가(15% 혜택) 화면으로 전환한다.",
   "details": [
    "전용 상세 화면: 1000엔 할인 쿠폰 적용 영역 · CU 꿀조합 콘텐츠 추가 · 상단 CU 진입로 · 추천 바우처/클리닉 영역 제거",
    "CU 가이드 영역은 LPC(LV shopping_guide › guide_page · uid VOUCHER_CU)로 관리 — CU 가이드 페이지와 같은 item 공유",
    "결제 완료 후 바텀시트로 상시 「최대 15% 혜택」 안내 · 추가 구매 유도"
   ],
   "service": "Unifi mini",
   "fe": "LV",
   "status": "최신",
   "source": {
    "pageId": "4774235795",
    "title": "CU 상품권 전용 동선",
    "version": 7,
    "section": "Specification > Policy"
   },
   "related": [],
   "release": "Unifi v1.9.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "CU",
    "QR",
    "¥100",
    "100엔",
    "1000엔 쿠폰",
    "1인 1회",
    "친구추가",
    "15%"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "voucher-disclaimer",
   "area": "voucher",
   "title": "결제페이지 Disclaimer (일본 사용자 대상 · 부정 이용)",
   "summary": "결제페이지 「취소·환불」 아래 「유의사항」에 리스크팀 확정문 2건을 노출한다: 구매 및 캐시백 혜택은 일본 사용자 대상이며, 일본 사용자가 아니거나 재판매 · 현금화 · 매크로 등 부정 이용이 확인되거나 합리적으로 의심되면 사전 통보 없이 주문 취소 및 환불, 지급된 상품 회수 또는 캐시백 지급 제한이 적용될 수 있다.",
   "details": [
    "노출 위치는 결제페이지 단독(상품 상세 병행안 철회) · XLT 단독(UF_voucher_pay_caution_contents1 · 2) · LPC 미사용",
    "약관은 고치지 않고 디스클레이머만 추가(2026-09-22)",
    "대상 어휘는 「일본 사용자」로 통일 · 판정 기준(LINE 계정 리전)은 문구에 쓰지 않는다",
    "확정문 임의 수정 금지 — 변경은 LNS-1622에서 재검토",
    "「본 상품」 적용 범위(바우처 외 상품 결제에도 노출되는지)는 5번 3-1 확인 필요로 남아 있다"
   ],
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "최신",
   "source": {
    "pageId": "4770505327",
    "title": "Voucher disclaimer 추가 및 기타 문구 수정",
    "version": 21,
    "section": "Ⅰ. Disclaimer 추가 > Ⅰ-1 · Ⅰ-2"
   },
   "related": [],
   "release": "Unifi v1.9.1",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "disclaimer",
    "디스클레이머",
    "유의사항",
    "일본 사용자",
    "부정 이용",
    "재판매",
    "현금화",
    "LNS-1622"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "세부 미결",
    "question": "결제페이지 Disclaimer가 바우처 외 상품 결제에도 노출되는지 적용 범위 확인."
   }
  },
  {
   "id": "voucher-grace-93-abolished",
   "area": "voucher",
   "title": "91 ~ 93일 유예 기간 (폐지)",
   "summary": "종전에는 결제일 + 90일 이후 91 ~ 93일을 활성화만 가능한 유예 기간(시스템 마감 결제일 + 93일)으로 두었으나 폐지됐다. 활성화 · 환불 · 미활성 처리는 모두 결제일 + 90일 기준이다.",
   "details": [
    "10/12 결정: 91 ~ 93일 유예 기간에는 활성화만 · 환불 불가 → 10/14 폐지(유예 없음)",
    "현행: 90일이 지나면 사용자 활성화 · 환불 모두 불가 → 결제일 + 90일 다음 날 80% 자동 환불"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "폐기",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "부록 D1 · D7 · History(10/14)"
   },
   "related": [
    {
     "pageId": "4880031081",
     "title": "상품권 한도 정책",
     "version": 38,
     "section": "4. 단계별 동작 > 리딤 기한"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-14: 91 ~ 93일 유예 · 시스템 마감 93일 → 폐지(결제일 + 90일 기준 통일)"
   ],
   "conflicts": [],
   "keywords": [
    "93일",
    "유예",
    "91일",
    "폐지",
    "시스템 마감"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "refund-before-activation",
   "area": "refund",
   "title": "활성화 전 환불 (사용자 신청 · 전액)",
   "summary": "바코드 활성화 전이면 결제일 + 90일(당일 포함)까지 언제든 전액 환불할 수 있다. 사용자가 상품권 상세에서 직접 신청하고 관리자 승인 없이 자동 처리되며, 원결제수단(카드 PG 환불 / JPYC 지갑 송금)으로 최대 14영업일 안에 환불한다 · 수수료 없음.",
   "details": [
    "환불 버튼은 활성화 전 · 결제일 + 90일까지만 노출 · 91일째부터 미노출(대신 자동 환불) · 신청 화면에 사유 입력칸 없음",
    "SK 쿠폰이 없어 SK 조회 · 폐기 없이 PG 환불만",
    "포인트: 적립예정 취소 · 결제에 쓴 포인트는 원래 만료 시각으로 반환(이미 만료된 포인트는 반환 없음 · 당사 귀책이면 복원될 수 있음) — 세부는 포인트 영역",
    "후속: 판매 누계 되돌림 · 작성한 리뷰는 다른 고객에게 숨김 · 정산은 환불 시점 집계",
    "발권 실패 · 품절로 활성화하지 못한 상품권도 이 환불로 신청한다(자동 환불 없음)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 환불 · 3-1. 환불 · 포인트 — 시점별"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "4. 환불 · 5. 복합결제 후 환불"
    },
    {
     "pageId": "4865420584",
     "title": "(변경)상품권 미활성 자동 환불(80%) — 바뀐 정책 모음",
     "version": 14,
     "section": "1-1. 바뀌지 않은 것"
    },
    {
     "pageId": "4802741642",
     "title": "비즈콘(모바일 바우처)",
     "version": 66,
     "section": "Unifi 어드민 > 환불 (활성화 전 환불 흐름)"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "환불",
    "활성화 전",
    "전액 환불",
    "14영업일",
    "원결제수단",
    "환불 버튼",
    "90일"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "refund-after-activation",
   "area": "refund",
   "title": "활성화 후 환불 · 부분 환불",
   "summary": "바코드를 활성화한 상품권은 쓰지 않았어도 환불하지 않는다. 환불은 전액만이며 부분 환불은 없다(예외: 미활성 자동 환불 80% · 공급 중단 시 잔액 환불).",
   "details": [
    "근거: 활성화 확인 팝업 동의(「활성화한 상품권은 환불할 수 없어요」) · Slack 합의(10/08) ⑦ · 부록 D11",
    "일부 사용한 상품권 · 활성화 후 사용 기한 내 미사용 만료도 환불 불가(SK 원가 확정 · 낙전)",
    "CS 예외로 적립 후 환불하는 경우 그 주문으로 적립된 포인트를 회수하고, 잔고 부족분은 환불 금액에서 뺀다(2026-10-13) — 세부는 포인트 영역"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 환불 · 부록 D11"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "4. 환불 > 환불 범위 · 5. 적립 후 예외 환불"
    },
    {
     "pageId": "4802741642",
     "title": "비즈콘(모바일 바우처)",
     "version": 66,
     "section": "Unifi 어드민 > 환불"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "활성화 후 환불",
    "환불 불가",
    "부분 환불",
    "전액만",
    "일부 사용",
    "낙전"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "refund-unactivated-auto-80",
   "area": "refund",
   "title": "미활성 90일 경과 자동 환불 (80%)",
   "summary": "결제일 + 90일 안에 활성화하지 않으면 사용 불가가 되고, 결제일 + 90일 다음 날 결제 금액(포인트 결제분 제외)의 80%를 원결제수단으로 자동 환불한다. 나머지 20%는 수수료(LINE NEXT 수익)이고 포인트 결제분은 반환하지 않는다. 탈퇴 계정도 같다.",
   "details": [
    "결제 수단별로 80%를 계산해 엔 미만 절사 · 예: ¥10,000 = 카드 ¥5,000 + 포인트 5,000P → ¥4,000 환불",
    "환불 실패(카드 만료 · 해지 등)는 CS 개별 처리 · 처리 시각은 B/E가 정한다",
    "적립예정 포인트는 취소(적립 없음 · 적립 완료 OA O-5 미발송) · 자동 환불 완료 OA O-10 발송",
    "My 라벨 「활성화 기한 만료」 유지 · 사용자 신청 환불은 불가",
    "탈퇴: 활성화 전 상품권이 있으면 경고 + 환불 안내 후 탈퇴 허용 · 원래 기한 경과 시 80% 자동 환불 · 적립예정 포인트는 탈퇴 시 소멸"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 미활성 자동 환불 · 부록 D13"
   },
   "related": [
    {
     "pageId": "4865420584",
     "title": "(변경)상품권 미활성 자동 환불(80%) — 바뀐 정책 모음",
     "version": 14,
     "section": "1. 바뀐 정책 · 2. 결정 기록 AR-1 ~ AR-7"
    },
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "4. 환불 > 만료 쿠폰"
    },
    {
     "pageId": "4880031081",
     "title": "상품권 한도 정책",
     "version": 38,
     "section": "4. 단계별 동작 > 리딤 기한 만료"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "80%",
    "20%",
    "수수료",
    "자동 환불",
    "미활성",
    "90일 경과",
    "포인트 결제분",
    "탈퇴",
    "엔 미만 절사",
    "O-10"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "refund-supply-stop",
   "area": "refund",
   "title": "공급 중단 시 환불",
   "summary": "공급사 · 비즈콘 계약 종료나 판매 중단으로 상품권 발급 · 사용이 중단되면, 운영자가 대상자 전원을 원결제수단으로 일괄 환불한다(사용자 신청 없음 · 환불 버튼 재노출 없음). 미리딤 주문은 전액, 리딤 후 미사용 · 일부 사용 주문은 미사용 금액 · 잔액을 환불한다(활성화 후 환불 불가 원칙의 공급 중단 한정 예외).",
   "details": [
    "통보 즉시 운영자가 관리자 화면에서 해당 상품 「품절」 처리 · 한도 알림용 Slack 채널로 통보 수신",
    "잔액은 비즈콘이 주는 미사용 · 잔액 목록 기준 — 목록 제공 가능 여부는 비즈콘에 다시 확인 필요(사용자 10/21)",
    "카드 결제 취소 가능 기간이 활성화 기한 + 사용 기간보다 길어 포인트로 환불하는 경우는 생기지 않는다",
    "결제 후 90일(리딤 기한)이 지난 미리딤 상품권은 대상이 아니다(이미 80% 자동 환불로 처리)",
    "환불 안내 OA는 현행 O-11(활성화 전 전액 환불 완료) · O-10(미활성 자동 환불 완료) · 환불한 미사용분 공급가는 비즈콘과 정산"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "변경됨",
   "source": {
    "pageId": "4880031081",
    "title": "상품권 한도 정책",
    "version": 38,
    "section": "9. 공급 중단 대응"
   },
   "related": [
    {
     "pageId": "4853251770",
     "title": "Redeem(바코드 활성화) 정책",
     "version": 51,
     "section": "2. 확정 정책 > 환불 (예외) · 3-1"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "추가 정리 필요 항목 · Claude 작업 로그 ③ (사용자 10/21 · D3)"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-21: 공급 중단 환불 대상에 리딤 후 미사용 · 일부 사용 잔액 추가(원결제수단) · 「카드 취소 기간 경과 → 포인트 환불」 조항 정리(발생하지 않음) · 운영 일괄 처리로 확정"
   ],
   "conflicts": [],
   "keywords": [
    "공급 중단",
    "판매 중단",
    "잔액 환불",
    "일괄 환불",
    "비즈콘",
    "계약 종료"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "세부 미결",
    "question": "공급 중단 시 비즈콘이 미사용 · 잔액 목록을 줄 수 있는지 확인(사용자 10/21)."
   }
  },
  {
   "id": "refund-pre-release-guidekim",
   "area": "refund",
   "title": "배포 전 발급 상품권(GuideKim 구매분) 환불",
   "summary": "내재화 배포 전에 발급된 상품권(GuideKim 구매분 포함)은 기존 정책 그대로다. 환불 버튼은 항상 활성이고, 누르면 GuideKim 페이지로 이동해 GuideKim 정책대로 환불한다 — Unifi는 SK 조회 · 폐기 · 환불을 하지 않는다.",
   "details": [
    "활성화 단계 없음 · My에서 바로 「사용 가능」",
    "GuideKim 구매분 환불 시 Unifi가 재부여한 포인트는 잔고만큼만 회수 · 부족분은 Unifi 손실(마이너스 잔고 없음 · 사용자 10/19) — 세부는 포인트 영역",
    "Unifi는 환불 사유를 보여 주지 않는다(10/08 개발팀 회의)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4853251770",
    "title": "Redeem(바코드 활성화) 정책",
    "version": 51,
    "section": "2. 확정 정책 > 배포 전 발급 상품권"
   },
   "related": [
    {
     "pageId": "4817844202",
     "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
     "version": 37,
     "section": "4. 환불 > 신청 방식 · 과거권 환불"
    },
    {
     "pageId": "4802741598",
     "title": "Unifi mini v2.1",
     "version": 291,
     "section": "사용자 흐름 > 예외 흐름"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "GuideKim",
    "가이드킴",
    "배포 전",
    "과거권",
    "환불 버튼",
    "포인트 회수"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "refund-fault-reissue",
   "area": "refund",
   "title": "귀책별 처리 (재발급 · 환불)",
   "summary": "판매자 · 제휴사 귀책이면 재발급이 기본이고, 고객이 재발급을 거부하면 환불한다(10/06). 고객 귀책(쿠폰 제시 누락 · 대상 외 메뉴 · 계정 관리 소홀 등) 처리는 미정이다.",
   "details": [
    "재발급 방법(같은 상품 재발권 · 원 쿠폰 폐기) · 고객 거부 확인 절차(CS)는 Inc 판매 조건(TOS-3)과 환불 안내란 반영 대상으로 사업 · 법무 확인이 남아 있다"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "source": {
    "pageId": "4817844202",
    "title": "(검토)결제 · 환불 · 정산 정책 — 사업 · 운영 · 정산 논의",
    "version": 37,
    "section": "4. 환불 > 귀책별 처리"
   },
   "related": [
    {
     "pageId": "4802741642",
     "title": "비즈콘(모바일 바우처)",
     "version": 66,
     "section": "가이드킴 대비 정책 비교 > 귀책별 처리"
    }
   ],
   "release": "",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4817844202",
     "version": 37,
     "section": "4. 환불 > 귀책별 처리",
     "says": "판매자 · 제휴사 귀책 결정(🟡 · 10/06) · 고객 귀책 처리는 미정"
    },
    {
     "pageId": "4802741642",
     "version": 66,
     "section": "가이드킴 대비 정책 비교 > 귀책별 처리",
     "says": "🔴 부족 — 고객 귀책 처리 · 재발급 방법 · 고객 거부 확인 절차는 사업 · 법무 확인"
    }
   ],
   "keywords": [
    "귀책",
    "재발급",
    "재발행",
    "제휴사",
    "고객 귀책"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "고객 귀책(쿠폰 제시 누락 · 대상 외 메뉴 등) 처리 · 재발급 방법 · 고객 거부 확인 절차를 정한다(사업 · 법무)."
   }
  },
  {
   "details": [
    "반환 예정 자산(지갑 잔액 · 토큰별)과 개인키 안내는 현행 유지",
    "유의사항 동의를 체크해야 [탈퇴하기]가 활성화된다 · 탈퇴 완료 안내 · 홈 이동은 현행 유지",
    "환불 신청이 진행 중인 주문은 경고만 하고 탈퇴를 막지 않는다 — 탈퇴하면 환불 완료 여부 · 진행 상태를 확인할 수 없다",
    "활성화 전 상품권의 탈퇴 차단 여부는 별도 카드 「활성화 전 상품권 보유 시 탈퇴」(확인 필요) 참조"
   ],
   "fe": "UIT",
   "related": [
    {
     "pageId": "4978660847",
     "title": "Unifi 탈퇴 — 활성화 전 상품권 보유 시 환불 후 탈퇴 - UIT",
     "version": 2,
     "section": "Policy > 적용 범위"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "탈퇴",
    "회원 탈퇴",
    "LIFF",
    "플러스 모드",
    "락업",
    "withdraw"
   ],
   "id": "withdraw-route-and-limits",
   "area": "account",
   "title": "회원 탈퇴 경로와 탈퇴 제한 사유",
   "summary": "Unifi mini에서는 탈퇴할 수 없고 「회원 탈퇴하러 가기」로 Unifi LIFF 탈퇴 화면(/auth/withdraw)으로 이동한다. 플러스 모드 보유 · 락업 중이면 탈퇴할 수 없다. 포인트 · 상품권은 탈퇴 제한 사유가 아니고 경고만 한다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4802744889",
    "title": "Unifi mini - My",
    "version": 199,
    "section": "Specification > Policy > 회원 탈퇴"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "11-02 초안: 적용 범위 Unifi LIFF · Unifi 웹 탈퇴 화면(mini는 LIFF 탈퇴 화면으로 이동해 같은 정책) · 지갑 생성 완료 · 계정만 생성 · 일부 약관 동의 계정 모두",
    "11-02 초안: 바텀시트를 열 때와 탈퇴 실행 시점에 서버에서 활성화 전 상품권 건수를 다시 확인 · 차단 상태에서는 동의 체크 불가 · [탈퇴하기] 비활성 · [환불하러 가기] → 마이 > 상품권(발행 대기 필터)",
    "11-02 초안: 바코드를 활성화한 상품권 · 활성화 기한이 지나 자동 환불 대상이 된 상품권 · 내재화 배포 전 발급분은 탈퇴를 막지 않는다",
    "발권된(활성화한) 미사용 상품권은 탈퇴 후에도 쓸 수 있어 경고하지 않는다(현행 · 초안 공통)"
   ],
   "fe": "UIT",
   "related": [
    {
     "pageId": "4802744889",
     "title": "Unifi mini - My",
     "version": 199,
     "section": "Specification > Policy > 회원 탈퇴"
    },
    {
     "pageId": "4743946291",
     "title": "복구 비밀번호 없는 계정 생성 시나리오",
     "version": 161,
     "section": "4.4 계정 탈퇴 · 3장 탈퇴 시 정보별 처리"
    },
    {
     "pageId": "4949365748",
     "title": "Unifi 개선 과제 요약 — LV / UIT",
     "version": 21,
     "section": "UIT 작업 > 탈퇴 — 활성화 전 상품권"
    }
   ],
   "release": "",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4978660847",
     "version": 2,
     "section": "Policy > 탈퇴 제한 판정",
     "says": "활성화 전 상품권이 1건 이상인 경우 탈퇴할 수 없다(11-02 초안 · Figma 시안 전 · 배포 버전 미지정)"
    },
    {
     "pageId": "4802744889",
     "version": 199,
     "section": "Policy > 회원 탈퇴",
     "says": "활성화 전 상품권은 경고 + 「환불하러 가기」 후 탈퇴를 허용한다 · 탈퇴 후 결제일 + 90일이 지나면 수수료 20% 차감 후 자동 환불"
    },
    {
     "pageId": "4743946291",
     "version": 161,
     "section": "4.4 간편 로그인 · 일부 약관 동의 탈퇴",
     "says": "활성화 전 상품권이 있으면 경고와 환불 안내 후 탈퇴를 허용한다(11-02 갱신 · 내재화 통합 대장 10-12 결정 · 10-15 갱신 기준)"
    }
   ],
   "keywords": [
    "탈퇴",
    "활성화 전 상품권",
    "탈퇴 차단",
    "환불 후 탈퇴",
    "80% 자동 환불"
   ],
   "id": "withdraw-unactivated-voucher",
   "area": "account",
   "title": "활성화 전 상품권 보유 시 탈퇴",
   "summary": "현행(v2.1.0) 정책은 활성화 전 상품권이 있으면 경고 + 「환불하러 가기」 안내 후 탈퇴를 허용하고, 그 상품권은 결제일 + 90일 다음 날 결제 금액(포인트 사용분 제외)의 80%가 자동 환불된다. 11-02 초안은 활성화 전 상품권이 1건 이상이면 탈퇴를 막고 환불 후 탈퇴하도록 바꾸는 안이다.",
   "service": "Unifi",
   "status": "확인 필요",
   "source": {
    "pageId": "4978660847",
    "title": "Unifi 탈퇴 — 활성화 전 상품권 보유 시 환불 후 탈퇴 - UIT",
    "version": 2,
    "section": "Specification > Policy (11-02 추가)"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "상충",
    "question": "활성화 전 상품권이 있으면 탈퇴를 막는가(11-02 초안), 경고 후 허용하는가(My v199 · 계정 생성 시나리오 v161)?"
   }
  },
  {
   "details": [
    "하나도 없으면 항목 영역을 노출하지 않는다(2026-10-14 · Figma)",
    "작성한 리뷰는 탈퇴 후에도 남고 작성자 표시는 닉네임 그대로다(사용자 10/13)",
    "알림 내역 · 등록된 인증 수단 · 설정 등 계정에 저장된 정보는 삭제되고 복구할 수 없다",
    "탈퇴 계정의 미활성 상품권도 결제일 + 90일 다음 날 80% 자동 환불되고 적립예정 포인트는 취소된다(적립 없음)",
    "유의사항 문구 키 UF_settings_delete_notice_* 9키 등록 확인(Unifi v1.13.0 · 10/14)"
   ],
   "fe": "UIT",
   "related": [
    {
     "pageId": "4814244434",
     "title": "(검토)약관 검토 항목 — 포인트 · 상품권 직접 판매",
     "version": 26,
     "section": "4. 리스크 관점 R-8 탈퇴"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "탈퇴",
    "포인트 소멸",
    "적립 예정",
    "바텀시트",
    "my_withdraw_01_01"
   ],
   "id": "withdraw-notice-sheet",
   "area": "account",
   "title": "탈퇴 전 확인 바텀시트 고지 항목 · 포인트 소멸",
   "summary": "탈퇴 전 확인 바텀시트(my_withdraw_01_01)에는 해당 사항이 있는 항목만 보여 준다 — 보유 포인트(0보다 큰 경우) · 적립 예정 포인트 · 환불 진행 중인 주문 · 활성화 전 상품권. 보유 · 적립 예정 포인트는 탈퇴 시 모두 소멸하고 재가입해도 복구되지 않는다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4802744889",
    "title": "Unifi mini - My",
    "version": 199,
    "section": "Specification > Policy > 회원 탈퇴 · Screen - UIT > 탈퇴"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "즉시 파기: 프로필(닉네임) · 간편 비밀번호(해시값) · 패스키 설정 이력(서버 저장분)",
    "보관: SNS 종류 · SNS ID(표시 이름 제거) · 계정 ID · 즐겨찾기 · 접속 기록 · 약관 동의 이력 · 주문 · 거래 내역 · 지갑 주소 · 포인트 내역 · 리뷰(닉네임 포함) · 브릿지 입금 주소",
    "마케팅 수신 동의는 철회로 간주하고 발송 중단 · 동의 · 철회 이력은 삭제하지 않는다",
    "확인 필요(6장 #1): 이메일 해시 · 계정 ID 보관 기간과 개인정보처리방침 반영 · HMAC · 정규화 적용 · 약관 동의 이력 · 포인트 내역 보관 기간 · 활성화된 상품권의 탈퇴 후 사용 가능 여부 · 상태 B 지갑 주소 처리",
    "관련 배포: Unifi v1.14.0 「회원 탈퇴 시 이메일 개인정보 파기」(UNIFY-13010) · 설정 on/off 기본 false로 배포(UNIFY-13223)"
   ],
   "fe": "",
   "related": [
    {
     "pageId": "4743946291",
     "title": "복구 비밀번호 없는 계정 생성 시나리오",
     "version": 161,
     "section": "4.4 탈퇴의 의미 · 6장 #1"
    }
   ],
   "release": "Unifi v1.14.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4743946291",
     "version": 161,
     "section": "6. 정리 필요사항 #1",
     "says": "보관 기간 · 개인정보처리방침 반영 여부(정보보안팀 · 법무) · 해시 방식(개발) 등이 Yellow 검토 상태"
    }
   ],
   "keywords": [
    "탈퇴",
    "개인정보 파기",
    "이메일 해시",
    "HMAC",
    "보관",
    "소멸"
   ],
   "id": "withdraw-data-handling",
   "area": "account",
   "title": "탈퇴 시 정보별 파기 · 보관",
   "summary": "약관에 하나라도 동의한 유저가 탈퇴하면 약관 동의를 철회하고, 정보별로 즉시 파기 · 보관 · 소멸을 나눠 처리한다. 이메일은 원문을 즉시 파기하고 키를 쓴 단방향 해시값(HMAC)만 보관하며, 포인트 잔고 · 적립예정은 즉시 소멸한다.",
   "service": "Unifi",
   "status": "확인 필요",
   "source": {
    "pageId": "4743946291",
    "title": "복구 비밀번호 없는 계정 생성 시나리오",
    "version": 161,
    "section": "3. 계정 상태 정의 > 탈퇴 시 정보별 처리 (11-02 추가)"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "탈퇴 시 보관 기간 · 해시 방식 · 개인정보처리방침 반영 여부를 확정한다(정보보안 · 법무 · 개발). v1.14.0 이메일 파기는 설정 기본값 false로 배포됨."
   }
  },
  {
   "details": [
    "간편 로그인 = 약관 동의 없이 SNS 로그인만 한 상태 · 탐색과 상품 구매 가능 · 결제 시 Unifi 이용약관 · 개인정보처리방침에 동의하면 「일부 약관 동의」가 되며 계정 생성(상태 A)으로 보지 않는다",
    "계정 로그인(SNS 로그인 + 동의하지 않은 약관 동의)을 하면 상태 A · 어그리게이터 약관은 지갑 생성 시점에 받는다",
    "Unifi mini · LIFF는 간편 로그인으로 진입 · Unifi 웹은 비회원으로 진입하고 상품권 「구매하기」 선택 시에만 LINE으로 간편 로그인 유도(PC QR · 모바일 LINE 앱)",
    "간편 로그인 유저에게는 가입 완료 바텀시트를 제공하지 않는다",
    "계정 ID(metric id)를 간편 로그인 시점에 생성해 MY에 앞 · 뒤 4자리 + 복사로 노출(CS용 · 노출 위치 디자인 검토 중)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.16.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "간편 로그인",
    "presession",
    "계정 상태",
    "약관 동의",
    "가입 간소화",
    "계정 ID"
   ],
   "id": "account-states",
   "area": "account",
   "title": "계정 상태 4단계 (간편 로그인 → 계정 → 지갑)",
   "summary": "계정 상태를 간편 로그인(presession) → 간편 로그인 · 일부 약관 동의 → A. 계정만 생성(전체 약관 동의) → B. 지갑 생성 완료 4단계로 나눈다. 가입 시에는 계정만 만들고 지갑 · 복구 비밀번호는 지갑이 필요한 시점에 설정한다.",
   "service": "Unifi",
   "status": "예정",
   "source": {
    "pageId": "4743946291",
    "title": "복구 비밀번호 없는 계정 생성 시나리오",
    "version": 161,
    "section": "2. 용어 정의 · 3. 계정 상태 정의 · 4.1 가입"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "트리거: 홈 자산 카드 지갑 생성 버튼 · 자산 탭 · 리워드 탭 배너 · 출석체크 · 게임 미션 럭키볼 · SkyFlag 미션 참여 · mini MY 보유 JPYC 「보유 자산보기」 · JPYC 결제(JPYC EX 연동) · 외부 서비스 OAuth · SDK · 외부 지갑 연결(웹 · LIFF 전용) · 간편 비밀번호 없는 계정의 이메일 변경",
    "지갑 생성 완료 화면 버튼은 「확인」 하나로, 진입점에 따라 버튼명이 달라지지 않는다(11-02 변경)",
    "외부 지갑 연결은 지갑 생성 후에만 제공 · Unifi mini 미제공",
    "결제 후 페이백 포인트는 지갑 없이 적립 · 사용 · 럭키볼 · SkyFlag는 코인 지급이라 지갑 필요",
    "Unifi mini 전용 지갑 생성 유도 바텀시트는 Figma 확정 후 추가(6장 #5)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.16.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "지갑 생성",
    "복구 비밀번호",
    "간편 비밀번호",
    "어그리게이터 약관",
    "보안 설정"
   ],
   "id": "wallet-creation-trigger",
   "area": "account",
   "title": "지갑 생성 시점 · 트리거 · 절차",
   "summary": "지갑은 지갑이 필요한 기능에 진입하는 시점에 만든다. 절차는 ① 복구 비밀번호 → ② 간편 비밀번호 → ③ 어그리게이터 약관 동의 → ④ 지갑 생성이며, Unifi mini는 ③을 거치지 않는다. 복구 비밀번호는 생략하지 않는다.",
   "service": "Unifi",
   "status": "예정",
   "source": {
    "pageId": "4743946291",
    "title": "복구 비밀번호 없는 계정 생성 시나리오",
    "version": 161,
    "section": "4.2 지갑 생성 · 5.3~5.6"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "Unifi 기본: 「자산을 그냥 보관만 해도 기본 연 n%」 · 「추가이율 미션 참여하면 최대 연 n%」 2행 · 「30초도 안걸려요!」 말풍선 · 이율은 서버 값",
    "Unifi JP: 기본 이율 1행만 · 기존 JPYC 예치 유도 바텀시트를 대체 · JP 판별은 현행 기준",
    "미영캐싱(미국 · 영국 · 캐나다 · 싱가포르): 예치 미제공 국가라 현행 유지",
    "Unifi mini: 「혜택 좋은 상품권 구매 바로가기」 → /benefits-mini/category/shopping · 최대 혜택률 · 기본 할인율 · 추가 포인트 적립률은 변수",
    "「그냥 시작할게요」 · 닫기 → 지갑 없이(상태 A) 홈 진입 · 회원가입 버튼 외 경로로 상태 A가 된 경우 노출 여부는 디자인 검토 중(6장 #4)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.16.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "가입 완료",
    "회원가입",
    "바텀시트",
    "예치 권유",
    "상품권 구매 권유"
   ],
   "id": "signup-complete-sheet",
   "area": "account",
   "title": "가입 완료 바텀시트 (환경별)",
   "summary": "SNS 로그인 → 약관 동의 완료 직후 가입 완료 바텀시트를 노출하고 환경별로 권유 내용이 다르다. Unifi(웹 · LIFF) 기본은 보안 설정(지갑 생성)과 USDT 예치, JP는 JPYC 예치, 미영캐싱은 현행 리워드 안내, Unifi mini는 상품권 구매를 권유한다.",
   "service": "Unifi",
   "status": "예정",
   "source": {
    "pageId": "4743946291",
    "title": "복구 비밀번호 없는 계정 생성 시나리오",
    "version": 161,
    "section": "5.2 가입 완료 · 5.7 Screen"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "간편 로그인 제공: 홈 · 리워드 조회 · 상품 탐색 · 최근 본 상품 · 상품권 구매 · OA 친구 추가 쿠폰 · 즐겨찾기(약관 동의 없이 저장)",
    "설정 ① 간편 로그인: 닉네임 보기 · 계정 ID · 언어 · 통화 · FAQ · 문의하기 등 / ② 전체 약관 동의 후: 닉네임 편집 · 이메일 등록 · 변경 · 알림 설정 / ③ 지갑 생성 후(이 기기에 키 조각): 간편 비밀번호 · 패스키 · 개인 키 확인",
    "이메일 변경: 간편 비밀번호 미설정 계정은 보안 수단 등록(지갑 생성) 유도 후 신규 이메일 등록 · 상태 B는 간편 비밀번호 입력 후 등록(보안팀 협의)",
    "간편 로그인 유저 데이터의 자동 파기 기준은 미정(6장 #1)",
    "Unifi mini 웹 브라우저 접근 정의는 개발팀 확인 후 확정"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.16.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "기능 범위",
    "설정 메뉴",
    "이메일 변경",
    "계정 탈퇴",
    "상태 A",
    "상태 B"
   ],
   "id": "walletless-feature-scope",
   "area": "account",
   "title": "상태별 기능 범위 · 설정 메뉴 · 탈퇴 제공 범위",
   "summary": "기기에만 남거나 결제로 이어지는 행동은 간편 로그인에서도 제공하고, 계정에 데이터가 쌓이는 기능은 선택 시 남은 약관 동의를 받아 상태 A로 전환한 뒤 제공한다. 계정 탈퇴는 일부 약관 동의 · 상태 A · 상태 B에서 제공하고, 약관에 동의하지 않은 간편 로그인 유저에게는 제공하지 않는다.",
   "service": "Unifi",
   "status": "예정",
   "source": {
    "pageId": "4743946291",
    "title": "복구 비밀번호 없는 계정 생성 시나리오",
    "version": 161,
    "section": "4.3 로그인 · 인증 · 4.4 지갑 없는 계정의 기능 · 화면"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "비로그인(SNS 로그인 전) 상태는 지금처럼 로그인을 요구한다",
    "BE는 프리세션 저장을 이미 지원 · FE는 즐겨찾기 호출 조건(gate)만 넓힌다(담당 LV)",
    "My 즐겨찾기 목록(my_favorite_01 · UIT) 규칙은 그대로",
    "확정 필요 7건: 반영 버전 · 만료 정책 · 파기 기준 · 계정 생성 시나리오와 정합 · 로그인 전환 시 유지 · My 목록 프리세션 조회 · 버튼 화면 전수"
   ],
   "fe": "LV",
   "related": [
    {
     "pageId": "4743946291",
     "title": "복구 비밀번호 없는 계정 생성 시나리오",
     "version": 161,
     "section": "3장 상태별 저장 데이터 · 4.4 기능 범위(즐겨찾기)"
    },
    {
     "pageId": "4949365748",
     "title": "Unifi 개선 과제 요약 — LV / UIT",
     "version": 21,
     "section": "LV 작업 > 프리세션 즐겨찾기 허용"
    }
   ],
   "release": "",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4980099111",
     "version": 3,
     "section": "확정 필요 #1~#7",
     "says": "반영 버전 미정 · 7건 모두 Yellow 확인 필요"
    },
    {
     "pageId": "4743946291",
     "version": 161,
     "section": "4.4 상태별 기능 범위",
     "says": "즐겨찾기 — 간편 로그인에서 제공(약관 동의 없이 저장) — v1.16.0 가입 간소화 스펙에 포함"
    }
   ],
   "keywords": [
    "즐겨찾기",
    "프리세션",
    "간편 로그인",
    "presession",
    "x-pre-session"
   ],
   "id": "presession-favorite",
   "area": "account",
   "title": "간편 로그인(프리세션) 즐겨찾기 허용",
   "summary": "간편 로그인(x-pre-session 쿠키) 상태에서도 약관 동의 · 계정 로그인 · 지갑 생성 없이 즐겨찾기를 추가 · 해제하도록 바꾸는 안이다. 저장은 서버 · 계정 기준이며 만료 기한은 없다. 반영 버전은 미정이다(10-26 beta 반영 후 원복).",
   "service": "Unifi mini",
   "status": "확인 필요",
   "source": {
    "pageId": "4980099111",
    "title": "(TBD)Unifi mini - 프리세션(간편 로그인) 즐겨찾기 허용 - LV",
    "version": 3,
    "section": "Specification > Policy (11-02 추가)"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "간편 로그인 즐겨찾기 허용의 반영 버전과 확정 필요 7건을 정한다(v1.16.0 가입 간소화에 포함되는지 포함)."
   }
  },
  {
   "details": [
    "후보 페이지 4774240675는 정책서가 아니라 단일 유저 자산 복구 불능 사고 조사 문서다(UNIFY-11541) — 탈퇴 정리가 활성 지갑 1개만 대상이라 비활성 지갑 자산이 repay에서 누락된 사례 기록",
    "릴리스 노트는 기능명만 적고 있다"
   ],
   "fe": "",
   "related": [
    {
     "pageId": "4774240675",
     "title": "[조사] 지갑 매핑 손실 자산복구불능 — 시간대별 행동 (UNIFY-11541)",
     "version": 3,
     "section": "요약"
    }
   ],
   "release": "Unifi v1.9.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4771793358",
     "version": 4,
     "section": "Task List",
     "says": "탈퇴 후 동일 SNS 계정으로 재가입시 이전 지갑 목록 노출 및 자산 가져오기 지원 — 정책 상세 없음"
    },
    {
     "pageId": "4774240675",
     "version": 3,
     "section": "개요",
     "says": "사고 조사 문서 — 정책 근거로 쓸 수 없음"
    }
   ],
   "keywords": [
    "재가입",
    "탈퇴",
    "이전 지갑",
    "자산 가져오기",
    "UNIFY-11549"
   ],
   "id": "rejoin-previous-wallet",
   "area": "account",
   "title": "탈퇴 후 재가입 시 이전 지갑 목록 · 자산 가져오기",
   "summary": "탈퇴 후 동일 SNS 계정으로 재가입하면 이전 지갑 목록을 노출하고 자산 가져오기를 지원한다(Unifi v1.9.0 배포 항목). 상세 노출 조건 · 동작을 정의한 기획 정책 페이지는 확인하지 못했다.",
   "service": "Unifi",
   "status": "확인 필요",
   "source": {
    "pageId": "4771793358",
    "title": "Unifi v1.9.0",
    "version": 4,
    "section": "Product Info 개요 · Task List"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "정본 없음",
    "question": "탈퇴 후 재가입 시 이전 지갑 노출 · 자산 가져오기의 정책 페이지가 없다 — 정본 문서를 만들지, 기존 문서에 넣을지 정한다."
   }
  },
  {
   "details": [
    "할인율 · 적립률 · 가격 값이 비어 있는(null) 경우 0과 같이 처리한다"
   ],
   "fe": "LV",
   "related": [
    {
     "pageId": "4949365748",
     "title": "Unifi 개선 과제 요약 — LV / UIT",
     "version": 21,
     "section": "LV 작업 > 상품가 표시"
    }
   ],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "가격",
    "정가",
    "결제가",
    "Best Price",
    "최대혜택가",
    "normalPriceJpy",
    "maxBenefitPriceJpy"
   ],
   "id": "price-terms",
   "area": "display",
   "title": "가격 용어 (정가 · 결제가 · 최대혜택가)",
   "summary": "Regular price(정가) = normalPriceJpy, Payment price(결제가) = Regular × (1 − 즉시할인율) = priceJpy, Best Price(최대혜택가) = Regular × (1 − 즉시할인율) × (1 − 포인트 적립률) = maxBenefitPriceJpy다. 금액은 서버가 계산해 내려준 값을 그대로 노출하고 화면에서 다시 계산하지 않는다.",
   "service": "Unifi mini",
   "status": "예정",
   "source": {
    "pageId": "4980096261",
    "title": "상품가 표시 정책 - LV",
    "version": 10,
    "section": "Specification > Policy > 가격 용어 (11-02 변경)"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "즉시할인과 포인트 적립이 모두 없으면 Best Price 라벨 · 혜택률 · Regular price(취소선)를 노출하지 않고 Best Price 금액 자리에 Regular price를 노출한다",
    "배경: 현재 카드에 즉시할인 · 포인트 적립 미적용 금액이 노출되고 있어 수정 필요(다이소 ¥3,535 · 올리브영 ¥5,569 → 상세 Best Price ¥5,291)"
   ],
   "fe": "LV",
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "상품 카드",
    "Best Price",
    "혜택률",
    "취소선",
    "다이소",
    "올리브영"
   ],
   "id": "price-product-card",
   "area": "display",
   "title": "상품 카드 가격 표시",
   "summary": "상품 카드에는 Best Price 라벨 · 혜택률(%) · Best Price 금액(maxBenefitPriceJpy) · Regular price(취소선)를 노출하고 Payment price(priceJpy)는 노출하지 않는다. 즉시할인 없이 포인트 적립만 있어도 Best Price는 적립률을 적용한 금액이고 혜택률은 빨간색이다.",
   "service": "Unifi mini",
   "status": "예정",
   "source": {
    "pageId": "4980096261",
    "title": "상품가 표시 정책 - LV",
    "version": 10,
    "section": "Specification > Policy > 상품 카드 가격 (11-02 변경)"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "즉시할인과 포인트 적립이 모두 없으면 즉시할인율 · 취소선 · Best Price 줄 · 펼침 카드를 노출하지 않고, Payment price 라벨 없이 금액(Regular price)만 노출한다(11-02 디자인 요청 반영)",
    "예: Regular ¥5,862 · 즉시할인 5% · 포인트 적립 5% → Payment price ¥5,569 · Best Price ¥5,291"
   ],
   "fe": "LV",
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "상품권 상세",
    "가격",
    "Payment price",
    "펼침 카드"
   ],
   "id": "price-voucher-detail",
   "area": "display",
   "title": "상품권 상세 가격 표시",
   "summary": "즉시할인율과 Regular price(취소선)를 노출하고 그 아래 Payment price와 Best Price를 노출한다. Best Price를 펼치면 Regular price · 즉시할인 차감액 · 포인트 적립 차감액 · Best Price를 보여 준다.",
   "service": "Unifi mini",
   "status": "예정",
   "source": {
    "pageId": "4980096261",
    "title": "상품가 표시 정책 - LV",
    "version": 10,
    "section": "Specification > Policy > 상품권 상세 가격 (11-02 추가)"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "타이틀 문구는 XLT 키로 관리 · 상품 상세 브랜드명과 쇼핑 카테고리명은 Admin 값 그대로",
    "타이틀 없는 화면(포인트 · 일일 미션 리워드)은 홈 버튼만 · 게임 상세는 이미지 위 우측에 겹쳐 노출",
    "뒤로 가기는 LINE MINI 상단 바 그대로 · 결제 완료는 「홈으로 가기」 버튼",
    "확정 필요: 기존 로고 헤더 분기 대체 여부 · 3뎁스 포함 여부 · 결제 단계 미적용 의도 · GA click_go_home 재사용 · Rewards 하위 Screen ID"
   ],
   "fe": "",
   "related": [
    {
     "pageId": "4949365748",
     "title": "Unifi 개선 과제 요약 — LV / UIT",
     "version": 21,
     "section": "LV · UIT 공통 > 2뎁스 홈 버튼 헤더"
    }
   ],
   "release": "",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4980098464",
     "version": 2,
     "section": "확정 필요 항목 #2 · #3 · #4 · #8 · #9",
     "says": "Policy에는 3뎁스 포함 · 결제 단계 제외 · 로고 헤더 대체로 적었으나 같은 항목이 확정 필요로 남아 있음 · 배포 버전 미지정"
    }
   ],
   "keywords": [
    "홈 버튼",
    "헤더",
    "2뎁스",
    "네비게이션",
    "home_main_01"
   ],
   "id": "home-button-header",
   "area": "display",
   "title": "2뎁스 홈 버튼 헤더",
   "summary": "하단 탭(Home · Rewards · My) 메인에서 들어가는 하위 페이지 전체(3뎁스 포함)에 「좌측 타이틀 + 우측 홈 버튼」 헤더를 노출하고, 홈 버튼은 Home 탭 메인으로 이동한다. 내부 탐색 · 마케팅 · OA 직진입과 관계없이 같은 헤더를 쓰고, 결제하기 · 결제 직후 추천 팝업 · 결제 완료에는 노출하지 않는다.",
   "service": "Unifi mini",
   "status": "확인 필요",
   "source": {
    "pageId": "4980098464",
    "title": "Unifi mini - 2뎁스 홈 버튼 헤더 - LV / UIT",
    "version": 2,
    "section": "Specification > Policy"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "2뎁스 홈 버튼 헤더의 적용 범위(3뎁스 포함 · 결제 단계 제외 · 로고 헤더 대체)와 배포 버전을 확정한다."
   }
  },
  {
   "details": [
    "100엔딜 배너 선택 → 100엔딜 페이지 · 배너 문구는 XLT(mini_home_voucher_banner_title · _desc)",
    "숏컷은 Admin에서 「링크 카테고리」 타입으로 생성 · 선택 시 Target URL로 이동 · 메뉴명 전환 효과 없음(이미지 애니메이션만) · 운영 시 메뉴명 1개",
    "할인율 태그는 Admin 「추가 문구」(benefitBadgeText)를 언어별 고정 노출 · en-US 필수 · 요청 언어 문구가 없으면 영어 · FE는 benefitBadgeText만 있어도 태그 노출",
    "남은 확정 필요 #5: 배너 최대 노출 개수 · 롤링 간격 · 노출 순서 · 배너 등록 주체"
   ],
   "fe": "LV",
   "related": [
    {
     "pageId": "4949365748",
     "title": "Unifi 개선 과제 요약 — LV / UIT",
     "version": 21,
     "section": "LV 작업 > 100엔딜 노출"
    }
   ],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "100엔딜",
    "홈 배너",
    "카테고리 숏컷",
    "링크 카테고리",
    "benefitBadgeText"
   ],
   "id": "home-100yen-exposure",
   "area": "display",
   "title": "홈 100엔딜 노출 (배너 · 카테고리 숏컷)",
   "summary": "홈의 100엔딜 대형 영역(home_100yen_01)을 제거하고, 100엔딜은 상단 배너(복수 · 자동 롤링 · 스와이프 · 「순번 / 전체」 표시)와 카테고리 숏컷 맨 앞 메뉴로 노출한다. 숏컷은 홈에만 노출하고 카테고리 선택 레이어에는 노출하지 않는다.",
   "service": "Unifi mini",
   "status": "예정",
   "source": {
    "pageId": "4978661053",
    "title": "Unifi mini - 100엔딜 노출 - LV",
    "version": 2,
    "section": "Specification > Policy"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "FE 핫픽스 unifi-web v1.13.2.1로 2026-10-26 prod 배포(LNXTCM-3456)",
    "XLT: UF_IAB_line_popup_title · UF_IAB_btn"
   ],
   "fe": "",
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "X",
    "트위터",
    "LINE으로 열기",
    "인앱 브라우저",
    "프로모션 페이지"
   ],
   "id": "x-line-open-popup",
   "area": "display",
   "title": "X에서 접근 시 LINE으로 열기 팝업",
   "summary": "X에서 1,000엔 할인 프로모션 페이지에 접근하면 페이지 위에 LINE으로 열기 팝업(「LINE에서 더 편하게 이용하세요.」)을 노출한다. 버튼은 「LINE에서 열기」 1개만 두고 「웹에서 계속 보기」는 제공하지 않으며, 딤드 영역을 누르면 닫힌다.",
   "service": "Unifi",
   "status": "최신",
   "source": {
    "pageId": "4935973114",
    "title": "X에서 접근 시 LINE으로 열기 동선",
    "version": 5,
    "section": "Specification > Policy > 팝업 노출 · LINE에서 열기 · 팝업 닫기"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "타이틀 「LINE 친구 추가하고 1,000엔 쿠폰 받으세요!」 · 설명 「올리브영·다이소·CU 1만원 상품권을 단 100엔에 구매 가능해요」",
    "iOS는 사용자의 명시적인 버튼 선택이 있어야 LINE 앱으로 이동",
    "Unifi 미니앱 경유 동선은 FE 검토로 삭제(10-29)",
    "프로모션 링크 접근 시의 LINE으로 열기 팝업은 그대로 유지"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.15.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "X",
    "OA 친구 추가",
    "팝업",
    "1,000엔 쿠폰"
   ],
   "id": "x-oa-friend-popup",
   "area": "display",
   "title": "X 게시물 OA 친구 추가 팝업",
   "summary": "X 일반 게시물의 Unifi OA 친구 추가 링크로 접근하면(LINE 앱 환경이 아닌 경우) 1,000엔 할인 프로모션 페이지 위에 OA 친구 추가 팝업을 노출한다. 「친구 추가하고 쿠폰 받기」를 누르면 Unifi OA 친구 추가 화면으로 이동한다.",
   "service": "Unifi",
   "status": "예정",
   "source": {
    "pageId": "4935973114",
    "title": "X에서 접근 시 LINE으로 열기 동선",
    "version": 5,
    "section": "Specification > Policy > OA 친구 추가 팝업 (10-29 추가)"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "CU 편의점 동선은 변경하지 않는다",
    "이 퍼널에서는 구매유도 바텀시트를 없애고 결제 완료 화면 안 구매유도 영역(「함께 구매하면 좋을 상품권」)으로 넣는다 · 특정 레퍼런스 ID 한정 분기",
    "종전안 「LIFF 채널 동의로 한 번에」는 MINI → LIFF → MINI 복귀가 막혀 보류(2026-09-23)",
    "배포 후 조정 퍼널은 B-4로 별도 집계"
   ],
   "fe": "UIT",
   "related": [],
   "release": "Unifi v1.9.1",
   "changes": [
    "2026-09-23: LIFF 채널 동의 방식 → mini 내 친구 추가 안내 바텀시트"
   ],
   "conflicts": [],
   "keywords": [
    "B-3",
    "결제 퍼널",
    "OA 친구 추가",
    "결제 완료",
    "정보 제공 동의"
   ],
   "id": "b3-funnel-oa-after-payment",
   "area": "display",
   "title": "B-3 결제 퍼널 — OA 친구 추가를 결제 후로",
   "summary": "B-3 퍼널에 한해 OA 친구 추가(정보 제공 동의 포함)를 결제 전에서 결제 후로 옮겼다(결제 페이지 → 결제 → 정보 제공 동의 → 친구 추가 → 결제 완료 OA 발송). 결제 완료 후 친구 추가 안내 바텀시트를 보여 주고 mini 안에서 정보 제공 동의 → 친구 추가를 차례로 진행한다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4770507579",
    "title": "B-3 퍼널 조정",
    "version": 5,
    "section": "Specification > Policy"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "상세 진입 1회당 1번 · 새로고침 · 뒤로가기 재진입 시 미노출(FE 확인 필요로 표기)",
    "QR 특가 쿠폰을 이미 쓴 유저에게는 안내 팝업(voucher_cu_detail_qr_01_02)을 우선하고 토스트는 노출하지 않는다",
    "QR이 아닌 경로(OA 메시지 · mini 메인 등) 재방문은 미노출",
    "referral_code 기반 권역 매핑 · 지역명 표기는 하지 않기로 함"
   ],
   "fe": "LV",
   "related": [],
   "release": "Unifi v1.9.2.4",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "CU",
    "QR",
    "토스트",
    "from=cu_event",
    "환영"
   ],
   "id": "cu-qr-welcome-toast",
   "area": "display",
   "title": "CU QR 진입 환영 토스트",
   "summary": "진입 URL에 from=cu_event가 있으면 CU 1만원권 전용 상세에서 지역 구분 없이 같은 문구의 환영 토스트(「[CU] 체크인!」)를 3초 노출한다. 이미 OA 친구면 진입 직후, 친구가 아니면 친구 추가를 마치고 돌아온 직후 노출하고 친구 추가를 닫은 유저에게는 노출하지 않는다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4808994482",
    "title": "CU QR 관련 > 환영 토스트 추가",
    "version": 16,
    "section": "Policy > 주요 내용"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "id": "100yen-deal-participation",
   "area": "promo",
   "title": "100엔딜 참여 조건·결제",
   "summary": "신규 회원이 100엔 + Unifi 발행 1,000엔 쿠폰으로 1,000엔 상당 상품권을 구매하는 프로모션. Unifi 공식 계정 친구 추가가 필수이며, 쿠폰은 1계정당 1장·1회 구매에만 사용(차액 환불 없음), 대상 상품은 1인당 1점. 결제는 Stripe만 지원.",
   "details": [
    "친구 추가가 안 된 경우 100엔딜 상세 - OA Follow X 화면 노출",
    "결제 실패 시 결제 화면으로 돌아가 다시 시도하도록 안내",
    "결제 완료 화면 「더 많은 상품보기」 → 상품권 전체 카테고리로 이동(2026-09-17 통일 · UNIFY-11408)",
    "Home 배너·상품 카드는 Admin(Additional Curations, 단돈 백엔딜 · PROMOTION)에서 등록·관리",
    "담당 FE: Home - 100엔딜은 LV(mini_ · {0} · Dapp Portal), 상세·결제 5화면은 UIT(UF_ · {{0}} · Unifi)"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4725963532",
    "title": "100엔딜",
    "version": 35,
    "section": "Specification > Policy > 참여 조건 · 결제 · Admin 관리"
   },
   "related": [],
   "release": "Unifi v1.7.8",
   "changes": [
    "2026-09-17: 결제 완료 「더 많은 상품보기」 이동처 Unifi mini 홈 → 상품권 전체 카테고리"
   ],
   "conflicts": [],
   "keywords": [
    "100엔딜",
    "백엔딜",
    "1,000엔 쿠폰",
    "OA 친구 추가",
    "Stripe",
    "1인 1점"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "100yen-deal-pricing-legal",
   "area": "promo",
   "title": "100엔딜 결제 구조 법적 검토(다이소 정가 정책)",
   "summary": "사용자는 100엔 + 1,000엔 쿠폰으로 상품권을 정가에 구매하는 구조(상품권 자체 할인 아님). 법무 회신(LNS-1741 · 2026-10-28)상 회사 비용으로 원가보다 낮게 공급하는 것은 법적 문제 없음. 다만 다이소 「정가 판매」 정책 위반 여부는 SK플래닛 판단 사항으로 사전 협의가 필요(🔴 미해결).",
   "details": [
    "부속합의서(연중 변경은 사전 공지·협의)에 따라 SK플래닛과 사전 협의 필요"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "source": {
    "pageId": "4725963532",
    "title": "100엔딜",
    "version": 35,
    "section": "Specification > Policy > 결제"
   },
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4725963532",
     "version": 35,
     "section": "Policy > 결제",
     "says": "🔴 다이소 「정가 판매」 정책 위반 여부는 SK플래닛이 판단할 사항이며 SK플래닛과 사전 협의가 필요하다"
    }
   ],
   "keywords": [
    "100엔딜",
    "정가",
    "다이소",
    "SK플래닛",
    "법무",
    "LNS-1741"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "다이소 「정가 판매」 정책 위반 여부를 SK플래닛과 사전 협의한다(법무 LNS-1741은 문제 없음 회신)."
   }
  },
  {
   "id": "100yen-refund-coupon-restore",
   "area": "promo",
   "title": "100엔딜 환불 시 쿠폰 되돌리기",
   "summary": "100엔딜 상품을 환불하면 1,000엔 쿠폰을 다시 쓸 수 있게 되돌려 100엔딜을 재구매할 수 있다. 사용자 직접 환불과 리딤 기한 내 미리딤 자동 환불 모두 대상. 재발급은 새 쿠폰 발급이 아니라 기존 쿠폰의 사용 취소 방식(계정당 1장 관리).",
   "details": [
    "CS 대응용으로 CMS에서 쿠폰 강제 회수·사용 취소 가능, 처리 이력은 CMS에 남김",
    "기능 배포 전 환불자: CS 문의 시 수기 복원 · 배포 후 일괄 복원(1회성) 후 쿠폰 OA 발송",
    "재발급 OA 메시지 N6adefbe47fe2132ce77c6103 — 직접 환불·리딤 기한 만료 자동 환불 공통(2026-10-27 확정)",
    "Unifi mini v2.2.0.1에 GuideKim 결제 환불·지갑 없는 계정 쿠폰 되돌리기 포함"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4725963532",
    "title": "100엔딜",
    "version": 35,
    "section": "Specification > Policy > 환불 · 쿠폰 재발급"
   },
   "related": [],
   "release": "Unifi v1.14.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "100엔딜",
    "환불",
    "쿠폰 복구",
    "사용 취소",
    "재구매",
    "리딤 기한"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "100yen-retention-oa",
   "area": "promo",
   "title": "100엔딜 리텐션 OA 메시지",
   "summary": "리텐션 OA 2종 — ① 100엔딜 미구매 사용자(1,000엔 쿠폰을 받고 아직 쓰지 않음)에게 쿠폰 사용 유도, ② 100엔딜 구매 사용자에게 최대 15% 혜택 안내로 추가 구매 유도. OA 메시지는 XLT 키 없이 번역만 관리한다.",
   "details": [
    "대상 구분·문구 3줄(타이틀/본문/버튼) 배치는 2026-09-15 사용자 확정",
    "JA는 還元 유지(사용자 확정 · 재제안 금지), 그 외 언어는 혜택",
    "Landpress를 고치면 LIAM HUB에서 반드시 LOAD MESSAGE → UPDATE 재동기화(안 하면 구 문구 발송)",
    "등록: 미구매 prod postId 1971 · LIAM N6aa9340377e3bf6ac76a6955 / 구매 prod postId 1976 · LIAM N6aa9377277e3bf6ac76a695a"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4725963532",
    "title": "100엔딜",
    "version": 35,
    "section": "Screen > OA"
   },
   "related": [],
   "release": "Unifi v1.7.10",
   "changes": [
    "2026-09-15: 대상 명칭 「바우처 미사용자/구매 대상 리텐션」 → 「100엔딜 미구매/구매 사용자」"
   ],
   "conflicts": [],
   "keywords": [
    "100엔딜",
    "OA",
    "리텐션",
    "미구매",
    "15% 혜택",
    "LIAM"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "travel-event-period-eligibility",
   "area": "promo",
   "title": "여행 일정 등록 이벤트 기간·참여 대상",
   "summary": "프로모션 기간 2026-11-09 오픈 ~ 2027-01-31 출국자까지 지급(마지막 쿠폰 발송 1/28). 등록 기간 11-09 ~ 12-08 1차 마감(연장 시 12-09 ~ 2027-01-08, 미등록자만). LINE 앱 언어가 일본어인 사용자만 참여 가능하며, 여행 일정 + 여행 목적 등록과 Unifi 공식 계정 친구 추가가 필수(1계정 1회).",
   "details": [
    "등록 마감일은 운영 중 변경 가능. 마감은 등록 페이지에만 영향 — 기등록자의 OA·쿠폰·결제는 계속 진행",
    "언어 확인은 프로모션 페이지 하단 버튼을 누를 때(일정 등록 전) — 일본어가 아니면 참여 불가 얼럿",
    "등록 후 DA로 어뷰저 필터링 — 걸러지면 쿠폰·OA ①~⑤ 미발송, 재진입 시 「참여 대상이 아닙니다.」",
    "누적 등록자 2만 명 초과 시 등록 차단, 유의사항에 「예산 소진 시 조기 종료될 수 있습니다」 고지",
    "LINE mini 페이지로 제공, PC 접속 시 모바일 앱 이용 알림"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "예정",
   "source": {
    "pageId": "4964266842",
    "title": "여행 일정 등록 이벤트 - LV / UIT",
    "version": 27,
    "section": "Specification > Policy > 기간 · 대상 · 참여 조건 · 이벤트 참여 대상 판정"
   },
   "related": [
    {
     "pageId": "4971430425",
     "title": "261109_여행 일정 등록 이벤트 (수정본)",
     "version": 13,
     "section": "운영 정책 · 이벤트 구성"
    }
   ],
   "release": "Unifi v1.15.1",
   "changes": [
    "2026-11-02: 참여 대상 「100엔딜 결제 유저 또는 Unifi 가입 시 일본어 설정」(마케팅 수정본) → 「LINE 앱 언어 일본어 + 등록 후 DA 필터」(화면 위키 · 마케팅과 참가 조건 논의 완료)"
   ],
   "conflicts": [],
   "keywords": [
    "여행 일정",
    "방한 일본인",
    "메가커피",
    "등록 기간",
    "LINE 앱 언어",
    "DA",
    "2만 명"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "travel-event-registration-input",
   "area": "promo",
   "title": "여행 일정 등록 입력 규칙(도착일·목적)",
   "summary": "달력에서 한국 도착일 하나만 선택(종료일·귀국일 미수집)하며 필수, 등록 후 변경 불가. 도착일은 오늘 + 2일 이후 ~ 2027-01-31까지만 선택 가능(KST 기준). 여행 목적은 피부미용(클리닉)·화장품·쇼핑·식사/카페 중 하나만 선택.",
   "details": [
    "지급 기준일 = 한국 도착일(문서의 「출국 D-n」은 도착일 기준 D-n)",
    "오늘·내일과 그 이전 날짜는 비활성 표시, 별도 안내·토스트 없음",
    "화면 표기는 「가장 기대되는 관심사」 카드 4개(성형·피부시술 · K-뷰티·화장품 · 쇼핑·인기아이템 · 한국 맛집·카페)",
    "피부미용(클리닉) 선택자는 별도 세그먼트로 후속 마케팅 활용",
    "「이벤트 참여하기」는 일정·관심사 모두 입력 시 활성, OA 친구 아니면 친구 추가 시트"
   ],
   "service": "Unifi mini",
   "fe": "LV",
   "status": "예정",
   "source": {
    "pageId": "4964266842",
    "title": "여행 일정 등록 이벤트 - LV / UIT",
    "version": 27,
    "section": "Specification > Policy > 여행 일정 입력 · 여행 목적 · 등록 후 변경"
   },
   "related": [
    {
     "pageId": "4971430425",
     "title": "261109_여행 일정 등록 이벤트 (수정본)",
     "version": 13,
     "section": "운영 정책"
    }
   ],
   "release": "Unifi v1.15.1",
   "changes": [
    "2026-11-02: 여행 시작일~종료일 범위 선택 → 한국 도착일 하나만 선택"
   ],
   "conflicts": [],
   "keywords": [
    "여행 일정",
    "한국 도착일",
    "여행 목적",
    "관심사",
    "일정 변경 불가"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "travel-event-coupon-payment",
   "area": "promo",
   "title": "여행 이벤트 메가커피 쿠폰 지급·0원 결제",
   "summary": "출국 D-3에 등록자 전원(DA 통과자)에게 메가커피 아메리카노(hot) 1잔 쿠폰을 1계정 1장 지급하고 OA로 알린다. 쿠폰 사용 기한은 지급일로부터 90일(미사용 시 소멸). 기존 결제 화면에서 쿠폰 자동 적용 0원 결제로 바우처를 발급한다.",
   "details": [
    "OA ③ 「메가커피 쿠폰 받으러 가기」 → 상품 상세 없이 결제 화면 직행 → 결제 버튼만 누르면 바우처 발급",
    "바우처 바코드 활성화는 90일 이내, 활성화 후에는 각 상품권 유효기한",
    "빌링: 단일 쿠폰 결제만(복합 결제 없음) · 쿠폰 전용 Kafka · 쿠폰 사용마다 TransactionId · 매출 0원/비용=쿠폰 사용액, 마케팅비 전액 LNXT 부담",
    "환불·재발급은 100엔딜과 같은 정책(기존 쿠폰 사용 취소, 같은 쿠폰 번호)",
    "늦은 등록(출국 D-3 이내 등록)은 등록 다음 날 쿠폰 발송"
   ],
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "예정",
   "source": {
    "pageId": "4964266842",
    "title": "여행 일정 등록 이벤트 - LV / UIT",
    "version": 27,
    "section": "Specification > Policy > 쿠폰 지급 · 결제 (0원) · 빌링 · 회계 · 환불 · 재발급"
   },
   "related": [
    {
     "pageId": "4971430425",
     "title": "261109_여행 일정 등록 이벤트 (수정본)",
     "version": 13,
     "section": "사용자 동선 · 운영 정책"
    }
   ],
   "release": "Unifi v1.15.1",
   "changes": [
    "쿠폰 사용 기한 2027-02-08 → 지급일로부터 90일",
    "바우처 바코드 활성화 후 60일 → 활성화 90일 이내 · 활성화 후 각 상품권 유효기한"
   ],
   "conflicts": [],
   "keywords": [
    "메가커피",
    "쿠폰",
    "0원 결제",
    "D-3",
    "90일",
    "빌링",
    "TransactionId"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "travel-event-oa-schedule",
   "area": "promo",
   "title": "여행 이벤트 OA 발송 일정",
   "summary": "여행 일정 데이터 기준 자동 발송, 매일 오전 9시 전후. ① 등록 직후(DA 통과자) ② 출국 D-14 피부미용 선택자 올리브영 안내 ③ D-3 메가커피 쿠폰 + 목적별 추천 상품권 ④ 등록 후~D-3 전 100엔딜 미구매자 ⑤ D-1 목적별 추천 상품권. XLT 키 없이 번역만 관리.",
   "details": [
    "등록 시점이 D-14·D-3 이내면 등록 다음 날 발송(등록 시점별 발송 일정 표)",
    "목적별 추천: 피부미용·화장품 → 올리브영 · 쇼핑 → 다이소 · 식사/카페 → 설빙·투썸·빽다방·메가커피·BBQ·교촌치킨·bhc·편의점(대외 비노출)",
    "DA로 걸러진 사용자는 OA ①~⑤ 미발송",
    "OA 문구 초안·②④⑤ 버튼은 마케팅 확정 필요"
   ],
   "service": "Unifi mini",
   "fe": "",
   "status": "예정",
   "source": {
    "pageId": "4964266842",
    "title": "여행 일정 등록 이벤트 - LV / UIT",
    "version": 27,
    "section": "OA"
   },
   "related": [
    {
     "pageId": "4971430425",
     "title": "261109_여행 일정 등록 이벤트 (수정본)",
     "version": 13,
     "section": "여행 목적별 추천 상품권 안내"
    }
   ],
   "release": "Unifi v1.15.1",
   "changes": [
    "11-02: OA ② 피부미용 선택자 클리닉 예약 상품 안내 → 올리브영 상품 안내(사용자 결정 · 마케팅 수정본 v13의 「클리닉」과 다름)"
   ],
   "conflicts": [],
   "keywords": [
    "여행 이벤트",
    "OA",
    "D-14",
    "D-3",
    "D-1",
    "추천 상품권",
    "오전 9시"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "travel-event-privacy",
   "area": "promo",
   "title": "여행 이벤트 개인정보 수집 동의·보관 기간",
   "summary": "여행 일정·목적을 수집한다. 수집·이용 동의 문구와 보관 기간은 법무 검토 중으로 미확정.",
   "details": [],
   "service": "Unifi mini",
   "fe": "",
   "status": "확인 필요",
   "source": {
    "pageId": "4964266842",
    "title": "여행 일정 등록 이벤트 - LV / UIT",
    "version": 27,
    "section": "Specification > Policy > 개인정보 · 확정 필요 정리 #1"
   },
   "related": [
    {
     "pageId": "4971430425",
     "title": "261109_여행 일정 등록 이벤트 (수정본)",
     "version": 13,
     "section": "그 외 > 추가 확인 사항"
    }
   ],
   "release": "Unifi v1.15.1",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4964266842",
     "version": 27,
     "section": "Policy > 개인정보",
     "says": "법무 검토 중 [확정 필요] 수집 · 이용 동의 문구와 보관 기간"
    }
   ],
   "keywords": [
    "개인정보",
    "동의",
    "보관 기간",
    "법무",
    "여행 일정"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "여행 일정 · 목적 수집 동의 문구와 보관 기간을 확정한다(법무 검토 중 · v1.15.1 배포 전 필요)."
   }
  },
  {
   "id": "reward-tab-composition",
   "area": "promo",
   "title": "리워드 탭 노출 구성(선호 통화별)",
   "summary": "LIFF/Web은 My의 선호 스테이블코인에 따라 리워드 탭 구성이 달라진다 — JPYC면 JPYC 출석체크 + mini 게임, USDT(IDRP 포함)면 USDT 출석체크 + 인하우스 캐주얼 게임 6종. Unifi mini는 선호 통화와 무관하게 JPYC 기준.",
   "details": [
    "프로모션별 노출 환경·노출 순서·미션 노출 위치(패키지 보상 유무)를 Admin에서 설정, 특수 프로모션은 배너로 노출",
    "「나의 럭키볼」 영역을 누르면 럭키볼 받은 내역(신규)으로 이동 — 선호 통화에 맞는 출석 체크·게임 미션 럭키볼만, 20개씩 인피니트 스크롤",
    "출석 체크·게임 미션을 모두 완료해 럭키볼을 전부 받으면 완료 배너 롤링 노출",
    "프로모션 허용 SNS가 아닌 계정으로 참여 시 NOT_LINE_ACCOUNT / PROMOTION_BLOCKED_BY_SOCIAL_TYPE 팝업"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4515188588",
    "title": "리워드탭 개선",
    "version": 37,
    "section": "Specification > Policy"
   },
   "related": [
    {
     "pageId": "4838291699",
     "title": "리워드탭 개선 후 피드백 반영",
     "version": 18,
     "section": "Screen > JPYC · USDT · Common"
    }
   ],
   "release": "Unifi v1.14.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "리워드 탭",
    "선호 통화",
    "JPYC",
    "USDT",
    "출석체크",
    "게임 미션",
    "럭키볼 받은 내역"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "luckyball-payout-expiry",
   "area": "promo",
   "title": "럭키볼 지급 수량·소멸 기준",
   "summary": "USDT: 매일 00:00(UTC+0) 기준 보유 금액에 따라 차등 지급 — 100 USDT 이상 1개, 1000 USDT 이상 2개(1일 최대 지급 기준). JPYC: 5,000 JPYC 이상 1개, 10,000 이상 출석체크 5일차 2개, 50,000 이상 5일차 3개. 럭키볼은 획득한 회차 종료 전에 뽑아야 하며 종료 후 남은 럭키볼은 모두 소멸.",
   "details": [
    "JPYC 잔고 기준 시점은 09:00(UTC+9) 스냅샷(Master v6)",
    "뽑기는 만료일이 가까운 럭키볼부터 소모, 만료 D-3·D-2·D-1 12시(KST)에 미사용 보유자 OA(Master v8)",
    "럭키볼 예산 소진 시 출석체크·럭키볼 지급 게임미션 종료, 이미 받은 럭키볼은 예산이 남고 기한 전이면 뽑기 가능(Master v8)"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4838291699",
    "title": "리워드탭 개선 후 피드백 반영",
    "version": 18,
    "section": "Screen > Common > popup luckyball (LIFF·Unifi mini)"
   },
   "related": [
    {
     "pageId": "4368568387",
     "title": "[Master] Mission and Reward",
     "version": 20,
     "section": "Summary > 버전 6 · 버전 8"
    }
   ],
   "release": "Unifi v1.14.0",
   "changes": [
    "Master v6(v1.5.1·v1.5.3): 「1,000 USDT 이상 럭키볼 최대 9개」 삭제",
    "2026-10-26: 안내 문구 「예치 금액」 → 「보유 금액」",
    "2026-10-29: 소멸 기준 안내(회차 종료 후 소멸) 팝업에 추가"
   ],
   "conflicts": [],
   "keywords": [
    "럭키볼",
    "지급 수량",
    "보유 금액",
    "소멸",
    "회차",
    "출석체크 5일차"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "mission-recurrence-budget",
   "area": "promo",
   "title": "미션 반복 유형·리워드 예산 소진",
   "summary": "프로모션은 Recurrence Type을 DAILY(Reset Hour에 초기화 · 미수령이어도 초기화)와 ONE_TIME(Promotion End At까지 활성) 중 선택한다. 리워드가 소진되거나 설정 한계에 도달하면 미션을 달성해도 리워드를 지급하지 않으며, 그룹 미션 리워드 소진 시 하위 미션도 미지급.",
   "details": [
    "게임 미션은 일일 → 1회성으로 변경 — 당일 경과해도 수령 버튼 활성(Master v5)",
    "그룹 미션별 유의사항(Notice) 필드 — 값이 없으면 문구 미노출",
    "Web은 LINE ID 로그인 사용자만 보상 지급, 미니게임은 DA Score 없는 사용자 미지급(Master v1)"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4368568387",
    "title": "[Master] Mission and Reward",
    "version": 20,
    "section": "Summary > 버전 8"
   },
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "1회성 미션",
    "DAILY",
    "ONE_TIME",
    "Reset Hour",
    "예산 소진",
    "리워드 소진"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "ly-iaa-ad-reward",
   "area": "promo",
   "title": "Unifi mini 광고 리워드(LY IAA)",
   "summary": "Unifi mini 광고 리워드는 SkyFlag에서 LY 공식 IAA로 전환. 초기 설정은 광고 1회 시청당 0.10 JPYC, 1일 100회까지(시청 간격 20초), 1인당 최대 1일 10 JPYC / 월 300 JPYC, 1회 즉시 지급. 단, 화면 정의의 한도 도달 팝업에는 「일일 한도(현재 5회)」가 남아 있다.",
   "details": [
    "노출: LINE 미니앱 + 스마트폰(PC 비노출) + 일본 IP, 배너 상시 노출(한도 도달·재고 없음에도 숨기지 않음)",
    "광고 요청 전 사전 고지(광고 표시·보상 내용·획득 방법·동영상 가능성) 필수 — 「광고 보기」를 눌렀을 때만 요청",
    "광고 로딩 실패 시 사용자 직접 재시도 최대 2회, 미시청·이탈 시 남은 횟수 미차감",
    "일일 한도는 일본 시간 0시 초기화",
    "Mini와 Web/LIFF(SkyFlag)에서 각각 독립 적립, 합산 한도 없음 · 예산은 기존 SkyFlag 예산 공용(사업부 희망)"
   ],
   "service": "Unifi mini",
   "fe": "UIT",
   "status": "확인 필요",
   "source": {
    "pageId": "4733796517",
    "title": "Unifi Mini 광고 리워드 마이그레이션 (SkyFlag→LY IAA)",
    "version": 71,
    "section": "Policy > F) 추가 확인 필요사항 #1 · Screen > 한도 도달 팝업"
   },
   "related": [
    {
     "pageId": "4756481387",
     "title": "Web/LIFF > SkyFlag 추가 관련",
     "version": 14,
     "section": "범위 대상 및 최종 구조"
    }
   ],
   "release": "Unifi mini v2.2.0",
   "changes": [
    "1인당 일일 시청 상한 5회 → 100회(Policy F #1 취소선)"
   ],
   "conflicts": [
    {
     "pageId": "4733796517",
     "version": 71,
     "section": "Policy > F) 추가 확인 필요사항 #1",
     "says": "초기 설정 1일 100회까지(시청 간격 20초), 1인당 최대 1일 10 JPYC / 월 300 JPYC"
    },
    {
     "pageId": "4733796517",
     "version": 71,
     "section": "Screen > 한도 도달 팝업",
     "says": "일일 한도(현재 5회)는 일본 시간 0시에 초기화 처리"
    }
   ],
   "keywords": [
    "LY IAA",
    "광고 리워드",
    "SkyFlag",
    "0.10 JPYC",
    "일일 한도",
    "쿨다운 20초"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "상충",
    "question": "광고 리워드 1일 한도는 100회(Policy)인가 5회(Screen 한도 팝업)인가?"
   }
  },
  {
   "id": "skyflag-web-liff",
   "area": "promo",
   "title": "Web/LIFF SkyFlag 오퍼월",
   "summary": "SkyFlag 오퍼월을 Unifi mini에서 Web/LIFF로 이관. 일본 IP 사용자에게만 진입 동선을 노출하고 PC 브라우저는 미노출. 리워드는 JPYC 단일이며 포스트백 wallpoint 값을 엔과 1:1로 그대로 지급.",
   "details": [
    "지급 한도: 단건 최대 5만엔 / 동일 유저 24시간 10만엔(Billing 내부 제한) / reward_budget 총액 100만엔",
    "중복 지급 방지: 사용자ID × 광고ID · suid = Unifi Wallet Address",
    "화면 전환: LIFF는 IAB(미션은 External Browser), 모바일 Web은 새 탭",
    "알림: 미션 완료·리워드 지급 시 email + LINE OA",
    "Mini에서 시작한 미완료 미션도 완료 시 정상 지급"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4756481387",
    "title": "Web/LIFF > SkyFlag 추가 관련",
    "version": 14,
    "section": "Policy > 1. Web / LIFF > SkyFlag 추가"
   },
   "related": [
    {
     "pageId": "4733796517",
     "title": "Unifi Mini 광고 리워드 마이그레이션 (SkyFlag→LY IAA)",
     "version": 71,
     "section": "범위 대상 및 최종 구조"
    }
   ],
   "release": "Unifi v1.9.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "SkyFlag",
    "오퍼월",
    "Web",
    "LIFF",
    "JPYC",
    "지급 한도",
    "JP IP"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "cr-mission-jpyc",
   "area": "promo",
   "title": "CR 미션 인정 자산 JPYC 추가",
   "summary": "카이아 재단 CR 미션 Epoch 4(10/21 09:40 KST 예상)부터 Unifi에 예치된 JPYC도 인정 자산. JPYC를 USDT로 환산(Orakl 시세 Epoch 평균)해 USDT와 합산한 뒤 1:10(USDT:KAIA) 비율 적용. JPYC만 추가 예치하고 KAIA를 추가 위임하지 않으면 리워드는 동일.",
   "details": [
    "JPYC 환산액은 재단 산정값(jpycPrincipalInUsdt) 그대로 — 클라이언트 재환산 없음, 약 1일 1회 갱신",
    "예치 여부 판정은 stablePrincipal(USDT + JPYC 환산 합계) 기준",
    "참여 규모 상한 「5,000만 USDT」는 USDT + JPYC 환산가 합산 기준",
    "리워드 받기·총 리워드 보기: 미참여·정산 전·리워드 0이면 숨김, 정산 완료 후 1회차 해제 전에도 노출(받기 비활성)",
    "Mobile(v1.3.5)은 LandPress Flag로 신규 문구 노출 제어 · JPYC 보상 문구의 금융청 규제 검토 여부는 미확정"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4838155608",
    "title": "CR 미션 - 인정자산 추가(JPYC)",
    "version": 31,
    "section": "2. 확정 전제"
   },
   "related": [],
   "release": "Unifi v1.13.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "CR 미션",
    "JPYC",
    "인정 자산",
    "KAIA 위임",
    "1:10",
    "Epoch 4"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "O-1: 결제 완료 직후 · 활성화 기한(결제일 + 90일) · 기한 안 전액 환불 · 기한이 지나면 수수료 20%를 뺀 금액 자동 환불 안내",
    "O-2/O-3: 이미 활성화 · 활성화 전 환불 · 탈퇴 · 배포 전 발급분에는 보내지 않는다 · 발송 시각(JST)은 확정 필요 #14",
    "O-4: 활성화(발권 성공) 직후 · 사용 기한 = 활성화일 + 상품별 사용 기간 · 발권 실패 · 품절 · 배포 전 발급분은 미발송",
    "O-8: 활성화 후 사용 기한 D-7 · D-3 · D-1(GuideKim 현행) · 메시지 1개에 남은 일수 변수",
    "O-9: GuideKim 포인트 보유 계정만 · 오픈(소멸 · 신규 부여) 당일"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "OA",
    "LINE 공식계정",
    "발송 목록",
    "활성화 기한 알림",
    "상품권 발송"
   ],
   "id": "oa-send-list",
   "area": "message",
   "title": "OA 메시지 발송 목록 (O-1 ~ O-12)",
   "summary": "상품권은 결제 시 발권하지 않고 바코드 활성화 때 발권하므로, 상품권 발송 · 포인트 적립 OA는 활성화 시점에 보내고 활성화 기한 알림이 따로 있다. 발송 목록은 O-1 결제 완료 · O-2/O-3 활성화 기한 D-7 · D-1 · O-4 상품권 발송 · O-5 포인트 적립 · O-7 포인트 소멸 예정 · O-8 사용 기한 알림 · O-9 GuideKim 포인트 안내 · O-10 자동 환불 · O-11 환불 완료 · O-12 100엔딜 쿠폰 복구다(O-6 삭제).",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4833603093",
    "title": "Unifi mini - OA",
    "version": 65,
    "section": "Specification > 발송 목록 — 바코드 활성화(Redeem) 기준"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "날짜 변수({{expire_date}} · {{activation_deadline}} · {{use_deadline}})는 5개 언어 모두 yyyy/MM/dd · JST",
    "OA에는 XLT 키를 부여하지 않는다 · 5개 언어 번역 · Landpress · LIAM beta/prod 등록 · 문구 변경 시 번역 품질 게이트 후 재등록",
    "보관 기간(1일)은 설정으로 조정 가능 · 모든 OA 공통",
    "CS 안내: 활성화 · 환불 알림을 못 받았으면 MY쇼핑 상품권 상세에서 상태 확인",
    "GuideKim 캐시백 지급 OA 버튼은 Unifi My(예약 내역)로 변경(템플릿 버튼 주소만 교체)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "OA",
    "수신 동의",
    "거래 알림",
    "미팔로우",
    "발송 큐",
    "날짜 형식"
   ],
   "id": "oa-common-rules",
   "area": "message",
   "title": "OA 발송 공통 규칙",
   "summary": "거래 알림으로 수신 동의와 무관하게 발송한다(GuideKim 현행 승계). OA를 팔로우하지 않은 사용자에게 보낼 메시지는 발송 큐에 1일 보관하고, 그 안에 친구 추가하면 보내며 1일이 지나면 버린다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4833603093",
    "title": "Unifi mini - OA",
    "version": 65,
    "section": "Specification > Policy > 알림 구분 · 날짜 표기 · 소급 발송 · 다국어"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "보내지 않는 경우: 활성화 전 환불(적립취소) · NPP 발행 실패 · 발권 실패 · 품절 · 미활성 자동 환불 건(적립예정 취소)",
    "적립 재처리 배치(KST 00:25 · 01:25 · 02:25) 건은 모아서 오전 10시쯤 발송(B/E 가능 여부 확인 중) · 일반 건은 즉시",
    "고지 내용: 적립 포인트 · 유효기간(적립일부터 180일) · 사용처(상품권 결제 시 1P = 1엔) · 기간 연장 없음"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "OA",
    "포인트 적립",
    "적립 완료",
    "O-5",
    "바코드 활성화"
   ],
   "id": "oa-point-earned",
   "area": "message",
   "title": "포인트 적립 완료 OA (O-5)",
   "summary": "바코드 활성화(발권 성공)로 적립예정 포인트가 적립완료로 바뀔 때 적립 건(구매 건)마다 1회 보낸다. 결제 완료(적립예정) 시점에는 보내지 않는다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4833603093",
    "title": "Unifi mini - OA",
    "version": 65,
    "section": "Specification > Policy > 발송 시점(적립 완료) · 발송 단위 · 보내지 않는 경우"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "대상은 NPP 「만료 예정 포인트가 있는 계정 조회」 API · 발송은 Unifi",
    "고지: 소멸 예정 포인트 · 소멸일 · 사용처 · 소진 순서(소멸일 가까운 것부터) · 복구 · 연장 없음",
    "1일 전 문구는 따로 두지 않는다(10/19)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4833603093",
     "version": 65,
     "section": "확정 필요 항목 #8",
     "says": "발송 시점(7일 · 1일 전 제안) 확정 · 최소 포인트 기준 · 같은 날 소멸분 합산 기준(시간대) · 앱 푸시 병행 여부가 남아 있음"
    }
   ],
   "keywords": [
    "OA",
    "포인트 소멸",
    "소멸 예정",
    "180일",
    "O-7"
   ],
   "id": "oa-point-expiring",
   "area": "message",
   "title": "포인트 소멸 예정 OA (O-7)",
   "summary": "사용기한(적립일부터 180일)이 다가온 포인트가 있으면 소멸 7일 전 · 1일 전에 보내는 안(제안)이다. 같은 날 소멸되는 포인트는 합산해 1건으로 보내고, 발송 시점에 이미 사용해 0P가 되면 보내지 않는다.",
   "service": "Unifi mini",
   "status": "확인 필요",
   "source": {
    "pageId": "4833603093",
    "title": "Unifi mini - OA",
    "version": 65,
    "section": "Specification > Policy > 발송 시점(소멸 예정)"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "O-7 발송 시점(7일·1일 전 제안) 확정 · 최소 포인트 기준 · 같은 날 소멸분 합산 기준(시간대)을 정한다."
   }
  },
  {
   "details": [
    "사용자 문구에는 비율(80%)과 포인트 결제분 미반환을 적지 않는다 — O-10 비율 미기재는 의도(수수료 20% 안내는 O-1 · O-2 · O-3 담당 · 10/21)",
    "{{refund_amount}}는 B/E가 단위까지 넣는다(카드 「¥8,000」 · JPYC 「8,000 JPYC」)",
    "O-10 미발송: 활성화 · 활성화 전 환불 완료 건 · 발권 실패 · 품절 · 포인트로만 결제한 건",
    "O-12: 페이지 기준 「지금은 개발팀 수기 복구 · 환불 시 자동 복구 예정」 — 쿠폰 자동 되돌리기는 Unifi v1.14.0(UNIFY-13222) · Unifi mini v2.2.0.1(UNIFY-13600 · 13601)로 배포됨"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4833603093",
     "version": 65,
     "section": "확정 필요 항목 #15 · #16",
     "says": "O-11 포인트 0P 행 처리 · 환불 OA 발송 시점(요청/완료) · 운영자 환불 포함 · 환불 실패 건 발송 여부 · 발송 코드 · 설정 키가 미정"
    }
   ],
   "keywords": [
    "OA",
    "환불",
    "자동 환불",
    "쿠폰 복구",
    "100엔딜",
    "O-10",
    "O-11",
    "O-12"
   ],
   "id": "oa-refund-coupon",
   "area": "message",
   "title": "환불 · 쿠폰 복구 OA (O-10 · O-11 · O-12)",
   "summary": "O-10은 결제일 + 90일 다음 날 미활성 상품권 자동 환불 시, O-11은 바코드 활성화 전 전액 환불 완료 시(신청 접수 때는 미발송) 환불 1건에 1통 보낸다. O-12는 100엔딜 상품권 환불로 사용 처리된 1,000엔 할인 쿠폰을 복구했을 때 보낸다.",
   "service": "Unifi mini",
   "status": "확인 필요",
   "source": {
    "pageId": "4833603093",
    "title": "Unifi mini - OA",
    "version": 65,
    "section": "Specification > 발송 목록 > 환불 · O-12"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "O-11의 0P 행 처리 · 환불 OA 발송 시점(요청/완료) · 운영자 환불 포함 여부를 정하고, O-12 쿠폰 복구 「수기」 서술을 11-02 자동 되돌리기 배포(v2.2.0.1)에 맞출지 확인한다."
   }
  },
  {
   "details": [
    "릴리스 노트에는 과업명 「OA 메시지 발송 언어 기준 변경」만 있다",
    "참고: CU QR 토스트 등 화면 문구는 유저의 언어 설정(KR · JA · EN · TH · ZH-TW)을 따른다 — OA 기준과는 별개"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.13.0",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4636898140",
     "version": 0,
     "section": "(조회 불가 — REST · MCP 모두 404)",
     "says": "정본 페이지 내용 확인 불가"
    }
   ],
   "keywords": [
    "OA",
    "발송 언어",
    "언어 기준",
    "다국어"
   ],
   "id": "oa-send-language",
   "area": "message",
   "title": "OA 메시지 발송 언어 기준",
   "summary": "OA 메시지 발송 언어 기준 변경이 Unifi v1.13.0(2026-10-20)에 배포됐다. 정본 페이지(4636898140)는 권한이 없거나 삭제되어 조회되지 않아 기준 내용을 확인하지 못했다.",
   "service": "Unifi",
   "status": "확인 필요",
   "source": {
    "pageId": "4902348095",
    "title": "Unifi v1.13.0",
    "version": 2,
    "section": "Product Info 개요 · Task List"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "정본 없음",
    "question": "OA 발송 언어 기준 정본(4636898140)이 조회되지 않는다(삭제 또는 권한) — 현재 정본 위치를 알려 주면 카드를 채운다."
   }
  },
  {
   "details": [
    "이용약관: 상품권 스토어 · 판매자 정의 · §14.5 Refunds(「not the seller」 정정) · §5.2 Fiat Payments 등",
    "개인정보처리방침: 상품권 주문 · 발권 · 포인트 이력 수집 · SK플래닛 · PG · NPP 제공 · 보존 기간",
    "특상법 표시 사업자 명칭 = Line Next Start Corporation(판매주체 LINE NEXT Inc.와 다름 · 10/21)",
    "약관 개정 30일 사전 공지(TOS-2) 처리 완료(10/19) · GuideKim利用規約 포인트 조항은 30일 별도 고지 없이 OA + GuideKim 안내",
    "결제 직전 별도 확인 문구 생략 · 결제 페이지에 「특정상거래법에 따른 표시」 전문 기재 · 선불식 지급수단 비해당(LNS-1689)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "약관",
    "이용약관",
    "개인정보처리방침",
    "특정상거래법",
    "판매자",
    "LINE NEXT Inc."
   ],
   "id": "terms-v21-revision",
   "area": "message",
   "title": "v2.1 약관 · 개인정보처리방침 · 판매 조건 개정",
   "summary": "상품권 직접 판매(판매자 LINE NEXT Inc.)에 맞춰 Unifi 서비스 이용약관 · 개인정보처리방침을 개정하고 Inc 판매 조건 · 특정상거래법 표기 페이지를 신설(교체)했으며, 모두 v2.1.0 배포로 완료됐다. Unifi Wallet 약관은 개정 대상이 아니다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4814244434",
    "title": "(검토)약관 검토 항목 — 포인트 · 상품권 직접 판매",
    "version": 26,
    "section": "1. 검토 대상 약관 · 문서 · 2. 법무 관점 L-4 · L-5"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "포인트 유효기간: 적립 건별 발행일 · 사용기한(180일) · 연장 · 리셋 없음 · 소멸 예정 알림",
    "포인트 사용 · 반환: 부분 차감 · 전액 결제 · 1P = 1엔 · 취소 시 원 만료 시각 그대로 반환",
    "탈퇴 화면: 남은 포인트 소멸 · 활성화 전 상품권 경고 + 환불 안내",
    "기존 GuideKim 포인트: 이관이 아니라 오픈 시 소멸 + 보유분만큼 신규 부여(부여일부터 180일) · OA O-9 당일 안내 · 내역 라벨 「GuideKim 포인트 이관」"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "포인트",
    "고지",
    "약관",
    "UI 안내",
    "전매 금지",
    "소멸"
   ],
   "id": "point-notice-via-ui",
   "area": "message",
   "title": "포인트 고지 방식 — 약관 대신 UI",
   "summary": "포인트는 이용약관에 넣지 않고 포인트 확인 영역 · 유저 동선(UI)에서 안내한다(10/01). 이용조건 · 이용기간 · 소멸조건 · 부정 적립 보류 · 전매 금지를 My 포인트 영역 · 적립 시점 화면 · 결제 화면에 고지한다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4814244434",
    "title": "(검토)약관 검토 항목 — 포인트 · 상품권 직접 판매",
    "version": 26,
    "section": "5. 사용자 고지 체크리스트 · L-10"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "O-1 · O-2 · O-3 기한 경과 안내: 「기한이 지나면 수수료 20%를 뺀 금액이 자동으로 환불돼요.」(10/21 · prod 반영 확인)",
    "탈퇴 유의사항 UF_settings_delete_notice_voucher 등록값도 20% 명기",
    "사용자 문구 확정 대장의 B-6 「확정 문구」 열은 10/15 요약본(「수수료 차감 후 자동 환불」)이 그대로 남아 있고, 라이브 XLT 값은 20% 명기(10/16 업로드)다"
   ],
   "fe": "",
   "related": [
    {
     "pageId": "4833603093",
     "title": "Unifi mini - OA",
     "version": 65,
     "section": "Policy > 환불 OA"
    },
    {
     "pageId": "4869042600",
     "title": "(확정)Unifi mini v2.1 - 사용자 문구 확정 대장 (리스크 검토 · XLT · LPC)",
     "version": 18,
     "section": "B 결제 페이지 > B-6"
    }
   ],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-19: 비율 미기재(「별도 수수료 차감 후」) → 수수료 20% 명기",
    "2026-10-21: O-1 · O-2 · O-3 OA 문구 20% 명기로 정정 · O-10은 미기재 유지"
   ],
   "conflicts": [],
   "keywords": [
    "수수료",
    "20%",
    "자동 환불",
    "80%",
    "문구",
    "활성화 기한"
   ],
   "id": "refund-fee-wording",
   "area": "message",
   "title": "미활성 자동 환불 수수료 문구 표기",
   "summary": "활성화 기한(결제일 + 90일) 경과 자동 환불 안내에는 「수수료 20%」(결제 금액 · 포인트 사용분 제외의 20%)를 사용자 문구에 명기한다(LNS-1689 법무 검토 완료 · 사용자 10/19). 단 자동 환불 완료 OA(O-10)는 비율을 적지 않는다(10/21).",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4814244434",
    "title": "(검토)약관 검토 항목 — 포인트 · 상품권 직접 판매",
    "version": 26,
    "section": "2. 법무 관점 L-6 · 5. 사용자 고지 체크리스트 > 환불 조건"
   },
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "문서 불일치",
    "question": "문구 확정 대장 B-6 「확정 문구」 열은 10/15 요약본(비율 없음)인데 라이브 XLT는 「수수료 20%」 명기 — 대장 갱신 필요."
   }
  },
  {
   "details": [
    "영역: A 상품 상세 · B 결제 · C 결제 완료 · D 활성화 실패 · 품절 · E 환불 · F 회원 탈퇴 · G 리뷰 · H 상품권 상세(활성화) · P 포인트 · O OA · L LPC 공통",
    "표현 결정: 「바코드를 활성화하면 · 활성화하기 전에」 · 「바코드 활성화」로 쓴다(10/14 「상품권 활성화」 → 10/15 되돌림)",
    "상품 상세 배지 「즉시 발급」 → 「바코드 활성화 시 발급됩니다.」(구매 즉시 발급되지 않음)",
    "결제 안내: OA 친구 추가는 필수 아님(10/15)",
    "문구 원문은 대장에서 확인한다(이 카드는 운영 원칙만 요약)"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi mini v2.1.0",
   "changes": [
    "2026-10-15: 「상품권 활성화」 표현 → 「바코드 활성화」로 되돌림"
   ],
   "conflicts": [],
   "keywords": [
    "문구",
    "확정 대장",
    "리스크 검토",
    "XLT",
    "LPC",
    "바코드 활성화"
   ],
   "id": "copy-ledger",
   "area": "message",
   "title": "사용자 고지 문구 확정 대장 운영",
   "summary": "Unifi mini v2.1의 사용자 고지 문구는 「사용자 문구 확정 대장」이 단일 대장이다. 리스크팀 검토 · 확정은 대장의 「확정 문구」로 하고, 확정된 행만 XLT · LPC · 기획 위키 · 디자인에 한 번에 반영한다.",
   "service": "Unifi mini",
   "status": "최신",
   "source": {
    "pageId": "4869042600",
    "title": "(확정)Unifi mini v2.1 - 사용자 문구 확정 대장 (리스크 검토 · XLT · LPC)",
    "version": 18,
    "section": "문서 머리말 · 공통 결정"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "details": [
    "채널: D-7(10/6 10:00) 공지사항 + OA(바우처 구매 이력자) · D-7~D-Day 카테고리 · 바우처 상세 배너(LPC maintenance_banner) · D-4(10/9) 미사용 보유자 OA · 점검 중 구매 버튼 비활성 · 지연 시 별도 공지",
    "구매 CTA는 OA에만 — 공지사항에 넣으면 광고성 재분류 위험",
    "점검 때문에 기한 안에 환불하지 못한 보유분은 점검 종료 후 CS가 환불(사후 구제)",
    "CU · 이마트24 · 다이소(외부핀)는 이관 중에도 사용 가능",
    "My는 고지 노출 위치에서 제외"
   ],
   "fe": "",
   "related": [],
   "release": "Unifi v1.12.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "점검",
    "SK플래닛",
    "기프티콘",
    "서버 이관",
    "공지사항",
    "구매 차단"
   ],
   "id": "maintenance-notice-skplanet",
   "area": "message",
   "title": "서비스 점검 고지 — SK플래닛 기프티콘 서버 이관(10-13)",
   "summary": "SK플래닛 기프티콘 서버 이관(2026-10-13 00:00~08:00 KST) 동안 상품권 구매(발급) · 환불이 불가하고 올리브영은 사용도 불가해, 구매 버튼 비활성으로 사전 차단하고 3단(사전 · 점검 중 · 종료) 고지를 했다. 고지의 중심은 점검 사실이 아니라 「환불 불가 · 올리브영 사용 불가」이고, 증적을 위해 공지사항에 남긴다.",
   "service": "Unifi",
   "status": "최신",
   "source": {
    "pageId": "4770508162",
    "title": "SK플래닛 기프티콘 서버 이관(2026-10-13) 영향 및 사용자 고지 방안",
    "version": 75,
    "section": "Policy > 1. 이관 개요 · 3. 기능별 영향 · 4-3 · 5. 제안 — 고지 방안"
   },
   "checkedAt": "2026-11-03"
  },
  {
   "id": "prime-lockup-maturity-payout",
   "area": "asset",
   "title": "Prime 1차 락업 만기 지급",
   "summary": "5/8 시작한 Prime 1차 락업(180일, 3M USDT, 연 10% = 기본 8% 고정 + Boost 2%)이 11/4 00:00 UTC(KST 09:00) 종료. 같은 시각 에어드롭 컨트랙트로 313계좌 EOA에 원금+이자를 유저 조작 없이 일괄 송금(계좌별 TX 1건).",
   "details": [
    "지급 규모: 원금 3,000,000 USDT + 이자 149,181.627229 USDT(모집기간 1,236.421914 + 락업기간 147,945.205315) = 3,149,181.627229 USDT",
    "재원: SuperEarn에서 원금 3M만 출금, 이자는 LNXT가 provision으로 볼트에 전액 입금(10/21 재무 확정)",
    "락업 예치 후 새 지갑을 만든(자산복구) 유저 6명은 락업 신청 당시 지갑(이전 지갑)으로 지급",
    "송금 직후 볼트 재입금·일일 이자 재개 · 지연·실패 유저는 「지급 처리 중」 유지 + 지연 안내·CS 대응",
    "2차 Prime 미출시 확정, 당분간 Prime 상품 계획 없음 · 에어드롭 컨트랙트 최종 소유·키 관리 주체는 확인 필요"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "예정",
   "source": {
    "pageId": "4774243031",
    "title": "Prime 1차 락업 만기 대응",
    "version": 43,
    "section": "2. 전제 · 3. 만기 시나리오"
   },
   "related": [],
   "release": "Unifi v1.15.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "Prime",
    "락업",
    "만기",
    "에어드롭",
    "연 10%",
    "11/4",
    "자산복구"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "세부 미결",
    "question": "에어드롭 컨트랙트 최종 소유 · 키 관리 주체 확인."
   }
  },
  {
   "id": "prime-lockup-maturity-display",
   "area": "asset",
   "title": "Prime 락업 만기 화면 표기(내 자산·거래내역)",
   "summary": "지급 완료 시 내 자산의 「락업 자산」 행은 미노출되고 원금+이자가 USDT 잔고에 합산된다. 거래내역에는 원금+이자를 통합해 「입금·락업 만기 지급」 1건으로 기록하고 보낸 곳은 「Unifi(Prime)」으로 표기(컨트랙트 주소 비노출).",
   "details": [
    "송금 지연·실패 유저만 「연 10%(지급 준비중)」 표기 · 신청이력에 지급 준비 문구",
    "지급 완료 알림은 기존 입금 알림과 동일(앱 대응 없음)",
    "누적 이자에서 락업 이자 이력·정보 모두 제외(10/22 미팅)",
    "지급 완료 바텀시트(최초 1회) 「락업이 성공적으로 종료되었어요!」 → 거래내역 상세 이동 · 자산복구 유저는 「이전 지갑 자산 확인」 안내",
    "화면에 RWA·SuperEarn·Vault 용어 비노출, 날짜는 YYYY-MM-DD"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "예정",
   "source": {
    "pageId": "4774243031",
    "title": "Prime 1차 락업 만기 대응",
    "version": 43,
    "section": "4. Screen (초안)"
   },
   "related": [],
   "release": "Unifi v1.15.0",
   "changes": [
    "10/22: 거래내역 원금·이자 2건 분리 + 「락업」 필터 → 통합 1건 「입금·락업 만기 지급」"
   ],
   "conflicts": [],
   "keywords": [
    "락업 자산",
    "거래내역",
    "락업 만기 지급",
    "Unifi(Prime)",
    "지급 준비중"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "kaia-boost-end",
   "area": "asset",
   "title": "KAIA 부스트 종료",
   "summary": "KAIA 부스트 추가 이자는 2026-11-03 23:59:59(UTC+0)에 종료(추가 연장 없음 · 10/23 사업 결정). 11/4 09:00 KST부터 부스트(USDT 보상) 진입점을 모두 제거하고, 마지막 부스트 이자(11/3분)는 11/4 09:00~11:00 KST에 지급.",
   "details": [
    "KAIA 보상(SR/CR 미션)은 유지 — 부스트 통합 화면에서 [USDT 보상] 탭만 제거",
    "USDT 플러스 모드의 부스트 영역 → KAIA 보상(CR) 진입 영역으로 교체(미적용 「KAIA 위임하고 추가 보상 받기」 / 적용 중 「KAIA 보상 적용 중」)",
    "이미 받은 부스트 이자 기록은 거래내역·나의 이자 내역에 유지, 1회 이상 받은 유저만 누적 이자 영역 유지(이율 배지 미표기)",
    "화면은 새로고침·화면 이동·앱 복귀 시 반영 · 부스트 화면 직접 진입 시 KAIA 보상 화면(/reward/kaia)으로 이동",
    "11월 5일자부터 부스트 이자 자동 미지급"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "예정",
   "source": {
    "pageId": "4935962410",
    "title": "KAIA 부스트 종료 대응",
    "version": 19,
    "section": "2. 정책 > 2-1 · 2-2"
   },
   "related": [],
   "release": "Unifi v1.15.0",
   "changes": [
    "2026-10-23: 부스트 추가 연장 없이 11/3 종료로 결정"
   ],
   "conflicts": [],
   "keywords": [
    "KAIA 부스트",
    "종료",
    "USDT 보상",
    "11/4",
    "CR",
    "진입점 제거"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "usdt-interest-rates",
   "area": "asset",
   "title": "USDT 이율(기본·플러스·최대)",
   "summary": "USDT 기본(Basic) 연 3%, 플러스(Plus) 연 7%. 최대 이율은 플러스 + KAIA 부스트 최대 이율로, 부스트 종료에 따라 11/4부터 10%(7% + 3%) → 7%로 하향. PLUS 7%는 11월 30일까지 현행 유지.",
   "details": [
    "앱 화면은 내부 변수값 조정, FAQ·가이드(핵심만 쏙쏙)는 출시 당일 LandPress 수기 조정",
    "LINE OA 리치메뉴·메시지의 「최대 10%」 표기는 마케팅이 11/4에 7%로 정리",
    "PLUS 7%는 11월 30일 이후 재결정 예정(12월 개편안 별도 카드)"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "예정",
   "source": {
    "pageId": "4935962410",
    "title": "KAIA 부스트 종료 대응",
    "version": 19,
    "section": "2. 정책 > 2-3. 최대 이율 하향"
   },
   "related": [
    {
     "pageId": "4511346015",
     "title": "Plus 이율 정보 변경 대응",
     "version": 29,
     "section": "Background · Policy"
    }
   ],
   "release": "Unifi v1.15.0",
   "changes": [
    "2026-08-05: Plus 5% → 7%, 최대 이율 7% → 10%",
    "Plus 이율 정보 변경 대응(v29)의 적용 종료 10/4 → KAIA 부스트 종료 대응(v19): 부스트 11/3 종료 · PLUS 7% 11월 30일까지 유지",
    "2026-11-04: 최대 이율 10% → 7%"
   ],
   "conflicts": [],
   "keywords": [
    "USDT 이율",
    "기본 3%",
    "플러스 7%",
    "최대 이율",
    "10%",
    "7%"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "usdt-rate-december-revamp",
   "area": "asset",
   "title": "12월 USDT 이율 개편안(3·3·3)",
   "summary": "12월 이후 USDT 이율을 기본 3% + 플러스 3% + 부스트(재단 CR 약 2%, B안은 Unifi 1%p 추가) 구조로 최대 9%(A안 8%) 표기하는 개편안이 사업 검토 중이며 결정 전이다. 11월 중 회의체에서 결정 예정.",
   "details": [
    "플러스 7% → 6% 제안",
    "CR을 USDT 이율과 합쳐 「최대 9%」로 표기해도 되는지 리스크·법무·금융청 확인 필요",
    "11/4 대응 범위는 이 개편안과 무관하게 진행"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "확인 필요",
   "source": {
    "pageId": "4935962410",
    "title": "KAIA 부스트 종료 대응",
    "version": 19,
    "section": "7. 후속 검토 - 12월 USDT 이율 개편안 (결정 전)"
   },
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [
    {
     "pageId": "4935962410",
     "version": 19,
     "section": "7. 후속 검토",
     "says": "상태 : 사업 검토 중. 10/29 금융청 대응 회의 이후 11월 중 회의체에서 결정 예정"
    }
   ],
   "keywords": [
    "USDT 이율",
    "개편",
    "3·3·3",
    "최대 9%",
    "12월",
    "부스트"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "미정",
    "question": "12월 USDT 이율 개편안(A안 · B안)을 결정한다(11월 회의체)."
   }
  },
  {
   "id": "jpyc-interest-rate",
   "area": "asset",
   "title": "JPYC 이율",
   "summary": "JPYC 이율 프로모션(5%)이 9/1 09시에 종료되어 2%로 내려갔다. 화면의 JPYC 이자 영역은 기본(최소) 이자 2%, 최대 이자 2%로 안내하고 기간 한정 추가 이자는 표기하지 않는다.",
   "details": [
    "IP가 JP인 로그인 화면·회원가입 완료 바텀시트는 최대 2% 기준으로 표기",
    "오가닉 2% 이자 원천(Swap·BTCfi) 구조는 일부 가동·개발 중(JPYC 이자 제공 모델 현황, 9/18 기준)"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4631521595",
    "title": "JPYC 이율 프로모션 종료 대응",
    "version": 11,
    "section": "Screen > 화면노출 정책"
   },
   "related": [
    {
     "pageId": "4750172974",
     "title": "JPYC 이자 제공 모델 현황",
     "version": 8,
     "section": "C. JPYC 유통량"
    }
   ],
   "release": "Unifi v1.7.3",
   "changes": [
    "2026-09-01 09시: JPYC 이율 프로모션 5% → 2%"
   ],
   "conflicts": [],
   "keywords": [
    "JPYC 이율",
    "JPYC 이자",
    "2%",
    "5% 종료",
    "프로모션 종료"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "jpyc-redeem-duplicate-check",
   "area": "asset",
   "title": "JPYC 상환 중복 송금 재확인",
   "summary": "JPYC EX 상환 송금 시 최근 72시간 안에 같은 수량(같은 fromAddress·toAddress·chainId)의 송금 이력이 있으면 간편 비밀번호 입력 전에 재확인 팝업을 띄운다. 송금을 막지 않고 확인만 받는다(의도적 동일 금액 상환 허용).",
   "details": [
    "판정 시점: 송금 확인 화면 「보내기」 후, 상환 이어하기 진입도 동일",
    "팝업은 가장 최근 일치 건 1건의 출금 금액·일시 표시 · 「추가 출금 신청하기」로 진행한 건도 이력에 남아 다시 팝업",
    "이력 조회·저장 오류·이력 없음이면 판정 생략하고 일반 진행 · 실행 후 실패로 보인 건도 이력 유지",
    "상환 송금 완료 화면에 엔화 입금 지연 안내를 항상 노출",
    "송금 이력 저장 위치(로컬/서버)는 확인 필요로 남아 있음"
   ],
   "service": "Unifi",
   "fe": "UIT",
   "status": "최신",
   "source": {
    "pageId": "4915812919",
    "title": "JPYC 상환 중복방지 관련",
    "version": 18,
    "section": "Policy"
   },
   "related": [],
   "release": "Unifi v1.14.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "JPYC 상환",
    "중복 송금",
    "72시간",
    "재확인 팝업",
    "JPYC EX"
   ],
   "checkedAt": "2026-11-03",
   "review": {
    "kind": "세부 미결",
    "question": "JPYC 상환 중복 송금 이력 저장 위치(로컬/서버) 확인."
   }
  },
  {
   "id": "srcr-gas-sponsorship",
   "area": "asset",
   "title": "SR/CR 위임·해지·클레임 가스비 대납",
   "summary": "법무 검토 결과 SR/CR 위임·위임해제·클레임 시 가스비 대납에 법적 이슈가 없어, BE에서 피대납이 On이면 예상 수수료 정보를 노출하지 않는다. 피대납 On이면 KAIA 잔고가 부족해도 리워드 수령·위임해지·다시넣기에 제약이 없다.",
   "details": [
    "적용 화면: 리워드 수령(Claim) 팝업(일반 · KAIA Portal Group 묶임), 스테이킹 위임·위임해지 수수료 표기, 스테이킹 진행중 화면"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4694576099",
    "title": "SR/CR - 피대납 지원 스펙",
    "version": 3,
    "section": "Background · Screen"
   },
   "related": [],
   "release": "Unifi v1.8.0",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "가스비",
    "피대납",
    "대납",
    "SR",
    "CR",
    "KAIA 위임",
    "수수료"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "bridge-aml-warning",
   "area": "asset",
   "title": "브릿지 AML 경고 문구",
   "summary": "제재 대상 거래소·관할권에서 입금되면 자금이 차단되고 환불도 불가하므로, 브릿지 네트워크 선택 시와 환불 신청 시 모두 「당사 및 파트너사의 글로벌 컴플라이언스 및 위험관리 정책 등에 따라, 일부 가상자산 입금은 처리 또는 반환이 제한될 수 있습니다.」를 표기한다.",
   "details": [
    "환불 신청 완료 화면: 「환불은 평일 기준 최대 24시간 이내 처리됩니다.」",
    "rhino.fi 제공 제재 목록(UK·EU Sanction) 참고 · AML 차단 채널 자동 알림 연동은 진행 여부 검토 필요"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4723415272",
    "title": "브릿지 > AML 이슈 관련 경고문구 추가",
    "version": 11,
    "section": "Screen > 영향범위 (LIFF) · 그외 추가 변경"
   },
   "related": [],
   "release": "Unifi v1.8.0.1",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "브릿지",
    "AML",
    "rhino.fi",
    "제재",
    "환불 불가",
    "경고 문구"
   ],
   "checkedAt": "2026-11-03"
  },
  {
   "id": "wallet-mode",
   "area": "asset",
   "title": "Wallet Mode(예치 제외 모드)",
   "summary": "Aggregator 약관 미동의 사용자용 Unifi. Web 또는 LIFF 접근 + approve 미완료 + 접속 IP가 미국·영국·캐나다·싱가포르이면 예치를 제외한 Wallet Mode를 노출한다. 이율·이자 정보는 전면 제거하고 USDT 기준으로 구성.",
   "details": [
    "Home·Assets·My 3탭(Apps 제외), K-Pick·Reward 탭 미제공(Apps 이동 동선만)",
    "USDT 전송·결제·Swap은 approve 유저는 예치풀, 미approve 유저는 지갑(EOA) 잔고로 실행(2026-06-08)",
    "은행송금·교환 제공, SkyFlag 미제공",
    "미확정: 전용 약관 별도 제공 · 공지사항 별도 운영 · IP 기준만으로 제한하는 방안"
   ],
   "service": "Unifi",
   "fe": "",
   "status": "최신",
   "source": {
    "pageId": "4386238738",
    "title": "[Master] Wallet Mode",
    "version": 3,
    "section": "Summary > 버전 1 · 버전 2"
   },
   "related": [],
   "release": "",
   "changes": [],
   "conflicts": [],
   "keywords": [
    "Wallet Mode",
    "Aggregator",
    "approve",
    "미국",
    "싱가포르",
    "예치 제외"
   ],
   "checkedAt": "2026-11-03"
  }
 ],
 "releases": [
  {
   "v": "Unifi v1.16.0",
   "date": "2026-11-11",
   "status": "IN DEV",
   "note": "4964270779",
   "tasks": [
    [
     "UNIFY-12029",
     "신규 가입 동선 간소화 (지갑 생성 시점 변경)",
     "4743946291"
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.15.1",
   "date": "2026-11-09",
   "status": "IN DEV",
   "note": "4978650505",
   "tasks": [
    [
     "UNIFY-13084",
     "방한 일본인 여행 일정 등록 이벤트",
     "4942806551"
    ],
    [
     "UNIFY-13645",
     "Unifi mini 진입 링크의 친구추가 바텀시트 자동 노출 차단",
     ""
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.15.0",
   "date": "2026-11-03",
   "time": "15:00",
   "status": "IN DEV",
   "note": "4962746022",
   "tasks": [
    [
     "UNIFY-11832",
     "1차 Prime 락업 만기 해제",
     "4774243031"
    ],
    [
     "UNIFY-13195",
     "KAIA 부스트 종료 대응",
     "4935962410"
    ],
    [
     "UNIFY-13406",
     "웹 이벤트 페이지 헤더·친구추가 버튼 동선 변경",
     "4935973114"
    ],
    [
     "UNIFY-13551",
     "결제 페이지 상품권 유효기간 표시값 수정",
     ""
    ]
   ]
  },
  {
   "v": "Unifi mini v2.2.0.1",
   "date": "2026-11-02",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-13601",
     "GuideKim 결제 환불 시 100엔딜 쿠폰 되돌리기",
     ""
    ],
    [
     "UNIFY-13600",
     "지갑 없는 계정도 100엔딜 쿠폰 되돌리기",
     ""
    ],
    [
     "UNIFY-13599",
     "GuideKim 결제 환불 시 카드 제한 원장 풀기",
     ""
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi mini v2.2.0",
   "date": "2026-11-02",
   "time": "11:00",
   "status": "RELEASED",
   "note": "4939413772",
   "tasks": [
    [
     "UNIFY-10334",
     "Unifi Mini 광고 리워드 LY IAA 적용",
     "4733796517"
    ]
   ]
  },
  {
   "v": "Unifi v1.14.0.1",
   "date": "2026-10-30",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-13342",
     "바우처 폐기 및 재발행 기능",
     ""
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.14.0",
   "date": "2026-10-29",
   "time": "18:00",
   "status": "RELEASED",
   "note": "4939413768",
   "tasks": [
    [
     "UNIFY-12943",
     "JPYC 상환 중복 송금 재확인 팝업 추가",
     "4915812919"
    ],
    [
     "UNIFY-12239",
     "리워드 탭 사용성 개선",
     "4838291699"
    ],
    [
     "UNIFY-13222",
     "100엔딜 상품 환불 시 쿠폰 사용 취소 처리",
     ""
    ],
    [
     "UNIFY-13010",
     "회원 탈퇴 시 이메일 개인정보 파기",
     ""
    ],
    [
     "UNIFY-13223",
     "탈퇴 시 이메일 파기 설정 on/off — 기본 false로 배포",
     ""
    ]
   ]
  },
  {
   "v": "Unifi mini v2.1.0.5",
   "date": "2026-10-23",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-12885",
     "iOS X에서 링크 열 때 상단 빈 공간",
     ""
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.13.2",
   "date": "2026-10-23",
   "status": "RELEASED",
   "note": "4939407522",
   "tasks": [
    [
     "UNIFY-12817",
     "Sentbe 송금 일본 IP 제한",
     ""
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi mini v2.1.0.3",
   "date": "2026-10-21",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-12831",
     "가이드킴 클리닉 동기화 항목에서 환원율 제외",
     ""
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi mini v2.1.0.1",
   "date": "2026-10-21",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-12726",
     "클리닉 상품 리스트 환원 뱃지 설정",
     ""
    ],
    [
     "UNIFY-12728",
     "포인트 내역 페이지 Unifi mini 헤더 노출",
     ""
    ],
    [
     "UNIFY-12730",
     "Stripe 환불 웹훅 미수신 수정",
     ""
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi mini v2.1.0",
   "date": "2026-10-20",
   "status": "RELEASED",
   "note": "4818485233",
   "tasks": [
    [
     "UNIFY-11891",
     "My 내재화",
     "4802741598"
    ],
    [
     "UNIFY-11863",
     "포인트 시스템",
     "4802741598"
    ],
    [
     "UNIFY-11542",
     "상품권 직접 판매",
     "4822778759"
    ],
    [
     "UNIFY-11824",
     "JPYC 결제 일본인 한정 적용",
     "4808980947"
    ],
    [
     "UNIFY-11279",
     "100엔딜 상품 카드 어뷰징 방지 로직 개선",
     ""
    ],
    [
     "UNIFY-12690",
     "홈 카테고리 혜택률 뱃지 컬러·모션 변경",
     ""
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.13.0",
   "date": "2026-10-20",
   "time": "13:00",
   "status": "RELEASED",
   "note": "4902348095",
   "tasks": [
    [
     "UNIFY-12046",
     "JPYC - SR/CR 대응",
     ""
    ],
    [
     "UNIFY-12572",
     "OA 메시지 발송 언어 기준 변경",
     "4636898140"
    ]
   ]
  },
  {
   "v": "Unifi v1.12.0",
   "date": "2026-10-08",
   "status": "RELEASED",
   "note": "4845338270",
   "tasks": [
    [
     "UNIFY-11675",
     "SK플래닛 기프티콘 서버 이관 대응 점검 배너 및 구매 버튼 비활성화",
     "4770508162"
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.11.0",
   "date": "2026-10-06",
   "time": "15:00",
   "status": "RELEASED",
   "note": "4771793360",
   "tasks": [
    [
     "UNIFY-9898",
     "리워드 탭 디자인 개선",
     "4515188588"
    ],
    [
     "UNIFY-11687",
     "JPYC EX API 에러 응답 메시지 노출 방식 변경",
     ""
    ],
    [
     "UNIFY-11841",
     "부스트 페이지 가이드 혜택 안내 URL 변경",
     ""
    ]
   ]
  },
  {
   "v": "Unifi v1.9.2.4",
   "date": "2026-10-01",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-11839",
     "CU QR 코드로 진입 시 환영 토스트 추가",
     "4808994482"
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.10.0",
   "date": "2026-09-29",
   "time": "14:00",
   "status": "RELEASED",
   "note": "4771793359",
   "tasks": [
    [
     "UNIFY-11610",
     "CU 전용 1000엔 쿠폰 페이지 친구에게 공유하기 툴팁",
     ""
    ],
    [
     "UNIFY-11273",
     "거래내역 거래번호(transactionId) 노출",
     ""
    ]
   ]
  },
  {
   "v": "Unifi v1.9.2",
   "date": "2026-09-28",
   "status": "RELEASED",
   "note": "4795140939",
   "tasks": [
    [
     "UNIFY-11645",
     "딜페이지 트래킹 파라미터 최소화",
     ""
    ],
    [
     "UNIFY-11646",
     "OA 친구추가 동선 변경에 따른 데이터 수집 방식 변경",
     ""
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.9.1",
   "date": "2026-09-23",
   "status": "RELEASED",
   "note": "4771798754",
   "tasks": [
    [
     "UNIFY-11522",
     "B-3 결제 퍼널 조정 - OA 친구추가 단계를 결제 이후로 이동",
     "4770507579"
    ],
    [
     "UNIFY-11539",
     "유니파이 Mini·K-Pick 한국어 지원 제외",
     ""
    ],
    [
     "UNIFY-11562",
     "Unifi 바우처 구매 관련 Disclaimer 추가",
     "4770505327"
    ],
    [
     "UNIFY-11593",
     "딜페이지 품절 화면 대응",
     ""
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.9.0",
   "date": "2026-09-23",
   "time": "14:00",
   "status": "RELEASED",
   "note": "4771793358",
   "tasks": [
    [
     "UNIFY-11477",
     "Unifi Web/LIFF SkyFlag 오퍼월 추가 및 Mini 제거",
     "4756481387"
    ],
    [
     "UNIFY-11549",
     "탈퇴 후 동일 SNS 계정 재가입 시 이전 지갑 목록 노출 및 자산 가져오기",
     "4774240675"
    ],
    [
     "UNIFY-11536",
     "Mini 딜페이지 즐겨찾기 아이콘 및 안내 바텀시트",
     ""
    ],
    [
     "UNIFY-11486",
     "CU 오프라인 POP - CU 전용 딜 페이지",
     "4774235795"
    ]
   ]
  },
  {
   "v": "Unifi v1.8.0.2",
   "date": "2026-09-21",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-11508",
     "Unifi mini 전체 상품 JPYC 결제 임시 제거",
     ""
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.8.0.1",
   "date": "2026-09-21",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-11468",
     "바우처 상세 진입 경로별 헤더 분기",
     ""
    ],
    [
     "UNIFY-11444",
     "브릿지 AML 이슈 관련 경고문구 추가",
     "4723415272"
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.8.0",
   "date": "2026-09-17",
   "status": "RELEASED",
   "note": "4648602048",
   "tasks": [
    [
     "UNIFY-10857",
     "SR/CR 위임·위임해제 가스비 피대납 정책 재검토",
     "4694576099"
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi mini v2.0.0",
   "date": "2026-09-17",
   "status": "RELEASED",
   "note": "4648602048",
   "tasks": [
    [
     "UNIFY-10086",
     "Unifi mini 2.0.0 개편 - JP 실버위크 대응",
     "4704515582"
    ]
   ],
   "time": ""
  },
  {
   "v": "Unifi v1.7.10",
   "date": "2026-09-16",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-11289",
     "100엔딜 쿠폰 미사용 유저 리텐션 OA 배치 자동발송",
     "4725963532"
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.7.8",
   "date": "2026-09-11",
   "status": "RELEASED",
   "tasks": [
    [
     "UNIFY-11178",
     "OA 친구추가 1000엔 바우처 지급 및 100엔 딜 프로모션",
     "4725963532"
    ]
   ],
   "time": "",
   "note": ""
  },
  {
   "v": "Unifi v1.7.3",
   "date": "2026-09-01",
   "status": "RELEASED",
   "note": "4654275000",
   "tasks": [
    [
     "UNIFY-10146",
     "JPYC 추가 3% 이자 혜택 종료 및 유저 안내",
     ""
    ],
    [
     "UNIFY-9608",
     "CR 보상 클레임 기능 개발",
     ""
    ]
   ],
   "time": ""
  }
 ]
};
