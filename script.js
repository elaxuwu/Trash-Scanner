const dom = {
    videoCanvas: document.getElementById('videoCanvas'),
    scanBtn: document.getElementById('scanBtn'),
    scanActionSection: document.getElementById('scanActionSection'),
    flashOverlay: document.getElementById('flashOverlay'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingModeText: document.getElementById('loadingModeText'),
    cameraFallback: document.getElementById('cameraFallback'),
    fileInput: document.getElementById('fileInput'),
    cameraSection: document.getElementById('cameraSection'),
    previewModal: document.getElementById('previewModal'),
    previewImage: document.getElementById('previewImage'),
    closePreviewBtn: document.getElementById('closePreviewBtn'),
    retakeBtn: document.getElementById('retakeBtn'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    cancelSettingsBtn: document.getElementById('cancelSettingsBtn'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    providerSelect: document.getElementById('providerSelect'),
    modelSelect: document.getElementById('modelSelect'),
    modelInput: document.getElementById('modelInput'),
    modelHint: document.getElementById('modelHint'),
    apiKeyLabel: document.getElementById('apiKeyLabel'),
    apiKeyHelp: document.getElementById('apiKeyHelp'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    toggleApiKeyBtn: document.getElementById('toggleApiKeyBtn'),
    apiKeyStatus: document.getElementById('apiKeyStatus'),
    resultsModal: document.getElementById('resultsModal'),
    closeResultsBtn: document.getElementById('closeResultsBtn'),
    resultImage: document.getElementById('resultImage'),
    resultItemName: document.getElementById('resultItemName'),
    resultTimestamp: document.getElementById('resultTimestamp'),
    resultSummaryCard: document.getElementById('resultSummaryCard'),
    resultSummaryText: document.getElementById('resultSummaryText'),
    statusCard: document.getElementById('statusCard'),
    statusIcon: document.getElementById('statusIcon'),
    statusMessage: document.getElementById('statusMessage'),
    disposalPlanSection: document.getElementById('disposalPlanSection'),
    disposalPlanItemName: document.getElementById('disposalPlanItemName'),
    disposalPlanGrid: document.getElementById('disposalPlanGrid'),
    disposalPlanSteps: document.getElementById('disposalPlanSteps'),
    detectedObjectsSection: document.getElementById('detectedObjectsSection'),
    detectedObjectsList: document.getElementById('detectedObjectsList'),
    compositionBars: document.getElementById('compositionBars'),
    actionSteps: document.getElementById('actionSteps'),
    ecoScoreValue: document.getElementById('ecoScoreValue'),
    carbonSavedValue: document.getElementById('carbonSavedValue'),
    saveHistoryContainer: document.getElementById('saveHistoryContainer'),
    saveToHistoryBtn: document.getElementById('saveToHistoryBtn'),
    userLevelBadge: document.getElementById('userLevelBadge'),
    levelIcon: document.getElementById('levelIcon'),
    levelText: document.getElementById('levelText'),
    langToggleBtn: document.getElementById('langToggleBtn'),
    statsChartCanvas: document.getElementById('statsChart'),
    totalRecycledCount: document.getElementById('totalRecycledCount'),
    impactStatsGrid: document.getElementById('impactStatsGrid'),
    impactSummaryText: document.getElementById('impactSummaryText'),
    categoryBreakdownList: document.getElementById('categoryBreakdownList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    gridOverlay: document.getElementById('gridOverlay'),
    objectFocusBox: document.getElementById('objectFocusBox'),
    scanModeOptions: document.getElementById('scanModeOptions'),
    achievementList: document.getElementById('achievementList'),
    achievementBanner: document.getElementById('achievementBanner'),
    startQuizBtn: document.getElementById('startQuizBtn'),
    quizIntroText: document.getElementById('quizIntroText'),
    quizStatsInline: document.getElementById('quizStatsInline'),
    quizModal: document.getElementById('quizModal'),
    closeQuizBtn: document.getElementById('closeQuizBtn'),
    quizModalTitle: document.getElementById('quizModalTitle'),
    quizProgressText: document.getElementById('quizProgressText'),
    quizEmptyState: document.getElementById('quizEmptyState'),
    quizQuestionCard: document.getElementById('quizQuestionCard'),
    quizTypeBadge: document.getElementById('quizTypeBadge'),
    quizSourceBadge: document.getElementById('quizSourceBadge'),
    quizQuestionText: document.getElementById('quizQuestionText'),
    quizOptionsList: document.getElementById('quizOptionsList'),
    quizFeedback: document.getElementById('quizFeedback'),
    quizScoreText: document.getElementById('quizScoreText'),
    nextQuizBtn: document.getElementById('nextQuizBtn'),
    quizSummaryCard: document.getElementById('quizSummaryCard'),
    demoModeSwitch: document.getElementById('demoModeSwitch'),
    demoSelectorPanel: document.getElementById('demoSelectorPanel'),
    demoScenarioSelect: document.getElementById('demoScenarioSelect'),
    resultsDemoBadge: document.getElementById('resultsDemoBadge')
};

const STORAGE_KEYS = {
    apiKey: 'openai_api_key',
    provider: 'ai_provider',
    providerKeys: 'ai_provider_api_keys',
    providerModels: 'ai_provider_models',
    providerRecommendedModels: 'ai_provider_recommended_models',
    providerCustomModels: 'ai_provider_custom_models',
    history: 'recycle_history',
    selectedMode: 'recycle_selected_mode',
    achievements: 'recycle_achievements',
    quizStats: 'eco_quiz_stats',
    demoMode: 'recycle_demo_mode'
};

const MAX_HISTORY_ITEMS = 12;
const MAX_IMAGE_DIMENSION = 1280;
const HISTORY_IMAGE_DIMENSION = 420;

const co2EstimatesKg = {
    plastic: 0.08,
    metal: 0.20,
    paper: 0.05,
    glass: 0.10,
    special: 0.15,
    other: 0.03
};

const scanModes = {
    quick: {
        label: 'Quick Scan',
        loading: 'Fast recyclable / not recyclable check',
        instruction: 'Return a concise result with one or more detected waste items.'
    },
    detailed: {
        label: 'Detailed Scan',
        loading: 'Analyzing materials and preparation steps',
        instruction: 'Include material components, preparation steps, confidence, and disposal action.'
    },
    batch: {
        label: 'Batch Scan',
        loading: 'Finding multiple objects across the 4x4 grid',
        instruction: 'Prioritize detecting every visible waste item. Use scanType batch when more than one object is present and assign each object a 4x4 gridCell from 1 to 16.'
    },
    education: {
        label: 'Education Mode',
        loading: 'Explaining recycling decisions',
        instruction: 'Explain why each item is recyclable, non-recyclable, partial, or special handling.'
    },
    carbon: {
        label: 'Carbon Impact Mode',
        loading: 'Estimating environmental impact',
        instruction: 'Estimate potential CO2 saved in grams and include practical impact guidance.'
    }
};

const aiProviders = {
    openai: {
        label: 'OpenAI',
        defaultModel: 'gpt-4o-mini',
        recommendedModels: ['gpt-4o-mini', 'gpt-4.1-mini'],
        keyPlaceholder: 'sk-...',
        modelHint: 'Recommended OpenAI options here are vision-capable models.',
        keyHelpText: 'Get your API key from OpenAI Platform.',
        keyHelpUrl: 'https://platform.openai.com/api-keys'
    },
    openrouter: {
        label: 'OpenRouter',
        defaultModel: 'openai/gpt-4o-mini',
        recommendedModels: ['openai/gpt-4o-mini', 'google/gemini-2.0-flash-001'],
        keyPlaceholder: 'sk-or-...',
        modelHint: 'Recommended OpenRouter options here are vision-capable models.',
        keyHelpText: 'Get your API key from OpenRouter.',
        keyHelpUrl: 'https://openrouter.ai/keys'
    },
    gemini: {
        label: 'Gemini',
        defaultModel: 'gemini-1.5-flash',
        recommendedModels: ['gemini-1.5-flash'],
        keyPlaceholder: 'AI...',
        modelHint: 'Recommended Gemini options here are vision-capable models.',
        keyHelpText: 'Get your API key from Google AI Studio.',
        keyHelpUrl: 'https://aistudio.google.com/app/apikey'
    }
};

const achievements = [
    {
        id: 'eco_starter',
        title: 'Eco Starter',
        description: 'Reach 50 eco points',
        unlocked: metrics => metrics.totalEcoScore >= 50
    },
    {
        id: 'recycling_hero',
        title: 'Recycling Hero',
        description: 'Reach 200 eco points',
        unlocked: metrics => metrics.totalEcoScore >= 200
    },
    {
        id: 'plastic_hunter',
        title: 'Plastic Hunter',
        description: 'Scan 10 plastic items',
        unlocked: metrics => metrics.plasticCount >= 10
    },
    {
        id: 'battery_guardian',
        title: 'Battery Guardian',
        description: 'Detect 3 batteries',
        unlocked: metrics => metrics.batteryCount >= 3
    },
    {
        id: 'batch_master',
        title: 'Batch Master',
        description: 'Complete 5 batch scans',
        unlocked: metrics => metrics.batchScans >= 5
    },
    {
        id: 'eco_learner',
        title: 'Eco Learner',
        description: 'Complete 1 quiz',
        unlocked: metrics => metrics.quizStats.quizzesCompleted >= 1
    },
    {
        id: 'sorting_student',
        title: 'Sorting Student',
        description: 'Answer 10 quiz questions correctly',
        unlocked: metrics => metrics.quizStats.correctAnswers >= 10
    },
    {
        id: 'perfect_sorter',
        title: 'Perfect Sorter',
        description: 'Get 5/5 in one quiz',
        unlocked: metrics => metrics.quizStats.perfectQuizzes >= 1
    },
    {
        id: 'waste_wisdom',
        title: 'Waste Wisdom',
        description: 'Reach 50 quiz XP',
        unlocked: metrics => metrics.quizStats.quizXp >= 50
    }
];

const translations = {
    en: {
        noScans: 'No recent scans yet.',
        recyclable: 'Recyclable',
        nonRecyclable: 'Non-Recyclable',
        partial: 'Partial',
        special: 'Special Handling',
        unclear: 'Unclear Image',
        sprout: 'Sprout',
        warrior: 'Eco Warrior',
        master: 'Recycle Master',
        next: 'Next:',
        xp: 'XP',
        demoModeOn: 'Offline Mode On',
        demoModeOff: 'Offline Mode Off'
    },
    vi: {
        noScans: 'Chua co lan quet nao gan day.',
        recyclable: 'Co the tai che',
        nonRecyclable: 'Khong the tai che',
        partial: 'Tai che mot phan',
        special: 'Xu ly dac biet',
        unclear: 'Anh chua ro',
        sprout: 'Mam Non',
        warrior: 'Chien Binh Xanh',
        master: 'Bac Thay Tai Che',
        next: 'Ke tiep:',
        xp: 'XP',
        demoModeOn: 'Demo Ngoại tuyến Bật',
        demoModeOff: 'Demo Ngoại tuyến Tắt'
    }
};

let stream = null;
let video = null;
let canvasContext = null;
let animationFrameId = null;
let capturedImageData = null;
let capturedHistoryImageData = null;
let lastAnalysisResult = null;
let currentLanguage = 'en';
let selectedScanMode = localStorage.getItem(STORAGE_KEYS.selectedMode) || 'quick';
let selectedProvider = localStorage.getItem(STORAGE_KEYS.provider) || 'openai';
let statsChartInstance = null;
let currentQuiz = null;

function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

function createElement(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    if (options.className) node.className = options.className;
    if (options.text !== undefined) node.textContent = String(options.text);
    if (options.title) node.title = options.title;
    if (options.type) node.type = options.type;
    if (options.src) node.src = options.src;
    if (options.alt) node.alt = options.alt;
    if (options.dataset) {
        Object.entries(options.dataset).forEach(([key, value]) => {
            node.dataset[key] = value;
        });
    }
    children.forEach(child => node.appendChild(child));
    return node;
}

function icon(className) {
    return createElement('i', { className });
}

function clampNumber(value, min, max, fallback = min) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(Math.max(number, min), max);
}

function safeString(value, fallback = '') {
    if (typeof value !== 'string') return fallback;
    return value.trim().slice(0, 500);
}

function asArray(value) {
    return Array.isArray(value) ? value : [];
}

function getStatusLabel(status) {
    const normalized = typeof status === 'string' ? status.toLowerCase() : status;
    if (normalized === true || normalized === 'true' || normalized === 'recyclable') return t('recyclable');
    if (normalized === 'partial') return t('partial');
    if (normalized === 'special' || normalized === 'special handling') return t('special');
    return t('nonRecyclable');
}

function getStatusKind(status) {
    const normalized = typeof status === 'string' ? status.toLowerCase() : status;
    if (normalized === true || normalized === 'true' || normalized === 'recyclable') return 'recyclable';
    if (normalized === 'partial') return 'partial';
    if (normalized === 'special' || normalized === 'special handling') return 'special';
    return 'nonRecyclable';
}

function getStatusClasses(status) {
    const kind = getStatusKind(status);
    if (kind === 'recyclable') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (kind === 'partial') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (kind === 'special') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-orange-100 text-orange-700 border-orange-200';
}

function getHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.history);
        const parsed = data ? JSON.parse(data) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        localStorage.removeItem(STORAGE_KEYS.history);
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)));
}

