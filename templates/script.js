/**
 * Figma Prototype Viewer - Main Script
 * md/prototype.md의 script.js ↔ data.js 인터페이스 계약 준수
 */

// State
const state = {
    currentScreen: APP_DATA.startScreen,  // data.js에서 시작 화면 ID 가져오기
    history: [],
    currentLanguage: 'ko_KR',
    showComments: false,
    showXltKeys: false,
    debugHotspots: false,
    variantStates: {}  // { variantId: currentStateIndex }
};

// DOM Elements
const screenContainer = document.getElementById('screen-container');
const deviceFrame = document.getElementById('device-frame');
const hotspotsOverlay = document.getElementById('hotspots-overlay');
const xltOverlay = document.getElementById('xlt-overlay');
const translationOverlay = document.getElementById('translation-overlay');
const commentsOverlay = document.getElementById('comments-overlay');
const variantsOverlay = document.getElementById('variants-overlay');
const screenInfo = document.getElementById('screen-info');

// Buttons
document.getElementById('btn-back').addEventListener('click', goBack);
document.getElementById('btn-comment').addEventListener('click', toggleComments);
document.getElementById('btn-xlt').addEventListener('click', toggleXltKeys);
document.getElementById('btn-hotspot').addEventListener('click', toggleDebugHotspots);
document.getElementById('language-select').addEventListener('change', changeLanguage);
document.getElementById('close-comment').addEventListener('click', closeCommentPopover);

// Initialize
init();

function init() {
    navigateTo(state.currentScreen);
}

function navigateTo(screenId) {
    const screen = APP_DATA.screens[screenId];
    if (!screen) {
        console.error(`Screen not found: ${screenId}`);
        return;
    }

    // Add to history (except if going back)
    if (state.currentScreen !== screenId) {
        state.history.push(state.currentScreen);
    }
    state.currentScreen = screenId;

    // Render screen
    renderScreen(screen);
    renderHotspots(screenId);
    renderVariants(screenId);

    // Update overlays
    if (state.showXltKeys) {
        renderXltKeys(screenId);
    }
    if (state.currentLanguage !== 'ko_KR') {
        renderTranslations(screenId);
    }
    if (state.showComments) {
        renderComments(screenId);
    }

    // Update info
    document.getElementById('current-screen-name').textContent = screen.name;

    // Adjust frame size
    deviceFrame.style.width = screen.width + 'px';
    deviceFrame.style.height = screen.height + 'px';
}

function renderScreen(screen) {
    screenContainer.innerHTML = `<img src="${screen.image}" alt="${screen.name}">`;
}

function renderHotspots(screenId) {
    hotspotsOverlay.innerHTML = '';

    const interactions = APP_DATA.interactions.filter(i => i.sourceScreen === screenId);

    interactions.forEach(interaction => {
        const hotspot = document.createElement('div');
        hotspot.className = 'hotspot';
        if (state.debugHotspots) {
            hotspot.classList.add('debug-visible');
        }

        const hs = interaction.hotspot;
        hotspot.style.left = hs.x + 'px';
        hotspot.style.top = hs.y + 'px';
        hotspot.style.width = hs.w + 'px';
        hotspot.style.height = hs.h + 'px';

        hotspot.addEventListener('click', () => {
            navigateTo(interaction.destination);
        });

        hotspot.title = interaction.label || `Go to ${APP_DATA.screens[interaction.destination]?.name}`;

        hotspotsOverlay.appendChild(hotspot);
    });
}

function renderXltKeys(screenId) {
    xltOverlay.innerHTML = '';
    xltOverlay.style.display = 'block';

    const textNodes = APP_DATA.textNodes?.[screenId] || [];

    textNodes.forEach(node => {
        if (!node.xltKey) return;  // XLT Key가 없는 노드는 건너뜀

        const el = document.createElement('div');
        el.className = 'xlt-item';
        el.textContent = node.xltKey;
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';
        el.style.width = node.w + 'px';
        el.style.minHeight = node.h + 'px';

        xltOverlay.appendChild(el);
    });
}

