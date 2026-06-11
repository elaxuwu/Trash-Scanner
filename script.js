// App Logic
        const videoFeed = document.getElementById('videoFeed');
        const videoCanvas = document.getElementById('videoCanvas');
        const scanBtn = document.getElementById('scanBtn');
        const scanActionSection = document.getElementById('scanActionSection');
        const flashOverlay = document.getElementById('flashOverlay');
        const loadingOverlay = document.getElementById('loadingOverlay');
        const cameraFallback = document.getElementById('cameraFallback');
        const fileInput = document.getElementById('fileInput');
        const cameraSection = document.getElementById('cameraSection');
        const previewModal = document.getElementById('previewModal');
        const previewImage = document.getElementById('previewImage');
        const closePreviewBtn = document.getElementById('closePreviewBtn');
        const retakeBtn = document.getElementById('retakeBtn');
        const analyzeBtn = document.getElementById('analyzeBtn');

        // Settings Modal Elements
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeSettingsBtn = document.getElementById('closeSettingsBtn');
        const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        const apiKeyInput = document.getElementById('apiKeyInput');
        const toggleApiKeyBtn = document.getElementById('toggleApiKeyBtn');
        const apiKeyStatus = document.getElementById('apiKeyStatus');
        
        // Developer Menu Elements
        const developerSettingsSection = document.getElementById('developerSettingsSection');
        const providerOpenAI = document.getElementById('providerOpenAI');
        const providerGemini = document.getElementById('providerGemini');
        const geminiKeyContainer = document.getElementById('geminiKeyContainer');
        const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
        const toggleGeminiKeyBtn = document.getElementById('toggleGeminiKeyBtn');

        // Results Modal Elements
        const resultsModal = document.getElementById('resultsModal');
        const closeResultsBtn = document.getElementById('closeResultsBtn');
        const resultImage = document.getElementById('resultImage');
        const resultItemName = document.getElementById('resultItemName');
        const statusCard = document.getElementById('statusCard');
        const statusIcon = document.getElementById('statusIcon');
        const statusMessage = document.getElementById('statusMessage');
        const compositionBars = document.getElementById('compositionBars');
        const actionSteps = document.getElementById('actionSteps');
        const ecoScoreValue = document.getElementById('ecoScoreValue');
        const carbonSavedValue = document.getElementById('carbonSavedValue');
        const saveHistoryContainer = document.getElementById('saveHistoryContainer');
        const saveToHistoryBtn = document.getElementById('saveToHistoryBtn');

        // UI Elements
        const userLevelBadge = document.getElementById('userLevelBadge');
        const levelIcon = document.getElementById('levelIcon');
        const levelText = document.getElementById('levelText');
        const langToggleBtn = document.getElementById('langToggleBtn');
        const statsChartCanvas = document.getElementById('statsChart');
        const totalRecycledCount = document.getElementById('totalRecycledCount');

        let stream = null;
        let ctx = null;
        let video = null;
        let capturedImageData = null;
        let lastAnalysisResult = null;
        let currentLanguage = 'en';
        let statsChartInstance = null;
        
        // Secret Developer Menu State
        let tapCount = 0;
        let tapTimer = null;
        let developerMode = false;
        let currentProvider = localStorage.getItem('ai_provider') || 'openai';

        // Storage Keys
        const STORAGE_KEYS = {
            OPENAI_KEY: 'openai_api_key',
            GEMINI_KEY: 'gemini_api_key',
            PROVIDER: 'ai_provider'
        };
        
        // API Configuration
        const API_CONFIG = {
            OPENAI: {
                url: 'https://api.openai.com/v1/chat/completions',
                model: 'gpt-4o-mini'
            },
            GEMINI: {
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent/',
                model: 'gemini-2.5-flash'
            }
        };

        // --- PWA REGISTRATION ---
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => console.log('[App] Service Worker registered:', reg.scope))
                    .catch(err => console.log('[App] SW registration failed:', err));
            });
        }

        // --- LANGUAGE MANAGEMENT ---
        const translations = {
            en: {
                appTitle: 'RecycleCheck AI',
                recentScans: 'Recent Scans',
                clearAll: 'Clear All',
                noScans: 'No recent scans yet.',
                settings: 'Settings',
                done: 'Done',
                retake: 'Retake',
                analyze: 'Analyze',
                uploading: 'Upload Image',
                analyzing: 'Analyzing waste...',
                cameraRequired: 'Camera Access Required',
                cameraDesc: 'To identify your waste instantly, please allow camera access or upload an image.',
                apiSettings: 'API Settings',
                cancel: 'Cancel',
                saveChanges: 'Save Changes',
                status: 'Recyclability Status',
                composition: 'Material Composition',
                disposalGuide: 'Disposal Guide',
                sustainability: 'Sustainability Tracker',
                ecoScore: 'Eco Score',
                carbonSaved: 'CO₂ Saved',
                saveToHistory: 'Save to History',
                levelSprout: 'Sprout',
                levelWarrior: 'Eco Warrior',
                levelMaster: 'Recycle Master',
                analysisResults: 'Analysis Results',
                itemName: 'Item Name',
                analytics: 'Analytics',
                totalRecycled: 'Total Items Recycled',
                recyclable: 'Recyclable',
                nonRecyclable: 'Non-Recyclable',
                currentXp: 'XP',
                nextLevel: 'Next:',
                // Developer Menu
                devOptions: 'Developer Options',
                aiProvider: 'AI Provider',
                geminiKeyLabel: 'Gemini API Key'
            },
            vi: {
                appTitle: 'RecycleCheck AI',
                recentScans: 'Lịch Sử Quét',
                clearAll: 'Xóa Tất Cả',
                noScans: 'Chưa có quét nào gần đây.',
                settings: 'Cài Đặt',
                done: 'Xong',
                retake: 'Chụp Lại',
                analyze: 'Phân Tích',
                uploading: 'Tải Ảnh Lên',
                analyzing: 'Đang phân tích rác...',
                cameraRequired: 'Yêu Cầu Quyền Camera',
                cameraDesc: 'Để nhận diện rác ngay lập tức, vui lòng cho phép truy cập camera hoặc tải ảnh lên.',
                apiSettings: 'Cài Đặt API',
                cancel: 'Hủy',
                saveChanges: 'Lưu Thay Đổi',
                status: 'Tình Trạng Tái Chế',
                composition: 'Thành Phần Vật Liệu',
                disposalGuide: 'Hướng Dẫn Xử Lý',
                sustainability: 'Theo Dõi Bền Vững',
                ecoScore: 'Điểm Sinh Thái',
                carbonSaved: 'CO₂ Tiết Kiệm',
                saveToHistory: 'Lưu Vào Lịch Sử',
                levelSprout: 'Mầm Non',
                levelWarrior: 'Chiến Binh Xanh',
                levelMaster: 'Bậc Thầy Tái Chế',
                analysisResults: 'Kết Quả Phân Tích',
                itemName: 'Tên Sản Phẩm',
                analytics: 'Phân Tích',
                totalRecycled: 'Tổng Vật Phẩm Tái Chế',
                recyclable: 'Có Thể Tái Chế',
                nonRecyclable: 'Không Thể Tái Chế',
                currentXp: 'XP',
                nextLevel: 'Kế tiếp:',
                // Developer Menu
                devOptions: 'Tùy Chọn Nhà Phát Triển',
                aiProvider: 'Nhà Cung Cấp AI',
                geminiKeyLabel: 'Khóa API Gemini'
            }
        };

        function t(key) {
            return translations[currentLanguage][key] || translations['en'][key] || key;
        }

        function toggleLanguage() {
            currentLanguage = currentLanguage === 'en' ? 'vi' : 'en';
            langToggleBtn.textContent = currentLanguage === 'en' ? 'EN' : 'VI';
            updateUITexts();
        }

        function updateUITexts() {
            // Header
            document.querySelector('h1').textContent = t('appTitle');
            
            // Recent Scans
            document.querySelector('#recentList').previousElementSibling.querySelector('h2').textContent = t('recentScans');
            const clearBtn = document.getElementById('clearHistoryBtn');
            if (clearBtn) clearBtn.textContent = t('clearAll');
            const emptyRecent = document.getElementById('emptyRecent');
            if (emptyRecent) emptyRecent.querySelector('p').textContent = t('noScans');

            // Preview Modal
            const retakeSpan = retakeBtn.querySelector('span');
            if (retakeSpan) retakeSpan.textContent = t('retake');
            const analyzeSpan = analyzeBtn.querySelector('span');
            if (analyzeSpan) analyzeSpan.textContent = t('analyze');
            
            // Loading
            const loadingText = loadingOverlay.querySelector('p');
            if (loadingText) loadingText.textContent = t('analyzing');

            // Camera Fallback
            const cameraTitle = cameraFallback.querySelector('h3');
            if (cameraTitle) cameraTitle.textContent = t('cameraRequired');
            const cameraDesc = cameraFallback.querySelector('p');
            if (cameraDesc) cameraDesc.textContent = t('cameraDesc');
            const uploadLabel = cameraFallback.querySelector('label span');
            if (uploadLabel) uploadLabel.textContent = t('uploading');

            // Settings Modal
            document.querySelector('#settingsModal h2').textContent = t('apiSettings');
            cancelSettingsBtn.textContent = t('cancel');
            saveSettingsBtn.textContent = t('saveChanges');

            // Developer Menu Updates
            if (developerSettingsSection) {
                const devTitle = developerSettingsSection.querySelector('h3');
                if (devTitle) devTitle.innerHTML = `<i class="ph ph-code text-emerald-500"></i> ${t('devOptions')}`;
            }
            const providerLabel = providerOpenAI.closest('.mb-4').querySelector('label');
            if (providerLabel) providerLabel.textContent = t('aiProvider');
            const geminiLabel = geminiKeyContainer.querySelector('label');
            if (geminiLabel) geminiLabel.textContent = t('geminiKeyLabel');
            
            updateDeveloperUI();

            // Results Modal
            document.querySelector('#resultsModal h2').textContent = t('analysisResults');
            closeResultsBtn.textContent = t('done');
            
            // Labels in results
            statusMessage.previousElementSibling.textContent = t('status');
            document.querySelector('#compositionBars').previousElementSibling.querySelector('h5').textContent = t('composition');
            document.querySelector('#actionSteps').previousElementSibling.querySelector('h5').textContent = t('disposalGuide');
            
            // Tracker
            const trackerTitle = document.querySelector('#ecoScoreValue').closest('.bg-white').querySelector('h5');
            if (trackerTitle) trackerTitle.textContent = t('sustainability');
            document.querySelector('#ecoScoreValue').previousElementSibling.textContent = t('ecoScore');
            document.querySelector('#carbonSavedValue').previousElementSibling.textContent = t('carbonSaved');
            
            // Save btn
            const saveBtnSpan = saveToHistoryBtn.querySelector('span');
            if (saveBtnSpan) saveBtnSpan.textContent = t('saveToHistory');

            // Analytics
            const analyticsTitle = document.querySelector('#statsChart').closest('.bg-white').querySelector('h2');
            if (analyticsTitle) analyticsTitle.textContent = t('analytics');
            document.querySelector('#totalRecycledCount').previousElementSibling.textContent = t('totalRecycled');

            // User Level
            updateUserLevel();
        }

        langToggleBtn.addEventListener('click', toggleLanguage);

        // --- HISTORY MANAGEMENT ---
        
        const HISTORY_KEY = 'recycle_history';
        const MAX_HISTORY_ITEMS = 10;

        function getHistory() {
            const data = localStorage.getItem(HISTORY_KEY);
            return data ? JSON.parse(data) : [];
        }

        function saveHistory(history) {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }

        function addToHistory(resultData) {
            const history = getHistory();
            
            const newItem = {
                id: Date.now(),
                itemName: resultData.scanned_item || 'Unknown Item',
                isRecyclable: resultData.is_recyclable,
                statusMessage: resultData.status_message || '',
                ecoScore: resultData.eco_score || 0,
                carbonSaved: Math.round((resultData.eco_score || 0) * 0.5),
                timestamp: new Date().toISOString(),
                imageData: capturedImageData,
                composition: resultData.composition || [],
                actionSteps: resultData.action_steps || []
            };

            history.unshift(newItem);

            if (history.length > MAX_HISTORY_ITEMS) {
                history.pop();
            }

            saveHistory(history);
            loadHistory();
            updateUserLevel();
            renderChart();
        }

        function loadHistory() {
            const recentList = document.getElementById('recentList');
            const emptyRecent = document.getElementById('emptyRecent');
            const history = getHistory();

            const existingItems = recentList.querySelectorAll('.history-item');
            existingItems.forEach(item => item.remove());

            if (history.length === 0) {
                emptyRecent.classList.remove('hidden');
                return;
            }

            emptyRecent.classList.add('hidden');

            history.forEach(item => {
                const date = new Date(item.timestamp);
                const formattedDate = date.toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const isRecyclable = item.isRecyclable;
                const statusIconHtml = isRecyclable 
                    ? '<i class="ph ph-recycle text-emerald-500"></i>' 
                    : '<i class="ph ph-warning text-orange-500"></i>';
                const scoreColor = isRecyclable ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600';

                const historyItem = document.createElement('div');
                historyItem.className = 'history-item bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow';
                historyItem.innerHTML = `
                    <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        ${item.imageData 
                            ? `<img src="${item.imageData}" alt="${item.itemName}" class="w-full h-full object-cover">`
                            : `<i class="ph ph-package text-2xl text-gray-400"></i>`
                        }
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            ${statusIconHtml}
                            <h4 class="font-semibold text-gray-800 truncate">${item.itemName}</h4>
                        </div>
                        <p class="text-xs text-gray-500">${formattedDate}</p>
                    </div>
                    <div class="flex-shrink-0">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${scoreColor}">
                            <i class="ph ph-leaf mr-1"></i>
                            ${item.ecoScore}
                        </span>
                    </div>
                `;
                historyItem.addEventListener('click', () => {
                    viewHistoryItem(item);
                });
                recentList.appendChild(historyItem);
            });
        }

        function viewHistoryItem(item) {
            // Set image and item name
            resultImage.src = item.imageData;
            resultItemName.textContent = item.itemName;

            // Set timestamp
            const date = new Date(item.timestamp);
            const formattedDate = date.toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            document.getElementById('resultTimestamp').textContent = formattedDate;

            // Status Card
            if (item.isRecyclable) {
                statusCard.className = 'rounded-2xl p-6 shadow-sm bg-gradient-to-r from-emerald-500 to-emerald-600';
                statusIcon.innerHTML = '<i class="ph ph-recycle text-white text-3xl"></i>';
                statusMessage.textContent = '♻️ ' + (item.statusMessage || 'RECYCLABLE');
            } else {
                statusCard.className = 'rounded-2xl p-6 shadow-sm bg-gradient-to-r from-orange-500 to-red-500';
                statusIcon.innerHTML = '<i class="ph ph-warning text-white text-3xl"></i>';
                statusMessage.textContent = '⚠️ ' + (item.statusMessage || 'NOT RECYCLABLE');
            }

            // Composition Bars
            compositionBars.innerHTML = '';
            const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'];
            if (item.composition && item.composition.length > 0) {
                item.composition.forEach((compItem, index) => {
                    const color = colors[index % colors.length];
                    compositionBars.innerHTML += `
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span class="font-medium text-gray-700">${compItem.material}</span>
                                <span class="text-gray-500">${compItem.percentage}%</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2.5">
                                <div class="${color} h-2.5 rounded-full" style="width: ${compItem.percentage}%"></div>
                            </div>
                        </div>
                    `;
                });
            } else {
                compositionBars.innerHTML = '<p class="text-gray-400 text-sm">No composition data available.</p>';
            }

            // Action Steps
            actionSteps.innerHTML = '';
            if (item.actionSteps && item.actionSteps.length > 0) {
                item.actionSteps.forEach((step, index) => {
                    actionSteps.innerHTML += `
                        <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                            <div class="w-6 h-6 flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
                                ${index + 1}
                            </div>
                            <p class="text-gray-700 text-sm">${step}</p>
                        </div>
                    `;
                });
            } else {
                actionSteps.innerHTML = '<p class="text-gray-400 text-sm">No specific steps provided.</p>';
            }

            // Sustainability Tracker
            ecoScoreValue.textContent = item.ecoScore;
            carbonSavedValue.textContent = `${item.carbonSaved}g`;

            // Hide the save button for history view
            saveHistoryContainer.classList.add('hidden');

            // Show modal
            resultsModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

        function clearHistory() {
            if (confirm(currentLanguage === 'vi' ? 'Bạn có chắc muốn xóa tất cả lịch sử?' : 'Are you sure you want to clear all scan history?')) {
                localStorage.removeItem(HISTORY_KEY);
                loadHistory();
                updateUserLevel();
                renderChart();
            }
        }

        // --- GAMIFICATION ---
        function getTotalEcoScore() {
            const history = getHistory();
            return history.reduce((total, item) => total + (item.ecoScore || 0), 0);
        }

        function updateUserLevel() {
            const totalScore = getTotalEcoScore();
            let level = {
                icon: '🌱',
                name: t('levelSprout'),
                color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                threshold: 0,
                nextThreshold: 100
            };

            if (totalScore >= 500) {
                level = {
                    icon: '👑',
                    name: t('levelMaster'),
                    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                    threshold: 500,
                    nextThreshold: null
                };
            } else if (totalScore >= 100) {
                level = {
                    icon: '🛡️',
                    name: t('levelWarrior'),
                    color: 'bg-blue-50 text-blue-700 border-blue-200',
                    threshold: 100,
                    nextThreshold: 500
                };
            }

            levelIcon.textContent = level.icon;
            levelText.textContent = level.name;
            userLevelBadge.className = `flex items-center gap-1 px-2 py-0.5 ${level.color} rounded-full text-xs font-bold border`;

            // Update XP text
            const currentXpEl = document.getElementById('currentXp');
            const nextLevelXpEl = document.getElementById('nextLevelXp');
            const xpBar = document.getElementById('xpProgressBar');

            currentXpEl.textContent = `${totalScore} ${t('currentXp')}`;

            if (level.nextThreshold) {
                nextLevelXpEl.textContent = `${t('nextLevel')} ${level.nextThreshold} XP`;
                const progress = ((totalScore - level.threshold) / (level.nextThreshold - level.threshold)) * 100;
                xpBar.style.width = `${Math.min(progress, 100)}%`;
            } else {
                nextLevelXpEl.textContent = `${t('levelMaster')}!`;
                xpBar.style.width = '100%';
            }
        }

        function triggerConfetti() {
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }

        // --- ANALYTICS (CHART.JS) ---
        function renderChart() {
            const chartCanvas = document.getElementById('statsChart');
            if (!chartCanvas) return;

            // Destroy existing chart to avoid "Canvas already in use" error
            if (statsChartInstance) {
                statsChartInstance.destroy();
                statsChartInstance = null;
            }

            const history = getHistory();
            const totalItems = history.length;
            
            // Update counter
            totalRecycledCount.textContent = totalItems;

            // Count Recyclable vs Not Recyclable
            const recyclableCount = history.filter(item => item.isRecyclable).length;
            const notRecyclableCount = totalItems - recyclableCount;

            // Ensure there's at least some data to display a chart
            if (totalItems === 0) return;

            const data = {
                labels: [t('recyclable'), t('nonRecyclable')],
                datasets: [{
                    data: [recyclableCount, notRecyclableCount],
                    backgroundColor: [
                        '#10b981', // emerald-500
                        '#f97316'  // orange-500
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            };

            statsChartInstance = new Chart(chartCanvas, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12,
                                    family: 'inherit'
                                }
                            }
                        }
                    }
                }
            });
        }

        // --- SECRET DEVELOPER MENU ---
        
        function handleLogoTap() {
            tapCount++;
            if (tapTimer) clearTimeout(tapTimer);
            
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 1000);

            if (tapCount >= 5) {
                developerMode = !developerMode;
                tapCount = 0;
                updateDeveloperUI();
                
                if (developerMode) {
                    console.log('[App] Developer Mode Enabled');
                } else {
                    console.log('[App] Developer Mode Disabled');
                }
            }
        }

        function updateDeveloperUI() {
            // Update provider buttons styling
            if (currentProvider === 'openai') {
                providerOpenAI.classList.add('bg-white', 'shadow-sm', 'text-emerald-600');
                providerOpenAI.classList.remove('text-gray-500', 'hover:text-gray-700');
                providerGemini.classList.remove('bg-white', 'shadow-sm', 'text-emerald-600');
                providerGemini.classList.add('text-gray-500', 'hover:text-gray-700');
            } else {
                providerGemini.classList.add('bg-white', 'shadow-sm', 'text-emerald-600');
                providerGemini.classList.remove('text-gray-500', 'hover:text-gray-700');
                providerOpenAI.classList.remove('bg-white', 'shadow-sm', 'text-emerald-600');
                providerOpenAI.classList.add('text-gray-500', 'hover:text-gray-700');
            }

            // Show/hide Gemini key container
            // Note: Gemini key container is always visible now
        }

        function switchProvider(provider) {
            currentProvider = provider;
            localStorage.setItem(STORAGE_KEYS.PROVIDER, provider);
            updateDeveloperUI();
        }

        // Logo click event for developer menu
        document.querySelector('h1').addEventListener('click', handleLogoTap);

        // Provider Toggle Events
        providerOpenAI.addEventListener('click', () => switchProvider('openai'));
        providerGemini.addEventListener('click', () => switchProvider('gemini'));

        // Toggle Gemini Key Visibility
        toggleGeminiKeyBtn.addEventListener('click', () => {
            if (geminiApiKeyInput.type === 'password') {
                geminiApiKeyInput.type = 'text';
                toggleGeminiKeyBtn.innerHTML = '<i class="ph ph-eye-slash text-lg"></i>';
            } else {
                geminiApiKeyInput.type = 'password';
                toggleGeminiKeyBtn.innerHTML = '<i class="ph ph-eye text-lg"></i>';
            }
        });

        // --- SETTINGS MODAL LOGIC ---
        
        function openSettings() {
            settingsModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            
            // Load saved keys
            const savedOpenAIKey = localStorage.getItem(STORAGE_KEYS.OPENAI_KEY);
            const savedGeminiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
            
            if (savedOpenAIKey) {
                apiKeyInput.value = savedOpenAIKey;
            } else {
                apiKeyInput.value = '';
            }
            
            if (savedGeminiKey) {
                geminiApiKeyInput.value = savedGeminiKey;
            } else {
                geminiApiKeyInput.value = '';
            }
            
            updateDeveloperUI();
            updateApiKeyStatus();
        }

        function closeSettings() {
            settingsModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }

        function updateApiKeyStatus() {
            const currentKey = currentProvider === 'openai' 
                ? localStorage.getItem(STORAGE_KEYS.OPENAI_KEY) 
                : localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
            
            apiKeyStatus.classList.remove('hidden');
            if (currentKey) {
                apiKeyStatus.className = 'p-3 rounded-xl text-sm flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200';
                apiKeyStatus.innerHTML = '<i class="ph ph-check-circle"></i> ' + 
                    (currentProvider === 'gemini' 
                        ? (currentLanguage === 'vi' ? 'API Key Gemini đã được cấu hình' : 'Gemini API Key is configured')
                        : (currentLanguage === 'vi' ? 'API Key OpenAI đã được cấu hình' : 'OpenAI API Key is configured'));
            } else {
                apiKeyStatus.className = 'p-3 rounded-xl text-sm flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200';
                apiKeyStatus.innerHTML = '<i class="ph ph-warning"></i> ' + 
                    (currentLanguage === 'vi' ? 'Không tìm thấy API Key. Phân tích sẽ thất bại.' : 'No API Key found. Analysis will fail.');
            }
        }

        function saveSettings() {
            const openaiKey = apiKeyInput.value.trim();
            const geminiKey = geminiApiKeyInput.value.trim();
            
            // Save both keys regardless of provider
            if (openaiKey) {
                localStorage.setItem(STORAGE_KEYS.OPENAI_KEY, openaiKey);
            }
            if (geminiKey) {
                localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, geminiKey);
            }
            
            if (openaiKey || geminiKey) {
                alert(currentLanguage === 'vi' ? 'Cài đặt đã được lưu!' : 'Settings saved successfully!');
                closeSettings();
            } else {
                alert(currentLanguage === 'vi' ? 'Vui lòng nhập ít nhất một API Key.' : 'Please enter at least one API Key.');
            }
        }

        // Settings Event Listeners
        settingsBtn.addEventListener('click', openSettings);
        closeSettingsBtn.addEventListener('click', closeSettings);
        cancelSettingsBtn.addEventListener('click', closeSettings);
        saveSettingsBtn.addEventListener('click', saveSettings);

        toggleApiKeyBtn.addEventListener('click', () => {
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
                toggleApiKeyBtn.innerHTML = '<i class="ph ph-eye-slash text-lg"></i>';
            } else {
                apiKeyInput.type = 'password';
                toggleApiKeyBtn.innerHTML = '<i class="ph ph-eye text-lg"></i>';
            }
        });

        // --- CAMERA LOGIC ---

        async function initCamera() {
            video = document.createElement('video');
            video.id = 'videoFeed';
            video.autoplay = true;
            video.playsinline = true;
            video.muted = true;

            try {
                const constraints = {
                    video: {
                        facingMode: { ideal: "environment" },
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                };

                stream = await navigator.mediaDevices.getUserMedia(constraints);
                video.srcObject = stream;
                video.classList.remove('hidden');
                cameraFallback.classList.add('hidden');

                video.onloadedmetadata = () => {
                    video.play();
                    startCanvasLoop(video);
                };

            } catch (err) {
                console.error("Camera access error:", err);
                handleCameraError();
            }
        }

        function startCanvasLoop(video) {
            if (!ctx) ctx = videoCanvas.getContext('2d');
            
            const loop = () => {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    videoCanvas.width = video.videoWidth;
                    videoCanvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
                }
                if (stream) requestAnimationFrame(loop);
            };
            loop();
        }

        function handleCameraError() {
            videoCanvas.classList.add('hidden');
            cameraFallback.classList.remove('hidden');
            scanActionSection.classList.add('hidden');
        }

        // Scan Action
        scanBtn.addEventListener('click', () => {
            if (!stream) {
                fileInput.click();
                return;
            }
            captureImage();
        });

        // Handle File Upload
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    showSnappedPhoto(event.target.result);
                    showPreviewModal(event.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        function captureImage() {
            flashOverlay.classList.add('active');
            const imageData = videoCanvas.toDataURL('image/jpeg', 0.8);

            setTimeout(() => {
                flashOverlay.classList.remove('active');
                showSnappedPhoto(imageData);
                showPreviewModal(imageData);
            }, 100);
        }

        function showSnappedPhoto(imageData) {
            stream = null;
            ctx = null;
            videoCanvas.classList.add('hidden');

            let snappedPhoto = document.getElementById('snappedPhoto');
            if (!snappedPhoto) {
                snappedPhoto = document.createElement('img');
                snappedPhoto.id = 'snappedPhoto';
                snappedPhoto.className = 'w-full h-full absolute inset-0';
                snappedPhoto.style.objectFit = 'contain';
                snappedPhoto.style.backgroundColor = '#000';
                cameraSection.appendChild(snappedPhoto);
            }
            snappedPhoto.src = imageData;
            snappedPhoto.classList.remove('hidden');
            scanActionSection.classList.add('hidden');
        }

        function showPreviewModal(imageData) {
            capturedImageData = imageData;
            previewImage.src = imageData;
            previewModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

        function hidePreviewModal() {
            previewModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }

        function resetToCamera() {
            hidePreviewModal();
            const snappedPhoto = document.getElementById('snappedPhoto');
            if (snappedPhoto) {
                snappedPhoto.classList.add('hidden');
                snappedPhoto.src = '';
            }
            fileInput.value = '';
            videoCanvas.classList.remove('hidden');
            scanActionSection.classList.remove('hidden');
            initCamera();
        }

        // Preview Modal Event Listeners
        closePreviewBtn.addEventListener('click', resetToCamera);
        retakeBtn.addEventListener('click', resetToCamera);
        
        analyzeBtn.addEventListener('click', () => {
            analyzeWithAI();
        });

        // --- AI API INTEGRATION (OpenAI & Gemini) ---

        function getSystemPrompt() {
            const langRule = currentLanguage === 'vi' 
                ? 'The output JSON text for fields "scanned_item", "status_message", "material", and "action_steps" MUST be written in Vietnamese. Keep the JSON keys in English.'
                : 'The output JSON text for fields "scanned_item", "status_message", "material", and "action_steps" MUST be written in English.';

            return `You are an expert waste sorting AI. Analyze the uploaded image and return ONLY a JSON object matching exactly this structure: { "scanned_item": "Short item name", "is_recyclable": boolean, "status_message": "Short status like RECYCLABLE or CONTAMINATED", "composition": [ { "material": "Name", "percentage": number } ], "action_steps": [ "Step 1", "Step 2" ], "eco_score": number (0-100) }. ${langRule}`;
        }

        async function analyzeWithAI() {
            let apiKey = currentProvider === 'openai' 
                ? localStorage.getItem(STORAGE_KEYS.OPENAI_KEY) 
                : localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);

            if (!apiKey) {
                const userChoice = confirm(currentLanguage === 'vi' 
                    ? 'Không tìm thấy API Key. Bạn có muốn cài đặt ngay không?' 
                    : 'No API Key found. Would you like to set it up now?');
                if (userChoice) {
                    openSettings();
                }
                return;
            }

            hidePreviewModal();
            loadingOverlay.classList.add('active');
            console.log(`Sending image to ${currentProvider === 'openai' ? 'OpenAI' : 'Gemini'} API...`);

            try {
                let response;
                let data;
                let result;

                if (currentProvider === 'gemini') {
                    // Gemini API (OpenAI-compatible endpoint)
                    const config = API_CONFIG.GEMINI;
                    response = await fetch(`${config.url}?key=${apiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text: getSystemPrompt()
                                        },
                                        {
                                            inline_data: {
                                                mime_type: capturedImageData.split(';')[0].split(':')[1],
                                                data: capturedImageData.split(',')[1]
                                            }
                                        }
                                    ]
                                }
                            ],
                            generationConfig: {
                                responseMimeType: "application/json",
                                responseSchema: {
                                    type: "OBJECT",
                                    properties: {
                                        scanned_item: { type: "STRING" },
                                        is_recyclable: { type: "BOOLEAN" },
                                        status_message: { type: "STRING" },
                                        composition: {
                                            type: "ARRAY",
                                            items: {
                                                type: "OBJECT",
                                                properties: {
                                                    material: { type: "STRING" },
                                                    percentage: { type: "NUMBER" }
                                                }
                                            }
                                        },
                                        action_steps: {
                                            type: "ARRAY",
                                            items: { type: "STRING" }
                                        },
                                        eco_score: { type: "NUMBER" }
                                    }
                                }
                            }
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
                    }

                    data = await response.json();
                    result = JSON.parse(data.candidates[0].content.parts[0].text);
                } else {
                    // OpenAI API
                    const config = API_CONFIG.OPENAI;
                    response = await fetch(config.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            model: config.model,
                            response_format: { type: 'json_object' },
                            messages: [
                                {
                                    role: 'system',
                                    content: getSystemPrompt()
                                },
                                {
                                    role: 'user',
                                    content: [
                                        {
                                            type: 'image_url',
                                            image_url: {
                                                url: capturedImageData,
                                                detail: 'low'
                                            }
                                        }
                                    ]
                                }
                            ]
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
                    }

                    data = await response.json();
                    result = JSON.parse(data.choices[0].message.content);
                }
                
                loadingOverlay.classList.remove('active');
                showResults(result);

            } catch (error) {
                console.error('AI Analysis Error:', error);
                loadingOverlay.classList.remove('active');
                alert(currentLanguage === 'vi'
                    ? `Phân tích thất bại: ${error.message}\n\nVui lòng kiểm tra API key và kết nối internet.`
                    : `Analysis Failed: ${error.message}\n\nPlease check your API key and internet connection.`);
            }
        }

        // --- RESULTS MODAL LOGIC ---

        function showResults(data) {
            // Store the result for history saving
            lastAnalysisResult = data;
            
            // Auto-save to history
            addToHistory(data);
            
            // Set image and item name
            resultImage.src = capturedImageData;
            resultItemName.textContent = data.scanned_item || 'Unknown Item';

            // Set timestamp (new scan)
            const now = new Date();
            const formattedDate = now.toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            document.getElementById('resultTimestamp').textContent = formattedDate;

            // Status Card
            if (data.is_recyclable) {
                statusCard.className = 'rounded-2xl p-6 shadow-sm bg-gradient-to-r from-emerald-500 to-emerald-600';
                statusIcon.innerHTML = '<i class="ph ph-recycle text-white text-3xl"></i>';
                statusMessage.textContent = '♻️ ' + (data.status_message || 'RECYCLABLE');
            } else {
                statusCard.className = 'rounded-2xl p-6 shadow-sm bg-gradient-to-r from-orange-500 to-red-500';
                statusIcon.innerHTML = '<i class="ph ph-warning text-white text-3xl"></i>';
                statusMessage.textContent = '⚠️ ' + (data.status_message || 'NOT RECYCLABLE');
            }

            // Composition Bars
            compositionBars.innerHTML = '';
            const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'];
            if (data.composition && data.composition.length > 0) {
                data.composition.forEach((item, index) => {
                    const color = colors[index % colors.length];
                    compositionBars.innerHTML += `
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span class="font-medium text-gray-700">${item.material}</span>
                                <span class="text-gray-500">${item.percentage}%</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2.5">
                                <div class="${color} h-2.5 rounded-full" style="width: ${item.percentage}%"></div>
                            </div>
                        </div>
                    `;
                });
            } else {
                compositionBars.innerHTML = '<p class="text-gray-400 text-sm">No composition data available.</p>';
            }

            // Action Steps
            actionSteps.innerHTML = '';
            if (data.action_steps && data.action_steps.length > 0) {
                data.action_steps.forEach((step, index) => {
                    actionSteps.innerHTML += `
                        <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                            <div class="w-6 h-6 flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
                                ${index + 1}
                            </div>
                            <p class="text-gray-700 text-sm">${step}</p>
                        </div>
                    `;
                });
            } else {
                actionSteps.innerHTML = '<p class="text-gray-400 text-sm">No specific steps provided.</p>';
            }

            // Sustainability Tracker
            const score = data.eco_score || 0;
            ecoScoreValue.textContent = score;
            carbonSavedValue.textContent = `${Math.round(score * 0.5)}g`;

            // Show modal
            resultsModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');

            // Hide the save button since it's auto-saved
            saveHistoryContainer.classList.add('hidden');
        }

        function closeResults() {
            // Show the save button again for next analysis
            saveHistoryContainer.classList.remove('hidden');
            resultsModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            resetToCamera();
        }

        // Results Event Listeners
        closeResultsBtn.addEventListener('click', closeResults);
        
        saveToHistoryBtn.addEventListener('click', () => {
            if (lastAnalysisResult) {
                const oldLevel = getTotalEcoScore();
                addToHistory(lastAnalysisResult);
                const newLevel = getTotalEcoScore();
                
                // Check for level up
                if (oldLevel < 100 && newLevel >= 100) {
                    triggerConfetti();
                } else if (oldLevel < 500 && newLevel >= 500) {
                    triggerConfetti();
                }
                
                closeResults();
            }
        });

        // Clear History Button
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        clearHistoryBtn.addEventListener('click', clearHistory);

        // Cleanup on window close
        window.addEventListener('beforeunload', () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        });

        // Start
        updateDeveloperUI();
        initCamera();
        loadHistory();
        updateUserLevel();
        renderChart();