function getUnlockedAchievementIds() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.achievements);
        const parsed = data ? JSON.parse(data) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveUnlockedAchievementIds(ids) {
    localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(ids));
}

function getQuizStats() {
    const defaults = {
        quizXp: 0,
        quizzesCompleted: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        perfectQuizzes: 0,
        completedQuizIds: [],
        completedQuestionIds: []
    };

    try {
        const data = localStorage.getItem(STORAGE_KEYS.quizStats);
        const parsed = data ? JSON.parse(data) : {};
        return {
            quizXp: clampNumber(parsed.quizXp, 0, 100000, defaults.quizXp),
            quizzesCompleted: clampNumber(parsed.quizzesCompleted, 0, 100000, defaults.quizzesCompleted),
            correctAnswers: clampNumber(parsed.correctAnswers, 0, 100000, defaults.correctAnswers),
            incorrectAnswers: clampNumber(parsed.incorrectAnswers, 0, 100000, defaults.incorrectAnswers),
            perfectQuizzes: clampNumber(parsed.perfectQuizzes, 0, 100000, defaults.perfectQuizzes),
            completedQuizIds: asArray(parsed.completedQuizIds).map(id => safeString(id)).filter(Boolean).slice(-50),
            completedQuestionIds: asArray(parsed.completedQuestionIds).map(id => safeString(id)).filter(Boolean).slice(-250)
        };
    } catch {
        return defaults;
    }
}

function saveQuizStats(stats) {
    localStorage.setItem(STORAGE_KEYS.quizStats, JSON.stringify({
        quizXp: clampNumber(stats.quizXp, 0, 100000, 0),
        quizzesCompleted: clampNumber(stats.quizzesCompleted, 0, 100000, 0),
        correctAnswers: clampNumber(stats.correctAnswers, 0, 100000, 0),
        incorrectAnswers: clampNumber(stats.incorrectAnswers, 0, 100000, 0),
        perfectQuizzes: clampNumber(stats.perfectQuizzes, 0, 100000, 0),
        completedQuizIds: asArray(stats.completedQuizIds).slice(-50),
        completedQuestionIds: asArray(stats.completedQuestionIds).slice(-250)
    }));
}

