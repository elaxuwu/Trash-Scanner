const dom = {
    videoCanvas: document.getElementById('videoCanvas'), // <video> when live, <img> when photo shown
    scanBtn: document.getElementById('scanBtn'),
    scanActionSection: document.getElementById('scanActionSection'),
    flashOverlay: document.getElementById('flashOverlay'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingModeText: document.getElementById('loadingModeText'),
    dropZoneOverlay: document.getElementById('dropZoneOverlay'),
    fileInput: document.getElementById('fileInput'),
    cameraSection: document.getElementById('cameraSection'),
    inputChoicePanel: document.getElementById('inputChoicePanel'),
    cameraStatusMessage: document.getElementById('cameraStatusMessage'),
    // New HUD elements
    confirmBtn: document.getElementById('confirmBtn'),
    scanHud: document.getElementById('scanHud'),
    zoomToggleBtn: document.getElementById('zoomToggleBtn'),
    // New TikTok-style elements
    closeCameraBtn: document.getElementById('closeCameraBtn'),
    galleryBtn: document.getElementById('galleryBtn'),
    zoomSlider: document.getElementById('zoomSlider'),
    zoomLabel: document.getElementById('zoomLabel'),
    zoomControlWrap: document.getElementById('zoomControlWrap'),
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    cancelSettingsBtn: document.getElementById('cancelSettingsBtn'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    providerSelect: document.getElementById('providerSelect'),
    modelSelect: document.getElementById('modelSelect'),
    modelInput: document.getElementById('modelInput'),
    modelHint: document.getElementById('modelHint'),
    modelInputWrapper: document.getElementById('modelInputWrapper'),
    apiKeyLabel: document.getElementById('apiKeyLabel'),
    apiKeyHelp: document.getElementById('apiKeyHelp'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    toggleApiKeyBtn: document.getElementById('toggleApiKeyBtn'),
    apiKeyStatus: document.getElementById('apiKeyStatus'),
    resultsModal: document.getElementById('resultsModal'),
    closeResultsBtn: document.getElementById('closeResultsBtn'),
    resultImageFrame: document.getElementById('resultImageFrame'),
    resultImage: document.getElementById('resultImage'),
    resultItemName: document.getElementById('resultItemName'),
    resultTimestamp: document.getElementById('resultTimestamp'),
    resultSummaryEcoScore: document.getElementById('resultSummaryEcoScore'),
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
    languageSelect: document.getElementById('languageSelect'),
    themeToggleGroup: document.getElementById('themeToggleGroup'),
    lightThemeBtn: document.getElementById('lightThemeBtn'),
    darkThemeBtn: document.getElementById('darkThemeBtn'),
    appVersionLabel: document.getElementById('appVersionLabel'),
    appVersionValue: document.getElementById('appVersionValue'),
    clearLocalCacheBtn: document.getElementById('clearLocalCacheBtn'),
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

const APP_VERSION = 'v16';
const APP_CACHE_PREFIX = 'recyclecheck-';

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
    demoMode: 'recycle_demo_mode',
    language: 'recycle_language',
    theme: 'recycle_theme'
};

const MAX_HISTORY_ITEMS = 12;
const MAX_IMAGE_DIMENSION = 1280;
const HISTORY_IMAGE_DIMENSION = 420;
const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

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
        instruction: 'Explain why each item is recyclable or non-recyclable.'
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
        keyHelpText: 'Get your API key from OpenAI Platform.',
        keyHelpUrl: 'https://platform.openai.com/api-keys'
    },
    openrouter: {
        label: 'OpenRouter',
        defaultModel: 'openai/gpt-4o-mini',
        recommendedModels: ['openai/gpt-4o-mini', 'google/gemini-2.0-flash-001'],
        keyPlaceholder: 'sk-or-...',
        keyHelpText: 'Get your API key from OpenRouter.',
        keyHelpUrl: 'https://openrouter.ai/keys'
    },
    gemini: {
        label: 'Gemini',
        defaultModel: 'gemini-1.5-flash',
        recommendedModels: ['gemini-1.5-flash'],
        keyPlaceholder: 'AI...',
        keyHelpText: 'Get your API key from Google AI Studio.',
        keyHelpUrl: 'https://aistudio.google.com/app/apikey'
    }
};

const scanModeTranslationKeys = {
    quick: { label: 'quick', description: 'quickDesc', loading: 'quickLoading' },
    detailed: { label: 'detailed', description: 'detailedDesc', loading: 'detailedLoading' },
    batch: { label: 'batch', description: 'batchDesc', loading: 'batchLoading' },
    education: { label: 'education', description: 'educationDesc', loading: 'educationLoading' },
    carbon: { label: 'carbon', description: 'carbonDesc', loading: 'carbonLoading' }
};

const bottomNavTranslationKeys = {
    scan: 'navScan',
    history: 'navHistory',
    quiz: 'navQuiz',
    profile: 'navProfile'
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

const achievementIconClasses = {
    eco_starter: 'ph ph-leaf',
    recycling_hero: 'ph ph-recycle',
    plastic_hunter: 'ph ph-magnifying-glass',
    battery_guardian: 'ph ph-shield-warning',
    batch_master: 'ph ph-images',
    eco_learner: 'ph ph-graduation-cap',
    sorting_student: 'ph ph-student',
    perfect_sorter: 'ph ph-trophy',
    waste_wisdom: 'ph ph-brain'
};

const levelIconClasses = {
    sprout: 'ph ph-leaf',
    eco_starter: 'ph ph-leaf',
    eco_learner: 'ph ph-graduation-cap',
    warrior: 'ph ph-shield-check',
    eco_warrior: 'ph ph-shield-check',
    eco_champion: 'ph ph-trophy',
    master: 'ph ph-medal',
    eco_master: 'ph ph-medal',
    recycle_master: 'ph ph-medal',
    eco_legend: 'ph ph-crown',
    default: 'ph ph-star'
};

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

const translationOverrides = {
    en: {
        appTitle: 'RecycleCheck AI',
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
        done: 'Done',
        cancel: 'Cancel',
        saveChanges: 'Save Changes',
        settings: 'Settings',
        navScan: 'Scan',
        navHistory: 'History',
        navQuiz: 'Quiz',
        navProfile: 'Profile',
        uploadImage: 'Upload Image',
        analyzingWaste: 'Analyzing waste...',
        loadingGuidance: 'Building recycling guidance',
        uploadPasteDropPhoto: 'Upload, paste, drag & drop, or take a photo',
        pasteShortcut: 'Tip: Press Ctrl+V to paste a screenshot',
        dropImagePreview: 'Drop image to preview',
        onlyImagesAccepted: 'Only image files are accepted',
        scanMode: 'Scan Mode',
        scanModeDesc: 'Choose how deeply the AI should analyze this image.',
        quick: 'Quick',
    quickDesc: 'Fast answer',
    quickLoading: 'Fast recyclable / not recyclable check',
    detailed: 'Detailed',
    detailedDesc: 'Materials + steps',
    detailedLoading: 'Analyzing materials and preparation steps',
    batch: 'Batch',
    batchDesc: 'Multiple items',
    batchLoading: 'Finding multiple objects across the 4x4 grid',
    education: 'Education',
    educationDesc: 'Explain why',
    educationLoading: 'Explaining recycling decisions',
    carbon: 'Carbon',
    carbonDesc: 'Impact estimate',
    carbonLoading: 'Estimating environmental impact',
        impactDashboard: 'Personal Impact Dashboard',
        totalItemsTracked: 'Total Items Tracked',
        noScansYet: 'No scans yet',
        categoryBreakdown: 'Category Breakdown',
        co2Note: 'CO2 values are rough educational estimates.',
        achievements: 'Achievements',
        ecoQuiz: 'Eco Quiz',
        quizIntro: 'Practice waste sorting with questions personalized from your scan history.',
        startQuiz: 'Start Quiz',
        recentScans: 'Recent Scans',
        clearAll: 'Clear All',
        offlineDemoMode: 'Try Without Signing Up',
        offlineDemoDesc: 'Simulate scans without internet or API keys',
        aiProvider: 'AI Provider',
        visionWarning: 'Connect your own AI account to unlock full scanning capabilities. A vision-capable model is required.',
        recommendedVisionModel: 'Recommended Vision Model',
        aiModelHint: 'Select a vision-capable model from the list.',
        recommendedVisionHint: 'Recommended options are vision-capable models.',
        customModelOptional: 'Custom Model (optional)',
        customModelPlaceholder: 'Enter model name (e.g. gpt-4o, claude-3-opus)',
        customModelHelp: 'Enter the full model name. Only vision-capable models will work.',
        openAiApiKey: 'OpenAI API Key',
        getApiKeyFrom: 'Get your API key from',
        apiKeyConfigured: '{provider} API key is configured for this browser.',
        apiKeyMissing: 'No {provider} API key found. Analysis will fail until one is added.',
        analysisResults: 'Analysis Results',
        offlineDemoData: 'Offline Demo Data',
        summary: 'Summary',
        detectedItems: 'Detected Items',
        recyclabilityStatus: 'Recyclability Status',
        whatNow: 'What should I do now?',
        selectItemPlan: 'Select an item to see its disposal plan.',
        materialBreakdown: 'Material Breakdown',
        preparationSteps: 'Preparation Steps',
        sustainabilityTracker: 'Sustainability Tracker',
        ecoScore: 'Eco Score',
        carbonSaved: 'CO2 Saved',
        saveToHistory: 'Save to History',
        immediateAction: 'Immediate action',
        correctBinHandling: 'Correct bin / handling',
        safetyWarning: 'Safety warning',
        mistakeToAvoid: 'Common mistake to avoid',
        steps: 'Steps',
        whyThisMatters: 'Why this matters',
        noMaterialBreakdown: 'No material breakdown available.',
        noPreparationSteps: 'No preparation steps available.',
        noComponentDetails: 'No component details were returned for this item.',
        noDisposalPlan: 'No disposal plan available for this scan.',
        retakeForPlan: 'Try retaking the photo with better lighting or selecting a detected item.',
        noStepPlan: 'No step-by-step plan was returned. Follow the immediate action and local disposal rules.',
        noSafetyWarning: 'No special safety warning identified.',
        totalScans: 'Total scans',
        recyclableItems: 'Recyclable items',
        nonRecyclableItems: 'Non-recyclable items',
        specialHandlingItems: 'Special handling',
        mostCommon: 'Most common',
        estimatedCo2Saved: 'Estimated CO2 saved',
        quizXp: 'Quiz XP',
        quizzesCompleted: 'Quizzes completed',
        correctAnswers: 'Correct answers',
        incorrectAnswers: 'Incorrect answers',
        quizAccuracy: 'Quiz accuracy',
        items: 'items',
        scansSummary: '{count} scans | {co2} estimated CO2 saved',
        plastic: 'Plastic',
        metal: 'Metal',
        paper: 'Paper',
        glass: 'Glass',
        eWasteBattery: 'E-waste / Battery',
        other: 'Other',
        noneYet: 'None yet',
        unlocked: 'Unlocked',
        locked: 'Locked',
        achievementUnlocked: 'Achievement unlocked: {title}',
        questionProgress: 'Question {current} of {total}',
        sampleQuiz: 'Sample Quiz',
        personalized: 'Personalized',
        disposalAction: 'Disposal action',
        preparationStep: 'Preparation step',
        recyclableStatus: 'Recyclable status',
        specialHandling: 'Special handling',
        quizMaterialBreakdown: 'Material breakdown',
        correct: 'Correct',
        notQuite: 'Not quite',
        score: 'Score: {score}/{total}',
        quizSampleDesc: 'Your personalized quiz becomes richer after you complete scans. This sample uses common waste items.',
        quizNoXpAgain: 'You already completed this quiz, so XP was not awarded again.',
        quizXpEarned: 'XP earned: {xp} (+5 per correct, +2 completion{bonus}).',
        perfectBonus: ', +5 perfect bonus',
        imageUploaded: 'Image uploaded. Preview ready.',
        imagePasted: 'Image pasted. Preview ready.',
        imageDropped: 'Image dropped. Preview ready.',
        firstImageOnly: 'Using the first image only.',
        noFileFound: 'No file found.',
        chooseImageFile: 'Please choose an image file.',
        chooseSmallImage: 'Please choose an image smaller than 12 MB.',
        imageLoadFailed: 'Could not load that image. Please try another file.',
        noClipboardImage: 'No image found in clipboard. Try copying a screenshot or image first.',
        dropImageFile: 'Please drop an image file.',
        addProviderKey: 'Add a {provider} API key before scanning.',
        chooseProviderModel: 'Choose a vision-capable {provider} model before scanning.',
        captureFirst: 'Capture or upload an image first.',
        analysisFailed: '{provider} analysis failed: {message}',
        demoAnalysisFailed: 'Demo analysis failed: {message}',
        invalidProviderKey: 'Enter a valid {provider} API key.',
        invalidProviderModel: 'Enter a vision-capable {provider} model name.',
        providerSettingsSaved: '{provider} settings saved locally.',
        clearHistoryConfirm: 'Clear all local scan history and progress?',
        demoActivated: 'Offline Demo Mode activated.',
        demoDeactivated: 'Offline Demo Mode deactivated.',
        demoModeOn: 'Offline Mode On',
        demoModeOff: 'Offline Mode Off',
        demoActive: 'Offline Demo Active',
        demoSelectSeeing: 'Select what the camera is seeing:',
        scenarioBottle: 'Scenario 1: Plastic Bottle (Composite)',
        scenarioBattery: 'Scenario 2: Household Battery (Hazardous)',
        scenarioBag: 'Scenario 3: Single-Use Plastic Bag (Soft Plastic)',
        scenarioMixed: 'Scenario 4: Mixed Waste (Can, Box, Battery, Styrofoam)',
        retake: 'Retake',
        analyze: 'Analyze',
        itemDetected: '{count} items detected',
        itemAnalyzed: '{count} items analyzed'
    },
    vi: {
        appTitle: 'RecycleCheck AI',
        noScans: 'Chưa có lượt quét nào gần đây.',
        recyclable: 'Có thể tái chế',
        nonRecyclable: 'Không thể tái chế',
        partial: 'Tái chế một phần',
        special: 'Cần xử lý đặc biệt',
        unclear: 'Ảnh chưa rõ',
        sprout: 'Mầm Non',
        warrior: 'Chiến Binh Xanh',
        master: 'Bậc Thầy Tái Chế',
        next: 'Kế tiếp:',
        xp: 'XP',
        done: 'Hoàn tất',
        cancel: 'Hủy',
        saveChanges: 'Lưu thay đổi',
        settings: 'Cài đặt',
        navScan: 'Quét',
        navHistory: 'Lịch sử',
        navQuiz: 'Câu hỏi',
        navProfile: 'Hồ sơ',
        uploadImage: 'Tải ảnh lên',
        analyzingWaste: 'Đang phân tích rác...',
        loadingGuidance: 'Đang tạo hướng dẫn phân loại',
        uploadPasteDropPhoto: 'Tải ảnh, dán ảnh, kéo thả hoặc chụp ảnh',
        pasteShortcut: 'Mẹo: Nhấn Ctrl+V để dán ảnh chụp màn hình',
        dropImagePreview: 'Kéo và thả ảnh vào đây',
        onlyImagesAccepted: 'Chỉ chấp nhận tệp hình ảnh',
        scanMode: 'Chế độ quét',
        scanModeDesc: 'Chọn mức độ phân tích của AI cho ảnh này.',
        quick: 'Nhanh',
    quickDesc: 'Trả lời nhanh',
    quickLoading: 'Kiểm tra nhanh có thể tái chế hay không',
    detailed: 'Chi tiết',
    detailedDesc: 'Vật liệu + các bước',
    detailedLoading: 'Đang phân tích vật liệu và các bước chuẩn bị',
    batch: 'Nhiều vật phẩm',
    batchDesc: 'Nhiều món trong ảnh',
    batchLoading: 'Đang tìm nhiều vật thể trong lưới 4x4',
    education: 'Giải thích',
    educationDesc: 'Giải thích lý do',
    educationLoading: 'Đang giải thích quyết định tái chế',
    carbon: 'Tác động carbon',
    carbonDesc: 'Ước tính tác động',
    carbonLoading: 'Đang ước tính tác động môi trường',
        impactDashboard: 'Bảng tác động cá nhân',
        totalItemsTracked: 'Tổng vật phẩm đã theo dõi',
        noScansYet: 'Chưa có lượt quét',
        categoryBreakdown: 'Phân tích theo loại',
        co2Note: 'Giá trị CO₂ chỉ là ước tính giáo dục.',
        achievements: 'Thành tựu',
        ecoQuiz: 'Câu đố sinh thái',
        quizIntro: 'Luyện phân loại rác bằng câu hỏi cá nhân hóa từ lịch sử quét.',
        startQuiz: 'Bắt đầu câu đố',
        recentScans: 'Lượt quét gần đây',
        clearAll: 'Xóa tất cả',
        offlineDemoMode: 'Dùng thử không cần đăng ký',
        offlineDemoDesc: 'Mô phỏng quét khi không có internet hoặc API key',
        aiProvider: 'Nhà cung cấp AI',
        visionWarning: 'Kết nối tài khoản AI của bạn để mở khóa tính năng quét đầy đủ. Cần một mô hình có khả năng xử lý hình ảnh.',
        recommendedVisionModel: 'Mô hình đề xuất có hỗ trợ hình ảnh',
        aiModelHint: 'Chọn một mô hình có hỗ trợ hình ảnh từ danh sách.',
        recommendedVisionHint: 'Các lựa chọn đề xuất đều là mô hình có hỗ trợ hình ảnh.',
        customModelOptional: 'Mô hình tùy chỉnh (không bắt buộc)',
        customModelPlaceholder: 'Nhập tên mô hình (vd: gpt-4o, claude-3-opus)',
        customModelHelp: 'Nhập tên đầy đủ của mô hình. Chỉ mô hình có hỗ trợ hình ảnh mới hoạt động.',
        openAiApiKey: 'API key OpenAI',
        getApiKeyFrom: 'Lấy API key từ',
        apiKeyConfigured: 'API key {provider} đã được lưu trong trình duyệt này.',
        apiKeyMissing: 'Chưa có API key {provider}. Phân tích sẽ thất bại cho đến khi bạn thêm key.',
        analysisResults: 'Kết quả phân tích',
        offlineDemoData: 'Dữ liệu demo ngoại tuyến',
        summary: 'Tóm tắt',
        detectedItems: 'Vật phẩm phát hiện',
        recyclabilityStatus: 'Trạng thái tái chế',
        whatNow: 'Tôi nên làm gì bây giờ?',
        selectItemPlan: 'Chọn một vật phẩm để xem kế hoạch xử lý.',
        materialBreakdown: 'Phân tích vật liệu',
        preparationSteps: 'Các bước chuẩn bị',
        sustainabilityTracker: 'Theo dõi bền vững',
        ecoScore: 'Điểm sinh thái',
        carbonSaved: 'CO₂ đã tiết kiệm',
        saveToHistory: 'Lưu vào lịch sử',
        immediateAction: 'Hành động ngay',
        correctBinHandling: 'Thùng đúng / cách xử lý',
        safetyWarning: 'Cảnh báo an toàn',
        mistakeToAvoid: 'Lỗi thường gặp cần tránh',
        steps: 'Các bước',
        whyThisMatters: 'Vì sao điều này quan trọng',
        noMaterialBreakdown: 'Không có dữ liệu phân tích vật liệu.',
        noPreparationSteps: 'Không có bước chuẩn bị.',
        noComponentDetails: 'AI chưa trả về chi tiết thành phần cho vật phẩm này.',
        noDisposalPlan: 'Không có kế hoạch xử lý cho lượt quét này.',
        retakeForPlan: 'Hãy chụp lại với ánh sáng tốt hơn hoặc chọn một vật phẩm đã phát hiện.',
        noStepPlan: 'Không có kế hoạch từng bước. Hãy làm theo hành động ngay và quy định địa phương.',
        noSafetyWarning: 'Không phát hiện cảnh báo an toàn đặc biệt.',
        totalScans: 'Tổng lượt quét',
        recyclableItems: 'Vật phẩm có thể tái chế',
        nonRecyclableItems: 'Không thể tái chế',
        specialHandlingItems: 'Cần xử lý đặc biệt',
        mostCommon: 'Loại phổ biến nhất',
        estimatedCo2Saved: 'Ước tính CO₂ đã tiết kiệm',
        quizXp: 'XP câu đố',
        quizzesCompleted: 'Câu đố đã hoàn thành',
        correctAnswers: 'Câu trả lời đúng',
        incorrectAnswers: 'Câu trả lời sai',
        quizAccuracy: 'Độ chính xác câu đố',
        items: 'vật phẩm',
        scansSummary: '{count} lượt quét | ước tính tiết kiệm {co2} CO₂',
        plastic: 'Nhựa',
        metal: 'Kim loại',
        paper: 'Giấy',
        glass: 'Thủy tinh',
        eWasteBattery: 'Rác điện tử / pin',
        other: 'Khác',
        noneYet: 'Chưa có',
        unlocked: 'Đã mở khóa',
        locked: 'Chưa mở khóa',
        achievementUnlocked: 'Đã mở khóa thành tựu: {title}',
        questionProgress: 'Câu {current} / {total}',
        sampleQuiz: 'Câu đố mẫu',
        personalized: 'Cá nhân hóa',
        disposalAction: 'Hành động xử lý',
        preparationStep: 'Bước chuẩn bị',
        recyclableStatus: 'Trạng thái tái chế',
        specialHandling: 'Xử lý đặc biệt',
        quizMaterialBreakdown: 'Phân tích vật liệu',
        correct: 'Đúng',
        notQuite: 'Chưa đúng',
        score: 'Điểm: {score}/{total}',
        quizSampleDesc: 'Câu đố cá nhân hóa sẽ phong phú hơn sau khi bạn quét. Câu đố mẫu dùng các vật phẩm phổ biến.',
        quizNoXpAgain: 'Bạn đã hoàn thành câu đố này, nên XP sẽ không được cộng lại.',
        quizXpEarned: 'XP nhận được: {xp} (+5 mỗi câu đúng, +2 hoàn thành{bonus}).',
        perfectBonus: ', +5 thưởng hoàn hảo',
        imageUploaded: 'Đã tải ảnh. Sẵn sàng xem trước.',
        imagePasted: 'Đã dán ảnh. Sẵn sàng xem trước.',
        imageDropped: 'Đã thả ảnh. Sẵn sàng xem trước.',
        firstImageOnly: 'Chỉ sử dụng ảnh đầu tiên.',
        noFileFound: 'Không tìm thấy tệp.',
        chooseImageFile: 'Vui lòng chọn tệp hình ảnh.',
        chooseSmallImage: 'Vui lòng chọn ảnh nhỏ hơn 12 MB.',
        imageLoadFailed: 'Không thể tải ảnh này. Hãy thử tệp khác.',
        noClipboardImage: 'Không tìm thấy ảnh trong clipboard. Hãy sao chép ảnh chụp màn hình hoặc hình ảnh trước.',
        dropImageFile: 'Vui lòng thả tệp hình ảnh.',
        addProviderKey: 'Hãy thêm API key {provider} trước khi quét.',
        chooseProviderModel: 'Hãy chọn mô hình {provider} có hỗ trợ hình ảnh trước khi quét.',
        captureFirst: 'Hãy chụp hoặc tải ảnh lên trước.',
        analysisFailed: 'Phân tích bằng {provider} thất bại: {message}',
        demoAnalysisFailed: 'Phân tích demo thất bại: {message}',
        invalidProviderKey: 'Hãy nhập API key {provider} hợp lệ.',
        invalidProviderModel: 'Hãy nhập tên mô hình {provider} có hỗ trợ hình ảnh.',
        providerSettingsSaved: 'Đã lưu cài đặt {provider} trong trình duyệt.',
        clearHistoryConfirm: 'Xóa toàn bộ lịch sử quét và tiến trình cục bộ?',
        demoActivated: 'Đã bật Chế độ ngoại tuyến.',
        demoDeactivated: 'Đã tắt Chế độ ngoại tuyến.',
        demoModeOn: 'Chế độ ngoại tuyến đang bật',
        demoModeOff: 'Chế độ ngoại tuyến đang tắt',
        demoActive: 'Đang bật demo ngoại tuyến',
        demoSelectSeeing: 'Chọn nội dung camera đang thấy:',
        scenarioBottle: 'Tình huống 1: Chai nhựa (nhiều thành phần)',
        scenarioBattery: 'Tình huống 2: Pin gia dụng (nguy hại)',
        scenarioBag: 'Tình huống 3: Túi nhựa dùng một lần (nhựa mềm)',
        scenarioMixed: 'Tình huống 4: Rác hỗn hợp (lon, hộp, pin, xốp)',
        retake: 'Chụp lại',
        analyze: 'Phân tích',
        itemDetected: 'Phát hiện {count} vật phẩm',
        itemAnalyzed: 'Đã phân tích {count} vật phẩm'
    }
};

Object.assign(translations.en, translationOverrides.en);
Object.assign(translations.vi, translationOverrides.vi);

Object.assign(translations.en, {
    close: 'Close',
    nextButton: 'Next',
    finish: 'Finish',
    completed: 'Completed',
    correctShort: 'Correct',
    accuracy: 'Accuracy',
    ecoShort: 'eco',
    confidence: 'confidence',
    cell: 'cell',
    wasteScan: 'Waste scan',
    unknown: 'Unknown',
    material: 'Material',
    unknownMaterial: 'Unknown material',
    checkLocalRules: 'Check local recycling rules.',
    noClearWaste: 'No clear waste item was detected.',
    multipleWasteSummary: 'This image contains {count} detected waste items with separate disposal guidance.',
    unclearConfidence: 'Unclear Image ({percent}% confidence)',
    statusWithConfidence: '{status} ({percent}% confidence)',
    itemCount: '{count} items',
    itemCountWithCo2: '{count} items | {co2}',
    optionalCustomModel: 'Optional custom {provider} model',
    apiKeyLabel: '{provider} API Key',
    keyConfigured: '{provider} API key is configured for this browser.',
    keyMissing: 'No {provider} API key found. Analysis will fail until one is added.',
    keyHelpText: 'Get your API key from {provider}.',
    checkConditionLocalRules: 'Check the item condition and follow local disposal rules.',
    handleCarefullyDropoff: 'Handle carefully and use a dedicated collection point if available.',
    doNotGuess: 'Do not guess if local recycling rules are unclear.',
    emptyCleanRecycle: 'Empty, clean, and place the item in the appropriate recycling stream.',
    separateParts: 'Separate recyclable parts from non-recyclable parts before disposal.',
    keepOutRecycling: 'Keep this out of standard recycling unless local rules say otherwise.',
    recycleBin: 'Recycling bin',
    generalWasteDropoff: 'General waste or local drop-off',
    dirtyRecycleMistake: 'Do not recycle it while dirty or full.',
    partialRecycleMistake: 'Do not place it in recycling just because part of it looks recyclable.',
    aiEmptyResponse: 'The AI response was empty. Please try again with better lighting.',
    unclearRetakeMessage: 'The image is unclear. Please retake the photo with better lighting and place the object in the center.',
    providerEmptyResponse: 'The provider returned an empty response.',
    providerInvalidJson: 'The provider did not return valid JSON.',
    unsupportedProvider: 'Unsupported AI provider.',
    imageAnalysisUserPrompt: 'Analyze this waste image. Return JSON only. All user-facing string values must be in English.',
    chooseImageMethod: 'Choose how to scan your item!',
    pasteImage: 'Paste Image',
    dragDrop: 'Drag & Drop',
    backToUploadOptions: 'Back to upload options',
    pasteWithCtrlV: 'Paste with Ctrl+V',
    dragDropImageHere: 'Drag & drop an image here',
    cameraDeniedUploadStillAvailable: 'Camera access was denied. You can still upload, paste, or drag and drop an image.',
    cameraStarting: 'Starting camera...',
    settingsTabGeneral: 'General',
    settingsTabAi: 'AI Setup',
    settingsTabAbout: 'About',
    language: 'Language',
    languageDesc: 'App display language',
    theme: 'Theme',
    themeDesc: 'Light or dark appearance',
    light: 'Light',
    dark: 'Dark',
    custom: 'Custom',
    appVersion: 'App Version',
    appTagline: 'Smart waste sorting assistant',
    currentLevel: 'Current Level',
    aboutFooter: 'Built with care for a greener planet.',
    clearLocalCache: 'Clear Local Cache',
    clearCacheDesc: 'Clear cached app files only',
    aiModel: 'AI Model',
    aiModelDesc: 'Vision-capable model for scanning',
    aiProviderDesc: 'Choose your AI service provider',
    apiKey: 'API Key',
    apiKeyDesc: 'Your provider API key',
    cacheClearedReload: 'Cache cleared. Please reload the page.',
    achEcoStarter: 'Eco Starter',
    achEcoStarterDesc: 'Reach 50 eco points',
    achRecyclingHero: 'Recycling Hero',
    achRecyclingHeroDesc: 'Reach 200 eco points',
    achPlasticHunter: 'Plastic Hunter',
    achPlasticHunterDesc: 'Scan 10 plastic items',
    achBatteryGuardian: 'Battery Guardian',
    achBatteryGuardianDesc: 'Detect 3 batteries',
    achBatchMaster: 'Batch Master',
    achBatchMasterDesc: 'Complete 5 batch scans',
    achEcoLearner: 'Eco Learner',
    achEcoLearnerDesc: 'Complete 1 quiz',
    achSortingStudent: 'Sorting Student',
    achSortingStudentDesc: 'Answer 10 quiz questions correctly',
    achPerfectSorter: 'Perfect Sorter',
    achPerfectSorterDesc: 'Get 5/5 in one quiz',
    achWasteWisdom: 'Waste Wisdom',
    achWasteWisdomDesc: 'Reach 50 quiz XP',
    quizTitleSample: 'Eco Quiz - Sample Quiz',
    quizCompleteXp: 'XP earned: {xp} (+5 per correct, +2 completion{bonus}).'
    ,
    qFirstActionPrompt: 'What should you do first with {item}?',
    qBestImmediate: 'Best immediate action: {action}',
    qPrepPrompt: 'Which preparation step is recommended for {item}?',
    qPrepExplain: 'Preparation matters because contamination can make recycling fail.',
    qClassifyPrompt: 'How should {item} be classified?',
    qClassifyExplain: '{item} is marked as {status}.',
    qHandlingPrompt: 'What handling type is best for {item}?',
    qRecommendedHandling: 'Recommended handling: {handling}.',
    qMaterialPrompt: 'Which material or part needs attention in {item}?',
    anyRecyclingBin: 'Put it in any recycling bin',
    ignoreLabelsThrowAway: 'Ignore labels and throw it away',
    recycleWithoutCleaning: 'Recycle it without cleaning',
    mixWithFoodWaste: 'Mix it with food waste',
    regularRecyclingBin: 'Regular recycling bin',
    regularTrashNoSorting: 'Regular trash with no sorting',
    noPartsToSeparate: '{item}: no parts to separate',
    allPartsTogether: 'All parts are always recycled together',
    askLocalWasteGuide: 'Ask a local waste guide',
    throwAwayWithoutSorting: 'Throw it away without sorting',
    putInRegularRecycling: 'Put it in regular recycling'
    ,
    sampleBottleName: 'Plastic water bottle',
    sampleBottleCategory: 'Plastic',
    sampleBottleAction: 'Empty, rinse, and recycle accepted plastic parts.',
    sampleBottleImmediate: 'Empty and rinse the bottle.',
    sampleBottleStep1: 'Empty remaining liquid.',
    sampleBottleStep2: 'Rinse the bottle.',
    sampleBottleStep3: 'Remove label if possible.',
    sampleBottleStep4: 'Recycle accepted plastic parts.',
    sampleBottleHandling: 'Separate parts before disposal',
    sampleBottleSafety: 'No special safety warning if empty.',
    sampleBottleMistake: 'Do not recycle it while full or dirty.',
    sampleBottleBody: 'Bottle body',
    sampleBottleBodyMaterial: 'PET plastic',
    sampleBottleBodyInstruction: 'Empty and rinse.',
    sampleBottleLabel: 'Glossy label',
    sampleBottleLabelMaterial: 'Coated paper or film',
    sampleBottleLabelInstruction: 'Remove if possible.',
    sampleBatteryName: 'Used battery',
    sampleBatteryCategory: 'Battery',
    sampleBatteryAction: 'Take to a battery drop-off point.',
    sampleBatteryImmediate: 'Keep it out of normal trash and recycling.',
    sampleBatteryStep1: 'Tape exposed terminals if needed.',
    sampleBatteryStep2: 'Store in a dry place.',
    sampleBatteryStep3: 'Bring to a battery drop-off point.',
    sampleBatteryHandling: 'Battery drop-off',
    sampleBatterySafety: 'Damaged batteries can leak or overheat.',
    sampleBatteryMistake: 'Do not put batteries in regular recycling bins.',
    sampleBatteryCell: 'Battery cell',
    sampleBatteryMaterial: 'Mixed metals and chemicals',
    sampleBatteryInstruction: 'Use special collection.',
    samplePizzaName: 'Greasy pizza box',
    samplePizzaCategory: 'Paper',
    samplePizzaAction: 'Compost clean paper if allowed; discard greasy sections.',
    samplePizzaImmediate: 'Separate clean cardboard from greasy parts.',
    samplePizzaStep1: 'Tear off clean lid if recyclable.',
    samplePizzaStep2: 'Discard or compost greasy sections if accepted locally.',
    samplePizzaHandling: 'Separate parts before disposal',
    samplePizzaSafety: 'No special safety warning.',
    samplePizzaMistake: 'Do not recycle greasy cardboard with clean paper.',
    samplePizzaPart: 'Greasy cardboard',
    samplePizzaMaterial: 'Contaminated paper',
    samplePizzaInstruction: 'Keep out of clean recycling.',
    savedLanguageNote: 'Some saved scan details may remain in the language used when they were created.',
    promptBatchExample: '{"language":"en","scanType":"batch","objects":[{"id":1,"name":"Plastic Bottle","category":"Plastic","gridCell":3,"recyclable":true,"confidence":0.92,"ecoScore":15,"disposalAction":"Empty, rinse, and recycle if accepted locally.","disposalPlan":{"immediateAction":"Empty and rinse the bottle now.","steps":["Empty remaining liquid.","Rinse before recycling.","Put in recycling if accepted locally."],"handlingType":"Recycling bin","safetyWarning":"No special safety risk if empty.","mistakeToAvoid":"Do not recycle it with liquid inside."},"components":[{"part":"Bottle body","material":"PET plastic","recyclable":true,"instruction":"Empty and rinse."}],"preparationSteps":["Empty remaining liquid.","Rinse before recycling."],"education":"Brief reason.","carbonSavedGrams":20}],"overallSummary":"Short summary.","totalEcoScore":20,"carbonSavedGrams":20}',
    promptSingleExample: '{"language":"en","scanType":"single","mainItem":"Plastic Water Bottle","category":"Composite Packaging","recyclable":true,"confidence":0.9,"ecoScore":18,"disposalPlan":{"immediateAction":"Separate the label if possible, then empty and rinse the bottle.","steps":["Empty remaining liquid.","Rinse the bottle.","Remove label if possible.","Recycle accepted plastic parts."],"handlingType":"Separate parts before disposal","safetyWarning":"Avoid sharp edges if the bottle is damaged.","mistakeToAvoid":"Do not recycle contaminated or full packaging."},"components":[{"part":"PET bottle body","material":"Plastic PET","recyclable":true,"instruction":"Empty and rinse before recycling."}],"preparationSteps":["Empty remaining liquid.","Rinse the bottle."],"overallSummary":"Short summary.","carbonSavedGrams":15}'
});

Object.assign(translations.vi, {
    close: 'Đóng',
    nextButton: 'Tiếp theo',
    finish: 'Kết thúc',
    completed: 'Đã hoàn thành',
    correctShort: 'Đúng',
    accuracy: 'Độ chính xác',
    ecoShort: 'sinh thái',
    confidence: 'độ tin cậy',
    cell: 'ô',
    wasteScan: 'Lượt quét rác',
    unknown: 'Không rõ',
    material: 'Vật liệu',
    unknownMaterial: 'Vật liệu không rõ',
    checkLocalRules: 'Kiểm tra quy định tái chế tại địa phương.',
    noClearWaste: 'Không phát hiện rõ vật phẩm rác nào.',
    multipleWasteSummary: 'Ảnh này có {count} vật phẩm rác được phát hiện, mỗi vật phẩm có hướng dẫn xử lý riêng.',
    unclearConfidence: 'Ảnh chưa rõ ({percent}% độ tin cậy)',
    statusWithConfidence: '{status} ({percent}% độ tin cậy)',
    itemCount: '{count} vật phẩm',
    itemCountWithCo2: '{count} vật phẩm | {co2}',
    optionalCustomModel: 'Mô hình {provider} tùy chỉnh không bắt buộc',
    apiKeyLabel: 'API key {provider}',
    keyConfigured: 'API key {provider} đã được lưu cho trình duyệt này.',
    keyMissing: 'Chưa có API key {provider}. Phân tích sẽ thất bại cho đến khi bạn thêm key.',
    keyHelpText: 'Lấy API key từ {provider}.',
    checkConditionLocalRules: 'Kiểm tra tình trạng vật phẩm và làm theo quy định xử lý tại địa phương.',
    handleCarefullyDropoff: 'Xử lý cẩn thận và dùng điểm thu gom chuyên dụng nếu có.',
    doNotGuess: 'Không tự đoán nếu quy định tái chế tại địa phương không rõ.',
    emptyCleanRecycle: 'Đổ hết, làm sạch và bỏ vật phẩm vào luồng tái chế phù hợp.',
    separateParts: 'Tách phần có thể tái chế khỏi phần không thể tái chế trước khi bỏ.',
    keepOutRecycling: 'Không bỏ vào thùng tái chế thông thường trừ khi quy định địa phương cho phép.',
    recycleBin: 'Thùng tái chế',
    generalWasteDropoff: 'Rác thường hoặc điểm thu gom địa phương',
    dirtyRecycleMistake: 'Không tái chế khi vật phẩm còn bẩn hoặc còn chứa đồ bên trong.',
    partialRecycleMistake: 'Không bỏ vào thùng tái chế chỉ vì một phần trông có vẻ tái chế được.',
    aiEmptyResponse: 'Phản hồi AI trống. Vui lòng thử lại với ánh sáng tốt hơn.',
    unclearRetakeMessage: 'Ảnh chưa rõ. Vui lòng chụp lại với ánh sáng tốt hơn và đặt vật phẩm ở giữa khung hình.',
    providerEmptyResponse: 'Nhà cung cấp trả về phản hồi trống.',
    providerInvalidJson: 'Nhà cung cấp không trả về JSON hợp lệ.',
    unsupportedProvider: 'Nhà cung cấp AI không được hỗ trợ.',
    imageAnalysisUserPrompt: 'Phân tích ảnh rác này. Chỉ trả về JSON. Tất cả giá trị chuỗi hiển thị cho người dùng phải bằng tiếng Việt có đầy đủ dấu.',
    chooseImageMethod: 'Chọn cách thêm ảnh',
    pasteImage: 'Dán ảnh',
    dragDrop: 'Kéo & thả',
    backToUploadOptions: 'Quay lại tùy chọn tải ảnh',
    pasteWithCtrlV: 'Dán bằng Ctrl+V',
    dragDropImageHere: 'Kéo và thả ảnh vào đây',
    cameraDeniedUploadStillAvailable: 'Quyền truy cập camera đã bị từ chối. Bạn vẫn có thể tải ảnh lên, dán ảnh hoặc kéo thả ảnh.',
    cameraStarting: 'Đang mở camera...',
    settingsTabGeneral: 'Chung',
    settingsTabAi: 'Thiết lập AI',
    settingsTabAbout: 'Giới thiệu',
    language: 'Ngôn ngữ',
    languageDesc: 'Ngôn ngữ hiển thị của ứng dụng',
    theme: 'Giao diện',
    themeDesc: 'Giao diện sáng hoặc tối',
    light: 'Sáng',
    dark: 'Tối',
    custom: 'Tùy chỉnh',
    appVersion: 'Phiên bản ứng dụng',
    appTagline: 'Trợ lý phân loại rác thông minh',
    currentLevel: 'Cấp hiện tại',
    aboutFooter: 'Được xây dựng vì một hành tinh xanh hơn.',
    clearLocalCache: 'Xóa bộ nhớ đệm cục bộ',
    clearCacheDesc: 'Chỉ xóa tệp ứng dụng đã lưu đệm',
    aiModel: 'Mô hình AI',
    aiModelDesc: 'Mô hình có hỗ trợ hình ảnh để quét',
    aiProviderDesc: 'Chọn nhà cung cấp AI của bạn',
    apiKey: 'Khóa API',
    apiKeyDesc: 'Khóa API từ nhà cung cấp của bạn',
    cacheClearedReload: 'Đã xóa bộ nhớ đệm. Vui lòng tải lại trang.',
    achEcoStarter: 'Người mới xanh',
    achEcoStarterDesc: 'Đạt 50 điểm sinh thái',
    achRecyclingHero: 'Anh hùng tái chế',
    achRecyclingHeroDesc: 'Đạt 200 điểm sinh thái',
    achPlasticHunter: 'Thợ săn nhựa',
    achPlasticHunterDesc: 'Quét 10 vật phẩm nhựa',
    achBatteryGuardian: 'Người bảo vệ pin',
    achBatteryGuardianDesc: 'Phát hiện 3 viên pin',
    achBatchMaster: 'Bậc thầy quét nhiều món',
    achBatchMasterDesc: 'Hoàn thành 5 lượt quét nhiều vật phẩm',
    achEcoLearner: 'Học viên sinh thái',
    achEcoLearnerDesc: 'Hoàn thành 1 câu đố',
    achSortingStudent: 'Học viên phân loại',
    achSortingStudentDesc: 'Trả lời đúng 10 câu hỏi',
    achPerfectSorter: 'Người phân loại hoàn hảo',
    achPerfectSorterDesc: 'Đạt 5/5 trong một câu đố',
    achWasteWisdom: 'Trí tuệ rác thải',
    achWasteWisdomDesc: 'Đạt 50 XP câu đố',
    quizTitleSample: 'Câu đố sinh thái - Câu đố mẫu',
    quizCompleteXp: 'XP nhận được: {xp} (+5 mỗi câu đúng, +2 hoàn thành{bonus}).'
    ,
    qFirstActionPrompt: 'Bạn nên làm gì trước tiên với {item}?',
    qBestImmediate: 'Hành động ngay tốt nhất: {action}',
    qPrepPrompt: 'Bước chuẩn bị nào được khuyến nghị cho {item}?',
    qPrepExplain: 'Chuẩn bị đúng rất quan trọng vì nhiễm bẩn có thể làm việc tái chế thất bại.',
    qClassifyPrompt: '{item} nên được phân loại như thế nào?',
    qClassifyExplain: '{item} được đánh dấu là {status}.',
    qHandlingPrompt: 'Cách xử lý phù hợp nhất cho {item} là gì?',
    qRecommendedHandling: 'Cách xử lý được khuyến nghị: {handling}.',
    qMaterialPrompt: 'Vật liệu hoặc bộ phận nào của {item} cần chú ý?',
    anyRecyclingBin: 'Bỏ vào bất kỳ thùng tái chế nào',
    ignoreLabelsThrowAway: 'Bỏ qua nhãn và vứt đi',
    recycleWithoutCleaning: 'Tái chế mà không làm sạch',
    mixWithFoodWaste: 'Trộn với rác thực phẩm',
    regularRecyclingBin: 'Thùng tái chế thông thường',
    regularTrashNoSorting: 'Rác thường, không cần phân loại',
    noPartsToSeparate: '{item}: không có bộ phận cần tách',
    allPartsTogether: 'Tất cả bộ phận luôn được tái chế cùng nhau',
    askLocalWasteGuide: 'Hỏi hướng dẫn xử lý rác tại địa phương',
    throwAwayWithoutSorting: 'Vứt đi mà không phân loại',
    putInRegularRecycling: 'Bỏ vào thùng tái chế thông thường'
    ,
    sampleBottleName: 'Chai nước nhựa',
    sampleBottleCategory: 'Nhựa',
    sampleBottleAction: 'Đổ hết, rửa sạch và tái chế các phần nhựa được chấp nhận.',
    sampleBottleImmediate: 'Đổ hết và rửa sạch chai.',
    sampleBottleStep1: 'Đổ hết chất lỏng còn lại.',
    sampleBottleStep2: 'Rửa sạch chai.',
    sampleBottleStep3: 'Gỡ nhãn nếu có thể.',
    sampleBottleStep4: 'Tái chế các phần nhựa được chấp nhận.',
    sampleBottleHandling: 'Tách các bộ phận trước khi bỏ',
    sampleBottleSafety: 'Không có cảnh báo an toàn đặc biệt nếu chai đã rỗng.',
    sampleBottleMistake: 'Không tái chế khi chai còn đầy hoặc còn bẩn.',
    sampleBottleBody: 'Thân chai',
    sampleBottleBodyMaterial: 'Nhựa PET',
    sampleBottleBodyInstruction: 'Đổ hết và rửa sạch.',
    sampleBottleLabel: 'Nhãn bóng',
    sampleBottleLabelMaterial: 'Giấy phủ hoặc màng phủ',
    sampleBottleLabelInstruction: 'Gỡ ra nếu có thể.',
    sampleBatteryName: 'Pin đã dùng',
    sampleBatteryCategory: 'Pin',
    sampleBatteryAction: 'Mang đến điểm thu gom pin.',
    sampleBatteryImmediate: 'Không bỏ vào rác thường hoặc thùng tái chế.',
    sampleBatteryStep1: 'Dán băng keo lên cực pin hở nếu cần.',
    sampleBatteryStep2: 'Cất ở nơi khô ráo.',
    sampleBatteryStep3: 'Mang đến điểm thu gom pin.',
    sampleBatteryHandling: 'Điểm thu gom pin',
    sampleBatterySafety: 'Pin hư hỏng có thể rò rỉ hoặc quá nhiệt.',
    sampleBatteryMistake: 'Không bỏ pin vào thùng tái chế thông thường.',
    sampleBatteryCell: 'Lõi pin',
    sampleBatteryMaterial: 'Kim loại và hóa chất hỗn hợp',
    sampleBatteryInstruction: 'Dùng điểm thu gom chuyên dụng.',
    samplePizzaName: 'Hộp pizza dính dầu mỡ',
    samplePizzaCategory: 'Giấy',
    samplePizzaAction: 'Ủ phần giấy sạch nếu được phép; bỏ phần dính dầu mỡ.',
    samplePizzaImmediate: 'Tách bìa sạch khỏi phần dính dầu mỡ.',
    samplePizzaStep1: 'Xé phần nắp sạch nếu có thể tái chế.',
    samplePizzaStep2: 'Bỏ hoặc ủ phần dính dầu mỡ nếu địa phương chấp nhận.',
    samplePizzaHandling: 'Tách các bộ phận trước khi bỏ',
    samplePizzaSafety: 'Không có cảnh báo an toàn đặc biệt.',
    samplePizzaMistake: 'Không tái chế bìa dính dầu mỡ cùng giấy sạch.',
    samplePizzaPart: 'Bìa dính dầu mỡ',
    samplePizzaMaterial: 'Giấy bị nhiễm bẩn',
    samplePizzaInstruction: 'Không bỏ vào luồng tái chế giấy sạch.',
    savedLanguageNote: 'Một số chi tiết quét đã lưu có thể vẫn ở ngôn ngữ được dùng khi tạo.',
    promptBatchExample: '{"language":"vi","scanType":"batch","objects":[{"id":1,"name":"Chai nhựa","category":"Nhựa","gridCell":3,"recyclable":true,"confidence":0.92,"ecoScore":15,"disposalAction":"Đổ hết, rửa sạch và tái chế nếu địa phương chấp nhận.","disposalPlan":{"immediateAction":"Đổ hết phần nước còn lại và rửa sạch chai ngay.","steps":["Đổ hết chất lỏng còn lại.","Rửa sạch trước khi tái chế.","Bỏ vào thùng tái chế nếu địa phương chấp nhận."],"handlingType":"Thùng tái chế","safetyWarning":"Không có rủi ro an toàn đặc biệt nếu chai đã rỗng.","mistakeToAvoid":"Không tái chế chai khi vẫn còn chất lỏng bên trong."},"components":[{"part":"Thân chai","material":"Nhựa PET","recyclable":true,"instruction":"Đổ hết và rửa sạch."}],"preparationSteps":["Đổ hết chất lỏng còn lại.","Rửa sạch trước khi tái chế."],"education":"Nhựa PET thường được tái chế nếu sạch và không bị nhiễm bẩn.","carbonSavedGrams":20}],"overallSummary":"Phát hiện chai nhựa có thể tái chế sau khi làm sạch.","totalEcoScore":20,"carbonSavedGrams":20}',
    promptSingleExample: '{"language":"vi","scanType":"single","mainItem":"Chai nước nhựa","category":"Bao bì nhiều vật liệu","recyclable":"partial","confidence":0.9,"ecoScore":18,"disposalPlan":{"immediateAction":"Tách nhãn nếu có thể, sau đó đổ hết và rửa sạch chai.","steps":["Đổ hết chất lỏng còn lại.","Rửa sạch chai.","Gỡ nhãn nếu có thể.","Tái chế các phần nhựa được chấp nhận."],"handlingType":"Tách các bộ phận trước khi bỏ","safetyWarning":"Cẩn thận cạnh sắc nếu chai bị vỡ hoặc biến dạng.","mistakeToAvoid":"Không tái chế bao bì còn bẩn hoặc còn đầy."},"components":[{"part":"Thân chai PET","material":"Nhựa PET","recyclable":true,"instruction":"Đổ hết và rửa sạch trước khi tái chế."}],"preparationSteps":["Đổ hết chất lỏng còn lại.","Rửa sạch chai."],"overallSummary":"Chai nước nhựa có thể tái chế một phần nếu được làm sạch và tách nhãn.","carbonSavedGrams":15}'
});

let stream = null;
let video = null;
let canvasContext = null;
let animationFrameId = null;
let capturedImageData = null;
let capturedHistoryImageData = null;
let lastAnalysisResult = null;
let currentLanguage = ['en', 'vi'].includes(localStorage.getItem(STORAGE_KEYS.language))
    ? localStorage.getItem(STORAGE_KEYS.language)
    : 'en';
let currentTheme = ['light', 'dark'].includes(localStorage.getItem(STORAGE_KEYS.theme))
    ? localStorage.getItem(STORAGE_KEYS.theme)
    : 'light';
let selectedScanMode = localStorage.getItem(STORAGE_KEYS.selectedMode) || 'quick';
let selectedProvider = localStorage.getItem(STORAGE_KEYS.provider) || 'openai';
let statsChartInstance = null;
let currentQuiz = null;
let dragDepth = 0;
let currentFocusedGridCell = null;

function t(key, params = {}) {
    const activeTranslations = translations[currentLanguage] || translations.en;
    let template = activeTranslations[key];
    if (template === undefined) {
        template = translations.en[key];
        if (template === undefined) {
            console.warn(`[i18n] Missing translation key: ${key}`);
            return '';
        }
        console.warn(`[i18n] Missing ${currentLanguage} translation for key: ${key}`);
    }

    return String(template).replace(/\{(\w+)\}/g, (_, paramKey) => (
        params[paramKey] !== undefined ? String(params[paramKey]) : ''
    ));
}

function setText(selector, key, params = {}) {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element && key) element.textContent = t(key, params);
    return element;
}

function setPlaceholder(element, key) {
    if (element) element.placeholder = t(key);
}

function applyTheme(theme = currentTheme) {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = currentTheme;
    localStorage.setItem(STORAGE_KEYS.theme, currentTheme);

    if (dom.lightThemeBtn && dom.darkThemeBtn) {
        dom.lightThemeBtn.classList.toggle('active', currentTheme === 'light');
        dom.darkThemeBtn.classList.toggle('active', currentTheme === 'dark');
        dom.lightThemeBtn.setAttribute('aria-checked', String(currentTheme === 'light'));
        dom.darkThemeBtn.setAttribute('aria-checked', String(currentTheme === 'dark'));
    }
}

function applyStaticTranslations() {
    document.documentElement.lang = currentLanguage;
    setText('h1', 'appTitle');
    dom.settingsBtn.title = t('settings');
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        const labelKey = bottomNavTranslationKeys[item.dataset.page];
        if (labelKey) setText(item.querySelector('span'), labelKey);
    });

    setText(dom.inputChoiceTitle, 'chooseImageMethod');
    setText(dom.uploadImageBtn?.querySelector('span'), 'uploadImage');
    setText(dom.pasteImageBtn?.querySelector('span'), 'pasteImage');
    setText(dom.dragDropImageBtn?.querySelector('span'), 'dragDrop');
    setText(dom.backToOptionsBtn?.querySelector('span'), 'backToUploadOptions');
    setText(dom.pasteHintText, 'pasteWithCtrlV');
    setText(dom.dragHintText, 'dragDropImageHere');
    if (dom.cameraStatusMessage && !dom.cameraStatusMessage.classList.contains('hidden')) {
        setCameraStatus(t('cameraDeniedUploadStillAvailable'));
    }
    setText('#dropZoneHint span:not(.paste-shortcut-hint)', 'uploadPasteDropPhoto');
    setText('.paste-shortcut-hint', 'pasteShortcut');
    setText('#dropZoneTitle', 'dropImagePreview');
    setText('#dropZoneMessage', 'onlyImagesAccepted');
    setText('#loadingOverlay p.font-semibold', 'analyzingWaste');
    setText('#loadingModeText', 'loadingGuidance');
    const scanModeSection = dom.scanModeOptions?.closest('.bg-white');
    setText(scanModeSection?.querySelector('h2'), 'scanMode');
    setText(scanModeSection?.querySelector('p'), 'scanModeDesc');
    dom.scanModeOptions?.querySelectorAll('[data-mode]').forEach(button => {
        const keys = scanModeTranslationKeys[button.dataset.mode];
        if (!keys) return;
        setText(button.querySelector('span'), keys.label);
        setText(button.querySelector('small'), keys.description);
    });

    const dashboardTitle = dom.impactStatsGrid?.closest('.bg-white')?.querySelector('h2 span');
    setText(dashboardTitle, 'impactDashboard');
    const totalTrackedLabel = dom.totalRecycledCount?.previousElementSibling;
    setText(totalTrackedLabel, 'totalItemsTracked');
    const categoryTitle = dom.categoryBreakdownList?.previousElementSibling?.querySelector('h3');
    setText(categoryTitle, 'categoryBreakdown');
    const co2Note = dom.categoryBreakdownList?.previousElementSibling?.querySelector('p');
    setText(co2Note, 'co2Note');

    setText(dom.achievementList?.closest('.bg-white')?.querySelector('h2 span'), 'achievements');
    setText('#quizIntroText', 'quizIntro');
    setText('#startQuizBtn', 'startQuiz');
    setText(dom.quizStatsInline?.closest('.bg-white')?.querySelector('h2 span'), 'ecoQuiz');
    setText(document.querySelector('#recentList')?.closest('section')?.querySelector('h2'), 'recentScans');
    setText('#clearHistoryBtn', 'clearAll');
    setText('#emptyRecent p', 'noScans');

    setText('#settingsModal h2', 'settings');
    setText('#cancelSettingsBtn', 'cancel');
    setText('#saveSettingsBtn', 'saveChanges');
    setText('[data-settings-tab="general"] span', 'settingsTabGeneral');
    setText('[data-settings-tab="ai"] span', 'settingsTabAi');
    setText('[data-settings-tab="about"] span', 'settingsTabAbout');

    // General tab
    setText(document.querySelector('#tab-general .settings-row .settings-row-label'), 'theme');
    setText(document.querySelector('#tab-general .settings-row .settings-row-desc'), 'themeDesc');
    setText(dom.lightThemeBtn?.querySelector('span'), 'light');
    setText(dom.darkThemeBtn?.querySelector('span'), 'dark');
    setText(document.querySelector('#languageRow .settings-row-label'), 'language');
    setText(document.querySelector('#languageRow .settings-row-desc'), 'languageDesc');
    setText('#tab-general .demo-section .settings-row-label', 'offlineDemoMode');
    setText('#tab-general .demo-section .settings-row-desc', 'offlineDemoDesc');

    // AI tab
    setText('#tab-ai .settings-info-banner p', 'visionWarning');
    setText('#aiProviderRow .settings-row-label', 'aiProvider');
    setText('#aiProviderRow .settings-row-desc', 'aiProviderDesc');
    setText('#aiModelRow .settings-row-label', 'aiModel');
    setText('#aiModelRow .settings-row-desc', 'aiModelDesc');
    setPlaceholder(dom.modelInput, 'customModelPlaceholder');
    setText(document.querySelector('#modelInputWrapper .settings-row-desc'), 'customModelHelp');
    setText('#apiKeyRow .settings-row-label', 'apiKey');
    setText('#apiKeyRow .settings-row-desc', 'apiKeyDesc');

    // About tab
    if (dom.appVersionValue) dom.appVersionValue.textContent = APP_VERSION;
    setText('.about-app-tagline', 'appTagline');
    const aboutStatLabels = document.querySelectorAll('#tab-about .about-stat-label');
    setText(aboutStatLabels[0], 'totalScans');
    setText(aboutStatLabels[1], 'currentLevel');
    setText(document.querySelector('.about-action-label'), 'clearLocalCache');
    setText(document.querySelector('.about-action-desc'), 'clearCacheDesc');
    setText('#tab-about .about-footer p', 'aboutFooter');

    setText('#resultsModal h2', 'analysisResults');
    setText('#resultsDemoBadge span', 'offlineDemoData');
    setText('#closeResultsBtn', 'done');
    setText('#resultSummaryCard h5', 'summary');
    setText('#detectedObjectsSection h5', 'detectedItems');
    setText('#statusCard p', 'recyclabilityStatus');
    setText('#disposalPlanSection h5', 'whatNow');
    if (dom.disposalPlanItemName && dom.disposalPlanItemName.textContent === translations.en.selectItemPlan) {
        setText(dom.disposalPlanItemName, 'selectItemPlan');
    }
    setText('#disposalPlanSection h6', 'steps');
    setText(dom.compositionBars?.closest('.bg-white')?.querySelector('h5'), 'materialBreakdown');
    setText(dom.actionSteps?.closest('.bg-white')?.querySelector('h5'), 'preparationSteps');
    setText('#saveToHistoryBtn span', 'saveToHistory');

    setText('#quizModalTitle', 'ecoQuiz');
    setText('#closeQuizBtn', 'close');
    setText('#nextQuizBtn', 'done');

    setText('#demoSelectorPanel .uppercase', 'demoActive');
    setText('#demoSelectorPanel .text-\\[10px\\]', 'demoSelectSeeing');
    const options = dom.demoScenarioSelect?.querySelectorAll('option');
    if (options?.length >= 4) {
        options[0].textContent = t('scenarioBottle');
        options[1].textContent = t('scenarioBattery');
        options[2].textContent = t('scenarioBag');
        options[3].textContent = t('scenarioMixed');
    }

    if (dom.languageSelect) {
        dom.languageSelect.value = currentLanguage;
    }
    applyTheme(currentTheme);
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
    return t('nonRecyclable');
}

