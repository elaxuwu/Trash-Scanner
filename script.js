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

        let stream = null;
        let ctx = null;
        let video = null;

        // 1. Initialize Camera
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

        // 2. Scan Action
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
                    simulateProcessing();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        function captureImage() {
            // 1. Flash effect
            flashOverlay.classList.add('active');

            // 2. Capture frame from canvas
            const imageData = videoCanvas.toDataURL('image/jpeg', 0.8);

            setTimeout(() => {
                flashOverlay.classList.remove('active');
                showSnappedPhoto(imageData);
                simulateProcessing();
            }, 100);
        }

        function showSnappedPhoto(imageData) {
            // Stop camera loop
            stream = null;
            ctx = null;

            // Hide live canvas
            videoCanvas.classList.add('hidden');

            // Create and show static image
            let snappedPhoto = document.getElementById('snappedPhoto');
            if (!snappedPhoto) {
                snappedPhoto = document.createElement('img');
                snappedPhoto.id = 'snappedPhoto';
                snappedPhoto.className = 'w-full h-full object-cover absolute inset-0';
                cameraSection.appendChild(snappedPhoto);
            }
            snappedPhoto.src = imageData;
            snappedPhoto.classList.remove('hidden');

            // Hide scan button
            scanActionSection.classList.add('hidden');
        }

        function simulateProcessing() {
            // Show loading
            loadingOverlay.classList.add('active');

            console.log("Image captured successfully! Sending to AI model...");

            // Simulate 2 seconds of AI processing
            setTimeout(() => {
                loadingOverlay.classList.remove('active');

                // Reset input value
                fileInput.value = "";

                alert("Analysis Complete!\n\nResult: Recyclable Plastic Bottle (Type 1 PET)");
            }, 2000);
        }

        // Cleanup on window close
        window.addEventListener('beforeunload', () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        });

        // Start
        initCamera();