function readJsonMap(key) {
    try {
        const data = localStorage.getItem(key);
        const parsed = data ? JSON.parse(data) : {};
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

function saveJsonMap(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getProviderConfig(provider = selectedProvider) {
    const normalizedProvider = aiProviders[provider] ? provider : 'openai';
    const keys = readJsonMap(STORAGE_KEYS.providerKeys);
    const models = readJsonMap(STORAGE_KEYS.providerModels);
    const recommendedModels = readJsonMap(STORAGE_KEYS.providerRecommendedModels);
    const customModels = readJsonMap(STORAGE_KEYS.providerCustomModels);
    const legacyOpenAiKey = localStorage.getItem(STORAGE_KEYS.apiKey) || '';
    const selectedRecommendedModel = recommendedModels[normalizedProvider] || models[normalizedProvider] || aiProviders[normalizedProvider].defaultModel;
    const customModel = safeString(customModels[normalizedProvider] || '');

    return {
        provider: normalizedProvider,
        apiKey: keys[normalizedProvider] || (normalizedProvider === 'openai' ? legacyOpenAiKey : ''),
        selectedModel: selectedRecommendedModel,
        customModel,
        model: customModel || selectedRecommendedModel
    };
}

function saveProviderConfig({ provider, apiKey, selectedModel, customModel }) {
    const normalizedProvider = aiProviders[provider] ? provider : 'openai';
    const keys = readJsonMap(STORAGE_KEYS.providerKeys);
    const models = readJsonMap(STORAGE_KEYS.providerModels);
    const recommendedModels = readJsonMap(STORAGE_KEYS.providerRecommendedModels);
    const customModels = readJsonMap(STORAGE_KEYS.providerCustomModels);
    const recommendedModel = selectedModel || aiProviders[normalizedProvider].defaultModel;
    const custom = safeString(customModel || '');

    keys[normalizedProvider] = apiKey;
    models[normalizedProvider] = custom || recommendedModel;
    recommendedModels[normalizedProvider] = recommendedModel;
    customModels[normalizedProvider] = custom;
    selectedProvider = normalizedProvider;

    localStorage.setItem(STORAGE_KEYS.provider, normalizedProvider);
    saveJsonMap(STORAGE_KEYS.providerKeys, keys);
    saveJsonMap(STORAGE_KEYS.providerModels, models);
    saveJsonMap(STORAGE_KEYS.providerRecommendedModels, recommendedModels);
    saveJsonMap(STORAGE_KEYS.providerCustomModels, customModels);

    if (normalizedProvider === 'openai') {
        localStorage.setItem(STORAGE_KEYS.apiKey, apiKey);
    }
}

function stripDataUrlPrefix(imageBase64) {
    return imageBase64.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
}

function normalizeGeminiModelName(model) {
    return String(model || aiProviders.gemini.defaultModel).replace(/^models\//, '');
}

function extractJsonObject(text) {
    if (typeof text !== 'string' || !text.trim()) {
        throw new Error('The provider returned an empty response.');
    }

    try {
        return JSON.parse(text);
    } catch {
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
            throw new Error('The provider did not return valid JSON.');
        }
        return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    }
}

function normalizeComponent(component) {
    return {
        part: safeString(component.part || component.material || 'Material'),
        material: safeString(component.material || component.part || 'Unknown material'),
        recyclable: component.recyclable === true || component.recyclable === 'true' || component.recyclable === 'partial' || component.recyclable === 'special' || component.recyclable === 'special handling' ? component.recyclable : false,
        instruction: safeString(component.instruction || component.disposalAction || 'Check local recycling rules.')
    };
}

function normalizeDisposalPlan(rawPlan, fallback = {}) {
    const plan = rawPlan && typeof rawPlan === 'object' ? rawPlan : {};
    const fallbackSteps = asArray(fallback.steps).map(step => safeString(step)).filter(Boolean);
    const steps = asArray(plan.steps)
        .map(step => safeString(step))
        .filter(Boolean)
        .slice(0, 8);

    return {
        immediateAction: safeString(plan.immediateAction || fallback.immediateAction || 'Check the item condition and follow local disposal rules.'),
        steps: (steps.length > 0 ? steps : fallbackSteps).slice(0, 8),
        handlingType: safeString(plan.handlingType || fallback.handlingType || 'Check local rules'),
        safetyWarning: safeString(plan.safetyWarning || fallback.safetyWarning || 'No special safety warning identified.'),
        mistakeToAvoid: safeString(plan.mistakeToAvoid || fallback.mistakeToAvoid || 'Do not guess if local recycling rules are unclear.')
    };
}

function getFallbackDisposalPlan(rawObject, recyclable, components, preparationSteps) {
    const kind = getStatusKind(recyclable);
    const hasSpecialComponent = components.some(component => getStatusKind(component.recyclable) === 'special' || /battery|e-waste|sharp|hazard/i.test(`${component.part} ${component.material}`));
    const handlingType = hasSpecialComponent
        ? 'Special handling'
        : kind === 'recyclable'
            ? 'Recycling bin'
            : kind === 'partial'
                ? 'Separate parts before disposal'
                : 'General waste or local drop-off';
    const immediateAction = rawObject.disposalAction || rawObject.status_message || (kind === 'recyclable'
        ? 'Empty, clean, and place the item in the appropriate recycling stream.'
        : kind === 'partial'
            ? 'Separate recyclable parts from non-recyclable parts before disposal.'
            : 'Keep this out of standard recycling unless local rules say otherwise.');

    return {
        immediateAction,
        steps: preparationSteps.length > 0 ? preparationSteps : [immediateAction],
        handlingType,
        safetyWarning: hasSpecialComponent ? 'Handle carefully and use a dedicated collection point if available.' : '',
        mistakeToAvoid: kind === 'recyclable' ? 'Do not recycle it while dirty or full.' : 'Do not place it in recycling just because part of it looks recyclable.'
    };
}

function normalizeObject(rawObject, index) {
    const recyclable = rawObject.recyclable ?? rawObject.is_recyclable ?? false;
    const components = asArray(rawObject.components || rawObject.composition).map(normalizeComponent);
    const fallbackSteps = rawObject.disposalAction ? [rawObject.disposalAction] : [];
    const preparationSteps = asArray(rawObject.preparationSteps || rawObject.action_steps).map(step => safeString(step)).filter(Boolean).slice(0, 8).concat(fallbackSteps).slice(0, 8);
    const disposalAction = safeString(rawObject.disposalAction || rawObject.status_message || 'Check local disposal rules.');
    const disposalPlan = normalizeDisposalPlan(
        rawObject.disposalPlan,
        getFallbackDisposalPlan({ ...rawObject, disposalAction }, recyclable, components, preparationSteps)
    );

    return {
        id: clampNumber(rawObject.id, 1, 99, index + 1),
        name: safeString(rawObject.name || rawObject.scanned_item || rawObject.mainItem || 'Unknown item'),
        category: safeString(rawObject.category || 'Unknown'),
        gridCell: rawObject.gridCell ? clampNumber(rawObject.gridCell, 1, 16, null) : null,
        recyclable,
        confidence: clampNumber(rawObject.confidence, 0, 1, 0.7),
        ecoScore: clampNumber(rawObject.ecoScore ?? rawObject.eco_score, 0, 100, 0),
        disposalAction,
        disposalPlan,
        components,
        preparationSteps,
        education: safeString(rawObject.education || rawObject.explanation || ''),
        carbonSavedGrams: clampNumber(rawObject.carbonSavedGrams ?? rawObject.carbon_saved_grams, 0, 5000, 0)
    };
}

function normalizeResult(rawResult) {
    if (!rawResult || typeof rawResult !== 'object') {
        return {
            scanType: 'unclear',
            message: 'The AI response was empty. Please try again with better lighting.',
            confidence: 0.2,
            objects: [],
            totalEcoScore: 0
        };
    }

    if (rawResult.scanType === 'unclear') {
        return {
            scanType: 'unclear',
            message: safeString(rawResult.message, 'The image is unclear. Please retake the photo with better lighting and place the object in the center.'),
            confidence: clampNumber(rawResult.confidence, 0, 1, 0.3),
            objects: [],
            totalEcoScore: 0
        };
    }

    const rawObjects = asArray(rawResult.objects);
    const inferredBatch = rawObjects.length > 1 || rawResult.scanType === 'batch';
    const objects = rawObjects.length > 0
        ? rawObjects.map(normalizeObject)
        : [normalizeObject({
            id: 1,
            name: rawResult.mainItem || rawResult.scanned_item,
            category: rawResult.category,
            recyclable: rawResult.recyclable ?? rawResult.is_recyclable,
            confidence: rawResult.confidence,
            ecoScore: rawResult.ecoScore ?? rawResult.eco_score,
            disposalAction: rawResult.disposalAction || rawResult.status_message,
            disposalPlan: rawResult.disposalPlan,
            components: rawResult.components || rawResult.composition,
            preparationSteps: rawResult.preparationSteps || rawResult.action_steps,
            education: rawResult.education || rawResult.explanation,
            carbonSavedGrams: rawResult.carbonSavedGrams
        }, 0)];

    const totalEcoScore = clampNumber(
        rawResult.totalEcoScore,
        0,
        500,
        objects.reduce((total, item) => total + item.ecoScore, 0)
    );

    return {
        scanType: inferredBatch ? 'batch' : 'single',
        mainItem: safeString(rawResult.mainItem || rawResult.scanned_item || objects[0]?.name || 'Waste scan'),
        category: safeString(rawResult.category || objects[0]?.category || 'Unknown'),
        recyclable: rawResult.recyclable ?? rawResult.is_recyclable ?? objects[0]?.recyclable ?? false,
        confidence: clampNumber(rawResult.confidence, 0, 1, objects[0]?.confidence || 0.7),
        overallSummary: safeString(rawResult.overallSummary || rawResult.summary || buildSummary(objects)),
        objects,
        totalEcoScore,
        carbonSavedGrams: clampNumber(rawResult.carbonSavedGrams ?? rawResult.carbon_saved_grams, 0, 10000, Math.round(totalEcoScore * 0.5))
    };
}

function buildSummary(objects) {
    if (objects.length === 0) return 'No clear waste item was detected.';
    if (objects.length === 1) {
        const item = objects[0];
        return `${item.name}: ${getStatusLabel(item.recyclable)}. ${item.disposalAction}`;
    }
    return `This image contains ${objects.length} detected waste items with separate disposal guidance.`;
}

function buildSystemPrompt(modeName = selectedScanMode) {
    const mode = scanModes[modeName] || scanModes.quick;
    return [
        'You are an expert waste sorting AI for a browser-only recycling demo.',
        'Return JSON only. No markdown. No explanation outside JSON.',
        'Use consistent fields and short practical language.',
        'If uncertain, use confidence below 0.7 and suggest retaking the photo.',
        'If the image has multiple objects, use scanType = "batch".',
        'If an item has multiple materials, include components.',
        'Every single result or detected object must include disposalPlan with immediateAction, steps, handlingType, safetyWarning, and mistakeToAvoid.',
        'Use handlingType values such as Recycling bin, General waste, Compost, Special handling, E-waste drop-off, Battery drop-off, or Separate parts before disposal.',
        'If the image is unclear, return exactly: {"scanType":"unclear","message":"The image is unclear. Please retake the photo with better lighting and place the object in the center.","confidence":0.3}',
        `Selected mode: ${mode.label}. ${mode.instruction}`,
        'Expected batch JSON: {"scanType":"batch","objects":[{"id":1,"name":"Plastic Bottle","category":"Plastic","gridCell":3,"recyclable":true,"confidence":0.92,"ecoScore":15,"disposalAction":"Empty, rinse, and recycle if accepted locally.","disposalPlan":{"immediateAction":"Empty and rinse the bottle now.","steps":["Empty remaining liquid.","Rinse before recycling.","Put in recycling if accepted locally."],"handlingType":"Recycling bin","safetyWarning":"No special safety risk if empty.","mistakeToAvoid":"Do not recycle it with liquid inside."},"components":[{"part":"Bottle body","material":"PET plastic","recyclable":true,"instruction":"Empty and rinse."}],"preparationSteps":["Empty remaining liquid.","Rinse before recycling."],"education":"Brief reason.","carbonSavedGrams":20}],"overallSummary":"Short summary.","totalEcoScore":20,"carbonSavedGrams":20}',
        'Expected single JSON: {"scanType":"single","mainItem":"Plastic Water Bottle","category":"Composite Packaging","recyclable":"partial","confidence":0.9,"ecoScore":18,"disposalPlan":{"immediateAction":"Separate the label if possible, then empty and rinse the bottle.","steps":["Empty remaining liquid.","Rinse the bottle.","Remove label if possible.","Recycle accepted plastic parts."],"handlingType":"Separate parts before disposal","safetyWarning":"Avoid sharp edges if the bottle is damaged.","mistakeToAvoid":"Do not recycle contaminated or full packaging."},"components":[{"part":"PET bottle body","material":"Plastic PET","recyclable":true,"instruction":"Empty and rinse before recycling."}],"preparationSteps":["Empty remaining liquid.","Rinse the bottle."],"overallSummary":"Short summary.","carbonSavedGrams":15}'
    ].join(' ');
}

function getMockDemoResponse() {
    const selector = dom.demoScenarioSelect;
    const selectedScenario = selector ? selector.value : 'bottle';
    const isVietnamese = currentLanguage === 'vi';

    const mockData = {
        bottle: {
            scanType: 'single',
            mainItem: isVietnamese ? 'Chai nước nhựa PET' : 'PET Plastic Water Bottle',
            category: isVietnamese ? 'Rác tái chế' : 'Plastic Packaging',
            recyclable: 'partial',
            confidence: 0.96,
            overallSummary: isVietnamese 
                ? 'Chai nước nhựa PET có thể tái chế phần thân và nắp, nhưng nhãn giấy ép thì không. Hãy tách các bộ phận trước khi bỏ vào thùng rác.' 
                : 'PET plastic bottle is partially recyclable. The body and cap are recyclable, but the laminated paper label is not. Separation is recommended.',
            totalEcoScore: 85,
            carbonSavedGrams: 42,
            objects: [
                {
                    id: 1,
                    name: isVietnamese ? 'Thân chai nước nhựa' : 'Plastic Bottle Body',
                    category: 'Plastic #1 (PET)',
                    gridCell: 6,
                    recyclable: true,
                    confidence: 0.98,
                    ecoScore: 90,
                    disposalAction: isVietnamese ? 'Rửa sạch và bỏ vào thùng rác tái chế.' : 'Rinse and discard in the recycling bin.',
                    components: [
                        {
                            part: isVietnamese ? 'Thân Chai' : 'Bottle Body',
                            material: 'PET Plastic',
                            recyclable: true,
                            instruction: isVietnamese ? 'Rửa sạch và ép dẹt' : 'Rinse and flatten to conserve space.'
                        },
                        {
                            part: isVietnamese ? 'Nắp chai nhựa' : 'Bottle Cap',
                            material: 'HDPE Plastic',
                            recyclable: true,
                            instruction: isVietnamese ? 'Vặn chặt sau khi rửa thân chai' : 'Keep screwed on after washing body.'
                        },
                        {
                            part: isVietnamese ? 'Nhãn mác' : 'Laminated Label',
                            material: 'Laminated Paper/Glue',
                            recyclable: false,
                            instruction: isVietnamese ? 'Bóc bỏ và vứt vào thùng rác chung' : 'Peel off and dispose in general waste.'
                        }
                    ],
                    preparationSteps: isVietnamese 
                        ? ['Bóc nhãn mác nhựa nếu được.', 'Rửa sạch cặn chất lỏng.', 'Ép dẹt chai để tiết kiệm không gian.', 'Bỏ thân chai và nắp vào thùng tái chế.']
                        : ['Peel off the wrapping label wrapper.', 'Rinse out any remaining liquid.', 'Crush the bottle body to save space.', 'Discard body and cap into plastic recycle bin.'],
                    education: isVietnamese 
                        ? 'PET (nhựa số 1) là một trong những loại nhựa được tái chế nhiều nhất thế giới. Tái chế 1 tấn nhựa PET giúp tiết kiệm gần 1.5 tấn CO₂.'
                        : 'PET plastic (Code 1) is one of the most widely recycled plastics. Recycling one ton of PET saves approximately 1.5 tons of carbon emissions.',
                    carbonSavedGrams: 45
                }
            ]
        },
        battery: {
            scanType: 'single',
            mainItem: isVietnamese ? 'Pin gia dụng Lithium' : 'Lithium Household Battery',
            category: isVietnamese ? 'Chất thải độc hại' : 'Hazardous Waste',
            recyclable: 'special',
            confidence: 0.94,
            overallSummary: isVietnamese
                ? 'Pin chứa kim loại nặng độc hại và không được vứt cùng rác thải sinh hoạt thông thường. Yêu cầu chuyển đến điểm thu gom đặc biệt.'
                : 'Batteries contain heavy metals and are hazardous. They must not be disposed of in standard municipal trash or recycling bins. Take to a collection center.',
            totalEcoScore: 10,
            carbonSavedGrams: 5,
            objects: [
                {
                    id: 1,
                    name: isVietnamese ? 'Pin khô' : 'Dry Cell Battery',
                    category: 'Hazardous Waste',
                    gridCell: 11,
                    recyclable: 'special',
                    confidence: 0.95,
                    ecoScore: 10,
                    disposalAction: isVietnamese 
                        ? 'Gửi đến trạm xử lý chất thải nguy hại của địa phương.' 
                        : 'Deliver to your local municipal hazardous waste collection site.',
                    components: [
                        {
                            part: isVietnamese ? 'Vỏ bọc kim loại' : 'Steel Casing',
                            material: 'Steel',
                            recyclable: 'special',
                            instruction: isVietnamese ? 'Có thể thu hồi tại các lò luyện kim chuyên dụng' : 'Can be recovered at specialized smelters.'
                        },
                        {
                            part: isVietnamese ? 'Chất điện phân' : 'Internal Lithium Cells',
                            material: 'Lithium / Cobalt / Heavy Metals',
                            recyclable: 'special',
                            instruction: isVietnamese ? 'Độc hại cao, cần thu hồi hóa học' : 'Highly toxic. Requires chemical extraction.'
                        }
                    ],
                    preparationSteps: isVietnamese
                        ? ['Bọc băng dính vào 2 đầu cực để tránh đoản mạch.', 'Đặt trong hộp nhựa khô ráo.', 'Đưa đến điểm thu gom pin cũ gần nhất.', 'Tuyệt đối không đốt pin.']
                        : ['Tape the battery terminals to prevent short circuits.', 'Place in a secure, non-conductive plastic box.', 'Drop off at designated battery bins at supermarkets or hazardous depots.', 'Never incinerate or throw in fire.'],
                    education: isVietnamese
                        ? 'Pin rò rỉ hóa chất có thể ô nhiễm nguồn nước ngầm. Một viên pin cúc áo có thể làm ô nhiễm 600,000 lít nước.'
                        : 'Leaking batteries contaminate groundwater with cadmium, lead, and mercury. A single button cell can contaminate 600,000 liters of water.',
                    carbonSavedGrams: 5
                }
            ]
        },
        bag: {
            scanType: 'single',
            mainItem: isVietnamese ? 'Túi Nilon Nhựa Mềm' : 'Soft Plastic Grocery Bag',
            category: 'Plastic #4 (LDPE)',
            recyclable: 'special',
            confidence: 0.88,
            overallSummary: isVietnamese
                ? 'Túi nilon nhựa LDPE có thể tái chế nhưng thường làm kẹt máy phân loại ở thùng rác vỉa hè thông thường. Hãy gom và gửi tại siêu thị.'
                : 'LDPE plastic grocery bags are recyclable but clog standard mechanical conveyor belts. Drop them off at supermarket soft-plastic collection boxes.',
            totalEcoScore: 40,
            carbonSavedGrams: 20,
            objects: [
                {
                    id: 1,
                    name: isVietnamese ? 'Túi nhựa mỏng' : 'Plastic Shopping Bag',
                    category: 'LDPE Plastic',
                    gridCell: 7,
                    recyclable: 'special',
                    confidence: 0.89,
                    ecoScore: 40,
                    disposalAction: isVietnamese 
                        ? 'Gửi trạm gom màng nhựa mềm ở các siêu thị lớn.' 
                        : 'Drop off at supermarket soft plastic collection bins.',
                    components: [
                        {
                            part: isVietnamese ? 'Thân túi' : 'Bag Body',
                            material: 'LDPE Plastic',
                            recyclable: 'special',
                            instruction: isVietnamese ? 'Phải khô ráo và sạch thức ăn' : 'Must be completely dry and free of food debris.'
                        }
                    ],
                    preparationSteps: isVietnamese
                        ? ['Lấy hết hóa đơn, rác bên trong.', 'Làm sạch cặn bám thực phẩm.', 'Nhét nhiều túi nhỏ vào một túi lớn để dễ gom.', 'Gửi trạm thu hồi túi nilon siêu thị.']
                        : ['Remove all receipts and tags.', 'Ensure the bag is dry and clean.', 'Stuff multiple dry bags into a single bag to compress them.', 'Drop in storefront recycling collection stations.'],
                    education: isVietnamese
                        ? 'Túi nilon mất từ 10 đến 100 năm để phân hủy. Thay thế bằng túi vải tái sử dụng giúp bảo vệ sinh vật biển.'
                        : 'Plastic bags take up to 100 years to break down and often turn into microplastics. Switching to reusable tote bags eliminates this waste stream entirely.',
                    carbonSavedGrams: 20
                }
            ]
        },
        mixed: {
            scanType: 'batch',
            mainItem: isVietnamese ? 'Hỗn hợp rác thải' : 'Mixed Trash Scene',
            category: 'Mixed Waste',
            recyclable: 'partial',
            confidence: 0.95,
            overallSummary: isVietnamese
                ? 'Phát hiện 4 nhóm vật phẩm rác khác nhau. Vui lòng bấm vào từng vật phẩm để xem chi tiết phân loại và cách xử lý.'
                : 'Detected 4 distinct waste items. Select individual objects from the checklist below to view their specific material breakdowns.',
            totalEcoScore: 213,
            carbonSavedGrams: 106,
            objects: [
                {
                    id: 1,
                    name: isVietnamese ? 'Lon nước ngọt nhôm' : 'Aluminum Soda Can',
                    category: 'Metal',
                    gridCell: 2,
                    recyclable: true,
                    confidence: 0.98,
                    ecoScore: 95,
                    disposalAction: isVietnamese ? 'Rửa sạch và cho vào thùng rác kim loại.' : 'Rinse and place in the metal recycling bin.',
                    components: [
                        {
                            part: isVietnamese ? 'Thân lon nhôm' : 'Can Body',
                            material: 'Aluminum',
                            recyclable: true,
                            instruction: isVietnamese ? 'Nhôm có khả năng tái chế vô hạn' : 'Aluminum is infinitely recyclable.'
                        }
                    ],
                    preparationSteps: isVietnamese
                        ? ['Đổ sạch nước soda thừa.', 'Rửa qua nước.', 'Ép dẹp lon để tiết kiệm không gian.', 'Bỏ vào thùng kim loại.']
                        : ['Empty remaining liquid.', 'Rinse out soda residues.', 'Crush the metal body.', 'Dispose in metal collection stream.'],
                    education: isVietnamese
                        ? 'Tái chế nhôm tiết kiệm 95% năng lượng so với sản xuất từ quặng thô bô-xít.'
                        : 'Recycling aluminum saves 95% of the energy required to make brand new cans from raw bauxite ore.',
                    carbonSavedGrams: 47
                },
                {
                    id: 2,
                    name: isVietnamese ? 'Hộp Carton các-tông' : 'Cardboard Box Slices',
                    category: 'Paper',
                    gridCell: 4,
                    recyclable: true,
                    confidence: 0.96,
                    ecoScore: 88,
                    disposalAction: isVietnamese ? 'Bóc băng keo, ép dẹt và tái chế giấy.' : 'Remove tape, flatten, and recycle as paper.',
                    components: [
                        {
                            part: isVietnamese ? 'Thân hộp các-tông' : 'Cardboard Frame',
                            material: 'Paper Fibers',
                            recyclable: true,
                            instruction: isVietnamese ? 'Tái chế làm bột giấy thô' : 'Recyclable into packaging and pulp.'
                        },
                        {
                            part: isVietnamese ? 'Băng dính nhựa' : 'Plastic Packaging Tape',
                            material: 'Polypropylene Adhesive',
                            recyclable: false,
                            instruction: isVietnamese ? 'Bóc bỏ và vứt thùng rác chung' : 'Peel off and throw into general waste.'
                        }
                    ],
                    preparationSteps: isVietnamese
                        ? ['Bóc bỏ băng dính nhựa bám trên hộp.', 'Gỡ phẳng dẹt hộp các-tông.', 'Tránh ẩm ướt và dầu mỡ.', 'Bỏ vào thùng thu gom giấy tái chế.']
                        : ['Peel off all synthetic adhesive tape.', 'Flatten the cardboard structure.', 'Ensure it is dry and free of greasy residues.', 'Place into blue paper bin.'],
                    education: isVietnamese
                        ? '1 tấn giấy các-tông tái chế giúp cứu sống 17 cây xanh và tiết kiệm 26,000 lít nước.'
                        : 'Recycling one ton of cardboard saves 17 trees, 2 yards of landfill space, and 26,000 liters of water.',
                    carbonSavedGrams: 44
                },
                {
                    id: 3,
                    name: isVietnamese ? 'Pin AA cũ' : 'AA Alkaline Battery',
                    category: 'Hazardous Waste',
                    gridCell: 9,
                    recyclable: 'special',
                    confidence: 0.97,
                    ecoScore: 10,
                    disposalAction: isVietnamese ? 'Độc hại. Mang đến điểm thu hồi pin nguy hại.' : 'Toxic. Drop off at battery recycling depots.',
                    components: [
                        {
                            part: isVietnamese ? 'Lõi pin kiềm' : 'Alkaline Cell',
                            material: 'Zinc/Manganese/Steel',
                            recyclable: 'special',
                            instruction: isVietnamese ? 'Ngăn rò rỉ kim loại ra môi trường' : 'Must be collected separately to extract zinc and steel.'
                        }
                    ],
                    preparationSteps: isVietnamese
                        ? ['Cách điện 2 cực bằng băng keo.', 'Đặt trong bình nhựa an toàn.', 'Đưa đến điểm thu gom đặc biệt.']
                        : ['Tape battery terminals to insulate.', 'Keep in dry container.', 'Deliver to battery recycling deposit.'],
                    education: isVietnamese
                        ? 'Kim loại trong pin có thể ngấm vào đất và tích tụ sinh học trong chuỗi thức ăn.'
                        : 'Alkaline batteries release corrosive chemicals that leak into landfills. Specialized recycling recovers valuable zinc and steel.',
                    carbonSavedGrams: 5
                },
                {
                    id: 4,
                    name: isVietnamese ? 'Hộp cơm xốp' : 'Soiled Styrofoam Box',
                    category: 'Polystyrene (PS #6)',
                    gridCell: 15,
                    recyclable: false,
                    confidence: 0.90,
                    ecoScore: 20,
                    disposalAction: isVietnamese ? 'Vứt vào thùng rác chung (không thể tái chế).' : 'Dispose in general garbage bin (non-recyclable).',
                    components: [
                        {
                            part: isVietnamese ? 'Khay đựng xốp' : 'Styrofoam Shell',
                            material: 'Polystyrene Foam',
                            recyclable: false,
                            instruction: isVietnamese ? 'Khó phân hủy và nhiễm bẩn thức ăn' : 'Too light and greasy to recycle economically.'
                        }
                    ],
                    preparationSteps: isVietnamese
                        ? ['Gạt bỏ thức ăn thừa.', 'Vứt vào túi rác sinh hoạt thông thường.']
                        : ['Scrape off food particles.', 'Discard into general waste trash bag.'],
                    education: isVietnamese
                        ? 'Nhựa xốp PS chứa các phân tử styrene có hại. Chúng vỡ thành hạt vi nhựa cực kỳ bền vũ trong môi trường.'
                        : 'Styrofoam is 95% air and easily breaks into microplastic fragments that persist in soil and water forever.',
                    carbonSavedGrams: 10
                }
            ]
        }
    };

    return normalizeResult(mockData[selectedScenario] || mockData.bottle);
}

async function analyzeWasteImage({ provider, apiKey, model, imageBase64, mode }) {
    const normalizedProvider = aiProviders[provider] ? provider : 'openai';
    const selectedModeForCall = scanModes[mode] ? mode : 'quick';
    const adapterInput = {
        apiKey,
        model: model || aiProviders[normalizedProvider].defaultModel,
        imageBase64,
        mode: selectedModeForCall,
        prompt: buildSystemPrompt(selectedModeForCall)
    };

    let rawResult;
    if (normalizedProvider === 'openai') {
        rawResult = await analyzeWithOpenAI(adapterInput);
    } else if (normalizedProvider === 'openrouter') {
        rawResult = await analyzeWithOpenRouter(adapterInput);
    } else if (normalizedProvider === 'gemini') {
        rawResult = await analyzeWithGemini(adapterInput);
    } else {
        throw new Error('Unsupported AI provider.');
    }

    return normalizeResult(rawResult);
}

async function analyzeWithOpenAI({ apiKey, model, imageBase64, mode, prompt }) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: prompt },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageBase64,
                                detail: mode === 'quick' ? 'low' : 'high'
                            }
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `OpenAI API error ${response.status}`);
    }

    const data = await response.json();
    return extractJsonObject(data.choices?.[0]?.message?.content);
}