function getStatusKind(status) {
    const normalized = typeof status === 'string' ? status.toLowerCase() : status;
    if (normalized === true || normalized === 'true' || normalized === 'recyclable') return 'recyclable';
    return 'nonRecyclable';
}

function getStatusClasses(status) {
    const kind = getStatusKind(status);
    if (kind === 'recyclable') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
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
        throw new Error(t('providerEmptyResponse'));
    }

    try {
        return JSON.parse(text);
    } catch {
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
            throw new Error(t('providerInvalidJson'));
        }
        return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    }
}

function normalizeComponent(component) {
    return {
        part: safeString(component.part || component.material || t('material')),
        material: safeString(component.material || component.part || t('unknownMaterial')),
        recyclable: component.recyclable === true || component.recyclable === 'true' || component.recyclable === 'partial' || component.recyclable === 'special' || component.recyclable === 'special handling' ? component.recyclable : false,
        instruction: safeString(component.instruction || component.disposalAction || t('checkLocalRules'))
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
        immediateAction: safeString(plan.immediateAction || fallback.immediateAction || t('checkConditionLocalRules')),
        steps: (steps.length > 0 ? steps : fallbackSteps).slice(0, 8),
        handlingType: safeString(plan.handlingType || fallback.handlingType || t('checkLocalRules')),
        safetyWarning: safeString(plan.safetyWarning || fallback.safetyWarning || t('noSafetyWarning')),
        mistakeToAvoid: safeString(plan.mistakeToAvoid || fallback.mistakeToAvoid || t('doNotGuess'))
    };
}

