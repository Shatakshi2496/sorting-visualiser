document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       DOM ELEMENTS
    ========================= */
    const generateBtn = document.getElementById("generate");
    const bubbleBtn = document.getElementById("bubbleSort");
    const selectionBtn = document.getElementById("selectionSort");
    const insertionBtn = document.getElementById("insertionSort");
    const codeToggleBtn = document.getElementById("codeToggle");

    const arrayContainer = document.getElementById("array-container");
    const statusText = document.getElementById("status-text");

    const themeToggle = document.getElementById("themeToggle");
    const infoBtn = document.getElementById("infoBtn");
    const infoModal = document.getElementById("infoModal");
    const closeModal = document.getElementById("closeModal");

    const sizeSlider = document.getElementById("sizeSlider");
    const sizeValue = document.getElementById("sizeValue");

    const codePanel = document.getElementById("codePanel");
    const algorithmCode = document.getElementById("algorithmCode");

    /* =========================
       GLOBALS
    ========================= */
    let BAR_COUNT = 25;
    let isSorting = false;
    let currentAlgorithm = "";
    const SPEED = 120;

    /* =========================
       UTILITIES
    ========================= */
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const getBars = () => document.querySelectorAll(".bar");

    /* =========================
       SIDE PANEL SLIDER
    ========================= */
    sizeSlider.addEventListener("input", () => {
        BAR_COUNT = Number(sizeSlider.value);
        sizeValue.textContent = BAR_COUNT;
    });

    /* =========================
       GENERATE ARRAY
    ========================= */
    generateBtn.addEventListener("click", () => {
        if (isSorting) return;

        arrayContainer.innerHTML = "";

        for (let i = 0; i < BAR_COUNT; i++) {
            const value = Math.floor(Math.random() * 250 + 40);
            const bar = document.createElement("div");
            bar.className = "bar";
            bar.style.height = value + "px";
            bar.style.background = "#38bdf8";

            if (BAR_COUNT <= 30) {
                bar.textContent = value;
                bar.style.fontSize = "10px";
                bar.style.color = "#020617";
                bar.style.display = "flex";
                bar.style.alignItems = "flex-end";
                bar.style.justifyContent = "center";
            }

            arrayContainer.appendChild(bar);
        }

        statusText.textContent = "Array generated. Choose a sorting algorithm.";
    });

    /* =========================
       ALGORITHM PSEUDOCODE
    ========================= */
    const algorithmCodeMap = {
        bubble: `Bubble Sort Algorithm
----------------------------
for i = 0 to n-1
    for j = 0 to n-i-2
        if A[j] > A[j+1]
            swap A[j], A[j+1]

Time Complexity:
Best: O(n)
Average: O(n²)
Worst: O(n²)
Space: O(1)`,

        selection: `Selection Sort Algorithm
-------------------------------
for i = 0 to n-1
    minIndex = i
    for j = i+1 to n-1
        if A[j] < A[minIndex]
            minIndex = j
    swap A[i], A[minIndex]

Time Complexity:
Best/Average/Worst: O(n²)
Space: O(1)`,

        insertion: `Insertion Sort Algorithm
-------------------------------
for i = 1 to n-1
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key
        A[j+1] = A[j]
        j = j - 1
    A[j+1] = key

Time Complexity:
Best: O(n)
Average/Worst: O(n²)
Space: O(1)`
    };

    /* =========================
       BUBBLE SORT
    ========================= */
    async function bubbleSort() {
        if (isSorting) return;
        isSorting = true;
        currentAlgorithm = "bubble";

        const bars = getBars();

        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.background = "#facc15";
                bars[j + 1].style.background = "#facc15";
                await delay(SPEED);

                const h1 = parseInt(bars[j].style.height);
                const h2 = parseInt(bars[j + 1].style.height);

                if (h1 > h2) {
                    bars[j].style.background = "#ef4444";
                    bars[j + 1].style.background = "#ef4444";
                    await delay(SPEED);

                    bars[j].style.height = h2 + "px";
                    bars[j + 1].style.height = h1 + "px";

                    if (BAR_COUNT <= 30) {
                        bars[j].textContent = h2;
                        bars[j + 1].textContent = h1;
                    }
                }

                bars[j].style.background = "#38bdf8";
                bars[j + 1].style.background = "#38bdf8";
            }
            bars[bars.length - i - 1].style.background = "#22c55e";
        }

        statusText.textContent = "Bubble Sort completed.";
        isSorting = false;
    }

    /* =========================
       SELECTION SORT (GREEN FIXED)
    ========================= */
    async function selectionSort() {
        if (isSorting) return;
        isSorting = true;
        currentAlgorithm = "selection";

        const bars = getBars();

        for (let i = 0; i < bars.length; i++) {
            let minIndex = i;
            bars[minIndex].style.background = "#facc15";

            for (let j = i + 1; j < bars.length; j++) {
                bars[j].style.background = "#facc15";
                await delay(SPEED);

                if (
                    parseInt(bars[j].style.height) <
                    parseInt(bars[minIndex].style.height)
                ) {
                    bars[minIndex].style.background = "#38bdf8";
                    minIndex = j;
                    bars[minIndex].style.background = "#facc15";
                } else {
                    bars[j].style.background = "#38bdf8";
                }
            }

            bars[i].style.background = "#ef4444";
            bars[minIndex].style.background = "#ef4444";
            await delay(SPEED);

            const temp = bars[i].style.height;
            bars[i].style.height = bars[minIndex].style.height;
            bars[minIndex].style.height = temp;

            if (BAR_COUNT <= 30) {
                bars[i].textContent = parseInt(bars[i].style.height);
                bars[minIndex].textContent = parseInt(bars[minIndex].style.height);
            }

            bars[minIndex].style.background = "#38bdf8";
            bars[i].style.background = "#22c55e"; // ✅ sorted
        }

        statusText.textContent = "Selection Sort completed.";
        isSorting = false;
    }

    /* =========================
       INSERTION SORT
    ========================= */
    async function insertionSort() {
        if (isSorting) return;
        isSorting = true;
        currentAlgorithm = "insertion";

        const bars = getBars();

        for (let i = 1; i < bars.length; i++) {
            let j = i;
            while (
                j > 0 &&
                parseInt(bars[j].style.height) <
                parseInt(bars[j - 1].style.height)
            ) {
                bars[j].style.background = "#ef4444";
                bars[j - 1].style.background = "#ef4444";
                await delay(SPEED);

                const temp = bars[j].style.height;
                bars[j].style.height = bars[j - 1].style.height;
                bars[j - 1].style.height = temp;

                if (BAR_COUNT <= 30) {
                    bars[j].textContent = parseInt(bars[j].style.height);
                    bars[j - 1].textContent = parseInt(bars[j - 1].style.height);
                }

                bars[j].style.background = "#38bdf8";
                bars[j - 1].style.background = "#38bdf8";
                j--;
            }
        }

        bars.forEach(bar => bar.style.background = "#22c55e");
        statusText.textContent = "Insertion Sort completed.";
        isSorting = false;
    }

    bubbleBtn.addEventListener("click", bubbleSort);
    selectionBtn.addEventListener("click", selectionSort);
    insertionBtn.addEventListener("click", insertionSort);

    /* =========================
       SLIDE-IN CODE PANEL
    ========================= */
    codeToggleBtn.addEventListener("click", () => {
        algorithmCode.textContent =
            algorithmCodeMap[currentAlgorithm] ||
            "Please select an algorithm first.";
        codePanel.classList.toggle("active");
    });

    document.addEventListener("click", e => {
        if (
            codePanel.classList.contains("active") &&
            !codePanel.contains(e.target) &&
            !codeToggleBtn.contains(e.target)
        ) {
            codePanel.classList.remove("active");
        }
    });

    /* =========================
       THEME + MODAL
    ========================= */
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    infoBtn.addEventListener("click", () => {
        infoModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
        infoModal.classList.add("hidden");
    });

});