async function analyzeWithOpenRouter({ apiKey, model, imageBase64, prompt }) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin || 'http://localhost',
            'X-Title': 'RecycleCheck AI'
        },
        body: JSON.stringify({
            model,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: prompt },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image_url',
                            image_url: { url: imageBase64 }
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `OpenRouter API error ${response.status}`);
    }

    const data = await response.json();
    return extractJsonObject(data.choices?.[0]?.message?.content);
}

async function analyzeWithGemini({ apiKey, model, imageBase64, prompt }) {
    const geminiModel = normalizeGeminiModelName(model);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModel)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.2
            },
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: 'image/jpeg',
                                data: stripDataUrlPrefix(imageBase64)
                            }
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.error?.message || `Gemini API error ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || '')
        .join('')
        .trim();

    return extractJsonObject(content);
}

function setScanMode(mode) {
    selectedScanMode = scanModes[mode] ? mode : 'quick';
    localStorage.setItem(STORAGE_KEYS.selectedMode, selectedScanMode);
    dom.scanModeOptions.querySelectorAll('[data-mode]').forEach(button => {
        button.classList.toggle('active', button.dataset.mode === selectedScanMode);
    });
}

function setupPwa() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(error => {
                console.warn('[App] Service worker registration failed:', error);
            });
        });
    }
}

async function initCamera() {
    stopCamera();
    video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: 'environment' },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });
        video.srcObject = stream;
        dom.videoCanvas.classList.remove('hidden');
        dom.cameraFallback.classList.add('hidden');
        dom.scanActionSection.classList.remove('hidden');

        video.onloadedmetadata = () => {
            video.play();
            startCanvasLoop();
        };
    } catch (error) {
        console.error('Camera access error:', error);
        handleCameraError();
    }
}

function startCanvasLoop() {
    canvasContext = dom.videoCanvas.getContext('2d');

    const loop = () => {
        if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
            if (dom.videoCanvas.width !== video.videoWidth) dom.videoCanvas.width = video.videoWidth;
            if (dom.videoCanvas.height !== video.videoHeight) dom.videoCanvas.height = video.videoHeight;
            canvasContext.drawImage(video, 0, 0, dom.videoCanvas.width, dom.videoCanvas.height);
        }
        if (stream) animationFrameId = requestAnimationFrame(loop);
    };

    loop();
}

function stopCamera() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

function handleCameraError() {
    stopCamera();
    dom.videoCanvas.classList.add('hidden');
    dom.cameraFallback.classList.remove('hidden');
    dom.scanActionSection.classList.add('hidden');
}

function canvasToDataUrl(canvas, quality = 0.82) {
    return canvas.toDataURL('image/jpeg', quality);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

async function compressImage(source, maxDimension = MAX_IMAGE_DIMENSION, quality = 0.82) {
    const image = typeof source === 'string' ? await loadImage(source) : source;
    const scale = Math.min(1, maxDimension / Math.max(image.width || image.videoWidth, image.height || image.videoHeight));
    const width = Math.max(1, Math.round((image.width || image.videoWidth) * scale));
    const height = Math.max(1, Math.round((image.height || image.videoHeight) * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    return canvasToDataUrl(canvas, quality);
}

async function captureImage() {
    dom.flashOverlay.classList.add('active');
    const imageData = canvasToDataUrl(dom.videoCanvas, 0.86);
    capturedImageData = await compressImage(imageData, MAX_IMAGE_DIMENSION, 0.82);
    capturedHistoryImageData = await compressImage(imageData, HISTORY_IMAGE_DIMENSION, 0.72);

    setTimeout(() => {
        dom.flashOverlay.classList.remove('active');
        showSnappedPhoto(capturedImageData);
        showPreviewModal(capturedImageData);
    }, 100);
}

async function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showToast('Please upload a valid image file.');
        return;
    }
    if (file.size > 12 * 1024 * 1024) {
        showToast('Please choose an image smaller than 12 MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async uploadEvent => {
        capturedImageData = await compressImage(uploadEvent.target.result, MAX_IMAGE_DIMENSION, 0.82);
        capturedHistoryImageData = await compressImage(uploadEvent.target.result, HISTORY_IMAGE_DIMENSION, 0.72);
        showSnappedPhoto(capturedImageData);
        showPreviewModal(capturedImageData);
    };
    reader.readAsDataURL(file);
}

function showSnappedPhoto(imageData) {
    stopCamera();
    canvasContext = null;
    dom.videoCanvas.classList.add('hidden');

    let snappedPhoto = document.getElementById('snappedPhoto');
    if (!snappedPhoto) {
        snappedPhoto = createElement('img', {
            className: 'w-full h-full absolute inset-0',
            alt: 'Captured waste'
        });
        snappedPhoto.id = 'snappedPhoto';
        snappedPhoto.style.objectFit = 'contain';
        snappedPhoto.style.backgroundColor = '#000';
        dom.cameraSection.appendChild(snappedPhoto);
    }

    snappedPhoto.src = imageData;
    snappedPhoto.classList.remove('hidden');
    dom.scanActionSection.classList.add('hidden');
}

function showPreviewModal(imageData) {
    dom.previewImage.src = imageData;
    dom.previewModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function hidePreviewModal() {
    dom.previewModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function resetToCamera() {
    hidePreviewModal();
    const snappedPhoto = document.getElementById('snappedPhoto');
    if (snappedPhoto) {
        snappedPhoto.classList.add('hidden');
        snappedPhoto.src = '';
    }
    dom.fileInput.value = '';
    capturedImageData = null;
    capturedHistoryImageData = null;
    dom.videoCanvas.classList.remove('hidden');
    dom.scanActionSection.classList.remove('hidden');
    initCamera();
}

async function analyzeWithAI() {
    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    const config = getProviderConfig();
    const providerMeta = aiProviders[config.provider];

    if (!isDemoMode) {
        if (!config.apiKey) {
            openSettings();
            showToast(`Add a ${providerMeta.label} API key before scanning.`);
            return;
        }
        if (!config.model) {
            openSettings();
            showToast(`Choose a vision-capable ${providerMeta.label} model before scanning.`);
            return;
        }
    }
    if (!capturedImageData) {
        showToast('Capture or upload an image first.');
        return;
    }

    hidePreviewModal();
    dom.loadingModeText.textContent = scanModes[selectedScanMode].loading;
    dom.loadingOverlay.classList.add('active');

    try {
        let normalized;
        if (isDemoMode) {
            // Simulate AI latency for demo realism
            await new Promise(resolve => setTimeout(resolve, 1500));
            normalized = getMockDemoResponse();
        } else {
            normalized = await analyzeWasteImage({
                provider: config.provider,
                apiKey: config.apiKey,
                model: config.model,
                imageBase64: capturedImageData,
                mode: selectedScanMode
            });
        }
        dom.loadingOverlay.classList.remove('active');
        showResults(normalized, true);
    } catch (error) {
        console.error('AI analysis error:', error);
        dom.loadingOverlay.classList.remove('active');
        showToast(isDemoMode ? `Demo analysis failed: ${error.message}` : `${providerMeta.label} analysis failed: ${error.message}`);
    }
}

function showResults(result, shouldSave) {
    lastAnalysisResult = result;
    const imageData = capturedImageData || result.imageData || '';

    dom.resultImage.src = imageData;
    dom.resultTimestamp.textContent = new Date().toLocaleString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const isDemoMode = result.isDemo ?? (localStorage.getItem(STORAGE_KEYS.demoMode) === 'true');
    if (isDemoMode) {
        dom.resultsDemoBadge.classList.remove('hidden');
    } else {
        dom.resultsDemoBadge.classList.add('hidden');
    }

    if (result.scanType === 'unclear') {
        renderUnclearResult(result);
    } else {
        const title = result.scanType === 'batch'
            ? `${result.objects.length} items detected`
            : result.mainItem;
        dom.resultItemName.textContent = title;
        renderSummary(result);
        renderStatus(result);
        renderDetectedObjects(result);
        renderGrid(result);
        renderObjectDetails(result.objects[0]);
        renderDisposalPlan(result.objects[0]);
        renderSustainability(result);
    }

    dom.resultsModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    dom.saveHistoryContainer.classList.add('hidden');

    if (shouldSave) {
        addToHistory(result);
    }
}

function renderUnclearResult(result) {
    dom.resultItemName.textContent = t('unclear');
    dom.resultSummaryCard.classList.remove('hidden');
    dom.resultSummaryText.textContent = result.message;
    dom.statusCard.className = 'rounded-2xl p-6 shadow-sm bg-gradient-to-r from-gray-500 to-gray-600';
    setIcon(dom.statusIcon, 'ph ph-warning text-white text-3xl');
    dom.statusMessage.textContent = `${t('unclear')} (${Math.round(result.confidence * 100)}% confidence)`;
    dom.detectedObjectsSection.classList.add('hidden');
    dom.gridOverlay.classList.add('hidden');
    dom.objectFocusBox.classList.add('hidden');
    renderObjectDetails(null);
    renderDisposalPlan(null);
    dom.ecoScoreValue.textContent = '0';
    dom.carbonSavedValue.textContent = '0g';
}

function renderSummary(result) {
    dom.resultSummaryCard.classList.remove('hidden');
    dom.resultSummaryText.textContent = result.overallSummary || buildSummary(result.objects);
}

function renderStatus(result) {
    const status = result.scanType === 'batch' ? summarizeBatchStatus(result.objects) : result.recyclable;
    const kind = getStatusKind(status);
    const gradient = {
        recyclable: 'from-emerald-500 to-emerald-600',
        partial: 'from-blue-500 to-emerald-500',
        special: 'from-amber-500 to-orange-500',
        nonRecyclable: 'from-orange-500 to-red-500'
    }[kind];
    const iconClass = kind === 'recyclable'
        ? 'ph ph-recycle text-white text-3xl'
        : kind === 'partial'
            ? 'ph ph-arrows-split text-white text-3xl'
            : 'ph ph-warning text-white text-3xl';

    dom.statusCard.className = `rounded-2xl p-6 shadow-sm bg-gradient-to-r ${gradient}`;
    setIcon(dom.statusIcon, iconClass);
    dom.statusMessage.textContent = result.scanType === 'batch'
        ? `${result.objects.length} items analyzed`
        : `${getStatusLabel(status)} (${Math.round(result.confidence * 100)}% confidence)`;
}

function summarizeBatchStatus(objects) {
    if (objects.some(item => getStatusKind(item.recyclable) === 'special')) return 'special';
    if (objects.some(item => getStatusKind(item.recyclable) === 'partial')) return 'partial';
    if (objects.every(item => getStatusKind(item.recyclable) === 'recyclable')) return true;
    return false;
}

function setIcon(container, className) {
    container.replaceChildren(icon(className));
}

function renderDetectedObjects(result) {
    dom.detectedObjectsSection.classList.remove('hidden');
    dom.detectedObjectsList.replaceChildren();

    result.objects.forEach((item, index) => {
        const statusBadge = createElement('span', {
            className: `inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusClasses(item.recyclable)}`,
            text: getStatusLabel(item.recyclable)
        });
        const score = createElement('span', {
            className: 'inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold',
            text: `${item.ecoScore} eco`
        });
        const confidence = createElement('span', {
            className: 'text-xs text-gray-500',
            text: `${Math.round(item.confidence * 100)}% confidence${item.gridCell ? ` | cell ${item.gridCell}` : ''}`
        });
        const title = createElement('h6', {
            className: 'font-bold text-gray-800',
            text: item.name
        });
        const category = createElement('p', {
            className: 'text-xs text-gray-500',
            text: item.category
        });
        const action = createElement('p', {
            className: 'text-sm text-gray-600 mt-3',
            text: item.disposalAction
        });
        const card = createElement('button', {
            type: 'button',
            className: 'result-card text-left border border-gray-100 rounded-2xl p-4 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors',
            dataset: { cell: item.gridCell || '' }
        }, [
            createElement('div', { className: 'flex items-start justify-between gap-3' }, [
                createElement('div', {}, [title, category, confidence]),
                createElement('div', { className: 'flex flex-col items-end gap-2' }, [statusBadge, score])
            ]),
            action
        ]);

        card.style.animationDelay = `${index * 70}ms`;
        card.addEventListener('click', () => {
            renderObjectDetails(item);
            renderDisposalPlan(item);
            focusGridCell(item.gridCell);
        });
        dom.detectedObjectsList.appendChild(card);
    });
}

function renderGrid(result) {
    const detectedCells = new Set(result.objects.map(item => item.gridCell).filter(Boolean));
    if (detectedCells.size === 0) {
        dom.gridOverlay.classList.add('hidden');
        dom.objectFocusBox.classList.add('hidden');
        dom.gridOverlay.replaceChildren();
        return;
    }

    dom.gridOverlay.replaceChildren();
    for (let cell = 1; cell <= 16; cell += 1) {
        dom.gridOverlay.appendChild(createElement('div', {
            className: `grid-cell ${detectedCells.has(cell) ? 'detected' : ''}`,
            text: cell
        }));
    }
    dom.gridOverlay.classList.remove('hidden');
    focusGridCell([...detectedCells][0]);
}

function focusGridCell(cell) {
    if (!cell) {
        dom.objectFocusBox.classList.add('hidden');
        return;
    }
    const zeroIndex = cell - 1;
    const row = Math.floor(zeroIndex / 4);
    const column = zeroIndex % 4;
    dom.objectFocusBox.style.left = `${column * 25}%`;
    dom.objectFocusBox.style.top = `${row * 25}%`;
    dom.objectFocusBox.style.width = '25%';
    dom.objectFocusBox.style.height = '25%';
    dom.objectFocusBox.classList.remove('hidden');
}

function renderObjectDetails(item) {
    dom.compositionBars.replaceChildren();
    dom.actionSteps.replaceChildren();

    if (!item) {
        dom.compositionBars.appendChild(createElement('p', {
            className: 'text-gray-400 text-sm',
            text: 'No material breakdown available.'
        }));
        dom.actionSteps.appendChild(createElement('p', {
            className: 'text-gray-400 text-sm',
            text: 'No preparation steps available.'
        }));
        return;
    }

    if (item.components.length === 0) {
        dom.compositionBars.appendChild(createElement('p', {
            className: 'text-gray-400 text-sm',
            text: 'No component details were returned for this item.'
        }));
    } else {
        item.components.forEach(component => {
            const badge = createElement('span', {
                className: `inline-flex items-center px-2 py-1 rounded-full border text-xs font-semibold ${getStatusClasses(component.recyclable)}`,
                text: getStatusLabel(component.recyclable)
            });
            dom.compositionBars.appendChild(createElement('div', {
                className: 'result-card border border-gray-100 rounded-xl p-4'
            }, [
                createElement('div', { className: 'flex justify-between items-start gap-3 mb-2' }, [
                    createElement('div', {}, [
                        createElement('p', { className: 'font-semibold text-gray-800', text: component.part }),
                        createElement('p', { className: 'text-xs text-gray-500', text: component.material })
                    ]),
                    badge
                ]),
                createElement('p', { className: 'text-sm text-gray-600', text: component.instruction })
            ]));
        });
    }

    const steps = item.preparationSteps.length > 0 ? item.preparationSteps : [item.disposalAction];
    steps.forEach((step, index) => {
        dom.actionSteps.appendChild(createElement('div', {
            className: 'result-card flex items-start gap-3 p-3 bg-gray-50 rounded-xl'
        }, [
            createElement('div', {
                className: 'w-6 h-6 flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold',
                text: index + 1
            }),
            createElement('p', { className: 'text-gray-700 text-sm', text: step })
        ]));
    });

    if (item.education) {
        dom.actionSteps.appendChild(createElement('div', {
            className: 'result-card p-4 bg-blue-50 text-blue-800 rounded-xl text-sm'
        }, [
            createElement('p', { className: 'font-semibold mb-1', text: 'Why this matters' }),
            createElement('p', { text: item.education })
        ]));
    }
}

function renderDisposalPlan(item) {
    dom.disposalPlanGrid.replaceChildren();
    dom.disposalPlanSteps.replaceChildren();

    if (!item) {
        dom.disposalPlanItemName.textContent = 'No disposal plan available for this scan.';
        dom.disposalPlanGrid.appendChild(createElement('p', {
            className: 'text-sm text-gray-400',
            text: 'Try retaking the photo with better lighting or selecting a detected item.'
        }));
        return;
    }

    const plan = normalizeDisposalPlan(item.disposalPlan, getFallbackDisposalPlan(item, item.recyclable, item.components || [], item.preparationSteps || []));
    dom.disposalPlanItemName.textContent = item.name;

    const cards = [
        {
            iconClass: 'ph ph-lightning text-emerald-600 text-xl',
            label: 'Immediate action',
            value: plan.immediateAction,
            color: 'bg-emerald-50 border-emerald-100'
        },
        {
            iconClass: 'ph ph-trash text-blue-600 text-xl',
            label: 'Correct bin / handling',
            value: plan.handlingType,
            color: 'bg-blue-50 border-blue-100'
        },
        {
            iconClass: 'ph ph-warning text-amber-600 text-xl',
            label: 'Safety warning',
            value: plan.safetyWarning || 'No special safety warning identified.',
            color: 'bg-amber-50 border-amber-100'
        },
        {
            iconClass: 'ph ph-prohibit text-orange-600 text-xl',
            label: 'Common mistake to avoid',
            value: plan.mistakeToAvoid,
            color: 'bg-orange-50 border-orange-100'
        }
    ];

    cards.forEach(card => {
        dom.disposalPlanGrid.appendChild(createElement('div', {
            className: `border rounded-xl p-4 ${card.color}`
        }, [
            createElement('div', { className: 'flex items-center gap-2 mb-2' }, [
                icon(card.iconClass),
                createElement('p', { className: 'text-xs font-bold uppercase text-gray-500', text: card.label })
            ]),
            createElement('p', { className: 'text-sm font-semibold text-gray-800', text: card.value })
        ]));
    });

    const steps = plan.steps.length > 0 ? plan.steps : item.preparationSteps || [];
    if (steps.length === 0) {
        dom.disposalPlanSteps.appendChild(createElement('p', {
            className: 'text-sm text-gray-400',
            text: 'No step-by-step plan was returned. Follow the immediate action and local disposal rules.'
        }));
        return;
    }

    steps.forEach((step, index) => {
        dom.disposalPlanSteps.appendChild(createElement('div', {
            className: 'flex items-start gap-3 p-3 bg-gray-50 rounded-xl'
        }, [
            createElement('div', {
                className: 'w-6 h-6 flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold',
                text: index + 1
            }),
            createElement('p', { className: 'text-sm text-gray-700', text: step })
        ]));
    });
}

function renderSustainability(result) {
    dom.ecoScoreValue.textContent = result.totalEcoScore;
    dom.carbonSavedValue.textContent = `${result.carbonSavedGrams || Math.round(result.totalEcoScore * 0.5)}g`;
}

function addToHistory(result) {
    const history = getHistory();
    const config = getProviderConfig();
    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    
    // Tag the result with demo state if saved under demo mode
    if (isDemoMode) {
        result.isDemo = true;
    }

    const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        mode: selectedScanMode,
        provider: isDemoMode ? 'demo' : config.provider,
        model: isDemoMode ? 'offline-mock' : config.model,
        imageData: capturedHistoryImageData || capturedImageData,
        isDemo: isDemoMode,
        result
    };
    history.unshift(entry);
    saveHistory(history);
    loadHistory();
    renderChart();
    updateUserLevel();
    checkAchievements();
}

function loadHistory() {
    const recentList = document.getElementById('recentList');
    const emptyRecent = document.getElementById('emptyRecent');
    recentList.querySelectorAll('.history-item').forEach(item => item.remove());

    const history = getHistory();
    if (history.length === 0) {
        emptyRecent.classList.remove('hidden');
        return;
    }

    emptyRecent.classList.add('hidden');
    history.forEach(entry => {
        const result = entry.result || {};
        const firstObject = result.objects?.[0];
        const title = result.scanType === 'batch'
            ? `${result.objects.length} items`
            : firstObject?.name || result.mainItem || 'Waste scan';
        const status = result.scanType === 'batch' ? summarizeBatchStatus(result.objects || []) : firstObject?.recyclable;
        const date = new Date(entry.timestamp).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const thumbnail = entry.imageData
            ? createElement('img', { src: entry.imageData, alt: title, className: 'w-full h-full object-cover' })
            : icon('ph ph-package text-2xl text-gray-400');

        const historyItem = createElement('div', {
            className: 'history-item bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow'
        }, [
            createElement('div', {
                className: 'w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0'
            }, [thumbnail]),
            createElement('div', { className: 'flex-1 min-w-0' }, [
                createElement('div', { className: 'flex items-center gap-2 mb-1' }, [
                    icon(getStatusKind(status) === 'recyclable' ? 'ph ph-recycle text-emerald-500' : 'ph ph-warning text-orange-500'),
                    createElement('h4', { className: 'font-semibold text-gray-800 truncate', text: title })
                ]),
                createElement('p', { className: 'text-xs text-gray-500', text: `${date} | ${scanModes[entry.mode]?.label || 'Scan'} | ${aiProviders[entry.provider]?.label || 'AI'}` })
            ]),
            createElement('span', {
                className: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700',
                text: `${result.totalEcoScore || 0}`
            })
        ]);

        historyItem.addEventListener('click', () => {
            capturedImageData = entry.imageData;
            // Transfer stored demo state to preview results badge
            result.isDemo = entry.isDemo;
            showResults(result, false);
        });
        recentList.appendChild(historyItem);
    });
}

function clearHistory() {
    if (!confirm('Clear all local scan history and progress?')) return;
    localStorage.removeItem(STORAGE_KEYS.history);
    localStorage.removeItem(STORAGE_KEYS.achievements);
    loadHistory();
    renderChart();
    updateUserLevel();
    renderAchievements();
}

function getObjectsFromHistoryEntry(entry) {
    if (entry?.result?.objects && Array.isArray(entry.result.objects)) {
        return entry.result.objects.map((item, index) => normalizeObject(item, index));
    }

    if (entry?.itemName || entry?.isRecyclable !== undefined) {
        return [normalizeObject({
            id: entry.id || 1,
            name: entry.itemName,
            recyclable: entry.isRecyclable,
            ecoScore: entry.ecoScore,
            disposalAction: entry.statusMessage,
            components: entry.composition,
            preparationSteps: entry.actionSteps
        }, 0)];
    }

    return [];
}

function classifyWasteCategory(item) {
    const text = `${item?.name || ''} ${item?.category || ''}`.toLowerCase();
    if (/battery|e-waste|ewaste|electronic|phone|cable|charger|lithium/.test(text)) return 'special';
    if (/plastic|pet|hdpe|soft plastic|bag|bottle/.test(text)) return 'plastic';
    if (/metal|aluminum|aluminium|steel|tin|can/.test(text)) return 'metal';
    if (/paper|cardboard|carton|newspaper/.test(text)) return 'paper';
    if (/glass|jar/.test(text)) return 'glass';
    return 'other';
}

function isSpecialHandlingItem(item) {
    const planText = `${item?.disposalPlan?.handlingType || ''} ${item?.disposalPlan?.safetyWarning || ''}`.toLowerCase();
    return classifyWasteCategory(item) === 'special' || getStatusKind(item?.recyclable) === 'special' || /special|battery|e-waste|hazard|drop-off|dropoff/.test(planText);
}

function estimateCo2Kg(item) {
    const category = classifyWasteCategory(item);
    if (category === 'special' && isSpecialHandlingItem(item)) return co2EstimatesKg.special;
    if (getStatusKind(item?.recyclable) !== 'recyclable') return 0;
    return co2EstimatesKg[category] || co2EstimatesKg.other;
}

function getMetrics() {
    const history = getHistory();
    const quizStats = getQuizStats();
    const objects = history.flatMap(getObjectsFromHistoryEntry);
    const totalEcoScore = clampNumber(
        history.reduce((total, entry) => {
            const resultScore = entry?.result?.totalEcoScore;
            if (Number.isFinite(Number(resultScore))) return total + Number(resultScore);
            return total + getObjectsFromHistoryEntry(entry).reduce((itemTotal, item) => itemTotal + item.ecoScore, 0);
        }, 0),
        0,
        100000,
        0
    );

    const categoryCounts = {};
    const categoryCo2 = {};
    let recyclableCount = 0;
    let nonRecyclableCount = 0;
    let specialHandlingCount = 0;
    let estimatedCo2Kg = 0;

    objects.forEach(item => {
        const category = classifyWasteCategory(item);
        const status = getStatusKind(item.recyclable);
        const special = isSpecialHandlingItem(item);
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        if (special) specialHandlingCount += 1;
        if (status === 'recyclable') recyclableCount += 1;
        if (status === 'nonRecyclable') nonRecyclableCount += 1;

        const co2 = estimateCo2Kg(item);
        estimatedCo2Kg += co2;
        categoryCo2[category] = (categoryCo2[category] || 0) + co2;
    });

    const mostCommonCategory = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'none';
    const plasticCount = objects.filter(item => classifyWasteCategory(item) === 'plastic').length;
    const batteryCount = objects.filter(item => classifyWasteCategory(item) === 'special').length;
    const batchScans = history.filter(entry => entry.result?.scanType === 'batch').length;

    return {
        history,
        objects,
        totalScans: history.length,
        totalEcoScore,
        recyclableCount,
        nonRecyclableCount,
        specialHandlingCount,
        mostCommonCategory,
        estimatedCo2Kg: clampNumber(estimatedCo2Kg, 0, 10000, 0),
        categoryCounts,
        categoryCo2,
        quizStats,
        quizAccuracy: quizStats.correctAnswers + quizStats.incorrectAnswers > 0
            ? Math.round((quizStats.correctAnswers / (quizStats.correctAnswers + quizStats.incorrectAnswers)) * 100)
            : 0,
        plasticCount,
        batteryCount,
        batchScans
    };
}

function getSampleQuizItems() {
    return [
        normalizeObject({
            id: 1,
            name: 'Plastic water bottle',
            category: 'Plastic',
            recyclable: 'partial',
            ecoScore: 12,
            disposalAction: 'Empty, rinse, and recycle accepted plastic parts.',
            disposalPlan: {
                immediateAction: 'Empty and rinse the bottle.',
                steps: ['Empty remaining liquid.', 'Rinse the bottle.', 'Remove label if possible.', 'Recycle accepted plastic parts.'],
                handlingType: 'Separate parts before disposal',
                safetyWarning: 'No special safety warning if empty.',
                mistakeToAvoid: 'Do not recycle it while full or dirty.'
            },
            components: [
                { part: 'Bottle body', material: 'PET plastic', recyclable: true, instruction: 'Empty and rinse.' },
                { part: 'Glossy label', material: 'Coated paper or film', recyclable: false, instruction: 'Remove if possible.' }
            ],
            preparationSteps: ['Empty remaining liquid.', 'Rinse the bottle.', 'Remove label if possible.']
        }, 0),
        normalizeObject({
            id: 2,
            name: 'Used battery',
            category: 'Battery',
            recyclable: 'special',
            ecoScore: 18,
            disposalAction: 'Take to a battery drop-off point.',
            disposalPlan: {
                immediateAction: 'Keep it out of normal trash and recycling.',
                steps: ['Tape exposed terminals if needed.', 'Store in a dry place.', 'Bring to a battery drop-off point.'],
                handlingType: 'Battery drop-off',
                safetyWarning: 'Damaged batteries can leak or overheat.',
                mistakeToAvoid: 'Do not put batteries in regular recycling bins.'
            },
            components: [{ part: 'Battery cell', material: 'Mixed metals and chemicals', recyclable: 'special', instruction: 'Use special collection.' }],
            preparationSteps: ['Store safely.', 'Bring to a collection point.']
        }, 1),
        normalizeObject({
            id: 3,
            name: 'Greasy pizza box',
            category: 'Paper',
            recyclable: false,
            ecoScore: 4,
            disposalAction: 'Compost clean paper if allowed; discard greasy sections.',
            disposalPlan: {
                immediateAction: 'Separate clean cardboard from greasy parts.',
                steps: ['Tear off clean lid if recyclable.', 'Discard or compost greasy sections if accepted locally.'],
                handlingType: 'Separate parts before disposal',
                safetyWarning: 'No special safety warning.',
                mistakeToAvoid: 'Do not recycle greasy cardboard with clean paper.'
            },
            components: [{ part: 'Greasy cardboard', material: 'Contaminated paper', recyclable: false, instruction: 'Keep out of clean recycling.' }],
            preparationSteps: ['Separate clean and greasy parts.']
        }, 2)
    ];
}

function shuffleArray(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
}

function uniqueOptions(correctAnswer, distractors) {
    const options = [correctAnswer, ...distractors]
        .map(option => safeString(option))
        .filter(Boolean);
    const unique = [...new Set(options)];
    while (unique.length < 3) {
        unique.push(['Check local rules', 'Put it in regular recycling', 'Throw it away without sorting'][unique.length - 1] || 'Ask a local waste guide');
    }
    return shuffleArray(unique.slice(0, 3));
}

function getQuestionPriority(item, index, categoryCounts) {
    let score = 100 - index;
    if (isSpecialHandlingItem(item)) score += 500;
    if (getStatusKind(item.recyclable) === 'nonRecyclable') score += 350;
    if ((item.components || []).length > 1 || getStatusKind(item.recyclable) === 'partial') score += 250;
    score += (categoryCounts[classifyWasteCategory(item)] || 0) * 20;
    return score;
}

function buildQuestionFromItem(item, type, sourceLabel, index) {
    const plan = normalizeDisposalPlan(item.disposalPlan, getFallbackDisposalPlan(item, item.recyclable, item.components || [], item.preparationSteps || []));
    const components = asArray(item.components);
    const preparationSteps = asArray(item.preparationSteps).filter(Boolean);
    const idBase = `${sourceLabel}-${item.name}-${type}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 90);

    if (type === 'disposal') {
        return {
            id: `${idBase}-disposal`,
            typeLabel: 'Disposal action',
            prompt: `What should you do first with ${item.name}?`,
            options: uniqueOptions(plan.immediateAction, ['Put it in any recycling bin', 'Ignore labels and throw it away']),
            correctAnswer: plan.immediateAction,
            explanation: `Best immediate action: ${plan.immediateAction}`,
            source: sourceLabel
        };
    }

    if (type === 'preparation') {
        const correct = plan.steps[0] || preparationSteps[0] || item.disposalAction;
        return {
            id: `${idBase}-prep`,
            typeLabel: 'Preparation step',
            prompt: `Which preparation step is recommended for ${item.name}?`,
            options: uniqueOptions(correct, ['Recycle it without cleaning', 'Mix it with food waste']),
            correctAnswer: correct,
            explanation: `Preparation matters because contamination can make recycling fail.`,
            source: sourceLabel
        };
    }

    if (type === 'recyclable') {
        const correct = getStatusLabel(item.recyclable);
        return {
            id: `${idBase}-status`,
            typeLabel: 'Recyclable status',
            prompt: `How should ${item.name} be classified?`,
            options: uniqueOptions(correct, [t('recyclable'), t('nonRecyclable'), t('special')].filter(label => label !== correct)),
            correctAnswer: correct,
            explanation: `${item.name} is marked as ${correct}.`,
            source: sourceLabel
        };
    }

    if (type === 'special') {
        return {
            id: `${idBase}-special`,
            typeLabel: 'Special handling',
            prompt: `What handling type is best for ${item.name}?`,
            options: uniqueOptions(plan.handlingType, ['Regular recycling bin', 'Regular trash with no sorting']),
            correctAnswer: plan.handlingType,
            explanation: plan.safetyWarning || `Recommended handling: ${plan.handlingType}.`,
            source: sourceLabel
        };
    }

    const component = components[0] || normalizeComponent({ part: item.name, material: item.category, recyclable: item.recyclable, instruction: item.disposalAction });
    return {
        id: `${idBase}-material`,
        typeLabel: 'Material breakdown',
        prompt: `Which material or part needs attention in ${item.name}?`,
        options: uniqueOptions(`${component.part}: ${component.material}`, [`${item.name}: no parts to separate`, 'All parts are always recycled together']),
        correctAnswer: `${component.part}: ${component.material}`,
        explanation: component.instruction,
        source: sourceLabel
    };
}

