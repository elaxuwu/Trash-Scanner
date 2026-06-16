Github repo: https://github.com/elaxuwu/Trash-Scanner  
# IMPORTANT: This web-based app is designed to be mobile-first!
If using Desktop, please turn on device emulation: on any browser, open DevTools (F12/Inspect), then Ctrl + Shift + M.

# RecycleCheck AI ♻️

Welcome to **RecycleCheck AI**, a gamified, completely client-side web app designed to eliminate recycling confusion and build eco-friendly habits. It turns a boring household chore into a fun, rewarding role-playing game (RPG) experience.

## 🛑 The Problem We Are Solving
We often found ourselves (and many others) standing in front of public recycle and trash bins on the street, completely confused about which bin to use. Because of this confusion, people usually end up throwing their trash into a random bin.

To fix this, we built RecycleCheck AI. We designed it to be **extremely fast and easy to use, with a crystal-clear interface**, because we know people only have a couple of seconds before they lose interest and just throw their trash away randomly.

## 📱 Project Overview
Recycling rules are confusing and different everywhere. **RecycleCheck AI** fixes this by putting a smart AI scanner right in your browser. Just take a picture or upload an image of your waste. The app instantly figures out what it is, tells you exactly how to throw it away, calculates your carbon savings, and gives you a personalized quiz.

### The Three Core Pillars
1. **Zero-Friction AI Scanner:** No app store downloads, no forced sign-ups. You use AI directly from your browser.
2. **Deep Gamification:** Build habits by earning XP, leveling up, unlocking achievements, and keeping your daily scan streak alive.
3. **Adaptive Learning:** The app learns from what you scan and gives you a custom quiz based on your actual trash habits.

## 🚀 Key App Features

| Feature | Description | Technical Details |
| :--- | :--- | :--- |
| **Multi-Object Auto-Detection** | Take a single picture containing multiple different types of trash! The AI will automatically detect every item in the photo and perform a full, separate analysis for each piece individually. | Loops through detected objects up to a set limit in the vision model prompt. |
| **Multi-Provider AI Scanner** | Instantly identifies household objects using your camera or file upload. | Connects directly to `OpenAI`, `Google Gemini`, or `OpenRouter`. |
| **Daily Streak Engine** | Tracks how many consecutive days you recycle to help build a habit. | Uses local storage to check your last scan dates. |
| **Interactive RecycleDex** | A "Pokedex" for trash. Items start as grey silhouettes and unlock when you scan them. | Updates UI cards dynamically based on your saved scan history. |
| **Adaptive Quiz Module** | Generates custom multiple-choice trivia questions based on the exact items you've scanned. | Randomly pulls from your saved personal history. |
| **Impact Analytics Hub** | Shows clean graphs of your total XP, what types of trash you throw away, and your estimated $CO_2$ savings. | Built using `Chart.js`. |
| **Progressive Web App (PWA)** | You can install it on your phone or computer just like a real app. | Uses `manifest.json` and a Service Worker (`sw.js`). |

## 🛠️ Architecture & Tech Stack
This app runs **100% on the front-end**. There is no backend server or database required.

* **Design:** Clean HTML5 powered by **Tailwind CSS**.
* **Logic:** Vanilla JavaScript (ES6+). No heavy frameworks.
* **Storage:** Everything is saved directly to your browser's `localStorage` (your API keys, stats, and settings are completely private).
* **Extras:** Phosphor Icons, Chart.js for graphs, and Canvas-Confetti for rewards!

---

## 💻 Run Locally

Browsers block camera access and geo location on local files, so that's why we need something (the `server/`) to help our website get a `https://` to access the browser's camera, service worker, geo location...

Our app runs 100% on front-end only, no backend.

If you're lazy or afraid of virus, **live web page is available at https://elaxuwu.me/Trash-Scanner/**

### Step 1:
- Go to "`web_app/server/`"
### Step 2:
- Open "`start-server.bat`"
### Step 3:
- The web_app is now opened at `http://127.0.0.1:8000/index.html`


## ⚙️ Evaluator Evaluation Walkthrough & Configuration

To test the live, intelligent AI waste classification suite during hackathon judging:

1. Spin up the application.
2. Click on the **Gear Symbol (Settings)** floating in the top-right corner of the application main header dashboard.
3. Choose your preferred AI processing provider engine from the tabs layout (`OpenAI`, `Google Gemini`, or `OpenRouter`).
4. Paste your secure personal API token directly into the input text parameter area. (this is a front-end only app so I'm not risking exposing our API key so it's user configured)
5. Hit **Save Configurations**. 
6. *Security Architecture Note:* Your personal security tokens are handled safely and entirely client-side. They never hit proxy cloud boxes, middleware pipelines, or outside databases. They remain strictly bounded within your private local browser instance storage deck. You can wipe your data states cleanly at any moment by simply selecting the **Clear Local Cache** button on the settings module layout.


## Credits:
[Đỗ Ngọc Thiên Bảo (elax)](https://elaxuwu.me/)
[Phạm Hoàng Khang](https://www.facebook.com/hkhang.5.10)
[Nguyễn Xuân Nghĩa](https://www.facebook.com/nguyen.xuan.nghia.617068)


## License

Licensed under **PolyForm Noncommercial License 1.0.0**.

All trademarks and logos are the property of the original author and are not licensed under this agreement.

In simple terms, this is **similar** to **CC BY-NC 4.0**:

	Attribution: You must credit me.

	Non-Commercial: You cannot sell this or use it for business.

See [LICENSE](LICENSE) for the full legal text.

Commercial use is not permitted under this license.