function getFallbackDisposalPlan(rawObject, recyclable, components, preparationSteps) {
    const kind = getStatusKind(recyclable);
    const hasSpecialComponent = components.some(component => getStatusKind(component.recyclable) === 'special' || /battery|e-waste|sharp|hazard/i.test(`${component.part} ${component.material}`));
    const handlingType = hasSpecialComponent
        ? t('special')
        : kind === 'recyclable'
            ? t('recycleBin')
            : kind === 'partial'
                ? t('separateParts')
                : t('generalWasteDropoff');
    const immediateAction = rawObject.disposalAction || rawObject.status_message || (kind === 'recyclable'
        ? t('emptyCleanRecycle')
        : kind === 'partial'
            ? t('separateParts')
            : t('keepOutRecycling'));

    return {
        immediateAction,
        steps: preparationSteps.length > 0 ? preparationSteps : [immediateAction],
        handlingType,
        safetyWarning: hasSpecialComponent ? t('handleCarefullyDropoff') : '',
        mistakeToAvoid: kind === 'recyclable' ? t('dirtyRecycleMistake') : t('partialRecycleMistake')
    };
}

function normalizeObject(rawObject, index) {
    const recyclable = rawObject.recyclable ?? rawObject.is_recyclable ?? false;
    const components = asArray(rawObject.components || rawObject.composition).map(normalizeComponent);
    const fallbackSteps = rawObject.disposalAction ? [rawObject.disposalAction] : [];
    const preparationSteps = asArray(rawObject.preparationSteps || rawObject.action_steps).map(step => safeString(step)).filter(Boolean).slice(0, 8).concat(fallbackSteps).slice(0, 8);
    const disposalAction = safeString(rawObject.disposalAction || rawObject.status_message || t('checkLocalRules'));
    const disposalPlan = normalizeDisposalPlan(
        rawObject.disposalPlan,
        getFallbackDisposalPlan({ ...rawObject, disposalAction }, recyclable, components, preparationSteps)
    );

    return {
        id: clampNumber(rawObject.id, 1, 99, index + 1),
        name: safeString(rawObject.name || rawObject.scanned_item || rawObject.mainItem || t('unknown')),
        category: safeString(rawObject.category || t('unknown')),
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
            language: currentLanguage,
            message: t('aiEmptyResponse'),
            confidence: 0.2,
            objects: [],
            totalEcoScore: 0
        };
    }

    if (rawResult.scanType === 'unclear') {
        return {
            scanType: 'unclear',
            language: safeString(rawResult.language || currentLanguage),
            message: safeString(rawResult.message, t('unclearRetakeMessage')),
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
        language: safeString(rawResult.language || currentLanguage),
        mainItem: safeString(rawResult.mainItem || rawResult.scanned_item || objects[0]?.name || t('wasteScan')),
        category: safeString(rawResult.category || objects[0]?.category || t('unknown')),
        recyclable: rawResult.recyclable ?? rawResult.is_recyclable ?? objects[0]?.recyclable ?? false,
        confidence: clampNumber(rawResult.confidence, 0, 1, objects[0]?.confidence || 0.7),
        overallSummary: safeString(rawResult.overallSummary || rawResult.summary || buildSummary(objects)),
        objects,
        totalEcoScore,
        carbonSavedGrams: clampNumber(rawResult.carbonSavedGrams ?? rawResult.carbon_saved_grams, 0, 10000, Math.round(totalEcoScore * 0.5))
    };
}