function buildQuizQuestions() {
    const metrics = getMetrics();
    const hasHistory = metrics.objects.length > 0;
    const objects = hasHistory ? metrics.objects : getSampleQuizItems();
    const sourceLabel = hasHistory ? 'Personalized' : 'Sample Quiz';
    const categoryCounts = metrics.categoryCounts || {};
    const prioritized = objects
        .map((item, index) => ({ item, priority: getQuestionPriority(item, index, categoryCounts) }))
        .sort((a, b) => b.priority - a.priority)
        .map(entry => entry.item);
    const questionTypes = ['special', 'disposal', 'preparation', 'recyclable', 'material'];
    const questions = [];

    prioritized.forEach((item, index) => {
        questionTypes.forEach(type => {
            if (questions.length >= 12) return;
            if (type === 'special' && !isSpecialHandlingItem(item)) return;
            if (type === 'material' && asArray(item.components).length === 0 && index > 1) return;
            questions.push(buildQuestionFromItem(item, type, sourceLabel, index));
        });
    });

    let fallbackIndex = 0;
    while (questions.length < 5) {
        const item = objects[fallbackIndex % objects.length];
        const type = questionTypes[fallbackIndex % questionTypes.length];
        questions.push(buildQuestionFromItem(item, type, sourceLabel, fallbackIndex + 20));
        fallbackIndex += 1;
    }

    const selectedQuestions = questions.slice(0, 5);
    return {
        id: `${sourceLabel.toLowerCase().replace(/\s+/g, '-')}-${selectedQuestions.map(question => question.id).join('|')}`.slice(0, 160),
        isSample: !hasHistory,
        questions: selectedQuestions
    };
}