function renderTranslations(screenId) {
    translationOverlay.innerHTML = '';

    if (state.currentLanguage === 'ko_KR') {
        translationOverlay.style.display = 'none';
        return;
    }

    translationOverlay.style.display = 'block';

    const textNodes = APP_DATA.textNodes?.[screenId] || [];

    textNodes.forEach(node => {
        if (!node.text || !node.xltKey) return;

        const translated = I18N?.[state.currentLanguage]?.[node.text];
        if (!translated) return;

        const el = document.createElement('div');
        el.className = 'translation-item';
        el.textContent = translated;
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';
        el.style.maxWidth = node.w + 'px';

        translationOverlay.appendChild(el);
    });
}

function renderComments(screenId) {
    commentsOverlay.innerHTML = '';
    commentsOverlay.style.display = 'block';

    const comments = APP_DATA.comments?.filter(c => c.screenId === screenId) || [];

    comments.forEach(comment => {
        const pin = document.createElement('div');
        pin.className = 'comment-pin';
        pin.textContent = '💬';
        pin.style.left = comment.offset.x + 'px';
        pin.style.top = comment.offset.y + 'px';

        pin.addEventListener('click', (e) => {
            showCommentPopover(comment, e.clientX, e.clientY);
        });

        commentsOverlay.appendChild(pin);
    });
}

function renderVariants(screenId) {
    variantsOverlay.innerHTML = '';

    const variants = APP_DATA.variantSwaps?.filter(v => v.screenId === screenId) || [];

    variants.forEach((variant, idx) => {
        const variantId = `${screenId}_variant_${idx}`;

        // Initialize state
        if (!(variantId in state.variantStates)) {
            state.variantStates[variantId] = variant.states.findIndex(s => s.id === variant.defaultState);
            if (state.variantStates[variantId] === -1) {
                state.variantStates[variantId] = 0;
            }
        }

        const currentStateIdx = state.variantStates[variantId];
        const currentState = variant.states[currentStateIdx];

        const el = document.createElement('div');
        el.className = 'variant-item';
        el.style.left = variant.hotspot.x + 'px';
        el.style.top = variant.hotspot.y + 'px';
        el.style.width = variant.hotspot.w + 'px';
        el.style.height = variant.hotspot.h + 'px';

        el.innerHTML = `<img src="${currentState.image}" alt="${currentState.id}">`;

        el.addEventListener('click', () => {
            // Cycle to next state
            state.variantStates[variantId] = (currentStateIdx + 1) % variant.states.length;
            renderVariants(screenId);  // Re-render
        });

        variantsOverlay.appendChild(el);
    });
}

function showCommentPopover(comment, x, y) {
    const popover = document.getElementById('comment-popover');
    document.getElementById('comment-author').textContent = comment.author;
    document.getElementById('comment-date').textContent = new Date(comment.date).toLocaleDateString('ko-KR');
    document.getElementById('comment-message').textContent = comment.message;

    popover.style.display = 'block';
    popover.style.left = Math.min(x, window.innerWidth - 320) + 'px';
    popover.style.top = Math.min(y, window.innerHeight - 200) + 'px';
}

function closeCommentPopover() {
    document.getElementById('comment-popover').style.display = 'none';
}

function goBack() {
    if (state.history.length === 0) return;

    const prevScreen = state.history.pop();
    state.currentScreen = prevScreen;
    navigateTo(prevScreen);
}

function toggleComments() {
    state.showComments = !state.showComments;
    document.getElementById('btn-comment').classList.toggle('active', state.showComments);

    if (state.showComments) {
        renderComments(state.currentScreen);
    } else {
        commentsOverlay.style.display = 'none';
        closeCommentPopover();
    }
}

function toggleXltKeys() {
    state.showXltKeys = !state.showXltKeys;
    document.getElementById('btn-xlt').classList.toggle('active', state.showXltKeys);

    if (state.showXltKeys) {
        renderXltKeys(state.currentScreen);
    } else {
        xltOverlay.style.display = 'none';
    }
}

function toggleDebugHotspots() {
    state.debugHotspots = !state.debugHotspots;
    document.getElementById('btn-hotspot').classList.toggle('active', state.debugHotspots);
    hotspotsOverlay.classList.toggle('debug', state.debugHotspots);
    renderHotspots(state.currentScreen);
}

function changeLanguage(e) {
    state.currentLanguage = e.target.value;

    if (state.currentLanguage === 'ko_KR') {
        translationOverlay.style.display = 'none';
    } else {
        renderTranslations(state.currentScreen);
    }
}