function buildSummary(objects) {
    if (objects.length === 0) return t('noClearWaste');
    if (objects.length === 1) {
        const item = objects[0];
        return `${item.name}: ${getStatusLabel(item.recyclable)}. ${item.disposalAction}`;
    }
    return t('multipleWasteSummary', { count: objects.length });
}

function buildSystemPrompt(modeName = selectedScanMode) {
    const mode = scanModes[modeName] || scanModes.quick;
    const responseLanguage = currentLanguage === 'vi'
        ? 'Vietnamese with natural wording and full Vietnamese accents'
        : 'English';
    const strictLanguageInstruction = currentLanguage === 'vi'
        ? 'Return all user-facing text in Vietnamese with full accents. Do not mix English and Vietnamese. Keep JSON keys in English, but translate every string value shown to users.'
        : 'Return all user-facing text in English. Keep JSON keys in English.';
    const unclearMessage = t('unclearRetakeMessage');
    return [
        'You are an expert waste sorting AI for a browser-only recycling demo.',
        'Return JSON only. No markdown. No explanation outside JSON.',
        'Use consistent fields and short practical language.',
        `App language: ${currentLanguage}. Response language: ${responseLanguage}.`,
        strictLanguageInstruction,
        'Translate all user-facing string values, including item names where possible, category, disposalAction, overallSummary, disposalPlan.immediateAction, disposalPlan.handlingType, disposalPlan.safetyWarning, disposalPlan.mistakeToAvoid, disposalPlan.steps, components.part, components.material, components.instruction, preparationSteps, education, and unclear/error messages.',
        'Do not translate JSON keys. Include a top-level "language" field with value "en" or "vi".',
        'If uncertain, use confidence below 0.7 and suggest retaking the photo.',
        'If the image has multiple objects, use scanType = "batch".',
        'If an item has multiple materials, include components.',
        'Every single result or detected object must include disposalPlan with immediateAction, steps, handlingType, safetyWarning, and mistakeToAvoid.',
        currentLanguage === 'vi'
            ? 'Use Vietnamese handlingType values such as Thùng tái chế, Rác thường, Ủ phân, Xử lý đặc biệt, Điểm thu gom rác điện tử, Điểm thu gom pin, or Tách các bộ phận trước khi bỏ.'
            : 'Use handlingType values such as Recycling bin, General waste, Compost, Special handling, E-waste drop-off, Battery drop-off, or Separate parts before disposal.',
        `If the image is unclear, return exactly: {"language":"${currentLanguage}","scanType":"unclear","message":"${unclearMessage}","confidence":0.3}`,
        `Selected mode: ${getScanModeText(modeName, 'label')}. ${mode.instruction}`,
        `Expected batch JSON: ${t('promptBatchExample')}`,
        `Expected single JSON: ${t('promptSingleExample')}`
    ].join(' ');
}