function renderQuizInlineStats() {
    if (!dom.quizStatsInline) return;
    const stats = getQuizStats();
    const totalAnswers = stats.correctAnswers + stats.incorrectAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((stats.correctAnswers / totalAnswers) * 100) : 0;
    const cards = [
        { label: 'Quiz XP', value: stats.quizXp },
        { label: 'Completed', value: stats.quizzesCompleted },
        { label: 'Correct', value: stats.correctAnswers },
        { label: 'Accuracy', value: `${accuracy}%` }
    ];

    dom.quizStatsInline.replaceChildren();
    cards.forEach(card => {
        dom.quizStatsInline.appendChild(createElement('div', {
            className: 'bg-gray-50 border border-gray-100 rounded-xl p-3'
        }, [
            createElement('p', { className: 'text-xs text-gray-500 font-bold uppercase', text: card.label }),
            createElement('p', { className: 'text-lg font-bold text-gray-800', text: card.value })
        ]));
    });
}

function startEcoQuiz() {
    const quiz = buildQuizQuestions();
    const stats = getQuizStats();
    currentQuiz = {
        id: quiz.id,
        isSample: quiz.isSample,
        questions: quiz.questions,
        currentIndex: 0,
        selectedAnswers: [],
        score: 0,
        completedAlready: stats.completedQuizIds.includes(quiz.id)
    };

    dom.quizModalTitle.textContent = quiz.isSample ? 'Eco Quiz - Sample Quiz' : 'Eco Quiz';
    dom.quizSourceBadge.textContent = quiz.isSample ? 'Sample Quiz' : 'Personalized';
    dom.quizEmptyState.classList.toggle('hidden', !quiz.isSample);
    dom.quizQuestionCard.classList.remove('hidden');
    dom.quizSummaryCard.classList.add('hidden');
    dom.quizModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    if (quiz.isSample) {
        dom.quizEmptyState.replaceChildren(
            icon('ph ph-info text-emerald-500 text-4xl'),
            createElement('h3', { className: 'text-lg font-bold text-gray-800 mt-3', text: 'Sample Quiz' }),
            createElement('p', {
                className: 'text-sm text-gray-500 mt-2',
                text: 'Your personalized quiz becomes richer after you complete scans. This sample uses common waste items.'
            })
        );
    }

    renderQuizQuestion();
}

