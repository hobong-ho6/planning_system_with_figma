/**
 * Figma Prototype Data
 * md/prototype.md의 data.js 구조 준수
 *
 * ⚠️ 이 파일은 템플릿입니다. 실제 프로젝트 실행 시 Figma 데이터로 자동 생성됩니다.
 */

const APP_DATA = {
    // 시작 화면 ID (프로토타입의 첫 화면으로 자동 설정)
    startScreen: "51762:8511",

    // 화면 목록
    screens: {
        "51762:8511": {
            name: "Home",
            image: "assets/screens/51762-8511.png",
            width: 375,
            height: 812
        },
        "51762:8512": {
            name: "Detail",
            image: "assets/screens/51762-8512.png",
            width: 375,
            height: 1200
        }
        // ... 더 많은 화면
    },

    // 인터랙션 (프로토타입 플로우)
    interactions: [
        {
            sourceScreen: "51762:8511",
            trigger: "ON_CLICK",
            destination: "51762:8512",
            hotspot: { x: 20, y: 100, w: 335, h: 60 },
            label: "Go to Detail"
        }
        // ... 더 많은 인터랙션
    ],

    // 텍스트 노드 (XLT Key 포함)
    textNodes: {
        "51762:8511": [
            { text: "입금하기", xltKey: "KW_home_deposit", x: 258, y: 55, w: 45, h: 14 },
            { text: "보유 USDT", xltKey: "KW_home_balance_title", x: 22, y: 22, w: 208, h: 17 },
            { text: "0x3f4E...8Fe4", x: 44, y: 630, w: 91, h: 17 }  // xltKey 없음 = 번역 불필요
        ],
        "51762:8512": [
            // ... 화면별 텍스트 노드
        ]
    },

    // Variant Swap (체크박스, 토글 등)
    variantSwaps: [
        {
            screenId: "51762:8511",
            trigger: "ON_CLICK",
            hotspot: { x: 24, y: 145, w: 16, h: 16 },
            label: "체크박스",
            states: [
                { id: "checked", image: "assets/variants/checkbox-checked.png", w: 16, h: 16 },
                { id: "unchecked", image: "assets/variants/checkbox-unchecked.png", w: 16, h: 16 }
            ],
            defaultState: "checked"
        }
        // ... 더 많은 variant
    ],

    // 코멘트 (항상 포함). replies: 스레드 답글(시간순) — 위키는 message만, 프로토타입은 전체 표시
    comments: [
        {
            id: "comment_1",
            screenId: "51762:8511",
            author: "디자이너",
            date: "2026-06-10",
            message: "이 버튼 크기 확인 부탁드립니다",
            offset: { x: 50, y: 120 },
            resolved: false,
            replies: [
                { author: "개발자", date: "2026-06-11", message: "44px로 맞추겠습니다" }
            ]
        }
        // ... 더 많은 코멘트
    ]
};