function getLocalizedDemoData(scenario) {
    const demoData = {
        en: {
            bottle: {
                scanType: 'single',
                language: 'en',
                mainItem: 'PET Plastic Water Bottle',
                category: 'Plastic Packaging',
                recyclable: 'partial',
                confidence: 0.96,
                overallSummary: 'PET plastic bottle is partially recyclable. The bottle body and cap can usually be recycled after rinsing; remove the label if local rules require it.',
                totalEcoScore: 85,
                carbonSavedGrams: 42,
                objects: [{
                    id: 1,
                    name: 'Plastic Bottle Body',
                    category: 'Plastic #1 PET',
                    gridCell: 6,
                    recyclable: true,
                    confidence: 0.98,
                    ecoScore: 90,
                    disposalAction: 'Empty, rinse, and place accepted plastic parts in recycling.',
                    disposalPlan: {
                        immediateAction: 'Empty and rinse the bottle now.',
                        steps: ['Empty remaining liquid.', 'Rinse the bottle.', 'Remove the label if possible.', 'Recycle the bottle and cap if accepted locally.'],
                        handlingType: 'Recycling bin',
                        safetyWarning: 'No special safety risk if the bottle is empty.',
                        mistakeToAvoid: 'Do not recycle it with liquid or food residue inside.'
                    },
                    components: [
                        { part: 'Bottle body', material: 'PET plastic', recyclable: true, instruction: 'Empty and rinse before recycling.' },
                        { part: 'Bottle cap', material: 'HDPE plastic', recyclable: true, instruction: 'Keep attached if your local program accepts caps.' },
                        { part: 'Label', material: 'Laminated paper or plastic film', recyclable: false, instruction: 'Remove if required locally and discard as general waste.' }
                    ],
                    preparationSteps: ['Empty remaining liquid.', 'Rinse the bottle.', 'Remove the label if possible.', 'Recycle accepted plastic parts.'],
                    education: 'PET plastic is widely recycled when it is clean and dry.',
                    carbonSavedGrams: 45
                }]
            },
            battery: {
                scanType: 'single',
                language: 'en',
                mainItem: 'Lithium Household Battery',
                category: 'Hazardous Waste',
                recyclable: 'special',
                confidence: 0.94,
                overallSummary: 'Batteries require special handling because they can leak, overheat, or contaminate waste streams.',
                totalEcoScore: 10,
                carbonSavedGrams: 5,
                objects: [{
                    id: 1,
                    name: 'Used Battery',
                    category: 'Battery',
                    gridCell: 11,
                    recyclable: 'special',
                    confidence: 0.95,
                    ecoScore: 10,
                    disposalAction: 'Take the battery to a dedicated battery drop-off point.',
                    disposalPlan: {
                        immediateAction: 'Keep it out of regular trash and recycling.',
                        steps: ['Tape exposed terminals if needed.', 'Store it in a dry non-metal container.', 'Bring it to a battery drop-off point.'],
                        handlingType: 'Battery drop-off',
                        safetyWarning: 'Damaged batteries can leak or overheat.',
                        mistakeToAvoid: 'Do not put batteries in curbside recycling bins.'
                    },
                    components: [
                        { part: 'Battery cell', material: 'Mixed metals and chemicals', recyclable: 'special', instruction: 'Use a dedicated battery collection point.' },
                        { part: 'Metal casing', material: 'Steel or aluminum', recyclable: 'special', instruction: 'Recovered only through battery recycling programs.' }
                    ],
                    preparationSteps: ['Tape exposed terminals if needed.', 'Store it dry.', 'Bring it to a battery collection point.'],
                    education: 'Battery recycling prevents hazardous metals and electrolytes from entering landfill and water systems.',
                    carbonSavedGrams: 5
                }]
            },
            bag: {
                scanType: 'single',
                language: 'en',
                mainItem: 'Soft Plastic Grocery Bag',
                category: 'Plastic #4 LDPE',
                recyclable: 'special',
                confidence: 0.88,
                overallSummary: 'Soft plastic bags are not suitable for most curbside bins because they jam sorting equipment. Use a store drop-off if available.',
                totalEcoScore: 40,
                carbonSavedGrams: 20,
                objects: [{
                    id: 1,
                    name: 'Plastic Shopping Bag',
                    category: 'LDPE Plastic',
                    gridCell: 7,
                    recyclable: 'special',
                    confidence: 0.89,
                    ecoScore: 40,
                    disposalAction: 'Drop it at a supermarket soft-plastic collection bin if clean and dry.',
                    disposalPlan: {
                        immediateAction: 'Remove receipts and food debris.',
                        steps: ['Empty the bag.', 'Make sure it is clean and dry.', 'Bundle it with other soft plastics.', 'Use a store soft-plastic drop-off.'],
                        handlingType: 'Store soft-plastic drop-off',
                        safetyWarning: 'No special safety warning, but keep it away from small children and wildlife.',
                        mistakeToAvoid: 'Do not put loose soft plastic bags in standard curbside recycling.'
                    },
                    components: [{ part: 'Bag body', material: 'LDPE plastic film', recyclable: 'special', instruction: 'Recycle only through soft-plastic collection programs.' }],
                    preparationSteps: ['Empty the bag.', 'Keep it clean and dry.', 'Bundle with other soft plastics.'],
                    education: 'Soft plastics can wrap around sorting machinery and contaminate curbside recycling.',
                    carbonSavedGrams: 20
                }]
            },
            mixed: {
                scanType: 'batch',
                language: 'en',
                mainItem: 'Mixed Waste Scene',
                category: 'Mixed Waste',
                recyclable: 'partial',
                confidence: 0.95,
                overallSummary: 'Detected four waste items. Select an item card to see the correct disposal plan for each one.',
                totalEcoScore: 213,
                carbonSavedGrams: 106,
                objects: [
                    {
                        id: 1,
                        name: 'Aluminum Soda Can',
                        category: 'Metal',
                        gridCell: 2,
                        recyclable: true,
                        confidence: 0.98,
                        ecoScore: 95,
                        disposalAction: 'Empty, rinse, and place in metal recycling.',
                        disposalPlan: {
                            immediateAction: 'Empty and rinse the can.',
                            steps: ['Empty remaining liquid.', 'Rinse out sticky residue.', 'Crush only if your local program allows it.', 'Place in metal recycling.'],
                            handlingType: 'Recycling bin',
                            safetyWarning: 'Watch for sharp edges if the can is crushed.',
                            mistakeToAvoid: 'Do not recycle cans filled with liquid.'
                        },
                        components: [{ part: 'Can body', material: 'Aluminum', recyclable: true, instruction: 'Rinse and recycle as metal.' }],
                        preparationSteps: ['Empty remaining liquid.', 'Rinse out residue.', 'Place in metal recycling.'],
                        education: 'Recycling aluminum saves substantial energy compared with making new aluminum.',
                        carbonSavedGrams: 47
                    },
                    {
                        id: 2,
                        name: 'Cardboard Box',
                        category: 'Paper',
                        gridCell: 4,
                        recyclable: true,
                        confidence: 0.96,
                        ecoScore: 88,
                        disposalAction: 'Remove tape, flatten, and recycle as paper.',
                        disposalPlan: {
                            immediateAction: 'Remove plastic tape and flatten the box.',
                            steps: ['Remove plastic tape.', 'Flatten the cardboard.', 'Keep it dry and clean.', 'Place in paper recycling.'],
                            handlingType: 'Paper recycling bin',
                            safetyWarning: 'No special safety warning.',
                            mistakeToAvoid: 'Do not recycle wet or greasy cardboard.'
                        },
                        components: [
                            { part: 'Cardboard body', material: 'Paper fiber', recyclable: true, instruction: 'Flatten before recycling.' },
                            { part: 'Plastic tape', material: 'Polypropylene adhesive', recyclable: false, instruction: 'Remove and discard as general waste.' }
                        ],
                        preparationSteps: ['Remove plastic tape.', 'Flatten the cardboard.', 'Keep it dry.'],
                        education: 'Clean cardboard can be pulped into new paper packaging.',
                        carbonSavedGrams: 44
                    },
                    {
                        id: 3,
                        name: 'AA Battery',
                        category: 'Battery',
                        gridCell: 9,
                        recyclable: 'special',
                        confidence: 0.97,
                        ecoScore: 10,
                        disposalAction: 'Take it to a battery recycling point.',
                        disposalPlan: {
                            immediateAction: 'Keep the battery out of regular bins.',
                            steps: ['Tape the terminals if needed.', 'Store in a dry container.', 'Bring to a battery drop-off point.'],
                            handlingType: 'Battery drop-off',
                            safetyWarning: 'Do not crush, heat, or burn batteries.',
                            mistakeToAvoid: 'Do not mix batteries into normal recycling.'
                        },
                        components: [{ part: 'Battery cell', material: 'Zinc, manganese, steel, and electrolyte', recyclable: 'special', instruction: 'Handle through battery recycling only.' }],
                        preparationSteps: ['Tape terminals if needed.', 'Store dry.', 'Use a battery drop-off point.'],
                        education: 'Battery collection prevents corrosive chemicals from entering landfill.',
                        carbonSavedGrams: 5
                    },
                    {
                        id: 4,
                        name: 'Soiled Styrofoam Box',
                        category: 'Polystyrene',
                        gridCell: 15,
                        recyclable: false,
                        confidence: 0.9,
                        ecoScore: 20,
                        disposalAction: 'Discard in general waste unless a specialty foam recycler accepts it.',
                        disposalPlan: {
                            immediateAction: 'Scrape off food and place it in general waste.',
                            steps: ['Remove leftover food.', 'Bag it with general waste.', 'Avoid breaking it into small fragments.'],
                            handlingType: 'General waste',
                            safetyWarning: 'Do not burn foam packaging.',
                            mistakeToAvoid: 'Do not place greasy foam in paper or plastic recycling.'
                        },
                        components: [{ part: 'Foam tray', material: 'Polystyrene foam', recyclable: false, instruction: 'Not accepted by most curbside recycling programs.' }],
                        preparationSteps: ['Remove leftover food.', 'Place in general waste.'],
                        education: 'Foam breaks into persistent microplastic fragments and is rarely recycled curbside.',
                        carbonSavedGrams: 10
                    }
                ]
            }
        },
        vi: {
            bottle: {
                scanType: 'single',
                language: 'vi',
                mainItem: 'Chai nước nhựa PET',
                category: 'Bao bì nhựa',
                recyclable: 'partial',
                confidence: 0.96,
                overallSummary: 'Chai nhựa PET có thể tái chế một phần. Thân chai và nắp thường có thể tái chế sau khi rửa sạch; hãy gỡ nhãn nếu quy định địa phương yêu cầu.',
                totalEcoScore: 85,
                carbonSavedGrams: 42,
                objects: [{
                    id: 1,
                    name: 'Thân chai nhựa',
                    category: 'Nhựa PET số 1',
                    gridCell: 6,
                    recyclable: true,
                    confidence: 0.98,
                    ecoScore: 90,
                    disposalAction: 'Đổ hết, rửa sạch và bỏ các phần nhựa được chấp nhận vào thùng tái chế.',
                    disposalPlan: {
                        immediateAction: 'Đổ hết phần nước còn lại và rửa sạch chai ngay.',
                        steps: ['Đổ hết chất lỏng còn lại.', 'Rửa sạch chai.', 'Gỡ nhãn nếu có thể.', 'Tái chế thân chai và nắp nếu địa phương chấp nhận.'],
                        handlingType: 'Thùng tái chế',
                        safetyWarning: 'Không có rủi ro an toàn đặc biệt nếu chai đã rỗng.',
                        mistakeToAvoid: 'Không tái chế chai khi vẫn còn chất lỏng hoặc cặn thức ăn bên trong.'
                    },
                    components: [
                        { part: 'Thân chai', material: 'Nhựa PET', recyclable: true, instruction: 'Đổ hết và rửa sạch trước khi tái chế.' },
                        { part: 'Nắp chai', material: 'Nhựa HDPE', recyclable: true, instruction: 'Giữ nắp gắn với chai nếu chương trình địa phương chấp nhận.' },
                        { part: 'Nhãn', material: 'Giấy phủ hoặc màng nhựa', recyclable: false, instruction: 'Gỡ ra nếu địa phương yêu cầu và bỏ vào rác thường.' }
                    ],
                    preparationSteps: ['Đổ hết chất lỏng còn lại.', 'Rửa sạch chai.', 'Gỡ nhãn nếu có thể.', 'Tái chế các phần nhựa được chấp nhận.'],
                    education: 'Nhựa PET thường được tái chế rộng rãi khi sạch và khô.',
                    carbonSavedGrams: 45
                }]
            },
            battery: {
                scanType: 'single',
                language: 'vi',
                mainItem: 'Pin gia dụng lithium',
                category: 'Chất thải nguy hại',
                recyclable: 'special',
                confidence: 0.94,
                overallSummary: 'Pin cần xử lý đặc biệt vì có thể rò rỉ, quá nhiệt hoặc làm nhiễm bẩn luồng rác.',
                totalEcoScore: 10,
                carbonSavedGrams: 5,
                objects: [{
                    id: 1,
                    name: 'Pin đã dùng',
                    category: 'Pin',
                    gridCell: 11,
                    recyclable: 'special',
                    confidence: 0.95,
                    ecoScore: 10,
                    disposalAction: 'Mang pin đến điểm thu gom pin chuyên dụng.',
                    disposalPlan: {
                        immediateAction: 'Không bỏ pin vào rác thường hoặc thùng tái chế.',
                        steps: ['Dán băng keo lên cực pin hở nếu cần.', 'Cất pin trong hộp khô, không bằng kim loại.', 'Mang đến điểm thu gom pin.'],
                        handlingType: 'Điểm thu gom pin',
                        safetyWarning: 'Pin hư hỏng có thể rò rỉ hoặc quá nhiệt.',
                        mistakeToAvoid: 'Không bỏ pin vào thùng tái chế lề đường.'
                    },
                    components: [
                        { part: 'Lõi pin', material: 'Kim loại và hóa chất hỗn hợp', recyclable: 'special', instruction: 'Dùng điểm thu gom pin chuyên dụng.' },
                        { part: 'Vỏ kim loại', material: 'Thép hoặc nhôm', recyclable: 'special', instruction: 'Chỉ được thu hồi qua chương trình tái chế pin.' }
                    ],
                    preparationSteps: ['Dán băng keo lên cực pin hở nếu cần.', 'Cất pin ở nơi khô ráo.', 'Mang đến điểm thu gom pin.'],
                    education: 'Tái chế pin giúp ngăn kim loại nguy hại và chất điện phân đi vào bãi chôn lấp hoặc nguồn nước.',
                    carbonSavedGrams: 5
                }]
            },
            bag: {
                scanType: 'single',
                language: 'vi',
                mainItem: 'Túi nhựa mềm đi chợ',
                category: 'Nhựa LDPE số 4',
                recyclable: 'special',
                confidence: 0.88,
                overallSummary: 'Túi nhựa mềm không phù hợp với hầu hết thùng tái chế lề đường vì có thể kẹt máy phân loại. Hãy dùng điểm thu gom tại cửa hàng nếu có.',
                totalEcoScore: 40,
                carbonSavedGrams: 20,
                objects: [{
                    id: 1,
                    name: 'Túi nhựa mua sắm',
                    category: 'Nhựa LDPE',
                    gridCell: 7,
                    recyclable: 'special',
                    confidence: 0.89,
                    ecoScore: 40,
                    disposalAction: 'Bỏ vào thùng thu gom nhựa mềm tại siêu thị nếu túi sạch và khô.',
                    disposalPlan: {
                        immediateAction: 'Lấy hóa đơn và cặn thức ăn ra khỏi túi.',
                        steps: ['Làm rỗng túi.', 'Đảm bảo túi sạch và khô.', 'Gom chung với các túi nhựa mềm khác.', 'Đem đến điểm thu gom nhựa mềm tại cửa hàng.'],
                        handlingType: 'Điểm thu gom nhựa mềm tại cửa hàng',
                        safetyWarning: 'Không có cảnh báo an toàn đặc biệt, nhưng hãy tránh để trẻ nhỏ hoặc động vật tiếp xúc.',
                        mistakeToAvoid: 'Không bỏ túi nhựa mềm rời vào thùng tái chế lề đường.'
                    },
                    components: [{ part: 'Thân túi', material: 'Màng nhựa LDPE', recyclable: 'special', instruction: 'Chỉ tái chế qua chương trình thu gom nhựa mềm.' }],
                    preparationSteps: ['Làm rỗng túi.', 'Giữ túi sạch và khô.', 'Gom chung với nhựa mềm khác.'],
                    education: 'Nhựa mềm có thể quấn vào máy phân loại và làm nhiễm bẩn luồng tái chế lề đường.',
                    carbonSavedGrams: 20
                }]
            },
            mixed: {
                scanType: 'batch',
                language: 'vi',
                mainItem: 'Cảnh rác hỗn hợp',
                category: 'Rác hỗn hợp',
                recyclable: 'partial',
                confidence: 0.95,
                overallSummary: 'Phát hiện bốn vật phẩm rác. Chọn từng thẻ vật phẩm để xem kế hoạch xử lý phù hợp.',
                totalEcoScore: 213,
                carbonSavedGrams: 106,
                objects: [
                    {
                        id: 1,
                        name: 'Lon nước ngọt nhôm',
                        category: 'Kim loại',
                        gridCell: 2,
                        recyclable: true,
                        confidence: 0.98,
                        ecoScore: 95,
                        disposalAction: 'Đổ hết, rửa sạch và bỏ vào thùng tái chế kim loại.',
                        disposalPlan: {
                            immediateAction: 'Đổ hết và rửa sạch lon.',
                            steps: ['Đổ hết chất lỏng còn lại.', 'Rửa sạch phần cặn dính.', 'Chỉ ép dẹp nếu địa phương cho phép.', 'Bỏ vào thùng tái chế kim loại.'],
                            handlingType: 'Thùng tái chế',
                            safetyWarning: 'Cẩn thận cạnh sắc nếu lon bị ép dẹp.',
                            mistakeToAvoid: 'Không tái chế lon vẫn còn chất lỏng.'
                        },
                        components: [{ part: 'Thân lon', material: 'Nhôm', recyclable: true, instruction: 'Rửa sạch và tái chế như kim loại.' }],
                        preparationSteps: ['Đổ hết chất lỏng còn lại.', 'Rửa sạch cặn dính.', 'Bỏ vào thùng tái chế kim loại.'],
                        education: 'Tái chế nhôm tiết kiệm nhiều năng lượng so với sản xuất nhôm mới.',
                        carbonSavedGrams: 47
                    },
                    {
                        id: 2,
                        name: 'Hộp bìa carton',
                        category: 'Giấy',
                        gridCell: 4,
                        recyclable: true,
                        confidence: 0.96,
                        ecoScore: 88,
                        disposalAction: 'Gỡ băng keo, ép phẳng và tái chế như giấy.',
                        disposalPlan: {
                            immediateAction: 'Gỡ băng keo nhựa và ép phẳng hộp.',
                            steps: ['Gỡ băng keo nhựa.', 'Ép phẳng bìa carton.', 'Giữ khô và sạch.', 'Bỏ vào thùng tái chế giấy.'],
                            handlingType: 'Thùng tái chế giấy',
                            safetyWarning: 'Không có cảnh báo an toàn đặc biệt.',
                            mistakeToAvoid: 'Không tái chế bìa carton ướt hoặc dính dầu mỡ.'
                        },
                        components: [
                            { part: 'Thân hộp carton', material: 'Sợi giấy', recyclable: true, instruction: 'Ép phẳng trước khi tái chế.' },
                            { part: 'Băng keo nhựa', material: 'Keo polypropylene', recyclable: false, instruction: 'Gỡ ra và bỏ vào rác thường.' }
                        ],
                        preparationSteps: ['Gỡ băng keo nhựa.', 'Ép phẳng bìa carton.', 'Giữ khô.'],
                        education: 'Bìa carton sạch có thể được nghiền thành bột giấy để làm bao bì mới.',
                        carbonSavedGrams: 44
                    },
                    {
                        id: 3,
                        name: 'Pin AA',
                        category: 'Pin',
                        gridCell: 9,
                        recyclable: 'special',
                        confidence: 0.97,
                        ecoScore: 10,
                        disposalAction: 'Mang đến điểm tái chế pin.',
                        disposalPlan: {
                            immediateAction: 'Không bỏ pin vào các thùng rác thông thường.',
                            steps: ['Dán băng keo lên cực pin nếu cần.', 'Cất trong hộp khô.', 'Mang đến điểm thu gom pin.'],
                            handlingType: 'Điểm thu gom pin',
                            safetyWarning: 'Không nghiền, làm nóng hoặc đốt pin.',
                            mistakeToAvoid: 'Không trộn pin vào rác tái chế thông thường.'
                        },
                        components: [{ part: 'Lõi pin', material: 'Kẽm, mangan, thép và chất điện phân', recyclable: 'special', instruction: 'Chỉ xử lý qua chương trình tái chế pin.' }],
                        preparationSteps: ['Dán băng keo lên cực pin nếu cần.', 'Cất khô ráo.', 'Dùng điểm thu gom pin.'],
                        education: 'Thu gom pin giúp ngăn hóa chất ăn mòn đi vào bãi chôn lấp.',
                        carbonSavedGrams: 5
                    },
                    {
                        id: 4,
                        name: 'Hộp xốp dính bẩn',
                        category: 'Nhựa polystyrene',
                        gridCell: 15,
                        recyclable: false,
                        confidence: 0.9,
                        ecoScore: 20,
                        disposalAction: 'Bỏ vào rác thường trừ khi có cơ sở chuyên tái chế xốp chấp nhận.',
                        disposalPlan: {
                            immediateAction: 'Gạt bỏ thức ăn thừa và bỏ vào rác thường.',
                            steps: ['Loại bỏ thức ăn thừa.', 'Bỏ vào túi rác thường.', 'Tránh bẻ vụn thành mảnh nhỏ.'],
                            handlingType: 'Rác thường',
                            safetyWarning: 'Không đốt bao bì xốp.',
                            mistakeToAvoid: 'Không bỏ xốp dính dầu mỡ vào thùng tái chế giấy hoặc nhựa.'
                        },
                        components: [{ part: 'Khay xốp', material: 'Xốp polystyrene', recyclable: false, instruction: 'Hầu hết chương trình tái chế lề đường không chấp nhận.' }],
                        preparationSteps: ['Loại bỏ thức ăn thừa.', 'Bỏ vào rác thường.'],
                        education: 'Xốp dễ vỡ thành vi nhựa tồn tại lâu dài trong môi trường.',
                        carbonSavedGrams: 10
                    }
                ]
            }
        }
    };

    return (demoData[currentLanguage] || demoData.en)[scenario] || (demoData[currentLanguage] || demoData.en).bottle;
}