function closeEcoQuiz() {
    dom.quizModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function renderQuizQuestion() {
    if (!currentQuiz) return;
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const answered = currentQuiz.selectedAnswers[currentQuiz.currentIndex];

    dom.quizProgressText.textContent = `Question ${currentQuiz.currentIndex + 1} of ${currentQuiz.questions.length}`;
    dom.quizTypeBadge.textContent = question.typeLabel;
    dom.quizSourceBadge.textContent = currentQuiz.isSample ? 'Sample Quiz' : 'Personalized';
    dom.quizQuestionText.textContent = question.prompt;
    dom.quizOptionsList.replaceChildren();
    dom.quizFeedback.classList.add('hidden');
    dom.nextQuizBtn.disabled = !answered;
    dom.nextQuizBtn.textContent = currentQuiz.currentIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next';
    dom.quizScoreText.textContent = `Score: ${currentQuiz.score}/${currentQuiz.selectedAnswers.length}`;

    question.options.forEach(option => {
        const isSelected = answered?.selectedAnswer === option;
        const isCorrect = option === question.correctAnswer;
        const button = createElement('button', {
            type: 'button',
            className: 'quiz-option w-full text-left p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors',
            text: option
        });

        if (answered) {
            button.disabled = true;
            if (isCorrect) {
                button.className = 'quiz-option w-full text-left p-4 border border-emerald-300 bg-emerald-50 text-emerald-800 rounded-xl font-semibold';
            } else if (isSelected) {
                button.className = 'quiz-option w-full text-left p-4 border border-orange-300 bg-orange-50 text-orange-800 rounded-xl font-semibold';
            }
        } else {
            button.addEventListener('click', () => selectQuizAnswer(option));
        }

        dom.quizOptionsList.appendChild(button);
    });

    if (answered) {
        renderQuizFeedback(question, answered.isCorrect);
    }
}

function selectQuizAnswer(selectedAnswer) {
    if (!currentQuiz) return;
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    currentQuiz.selectedAnswers[currentQuiz.currentIndex] = {
        questionId: question.id,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
    };
    if (isCorrect) currentQuiz.score += 1;
    renderQuizQuestion();
}

function renderQuizFeedback(question, isCorrect) {
    dom.quizFeedback.classList.remove('hidden');
    dom.quizFeedback.className = isCorrect
        ? 'mt-5 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200'
        : 'mt-5 p-4 rounded-xl bg-orange-50 text-orange-800 border border-orange-200';
    dom.quizFeedback.replaceChildren(
        createElement('p', {
            className: 'font-bold mb-1',
            text: isCorrect ? 'Correct' : 'Not quite'
        }),
        createElement('p', {
            className: 'text-sm',
            text: question.explanation
        })
    );
    dom.nextQuizBtn.disabled = false;
    dom.quizScoreText.textContent = `Score: ${currentQuiz.score}/${currentQuiz.selectedAnswers.length}`;
}

function goToNextQuizQuestion() {
    if (!currentQuiz) return;
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex += 1;
        renderQuizQuestion();
        return;
    }
    finishEcoQuiz();
}

function finishEcoQuiz() {
    if (!currentQuiz) return;
    const stats = getQuizStats();
    const alreadyCompleted = stats.completedQuizIds.includes(currentQuiz.id);
    const incorrect = currentQuiz.questions.length - currentQuiz.score;
    let awardedXp = 0;

    if (!alreadyCompleted) {
        awardedXp = currentQuiz.score * 5 + 2 + (currentQuiz.score === currentQuiz.questions.length ? 5 : 0);
        stats.quizXp += awardedXp;
        stats.quizzesCompleted += 1;
        stats.correctAnswers += currentQuiz.score;
        stats.incorrectAnswers += incorrect;
        if (currentQuiz.score === currentQuiz.questions.length) stats.perfectQuizzes += 1;
        stats.completedQuizIds.push(currentQuiz.id);
        stats.completedQuestionIds.push(...currentQuiz.questions.map(question => question.id));
        saveQuizStats(stats);
    }

    dom.quizQuestionCard.classList.add('hidden');
    dom.quizEmptyState.classList.add('hidden');
    dom.quizSummaryCard.classList.remove('hidden');
    dom.quizSummaryCard.replaceChildren(
        icon(currentQuiz.score === currentQuiz.questions.length ? 'ph ph-trophy text-amber-500 text-5xl' : 'ph ph-graduation-cap text-emerald-500 text-5xl'),
        createElement('h3', { className: 'text-2xl font-bold text-gray-800 mt-3', text: `Score: ${currentQuiz.score}/${currentQuiz.questions.length}` }),
        createElement('p', {
            className: 'text-sm text-gray-500 mt-2',
            text: alreadyCompleted
                ? 'You already completed this quiz, so XP was not awarded again.'
                : `XP earned: ${awardedXp} (+5 per correct, +2 completion${currentQuiz.score === currentQuiz.questions.length ? ', +5 perfect bonus' : ''}).`
        }),
        createElement('button', {
            type: 'button',
            className: 'mt-5 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors',
            text: 'Done'
        })
    );
    dom.quizSummaryCard.querySelector('button').addEventListener('click', closeEcoQuiz);

    renderQuizInlineStats();
    renderChart();
    updateUserLevel();
    checkAchievements();
}

function updateUserLevel() {
    const { totalEcoScore } = getMetrics();
    let level = {
        icon: '1',
        name: t('sprout'),
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        threshold: 0,
        nextThreshold: 100
    };

    if (totalEcoScore >= 500) {
        level = {
            icon: '3',
            name: t('master'),
            color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            threshold: 500,
            nextThreshold: null
        };
    } else if (totalEcoScore >= 100) {
        level = {
            icon: '2',
            name: t('warrior'),
            color: 'bg-blue-50 text-blue-700 border-blue-200',
            threshold: 100,
            nextThreshold: 500
        };
    }

    dom.levelIcon.textContent = level.icon;
    dom.levelText.textContent = level.name;
    dom.userLevelBadge.className = `flex items-center gap-1 px-2 py-0.5 ${level.color} rounded-full text-xs font-bold border`;

    const currentXpEl = document.getElementById('currentXp');
    const nextLevelXpEl = document.getElementById('nextLevelXp');
    const xpBar = document.getElementById('xpProgressBar');
    currentXpEl.textContent = `${totalEcoScore} ${t('xp')}`;

    if (level.nextThreshold) {
        nextLevelXpEl.textContent = `${t('next')} ${level.nextThreshold} XP`;
        const progress = ((totalEcoScore - level.threshold) / (level.nextThreshold - level.threshold)) * 100;
        xpBar.style.width = `${Math.min(progress, 100)}%`;
    } else {
        nextLevelXpEl.textContent = `${t('master')}!`;
        xpBar.style.width = '100%';
    }
}

function renderAchievements() {
    const unlockedIds = new Set(getUnlockedAchievementIds());
    dom.achievementList.replaceChildren();
    achievements.forEach(achievement => {
        const unlocked = unlockedIds.has(achievement.id);
        dom.achievementList.appendChild(createElement('div', {
            className: `achievement-card border rounded-xl p-4 ${unlocked ? 'border-amber-200 bg-amber-50' : 'locked border-gray-100 bg-gray-50'}`
        }, [
            createElement('p', { className: 'font-bold text-gray-800', text: achievement.title }),
            createElement('p', { className: 'text-xs text-gray-500 mt-1', text: achievement.description }),
            createElement('p', { className: `text-xs font-semibold mt-2 ${unlocked ? 'text-amber-700' : 'text-gray-400'}`, text: unlocked ? 'Unlocked' : 'Locked' })
        ]));
    });
}

function checkAchievements() {
    const metrics = getMetrics();
    const unlockedIds = new Set(getUnlockedAchievementIds());
    const newlyUnlocked = [];

    achievements.forEach(achievement => {
        if (!unlockedIds.has(achievement.id) && achievement.unlocked(metrics)) {
            unlockedIds.add(achievement.id);
            newlyUnlocked.push(achievement);
        }
    });

    saveUnlockedAchievementIds([...unlockedIds]);
    renderAchievements();

    if (newlyUnlocked.length > 0) {
        showAchievementBanner(newlyUnlocked[0]);
        triggerConfetti();
    }
}

function showAchievementBanner(achievement) {
    dom.achievementBanner.textContent = `Achievement unlocked: ${achievement.title}`;
    dom.achievementBanner.classList.remove('hidden');
    setTimeout(() => dom.achievementBanner.classList.add('hidden'), 4500);
}

function triggerConfetti() {
    if (typeof confetti !== 'function') return;
    const duration = 1600;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }
        const particleCount = 24 * (timeLeft / duration);
        confetti({ particleCount, spread: 65, origin: { x: 0.2, y: 0.2 }, zIndex: 2000 });
        confetti({ particleCount, spread: 65, origin: { x: 0.8, y: 0.2 }, zIndex: 2000 });
    }, 220);
}

function formatCategoryName(category) {
    const labels = {
        plastic: 'Plastic',
        metal: 'Metal',
        paper: 'Paper',
        glass: 'Glass',
        special: 'E-waste / Battery',
        other: 'Other',
        none: 'None yet'
    };
    return labels[category] || 'Other';
}

function formatCo2(valueKg) {
    const clamped = clampNumber(valueKg, 0, 10000, 0);
    if (clamped < 1) return `${Math.round(clamped * 1000)}g`;
    return `${clamped.toFixed(2)}kg`;
}

function renderImpactDashboard(metrics = getMetrics()) {
    if (!dom.impactStatsGrid || !dom.categoryBreakdownList) return;

    dom.impactStatsGrid.replaceChildren();
    dom.categoryBreakdownList.replaceChildren();

    const statCards = [
        { label: 'Total scans', value: metrics.totalScans, iconClass: 'ph ph-camera text-emerald-600' },
        { label: 'Eco score', value: metrics.totalEcoScore, iconClass: 'ph ph-leaf text-emerald-600' },
        { label: 'Recyclable items', value: metrics.recyclableCount, iconClass: 'ph ph-recycle text-emerald-600' },
        { label: 'Non-recyclable', value: metrics.nonRecyclableCount, iconClass: 'ph ph-warning text-orange-600' },
        { label: 'Special handling', value: metrics.specialHandlingCount, iconClass: 'ph ph-shield-warning text-amber-600' },
        { label: 'Most common', value: formatCategoryName(metrics.mostCommonCategory), iconClass: 'ph ph-stack text-blue-600' },
        { label: 'Estimated CO2 saved', value: formatCo2(metrics.estimatedCo2Kg), iconClass: 'ph ph-cloud text-blue-600' },
        { label: 'Quiz XP', value: metrics.quizStats.quizXp, iconClass: 'ph ph-graduation-cap text-emerald-600' },
        { label: 'Quizzes completed', value: metrics.quizStats.quizzesCompleted, iconClass: 'ph ph-check-circle text-emerald-600' },
        { label: 'Correct answers', value: metrics.quizStats.correctAnswers, iconClass: 'ph ph-thumbs-up text-blue-600' },
        { label: 'Incorrect answers', value: metrics.quizStats.incorrectAnswers, iconClass: 'ph ph-x-circle text-orange-600' },
        { label: 'Quiz accuracy', value: `${metrics.quizAccuracy}%`, iconClass: 'ph ph-target text-purple-600' }
    ];

    statCards.forEach(card => {
        dom.impactStatsGrid.appendChild(createElement('div', {
            className: 'impact-stat-card bg-gray-50 rounded-xl p-4 border border-gray-100'
        }, [
            createElement('div', { className: 'flex items-center gap-2 mb-2' }, [
                icon(`${card.iconClass} text-xl`),
                createElement('p', { className: 'text-xs font-bold text-gray-500 uppercase', text: card.label })
            ]),
            createElement('p', { className: 'text-xl font-bold text-gray-800', text: card.value })
        ]));
    });

    dom.impactSummaryText.textContent = `${metrics.totalScans} scans | ${formatCo2(metrics.estimatedCo2Kg)} estimated CO2 saved`;

    const maxCategoryCount = Math.max(1, ...Object.values(metrics.categoryCounts));
    const orderedCategories = ['plastic', 'metal', 'paper', 'glass', 'special', 'other'];
    orderedCategories.forEach(category => {
        const count = metrics.categoryCounts[category] || 0;
        const percent = Math.round((count / maxCategoryCount) * 100);
        const co2 = metrics.categoryCo2[category] || 0;

        dom.categoryBreakdownList.appendChild(createElement('div', {
            className: 'category-breakdown-row'
        }, [
            createElement('div', { className: 'flex items-center justify-between text-sm mb-1' }, [
                createElement('span', { className: 'font-semibold text-gray-700', text: formatCategoryName(category) }),
                createElement('span', { className: 'text-gray-500', text: `${count} items | ${formatCo2(co2)}` })
            ]),
            createElement('div', { className: 'h-2.5 rounded-full bg-gray-100 overflow-hidden' }, [
                createElement('div', {
                    className: 'h-full rounded-full bg-emerald-500'
                })
            ])
        ]));

        const bar = dom.categoryBreakdownList.lastElementChild.querySelector('.bg-emerald-500');
        bar.style.width = `${percent}%`;
    });
}

function renderChart() {
    const metrics = getMetrics();
    renderImpactDashboard(metrics);

    if (!dom.statsChartCanvas || typeof Chart !== 'function') return;
    if (statsChartInstance) {
        statsChartInstance.destroy();
        statsChartInstance = null;
    }

    const { history, objects } = metrics;
    dom.totalRecycledCount.textContent = objects.length || history.length;
    if (history.length === 0) return;

    const recyclableCount = metrics.recyclableCount;
    const partialCount = objects.filter(item => getStatusKind(item.recyclable) === 'partial').length;
    const otherCount = Math.max(0, objects.length - recyclableCount - partialCount);

    statsChartInstance = new Chart(dom.statsChartCanvas, {
        type: 'doughnut',
        data: {
            labels: [t('recyclable'), t('partial'), t('nonRecyclable')],
            datasets: [{
                data: [recyclableCount, partialCount, otherCount],
                backgroundColor: ['#10b981', '#3b82f6', '#f97316'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        font: { size: 12, family: 'inherit' }
                    }
                }
            }
        }
    });
}

function openSettings() {
    dom.settingsModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    selectedProvider = localStorage.getItem(STORAGE_KEYS.provider) || selectedProvider || 'openai';
    dom.providerSelect.value = aiProviders[selectedProvider] ? selectedProvider : 'openai';
    
    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    if (dom.demoModeSwitch) {
        dom.demoModeSwitch.checked = isDemoMode;
    }
    updateDemoModeUI(isDemoMode);

    loadProviderSettings(dom.providerSelect.value);
}

function closeSettings() {
    dom.settingsModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function updateApiKeyStatus(isConfigured) {
    const providerMeta = aiProviders[dom.providerSelect.value] || aiProviders.openai;
    dom.apiKeyStatus.classList.remove('hidden');
    dom.apiKeyStatus.className = isConfigured
        ? 'p-3 rounded-xl text-sm flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200'
        : 'p-3 rounded-xl text-sm flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200';
    dom.apiKeyStatus.replaceChildren(
        icon(isConfigured ? 'ph ph-check-circle' : 'ph ph-warning'),
        document.createTextNode(isConfigured ? `${providerMeta.label} API key is configured for this browser.` : `No ${providerMeta.label} API key found. Analysis will fail until one is added.`)
    );
}

function loadProviderSettings(provider) {
    const normalizedProvider = aiProviders[provider] ? provider : 'openai';
    const providerMeta = aiProviders[normalizedProvider];
    const config = getProviderConfig(normalizedProvider);

    dom.providerSelect.value = normalizedProvider;
    dom.apiKeyLabel.textContent = `${providerMeta.label} API Key`;
    dom.apiKeyInput.placeholder = providerMeta.keyPlaceholder;
    dom.apiKeyInput.value = config.apiKey;
    dom.modelSelect.replaceChildren();
    providerMeta.recommendedModels.forEach(model => {
        dom.modelSelect.appendChild(createElement('option', {
            text: model
        }));
        dom.modelSelect.lastElementChild.value = model;
    });
    dom.modelSelect.value = providerMeta.recommendedModels.includes(config.selectedModel)
        ? config.selectedModel
        : providerMeta.defaultModel;
    dom.modelInput.value = config.customModel;
    dom.modelInput.placeholder = `Optional custom ${providerMeta.label} model`;
    dom.modelHint.textContent = providerMeta.modelHint;

    dom.apiKeyHelp.replaceChildren(
        document.createTextNode(`${providerMeta.keyHelpText} `),
        createElement('a', {
            className: 'text-emerald-600 hover:underline',
            text: providerMeta.label
        })
    );
    const link = dom.apiKeyHelp.querySelector('a');
    link.href = providerMeta.keyHelpUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    updateApiKeyStatus(Boolean(config.apiKey));
}

function saveSettings() {
    const provider = dom.providerSelect.value;
    const providerMeta = aiProviders[provider] || aiProviders.openai;
    const key = dom.apiKeyInput.value.trim();
    const selectedModel = dom.modelSelect.value || providerMeta.defaultModel;
    const customModel = dom.modelInput.value.trim();
    const effectiveModel = customModel || selectedModel;

    if (!key) {
        showToast(`Enter a valid ${providerMeta.label} API key.`);
        return;
    }
    if (!effectiveModel) {
        showToast(`Enter a vision-capable ${providerMeta.label} model name.`);
        return;
    }

    saveProviderConfig({ provider, apiKey: key, selectedModel, customModel });
    updateApiKeyStatus(true);
    closeSettings();
    showToast(`${providerMeta.label} settings saved locally.`);
}

function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
        toast = createElement('div', {
            className: 'fixed left-1/2 bottom-6 -translate-x-1/2 z-[3000] bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm max-w-[90vw]'
        });
        toast.id = 'appToast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => toast.classList.add('hidden'), 3200);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'vi' : 'en';
    dom.langToggleBtn.textContent = currentLanguage === 'en' ? 'EN' : 'VI';
    loadHistory();
    renderChart();
    updateUserLevel();
}

function closeResults() {
    dom.resultsModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    resetToCamera();
}

function bindEvents() {
    dom.scanModeOptions.addEventListener('click', event => {
        const button = event.target.closest('[data-mode]');
        if (button) setScanMode(button.dataset.mode);
    });
    dom.langToggleBtn.addEventListener('click', toggleLanguage);
    dom.settingsBtn.addEventListener('click', openSettings);
    dom.closeSettingsBtn.addEventListener('click', closeSettings);
    dom.cancelSettingsBtn.addEventListener('click', closeSettings);
    dom.saveSettingsBtn.addEventListener('click', saveSettings);
    dom.providerSelect.addEventListener('change', () => {
        selectedProvider = dom.providerSelect.value;
        localStorage.setItem(STORAGE_KEYS.provider, selectedProvider);
        loadProviderSettings(selectedProvider);
    });
    dom.startQuizBtn.addEventListener('click', startEcoQuiz);
    dom.closeQuizBtn.addEventListener('click', closeEcoQuiz);
    dom.nextQuizBtn.addEventListener('click', goToNextQuizQuestion);
    dom.toggleApiKeyBtn.addEventListener('click', () => {
        const isHidden = dom.apiKeyInput.type === 'password';
        dom.apiKeyInput.type = isHidden ? 'text' : 'password';
        dom.toggleApiKeyBtn.replaceChildren(icon(isHidden ? 'ph ph-eye-slash text-lg' : 'ph ph-eye text-lg'));
    });
    dom.scanBtn.addEventListener('click', () => {
        if (!stream) {
            dom.fileInput.click();
            return;
        }
        captureImage();
    });
    dom.fileInput.addEventListener('change', handleFileUpload);
    dom.closePreviewBtn.addEventListener('click', resetToCamera);
    dom.retakeBtn.addEventListener('click', resetToCamera);
    dom.analyzeBtn.addEventListener('click', analyzeWithAI);
    dom.closeResultsBtn.addEventListener('click', closeResults);
    dom.clearHistoryBtn.addEventListener('click', clearHistory);
    dom.saveToHistoryBtn.addEventListener('click', () => {
        if (lastAnalysisResult) addToHistory(lastAnalysisResult);
    });
    if (dom.demoModeSwitch) {
        dom.demoModeSwitch.addEventListener('change', event => {
            const isActive = event.target.checked;
            localStorage.setItem(STORAGE_KEYS.demoMode, String(isActive));
            updateDemoModeUI(isActive);
            showToast(isActive ? 'Offline Demo Mode activated.' : 'Offline Demo Mode deactivated.');
        });
    }
    window.addEventListener('beforeunload', stopCamera);
}

function updateDemoModeUI(isActive) {
    if (dom.demoSelectorPanel) {
        dom.demoSelectorPanel.classList.toggle('hidden', !isActive);
    }
    
    const demoLabel = document.getElementById('currentDemoLabel');
    if (demoLabel) {
        demoLabel.textContent = isActive ? t('demoModeOn') : t('demoModeOff');
    }
}

function initializeApp() {
    setupPwa();
    bindEvents();
    setScanMode(selectedScanMode);
    
    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    if (dom.demoModeSwitch) {
        dom.demoModeSwitch.checked = isDemoMode;
    }
    updateDemoModeUI(isDemoMode);

    initCamera();
    loadHistory();
    renderChart();
    updateUserLevel();
    renderAchievements();
    renderQuizInlineStats();
}

initializeApp();