function getMockDemoResponse() {
    const selector = dom.demoScenarioSelect;
    const selectedScenario = selector ? selector.value : 'bottle';
    return normalizeResult(getLocalizedDemoData(selectedScenario));
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
        throw new Error(t('unsupportedProvider'));
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
                            type: 'text',
                            text: t('imageAnalysisUserPrompt')
                        },
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
                            type: 'text',
                            text: t('imageAnalysisUserPrompt')
                        },
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
                        { text: t('imageAnalysisUserPrompt') },
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

function getScanModeText(mode, field) {
    const keys = scanModeTranslationKeys[mode] || scanModeTranslationKeys.quick;
    return t(keys[field] || keys.label);
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
        const isLocalDevelopment = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
        if (isLocalDevelopment) {
            const appScope = new URL('./', window.location.href).href;
            navigator.serviceWorker.getRegistrations()
                .then(registrations => Promise.all(
                    registrations
                        .filter(registration => registration.scope === appScope || registration.scope.startsWith(appScope))
                        .map(registration => registration.unregister())
                ))
                .then(() => console.log(`[App] Service workers disabled for local development (${APP_VERSION}).`))
                .catch(error => console.warn('[App] Local service worker cleanup failed:', error));
            return;
        }

        window.addEventListener('load', () => {
            navigator.serviceWorker.register(`./sw.js?v=${APP_VERSION}`).then(registration => {
                registration.update();
            }).catch(error => {
                console.warn('[App] Service worker registration failed:', error);
            });
        });
    }
}

async function initCamera() {
    stopCamera();
    setCameraStatus(t('cameraStarting'), false);
    dom.inputChoicePanel?.classList.add('hidden');
    dom.videoCanvas.classList.add('hidden');
    dom.videoCanvas.classList.remove('tiktok-preview');
    dom.scanActionSection?.classList.add('hidden');
    dom.zoomControlWrap?.classList.add('hidden');
    dom.closeCameraBtn?.classList.add('hidden');
    dom.scanFrame?.classList.remove('hidden');
    document.querySelector('.scan-line-track')?.classList.remove('hidden');
    dom.confirmBtn?.classList.add('hidden');
    dom.scanBtn?.classList.remove('hidden');
    dom.captureRing?.classList.remove('hidden');

    if (!navigator.mediaDevices?.getUserMedia) {
        handleCameraError();
        return;
    }

    video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.className = 'tiktok-video';

    try {
        const capabilities = { video: { facingMode: { ideal: 'environment' } } };
        stream = await navigator.mediaDevices.getUserMedia(capabilities);

        // Apply zoom if slider has a non-default value
        const zoomVal = parseFloat(dom.zoomSlider?.value || '1');
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
            const maxZoom = videoTrack.getCapabilities?.()?.zoom?.max ?? 5;
            dom.zoomSlider?.setAttribute('max', maxZoom);
            if (zoomVal > 1) {
                videoTrack.applyConstraints({ advanced: [{ zoom: zoomVal }] }).catch(() => {});
            }
        }

        video.srcObject = stream;
        dom.videoCanvas.replaceWith(video);
        dom.videoCanvas = video;
        dom.videoCanvas.classList.remove('hidden');
        dom.inputChoicePanel?.classList.add('hidden');
        dom.zoomToggleBtn?.classList.remove('hidden');
        dom.closeCameraBtn?.classList.remove('hidden');
        setCameraStatus('', true);

        video.onloadedmetadata = () => {
            video.play();
        };
    } catch (error) {
        console.error('Camera access error:', error);
        handleCameraError();
    }
}

function stopCamera() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (stream) {
        stream.getVideoTracks().forEach(track => track.stop());
        stream = null;
    }
}

function handleCameraError() {
    stopCamera();
    dom.videoCanvas.classList.add('hidden');
    dom.scanActionSection?.classList.add('hidden');
    dom.zoomControlWrap?.classList.add('hidden');
    dom.closeCameraBtn?.classList.add('hidden');
    showInputChoices(t('cameraDeniedUploadStillAvailable'));
}

function setCameraStatus(message, shouldHide = false) {
    if (!dom.cameraStatusMessage) return;
    dom.cameraStatusMessage.textContent = message || '';
    dom.cameraStatusMessage.classList.toggle('hidden', shouldHide || !message);
}

function showInputChoices(message = '') {
    stopCamera();
    dom.videoCanvas.classList.add('hidden');
    dom.zoomToggleBtn?.classList.add('hidden');
    dom.zoomControlWrap?.classList.add('hidden');
    dom.closeCameraBtn?.classList.add('hidden');
    dom.inputChoicePanel?.classList.remove('hidden');
    setCameraStatus(message, !message);
}

function openUploadPicker() {
    dom.fileInput.value = '';
    dom.fileInput.click();
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

    // Draw the current video frame to a canvas
    const capCanvas = document.createElement('canvas');
    capCanvas.width = dom.videoCanvas.videoWidth || dom.videoCanvas.offsetWidth;
    capCanvas.height = dom.videoCanvas.videoHeight || dom.videoCanvas.offsetHeight;
    capCanvas.getContext('2d').drawImage(dom.videoCanvas, 0, 0, capCanvas.width, capCanvas.height);
    const imageData = capCanvas.toDataURL('image/jpeg', 0.86);

    capturedImageData = await compressImage(imageData, MAX_IMAGE_DIMENSION, 0.82);
    capturedHistoryImageData = await compressImage(imageData, HISTORY_IMAGE_DIMENSION, 0.72);

    setTimeout(() => {
        dom.flashOverlay.classList.remove('active');
        showSnappedPhoto(capturedImageData);
    }, 100);
}

function validateImageFile(file) {
    if (!file) {
        return t('noFileFound');
    }
    if (!file.type.startsWith('image/')) {
        return t('chooseImageFile');
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        return t('chooseSmallImage');
    }
    return '';
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function showUploadedImage(imageData) {
    stopCamera();
    const previewImg = document.createElement('img');
    previewImg.src = imageData;
    previewImg.alt = 'Uploaded waste';
    previewImg.className = 'tiktok-preview';
    dom.videoCanvas.replaceWith(previewImg);
    dom.videoCanvas = previewImg;

    dom.inputChoicePanel?.classList.add('hidden');
    dom.scanActionSection?.classList.add('hidden');
    dom.zoomControlWrap?.classList.add('hidden');
    dom.closeCameraBtn?.classList.add('hidden');

    // Hide scan frame / line, show confirm button
    dom.scanFrame?.classList.add('hidden');
    document.querySelector('.scan-line-track')?.classList.add('hidden');
    dom.confirmBtn?.classList.remove('hidden');
    dom.scanBtn?.classList.add('hidden');
    dom.captureRing?.classList.add('hidden');
}

async function processImageFile(file, successMessage, noteMessage = '') {
    const validationError = validateImageFile(file);
    if (validationError) {
        showToast(validationError);
        return false;
    }

    try {
        const imageDataUrl = await readFileAsDataUrl(file);
        if (!imageDataUrl || !imageDataUrl.startsWith('data:image/')) {
            throw new Error('Invalid image data after read: ' + (imageDataUrl ? imageDataUrl.slice(0, 30) : 'null'));
        }
        capturedImageData = await compressImage(imageDataUrl, MAX_IMAGE_DIMENSION, 0.82);
        if (!capturedImageData || !capturedImageData.startsWith('data:image/')) {
            throw new Error('compressImage(MAX) returned: ' + (capturedImageData || 'null'));
        }
        capturedHistoryImageData = await compressImage(imageDataUrl, HISTORY_IMAGE_DIMENSION, 0.72);
        if (!capturedHistoryImageData || !capturedHistoryImageData.startsWith('data:image/')) {
            throw new Error('compressImage(HISTORY) returned: ' + (capturedHistoryImageData || 'null'));
        }
        showUploadedImage(capturedImageData);
        showToast(noteMessage ? `${successMessage} ${noteMessage}` : successMessage);
        return true;
    } catch (error) {
        console.error('Image import error:', error);
        showToast(t('imageLoadFailed'));
        return false;
    }
}

async function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    await processImageFile(file, t('imageUploaded'));
}

function isTextEntryElement(element) {
    if (!element) return false;
    const tagName = element.tagName?.toLowerCase();
    return tagName === 'input' || tagName === 'textarea' || tagName === 'select' || element.isContentEditable;
}

function getClipboardImageFile(event) {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return null;

    const files = Array.from(clipboardData.files || []);
    const fileImage = files.find(file => file.type.startsWith('image/'));
    if (fileImage) return fileImage;

    const items = Array.from(clipboardData.items || []);
    const imageItem = items.find(item => item.kind === 'file' && item.type.startsWith('image/'));
    return imageItem ? imageItem.getAsFile() : null;
}

async function handlePaste(event) {
    if (isTextEntryElement(document.activeElement)) {
        return;
    }

    const imageFile = getClipboardImageFile(event);
    if (!imageFile) {
        showToast(t('noClipboardImage'));
        return;
    }

    event.preventDefault();
    await processImageFile(imageFile, t('imagePasted'));
}

function hasDraggedFiles(event) {
    return Array.from(event.dataTransfer?.types || []).includes('Files');
}

function setDropZoneActive(isActive) {
    dom.cameraSection.classList.toggle('drag-over', isActive);
    dom.dropZoneOverlay.classList.toggle('hidden', !isActive);
}

function handleDragEnter(event) {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    dragDepth += 1;
    setDropZoneActive(true);
}

function handleDragOver(event) {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setDropZoneActive(true);
}

function handleDragLeave(event) {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) {
        setDropZoneActive(false);
    }
}

async function handleDrop(event) {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    dragDepth = 0;
    setDropZoneActive(false);

    const files = Array.from(event.dataTransfer?.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
        showToast(t('dropImageFile'));
        return;
    }

    const note = imageFiles.length > 1 || files.length > 1 ? t('firstImageOnly') : '';
    await processImageFile(imageFiles[0], t('imageDropped'), note);
}

function showSnappedPhoto(imageData) {
    stopCamera();
    dom.videoCanvas.pause?.();
    dom.videoCanvas.srcObject = null;
    dom.videoCanvas.src = imageData;
    dom.videoCanvas.classList.add('hidden', 'tiktok-preview');
    dom.videoCanvas.classList.remove('tiktok-video');

    const previewImg = document.createElement('img');
    previewImg.src = imageData;
    previewImg.alt = 'Captured waste';
    previewImg.className = 'tiktok-preview tiktok-video';
    dom.videoCanvas.replaceWith(previewImg);
    dom.videoCanvas = previewImg;

    dom.inputChoicePanel?.classList.add('hidden');
    dom.scanActionSection?.classList.add('hidden');
    dom.zoomControlWrap?.classList.add('hidden');
    dom.closeCameraBtn?.classList.add('hidden');

    // Hide scan frame / line, show confirm button
    dom.scanFrame?.classList.add('hidden');
    document.querySelector('.scan-line-track')?.classList.add('hidden');
    dom.confirmBtn?.classList.remove('hidden');
    dom.scanBtn?.classList.add('hidden');
    dom.captureRing?.classList.add('hidden');
    setCameraStatus('', true);
}

function resetToCamera() {
    // Preview modal removed — just clear captured data
    dom.fileInput.value = '';
    capturedImageData = null;
    capturedHistoryImageData = null;

    // Restore the original canvas if it was replaced by a preview img
    const previewImg = dom.videoCanvas;
    if (previewImg && previewImg.tagName === 'IMG') {
        const canvas = document.createElement('canvas');
        canvas.id = 'videoCanvas';
        canvas.className = 'scan-video hidden';
        previewImg.replaceWith(canvas);
        dom.videoCanvas = canvas;
    }

    // Restore HUD: show scan frame / line, show capture button, hide confirm
    dom.scanFrame?.classList.remove('hidden');
    document.querySelector('.scan-line-track')?.classList.remove('hidden');
    dom.confirmBtn?.classList.add('hidden');
    dom.scanBtn?.classList.remove('hidden');
    dom.captureRing?.classList.remove('hidden');

    // Restart the camera feed (wrap to avoid breaking on permission errors)
    showInputChoices();
}

async function analyzeWithAI() {
    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    const config = getProviderConfig();
    const providerMeta = aiProviders[config.provider];

    if (!isDemoMode) {
        if (!config.apiKey) {
            openSettings();
            showToast(t('addProviderKey', { provider: providerMeta.label }));
            return;
        }
        if (!config.model) {
            openSettings();
            showToast(t('chooseProviderModel', { provider: providerMeta.label }));
            return;
        }
    }
    if (!capturedImageData) {
        showToast(t('captureFirst'));
        return;
    }

    dom.loadingModeText.textContent = getScanModeText(selectedScanMode, 'loading');
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
        showToast(isDemoMode
            ? t('demoAnalysisFailed', { message: error.message })
            : t('analysisFailed', { provider: providerMeta.label, message: error.message }));
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
            ? t('itemDetected', { count: result.objects.length })
            : result.mainItem;
        dom.resultItemName.textContent = title;
        dom.resultSummaryEcoScore.textContent = result.totalEcoScore || 0;
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
    renderSavedLanguageNote(result);
    dom.statusCard.className = 'rounded-2xl p-6 shadow-sm bg-gradient-to-r from-gray-500 to-gray-600';
    setIcon(dom.statusIcon, 'ph ph-warning text-white text-3xl');
    dom.statusMessage.textContent = t('unclearConfidence', { percent: Math.round(result.confidence * 100) });
    dom.detectedObjectsSection.classList.add('hidden');
    dom.gridOverlay.classList.add('hidden');
    dom.objectFocusBox.classList.add('hidden');
    renderObjectDetails(null);
    renderDisposalPlan(null);
    dom.resultSummaryEcoScore.textContent = '0';
    dom.ecoScoreValue.textContent = '0';
    dom.carbonSavedValue.textContent = '0g';
}

function renderSummary(result) {
    dom.resultSummaryCard.classList.remove('hidden');
    dom.resultSummaryText.textContent = result.overallSummary || buildSummary(result.objects);
    renderSavedLanguageNote(result);
}

function renderSavedLanguageNote(result) {
    const existingNote = document.getElementById('savedLanguageNote');
    if (existingNote) existingNote.remove();

    const savedLanguage = result.savedLanguage || result.language || '';
    const shouldShow = Boolean(result.isFromHistory) && (!savedLanguage || savedLanguage !== currentLanguage);
    if (!shouldShow) return;

    const note = createElement('p', {
        className: 'mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2',
        text: t('savedLanguageNote')
    });
    note.id = 'savedLanguageNote';
    dom.resultSummaryCard.appendChild(note);
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
        ? t('itemAnalyzed', { count: result.objects.length })
        : t('statusWithConfidence', { status: getStatusLabel(status), percent: Math.round(result.confidence * 100) });
}

function summarizeBatchStatus(objects) {
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
            text: `${item.ecoScore} ${t('ecoShort')}`
        });
        const confidence = createElement('span', {
            className: 'text-xs text-gray-500',
            text: `${Math.round(item.confidence * 100)}% ${t('confidence')}${item.gridCell ? ` | ${t('cell')} ${item.gridCell}` : ''}`
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
            dataset: { cell: item.gridCell || '', objectId: item.id }
        }, [
            createElement('div', { className: 'flex items-start justify-between gap-3' }, [
                createElement('div', {}, [title, category, confidence]),
                createElement('div', { className: 'flex flex-col items-end gap-2' }, [statusBadge, score])
            ]),
            action
        ]);

        card.style.animationDelay = `${index * 70}ms`;
        card.addEventListener('click', () => {
            setActiveDetectedObject(item.id);
            renderObjectDetails(item);
            renderDisposalPlan(item);
            focusGridCell(item.gridCell);
        });
        dom.detectedObjectsList.appendChild(card);
    });

    if (result.objects[0]) {
        setActiveDetectedObject(result.objects[0].id);
    }
}

function setActiveDetectedObject(objectId) {
    dom.detectedObjectsList.querySelectorAll('.result-card').forEach(card => {
        card.classList.toggle('active', String(card.dataset.objectId) === String(objectId));
    });
}

function renderGrid(result) {
    const detectedCells = new Set(result.objects.map(item => item.gridCell).filter(Boolean));
    if (detectedCells.size === 0) {
        dom.gridOverlay.classList.add('hidden');
        dom.objectFocusBox.classList.add('hidden');
        dom.gridOverlay.replaceChildren();
        currentFocusedGridCell = null;
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
    updateResultImageOverlayBounds();
    focusGridCell([...detectedCells][0]);
}

function getContainedImageRect() {
    const frame = dom.resultImageFrame;
    const image = dom.resultImage;
    if (!frame || !image) {
        return { left: 0, top: 0, width: 0, height: 0 };
    }

    const frameWidth = frame.clientWidth;
    const frameHeight = frame.clientHeight;
    const naturalWidth = image.naturalWidth || frameWidth;
    const naturalHeight = image.naturalHeight || frameHeight;
    const scale = Math.min(frameWidth / naturalWidth, frameHeight / naturalHeight);
    const width = naturalWidth * scale;
    const height = naturalHeight * scale;

    return {
        left: (frameWidth - width) / 2,
        top: (frameHeight - height) / 2,
        width,
        height
    };
}

function applyBounds(element, bounds) {
    element.style.left = `${bounds.left}px`;
    element.style.top = `${bounds.top}px`;
    element.style.width = `${bounds.width}px`;
    element.style.height = `${bounds.height}px`;
}

function updateResultImageOverlayBounds() {
    if (!dom.resultImageFrame || dom.gridOverlay.classList.contains('hidden')) return;
    const bounds = getContainedImageRect();
    applyBounds(dom.gridOverlay, bounds);
    if (currentFocusedGridCell) {
        focusGridCell(currentFocusedGridCell);
    }
}

function focusGridCell(cell) {
    if (!cell) {
        dom.objectFocusBox.classList.add('hidden');
        currentFocusedGridCell = null;
        return;
    }
    currentFocusedGridCell = cell;
    const bounds = getContainedImageRect();
    const zeroIndex = cell - 1;
    const row = Math.floor(zeroIndex / 4);
    const column = zeroIndex % 4;
    dom.objectFocusBox.style.left = `${bounds.left + (column * bounds.width / 4)}px`;
    dom.objectFocusBox.style.top = `${bounds.top + (row * bounds.height / 4)}px`;
    dom.objectFocusBox.style.width = `${bounds.width / 4}px`;
    dom.objectFocusBox.style.height = `${bounds.height / 4}px`;
    dom.objectFocusBox.classList.remove('hidden');
}

function renderObjectDetails(item) {
    dom.compositionBars.replaceChildren();
    dom.actionSteps.replaceChildren();

    if (!item) {
        dom.compositionBars.appendChild(createElement('p', {
            className: 'text-gray-400 text-sm',
            text: t('noMaterialBreakdown')
        }));
        dom.actionSteps.appendChild(createElement('p', {
            className: 'text-gray-400 text-sm',
            text: t('noPreparationSteps')
        }));
        return;
    }

    if (item.components.length === 0) {
        dom.compositionBars.appendChild(createElement('p', {
            className: 'text-gray-400 text-sm',
            text: t('noComponentDetails')
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
            createElement('p', { className: 'font-semibold mb-1', text: t('whyThisMatters') }),
            createElement('p', { text: item.education })
        ]));
    }
}

function renderDisposalPlan(item) {
    dom.disposalPlanGrid.replaceChildren();
    dom.disposalPlanSteps.replaceChildren();

    if (!item) {
        dom.disposalPlanItemName.textContent = t('noDisposalPlan');
        dom.disposalPlanGrid.appendChild(createElement('p', {
            className: 'text-sm text-gray-400',
            text: t('retakeForPlan')
        }));
        return;
    }

    const plan = normalizeDisposalPlan(item.disposalPlan, getFallbackDisposalPlan(item, item.recyclable, item.components || [], item.preparationSteps || []));
    dom.disposalPlanItemName.textContent = item.name;

    const cards = [
        {
            iconClass: 'ph ph-lightning text-emerald-600 text-xl',
            label: t('immediateAction'),
            value: plan.immediateAction,
            color: 'bg-emerald-50 border-emerald-100'
        },
        {
            iconClass: 'ph ph-trash text-blue-600 text-xl',
            label: t('correctBinHandling'),
            value: plan.handlingType,
            color: 'bg-blue-50 border-blue-100'
        },
        {
            iconClass: 'ph ph-warning text-amber-600 text-xl',
            label: t('safetyWarning'),
            value: plan.safetyWarning || t('noSafetyWarning'),
            color: 'bg-amber-50 border-amber-100'
        },
        {
            iconClass: 'ph ph-prohibit text-orange-600 text-xl',
            label: t('mistakeToAvoid'),
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
            text: t('noStepPlan')
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
        language: result.language || currentLanguage,
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
    const recentList = document.getElementById('recentListHistory');
    const emptyRecent = document.getElementById('emptyRecentHistory');
    if (!recentList || !emptyRecent) return;
    
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
            ? t('itemCount', { count: result.objects.length })
            : firstObject?.name || result.mainItem || t('wasteScan');
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
                createElement('p', { className: 'text-xs text-gray-500', text: `${date} | ${getScanModeText(entry.mode || 'quick', 'label')} | ${aiProviders[entry.provider]?.label || 'AI'}` })
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
            result.isFromHistory = true;
            result.savedLanguage = entry.language || result.language || '';
            showResults(result, false);
        });
        recentList.appendChild(historyItem);
    });
}

function clearHistory() {
    if (!confirm(t('clearHistoryConfirm'))) return;
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
            name: t('sampleBottleName'),
            category: t('sampleBottleCategory'),
            recyclable: 'partial',
            ecoScore: 12,
            disposalAction: t('sampleBottleAction'),
            disposalPlan: {
                immediateAction: t('sampleBottleImmediate'),
                steps: [t('sampleBottleStep1'), t('sampleBottleStep2'), t('sampleBottleStep3'), t('sampleBottleStep4')],
                handlingType: t('sampleBottleHandling'),
                safetyWarning: t('sampleBottleSafety'),
                mistakeToAvoid: t('sampleBottleMistake')
            },
            components: [
                { part: t('sampleBottleBody'), material: t('sampleBottleBodyMaterial'), recyclable: true, instruction: t('sampleBottleBodyInstruction') },
                { part: t('sampleBottleLabel'), material: t('sampleBottleLabelMaterial'), recyclable: false, instruction: t('sampleBottleLabelInstruction') }
            ],
            preparationSteps: [t('sampleBottleStep1'), t('sampleBottleStep2'), t('sampleBottleStep3')]
        }, 0),
        normalizeObject({
            id: 2,
            name: t('sampleBatteryName'),
            category: t('sampleBatteryCategory'),
            recyclable: 'special',
            ecoScore: 18,
            disposalAction: t('sampleBatteryAction'),
            disposalPlan: {
                immediateAction: t('sampleBatteryImmediate'),
                steps: [t('sampleBatteryStep1'), t('sampleBatteryStep2'), t('sampleBatteryStep3')],
                handlingType: t('sampleBatteryHandling'),
                safetyWarning: t('sampleBatterySafety'),
                mistakeToAvoid: t('sampleBatteryMistake')
            },
            components: [{ part: t('sampleBatteryCell'), material: t('sampleBatteryMaterial'), recyclable: 'special', instruction: t('sampleBatteryInstruction') }],
            preparationSteps: [t('sampleBatteryStep2'), t('sampleBatteryStep3')]
        }, 1),
        normalizeObject({
            id: 3,
            name: t('samplePizzaName'),
            category: t('samplePizzaCategory'),
            recyclable: false,
            ecoScore: 4,
            disposalAction: t('samplePizzaAction'),
            disposalPlan: {
                immediateAction: t('samplePizzaImmediate'),
                steps: [t('samplePizzaStep1'), t('samplePizzaStep2')],
                handlingType: t('samplePizzaHandling'),
                safetyWarning: t('samplePizzaSafety'),
                mistakeToAvoid: t('samplePizzaMistake')
            },
            components: [{ part: t('samplePizzaPart'), material: t('samplePizzaMaterial'), recyclable: false, instruction: t('samplePizzaInstruction') }],
            preparationSteps: [t('samplePizzaImmediate')]
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
        unique.push([t('checkLocalRules'), t('putInRegularRecycling'), t('throwAwayWithoutSorting')][unique.length - 1] || t('askLocalWasteGuide'));
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
            typeLabel: t('disposalAction'),
            prompt: t('qFirstActionPrompt', { item: item.name }),
            options: uniqueOptions(plan.immediateAction, [t('anyRecyclingBin'), t('ignoreLabelsThrowAway')]),
            correctAnswer: plan.immediateAction,
            explanation: t('qBestImmediate', { action: plan.immediateAction }),
            source: sourceLabel
        };
    }

    if (type === 'preparation') {
        const correct = plan.steps[0] || preparationSteps[0] || item.disposalAction;
        return {
            id: `${idBase}-prep`,
            typeLabel: t('preparationStep'),
            prompt: t('qPrepPrompt', { item: item.name }),
            options: uniqueOptions(correct, [t('recycleWithoutCleaning'), t('mixWithFoodWaste')]),
            correctAnswer: correct,
            explanation: t('qPrepExplain'),
            source: sourceLabel
        };
    }

    if (type === 'recyclable') {
        const correct = getStatusLabel(item.recyclable);
        return {
            id: `${idBase}-status`,
            typeLabel: t('recyclableStatus'),
            prompt: t('qClassifyPrompt', { item: item.name }),
            options: uniqueOptions(correct, [t('recyclable'), t('nonRecyclable'), t('special')].filter(label => label !== correct)),
            correctAnswer: correct,
            explanation: t('qClassifyExplain', { item: item.name, status: correct }),
            source: sourceLabel
        };
    }

    if (type === 'special') {
        return {
            id: `${idBase}-special`,
            typeLabel: t('specialHandling'),
            prompt: t('qHandlingPrompt', { item: item.name }),
            options: uniqueOptions(plan.handlingType, [t('regularRecyclingBin'), t('regularTrashNoSorting')]),
            correctAnswer: plan.handlingType,
            explanation: plan.safetyWarning || t('qRecommendedHandling', { handling: plan.handlingType }),
            source: sourceLabel
        };
    }

    const component = components[0] || normalizeComponent({ part: item.name, material: item.category, recyclable: item.recyclable, instruction: item.disposalAction });
    return {
        id: `${idBase}-material`,
        typeLabel: t('quizMaterialBreakdown'),
        prompt: t('qMaterialPrompt', { item: item.name }),
        options: uniqueOptions(`${component.part}: ${component.material}`, [t('noPartsToSeparate', { item: item.name }), t('allPartsTogether')]),
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
        { label: t('quizXp'), value: stats.quizXp },
        { label: t('completed'), value: stats.quizzesCompleted },
        { label: t('correctShort'), value: stats.correctAnswers },
        { label: t('accuracy'), value: `${accuracy}%` }
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

    dom.quizModalTitle.textContent = quiz.isSample ? t('quizTitleSample') : t('ecoQuiz');
    dom.quizSourceBadge.textContent = quiz.isSample ? t('sampleQuiz') : t('personalized');
    dom.quizEmptyState.classList.toggle('hidden', !quiz.isSample);
    dom.quizQuestionCard.classList.remove('hidden');
    dom.quizSummaryCard.classList.add('hidden');
    dom.quizModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    if (quiz.isSample) {
        dom.quizEmptyState.replaceChildren(
            icon('ph ph-info text-emerald-500 text-4xl'),
            createElement('h3', { className: 'text-lg font-bold text-gray-800 mt-3', text: t('sampleQuiz') }),
            createElement('p', {
                className: 'text-sm text-gray-500 mt-2',
                text: t('quizSampleDesc')
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

    dom.quizProgressText.textContent = t('questionProgress', {
        current: currentQuiz.currentIndex + 1,
        total: currentQuiz.questions.length
    });
    dom.quizTypeBadge.textContent = question.typeLabel;
    dom.quizSourceBadge.textContent = currentQuiz.isSample ? t('sampleQuiz') : t('personalized');
    dom.quizQuestionText.textContent = question.prompt;
    dom.quizOptionsList.replaceChildren();
    dom.quizFeedback.classList.add('hidden');
    dom.nextQuizBtn.disabled = !answered;
    dom.nextQuizBtn.textContent = currentQuiz.currentIndex === currentQuiz.questions.length - 1 ? t('finish') : t('nextButton');
    dom.quizScoreText.textContent = t('score', { score: currentQuiz.score, total: currentQuiz.selectedAnswers.length });

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
            text: isCorrect ? t('correct') : t('notQuite')
        }),
        createElement('p', {
            className: 'text-sm',
            text: question.explanation
        })
    );
    dom.nextQuizBtn.disabled = false;
    dom.quizScoreText.textContent = t('score', { score: currentQuiz.score, total: currentQuiz.selectedAnswers.length });
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
        createElement('h3', { className: 'text-2xl font-bold text-gray-800 mt-3', text: t('score', { score: currentQuiz.score, total: currentQuiz.questions.length }) }),
        createElement('p', {
            className: 'text-sm text-gray-500 mt-2',
            text: alreadyCompleted
                ? t('quizNoXpAgain')
                : t('quizCompleteXp', {
                    xp: awardedXp,
                    bonus: currentQuiz.score === currentQuiz.questions.length ? t('perfectBonus') : ''
                })
        }),
        createElement('button', {
            type: 'button',
            className: 'mt-5 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors',
            text: t('done')
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
        id: 'sprout',
        name: t('sprout'),
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        threshold: 0,
        nextThreshold: 100
    };

    if (totalEcoScore >= 500) {
        level = {
            id: 'master',
            name: t('master'),
            color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
            threshold: 500,
            nextThreshold: null
        };
    } else if (totalEcoScore >= 100) {
        level = {
            id: 'warrior',
            name: t('warrior'),
            color: 'bg-blue-50 text-blue-700 border-blue-200',
            threshold: 100,
            nextThreshold: 500
        };
    }

    dom.levelIcon.className = 'inline-flex items-center';
    setIcon(dom.levelIcon, `${levelIconClasses[level.id] || levelIconClasses.default} text-sm`);
    dom.levelText.textContent = level.name;
    dom.userLevelBadge.className = `flex items-center gap-1 px-2 py-0.5 ${level.color} rounded-full text-xs font-bold border`;

    const currentXpEl = document.getElementById('currentXp');
    const nextLevelXpEl = document.getElementById('nextLevelXp');
    const xpBar = document.getElementById('xpProgressBar');
    currentXpEl.textContent = `${totalEcoScore} ${t('xp')}`;

    if (level.nextThreshold) {
        nextLevelXpEl.textContent = `${t('next')} ${level.nextThreshold} ${t('xp')}`;
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
        const title = getAchievementTitle(achievement);
        const iconClass = achievementIconClasses[achievement.id] || 'ph ph-medal';
        dom.achievementList.appendChild(createElement('div', {
            className: `achievement-card border rounded-xl p-4 ${unlocked ? 'border-amber-200 bg-amber-50' : 'locked border-gray-100 bg-gray-50'}`
        }, [
            createElement('div', { className: 'flex items-start gap-3' }, [
                createElement('div', {
                    className: `achievement-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${unlocked ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`
                }, [
                    icon(`${iconClass} text-xl`)
                ]),
                createElement('div', { className: 'min-w-0' }, [
                    createElement('p', { className: 'font-bold text-gray-800', text: title }),
                    createElement('p', { className: 'text-xs text-gray-500 mt-1', text: getAchievementDescription(achievement) }),
                    createElement('p', { className: `text-xs font-semibold mt-2 ${unlocked ? 'text-amber-700' : 'text-gray-400'}`, text: unlocked ? t('unlocked') : t('locked') })
                ])
            ])
        ]));
    });
}

function getAchievementTranslationBase(achievement) {
    const bases = {
        eco_starter: 'achEcoStarter',
        recycling_hero: 'achRecyclingHero',
        plastic_hunter: 'achPlasticHunter',
        battery_guardian: 'achBatteryGuardian',
        batch_master: 'achBatchMaster',
        eco_learner: 'achEcoLearner',
        sorting_student: 'achSortingStudent',
        perfect_sorter: 'achPerfectSorter',
        waste_wisdom: 'achWasteWisdom'
    };
    return bases[achievement.id] || '';
}

function getAchievementTitle(achievement) {
    const base = getAchievementTranslationBase(achievement);
    return base ? t(base) : achievement.title;
}

function getAchievementDescription(achievement) {
    const base = getAchievementTranslationBase(achievement);
    return base ? t(`${base}Desc`) : achievement.description;
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
    dom.achievementBanner.textContent = t('achievementUnlocked', { title: getAchievementTitle(achievement) });
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
        plastic: t('plastic'),
        metal: t('metal'),
        paper: t('paper'),
        glass: t('glass'),
        special: t('eWasteBattery'),
        other: t('other'),
        none: t('noneYet')
    };
    return labels[category] || t('other');
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
        { label: t('totalScans'), value: metrics.totalScans, iconClass: 'ph ph-camera text-emerald-600' },
        { label: t('ecoScore'), value: metrics.totalEcoScore, iconClass: 'ph ph-leaf text-emerald-600' },
        { label: t('recyclableItems'), value: metrics.recyclableCount, iconClass: 'ph ph-recycle text-emerald-600' },
        { label: t('nonRecyclableItems'), value: metrics.nonRecyclableCount, iconClass: 'ph ph-warning text-orange-600' },
        { label: t('specialHandlingItems'), value: metrics.specialHandlingCount, iconClass: 'ph ph-shield-warning text-amber-600' },
        { label: t('mostCommon'), value: formatCategoryName(metrics.mostCommonCategory), iconClass: 'ph ph-stack text-blue-600' },
        { label: t('estimatedCo2Saved'), value: formatCo2(metrics.estimatedCo2Kg), iconClass: 'ph ph-cloud text-blue-600' },
        { label: t('quizXp'), value: metrics.quizStats.quizXp, iconClass: 'ph ph-graduation-cap text-emerald-600' },
        { label: t('quizzesCompleted'), value: metrics.quizStats.quizzesCompleted, iconClass: 'ph ph-check-circle text-emerald-600' },
        { label: t('correctAnswers'), value: metrics.quizStats.correctAnswers, iconClass: 'ph ph-thumbs-up text-blue-600' },
        { label: t('incorrectAnswers'), value: metrics.quizStats.incorrectAnswers, iconClass: 'ph ph-x-circle text-orange-600' },
        { label: t('quizAccuracy'), value: `${metrics.quizAccuracy}%`, iconClass: 'ph ph-target text-purple-600' }
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

    dom.impactSummaryText.textContent = t('scansSummary', {
        count: metrics.totalScans,
        co2: formatCo2(metrics.estimatedCo2Kg)
    });

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
                createElement('span', { className: 'text-gray-500', text: t('itemCountWithCo2', { count, co2: formatCo2(co2) }) })
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
    const otherCount = Math.max(0, objects.length - recyclableCount);

    statsChartInstance = new Chart(dom.statsChartCanvas, {
        type: 'doughnut',
        data: {
            labels: [t('recyclable'), t('nonRecyclable')],
            datasets: [{
                data: [recyclableCount, otherCount],
                backgroundColor: ['#10b981', '#f97316'],
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
                        color: currentTheme === 'dark' ? '#cbd5e1' : '#374151',
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

    // Reset to general tab
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.toggle('active', t.dataset.settingsTab === 'general'));
    document.querySelectorAll('.settings-tab-pane').forEach(p => p.classList.toggle('hidden', p.id !== 'tab-general'));

    selectedProvider = localStorage.getItem(STORAGE_KEYS.provider) || selectedProvider || 'openai';
    dom.providerSelect.value = aiProviders[selectedProvider] ? selectedProvider : 'openai';
    syncProviderCards(selectedProvider);

    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    if (dom.demoModeSwitch) {
        dom.demoModeSwitch.checked = isDemoMode;
    }
    updateDemoModeUI(isDemoMode);

    loadProviderSettings(dom.providerSelect.value);

    // Update About tab level
    const aboutLevelEl = document.getElementById('aboutLevelNum');
    if (aboutLevelEl) {
        const metrics = getMetrics();
        aboutLevelEl.textContent = metrics.totalEcoScore;
    }
}

function closeSettings() {
    dom.settingsModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function updateApiKeyStatus(isConfigured) {
    const providerMeta = aiProviders[dom.providerSelect.value] || aiProviders.openai;
    dom.apiKeyStatus.classList.remove('hidden');
    dom.apiKeyStatus.className = isConfigured ? 'verified' : 'warning';
    dom.apiKeyStatus.replaceChildren(
        icon(isConfigured ? 'ph ph-check-circle-fill' : 'ph ph-warning-circle-fill'),
        document.createTextNode(isConfigured
            ? t('keyConfigured', { provider: providerMeta.label })
            : t('keyMissing', { provider: providerMeta.label }))
    );
}

function loadProviderSettings(provider) {
    const normalizedProvider = aiProviders[provider] ? provider : 'openai';
    const providerMeta = aiProviders[normalizedProvider];
    const config = getProviderConfig(normalizedProvider);

    dom.providerSelect.value = normalizedProvider;
    syncProviderCards(normalizedProvider);

    const modelDropdown = document.getElementById('modelDropdown');
    const apiKeyHelp = document.getElementById('apiKeyHelp');

    modelDropdown.replaceChildren();
    providerMeta.recommendedModels.forEach(model => {
        modelDropdown.appendChild(createElement('option', { text: model }));
        modelDropdown.lastElementChild.value = model;
    });
    modelDropdown.appendChild(createElement('option', { text: t('custom') }));
    modelDropdown.lastElementChild.value = 'custom';

    const hasCustomModel = config.customModel && config.customModel.trim() !== '';
    const isKnownModel = providerMeta.recommendedModels.includes(config.selectedModel);
    if (hasCustomModel) {
        modelDropdown.value = 'custom';
        dom.modelInput.value = config.customModel;
        dom.modelInputWrapper.classList.remove('hidden');
    } else {
        modelDropdown.value = isKnownModel ? config.selectedModel : providerMeta.defaultModel;
        dom.modelInput.value = '';
        dom.modelInputWrapper.classList.add('hidden');
    }
    dom.modelInput.placeholder = t('customModelPlaceholder');

    dom.apiKeyInput.placeholder = providerMeta.keyPlaceholder;
    dom.apiKeyInput.value = config.apiKey;
    apiKeyHelp.replaceChildren(
        document.createTextNode(t('keyHelpText', { provider: providerMeta.label }) + ' '),
        createElement('a', { className: 'text-emerald-600 hover:underline', text: providerMeta.label })
    );
    const link = apiKeyHelp.querySelector('a');
    if (link) {
        link.href = providerMeta.keyHelpUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }

    updateApiKeyStatus(Boolean(config.apiKey));
}

function saveSettings() {
    const provider = dom.providerSelect.value;
    const providerMeta = aiProviders[provider] || aiProviders.openai;
    const key = dom.apiKeyInput.value.trim();
    const modelDropdown = document.getElementById('modelDropdown');
    const selectedModel = modelDropdown ? modelDropdown.value : (dom.modelSelect.value || providerMeta.defaultModel);
    let customModel = '';
    let effectiveModel = '';

    if (selectedModel === 'custom') {
        customModel = dom.modelInput.value.trim();
        effectiveModel = customModel;
    } else {
        customModel = '';
        effectiveModel = selectedModel || providerMeta.defaultModel;
    }

    if (!key) {
        showToast(t('invalidProviderKey', { provider: providerMeta.label }));
        return;
    }
    if (!effectiveModel) {
        showToast(t('invalidProviderModel', { provider: providerMeta.label }));
        return;
    }

    saveProviderConfig({ provider, apiKey: key, selectedModel, customModel });
    updateApiKeyStatus(true);
    closeSettings();
    showToast(t('providerSettingsSaved', { provider: providerMeta.label }));
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

function refreshLanguage() {
    applyStaticTranslations();
    setScanMode(selectedScanMode);
    loadHistory();
    renderChart();
    updateUserLevel();
    renderAchievements();
    renderQuizInlineStats();
    updateDemoModeUI(localStorage.getItem(STORAGE_KEYS.demoMode) === 'true');

    if (dom.settingsModal && !dom.settingsModal.classList.contains('hidden')) {
        loadProviderSettings(dom.providerSelect.value);
    }

    if (dom.resultsModal && !dom.resultsModal.classList.contains('hidden') && lastAnalysisResult) {
        if (lastAnalysisResult.scanType === 'unclear') {
            renderUnclearResult(lastAnalysisResult);
        } else {
            dom.resultItemName.textContent = lastAnalysisResult.scanType === 'batch'
                ? t('itemDetected', { count: lastAnalysisResult.objects.length })
                : lastAnalysisResult.mainItem;
            renderSummary(lastAnalysisResult);
            renderStatus(lastAnalysisResult);
            renderDetectedObjects(lastAnalysisResult);
            renderGrid(lastAnalysisResult);
            renderObjectDetails(lastAnalysisResult.objects[0]);
            renderDisposalPlan(lastAnalysisResult.objects[0]);
            renderSustainability(lastAnalysisResult);
        }
    }

    if (dom.quizModal && !dom.quizModal.classList.contains('hidden') && currentQuiz) {
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
        dom.quizEmptyState.classList.toggle('hidden', !quiz.isSample);
        dom.quizQuestionCard.classList.remove('hidden');
        dom.quizSummaryCard.classList.add('hidden');
        dom.quizModalTitle.textContent = currentQuiz.isSample ? t('quizTitleSample') : t('ecoQuiz');
        renderQuizQuestion();
    }
}

function setLanguage(language) {
    currentLanguage = language === 'vi' ? 'vi' : 'en';
    localStorage.setItem(STORAGE_KEYS.language, currentLanguage);
    refreshLanguage();
}

async function clearLocalAppCache() {
    try {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames
                    .filter(cacheName => cacheName.startsWith(APP_CACHE_PREFIX))
                    .map(cacheName => caches.delete(cacheName))
            );
        }

        if ('serviceWorker' in navigator) {
            const appScope = new URL('./', window.location.href).href;
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(
                registrations
                    .filter(registration => registration.scope === appScope || registration.scope.startsWith(appScope))
                    .map(registration => registration.unregister())
            );
        }

        showToast(t('cacheClearedReload'));
    } catch (error) {
        console.error('[App] Failed to clear local cache:', error);
        showToast(t('cacheClearedReload'));
    }
}

function hardRefreshApp() {
    const url = new URL(window.location.href);
    url.searchParams.set('v', Date.now().toString());
    window.location.replace(url.toString());
}

function closeResults() {
    dom.resultsModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    resetToCamera();
}

function syncProviderCards(provider) {
    document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.toggle('active', card.dataset.provider === provider);
    });
}

function bindEvents() {
    dom.scanModeOptions.addEventListener('click', event => {
        const button = event.target.closest('[data-mode]');
        if (button) setScanMode(button.dataset.mode);
    });
    dom.languageSelect?.addEventListener('change', event => setLanguage(event.target.value));
    dom.themeToggleGroup?.addEventListener('click', event => {
        const button = event.target.closest('[data-theme-option]');
        if (!button) return;
        applyTheme(button.dataset.themeOption);
        renderChart();
    });
    dom.clearLocalCacheBtn?.addEventListener('click', async () => {
        await clearLocalAppCache();
        setTimeout(hardRefreshApp, 900);
    });
    dom.settingsBtn.addEventListener('click', openSettings);
    dom.closeSettingsBtn.addEventListener('click', closeSettings);
    dom.cancelSettingsBtn.addEventListener('click', closeSettings);
    dom.saveSettingsBtn.addEventListener('click', saveSettings);

    // Tab switching
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.settingsTab;
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.toggle('active', t === tab));
            document.querySelectorAll('.settings-tab-pane').forEach(p => p.classList.toggle('hidden', p.id !== 'tab-' + tabName));
        });
    });

    // Provider card selection
    document.querySelectorAll('.provider-card').forEach(card => {
        card.addEventListener('click', () => {
            const provider = card.dataset.provider;
            dom.providerSelect.value = provider;
            syncProviderCards(provider);
            loadProviderSettings(provider);
        });
    });

    // Model dropdown change (visible dropdown in AI tab)
    const modelDropdown = document.getElementById('modelDropdown');
    modelDropdown?.addEventListener('change', () => {
        if (modelDropdown.value === 'custom') {
            dom.modelInputWrapper.classList.remove('hidden');
            dom.modelInput.focus();
        } else {
            dom.modelInputWrapper.classList.add('hidden');
        }
    });

    // Hidden modelSelect change (fallback)
    dom.modelSelect.addEventListener('change', () => {
        if (dom.modelSelect.value === 'custom') {
            dom.modelInputWrapper.classList.remove('hidden');
            dom.modelInput.focus();
        } else {
            dom.modelInputWrapper.classList.add('hidden');
        }
    });

    dom.providerSelect.addEventListener('change', () => {
        selectedProvider = dom.providerSelect.value;
        localStorage.setItem(STORAGE_KEYS.provider, selectedProvider);
        syncProviderCards(selectedProvider);
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
    dom.zoomToggleBtn?.addEventListener('click', () => {
        dom.zoomControlWrap?.classList.toggle('hidden');
        dom.zoomToggleBtn?.classList.toggle('active');
    });
    dom.scanBtn.addEventListener('click', () => {
        if (!stream) return;
        captureImage();
    });
    dom.closeCameraBtn?.addEventListener('click', () => showInputChoices());
    dom.galleryBtn?.addEventListener('click', openUploadPicker);
    dom.zoomSlider?.addEventListener('input', () => {
        const zoom = parseFloat(dom.zoomSlider.value);
        dom.zoomLabel.textContent = zoom.toFixed(1) + 'x';
        const track = stream?.getVideoTracks()[0];
        if (track) {
            track.applyConstraints({ advanced: [{ zoom }] }).catch(() => {});
        }
    });
    dom.fileInput.addEventListener('change', handleFileUpload);
    window.addEventListener('paste', handlePaste);
    window.addEventListener('resize', updateResultImageOverlayBounds);
    dom.resultImage.addEventListener('load', updateResultImageOverlayBounds);
    dom.cameraSection.addEventListener('dragenter', handleDragEnter);
    dom.cameraSection.addEventListener('dragover', handleDragOver);
    dom.cameraSection.addEventListener('dragleave', handleDragLeave);
    dom.cameraSection.addEventListener('drop', handleDrop);
    dom.confirmBtn?.addEventListener('click', analyzeWithAI);
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
            showToast(isActive ? t('demoActivated') : t('demoDeactivated'));
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
    console.log(`RecycleCheck AI version ${APP_VERSION} loaded`);
    setupPwa();
    applyTheme(currentTheme);
    bindEvents();
    setupBottomNavigation(); // Add bottom navigation
    applyStaticTranslations();
    setScanMode(selectedScanMode);
    
    const isDemoMode = localStorage.getItem(STORAGE_KEYS.demoMode) === 'true';
    if (dom.demoModeSwitch) {
        dom.demoModeSwitch.checked = isDemoMode;
    }
    updateDemoModeUI(isDemoMode);

    showInputChoices();
    loadHistory();
    renderChart();
    updateUserLevel();
    renderAchievements();
    renderQuizInlineStats();
}

// Setup Bottom Navigation
function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding page
            const pages = ['scan', 'history', 'quiz', 'profile'];
            pages.forEach(p => {
                const pageEl = document.getElementById(`page-${p}`);
                if (pageEl) {
                    pageEl.classList.toggle('hidden', p !== page);
                }
            });
        });
    });
}

initializeApp();
