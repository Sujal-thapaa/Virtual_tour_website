let currentIndex = 0;
const images = [
    "footbridge/114.jpg", 
    "footbridge/112.jpg", 
    "footbridge/108.jpg", 
    "footbridge/90.jpg",
    "footbridge/81.jpg",
    "footbridge/75.jpg",
    "footbridge/72.jpg", // Special logic for all arrows
    "footbridge/69.jpg", // Left arrow only to 72
    "footbridge/68.jpg", // Right arrow only to 72
    "footbridge/67.jpg", // Up arrow only from 72
    "footbridge/45.jpg", // Custom arrow logic
    "footbridge/43.jpg", // Custom arrow logic
    "footbridge/27.jpg",
    "footbridge/15.jpg",
    "footbridge/12.jpg",
    "footbridge/9.jpg",
    "footbridge/6.jpg",
    "footbridge/3.jpg",
    "footbridge/1.jpg"
];

function changeImage(direction, axis) {
    const currentImageName = images[currentIndex].split('/').pop();

    // Special logic for 72, 68, and 69
    if (axis === 'horizontal') {
        if (currentImageName === "72.jpg" && direction === -1) {
            currentIndex = images.indexOf("footbridge/68.jpg"); // Left to 68
        } else if (currentImageName === "72.jpg" && direction === 1) {
            currentIndex = images.indexOf("footbridge/69.jpg"); // Right to 69
        } else if (currentImageName === "68.jpg" && direction === 1) {
            currentIndex = images.indexOf("footbridge/72.jpg"); // Right to 72
        } else if (currentImageName === "69.jpg" && direction === -1) {
            currentIndex = images.indexOf("footbridge/72.jpg"); // Left to 72
        } else {
            // Default horizontal behavior
            currentIndex += direction;
        }
    } else if (axis === 'vertical') {
        if (currentImageName === "72.jpg" && direction === 1) {
            currentIndex = images.indexOf("footbridge/67.jpg"); // Up to 67
        } else {
            // Default vertical behavior
            currentIndex += direction;
        }
    }

    // Wrap navigation
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    // Update image and arrow visibility
    const currentImage = document.getElementById("current-image");
    currentImage.classList.remove("fade-in");
    void currentImage.offsetWidth; // Trigger reflow
    currentImage.src = images[currentIndex];
    currentImage.classList.add("fade-in");

    updateArrowVisibility();
}

function updateArrowVisibility() {
    const currentImageName = images[currentIndex].split('/').pop();
    const upArrow = document.getElementById("up-arrow");
    const downArrow = document.getElementById("down-arrow");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

    // Special visibility logic for 72
    if (currentImageName === "72.jpg") {
        upArrow.classList.remove("hidden");
        downArrow.classList.remove("hidden");
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
    } else if (currentImageName === "68.jpg") {
        upArrow.classList.add("hidden");
        downArrow.classList.add("hidden");
        leftArrow.classList.add("hidden");
        rightArrow.classList.remove("hidden");
    } else if (currentImageName === "69.jpg") {
        upArrow.classList.add("hidden");
        downArrow.classList.add("hidden");
        leftArrow.classList.remove("hidden");
        rightArrow.classList.add("hidden");
    } else if (["45.jpg", "43.jpg"].includes(currentImageName)) {
        upArrow.textContent = "↗"; // Custom arrow for specific images
        upArrow.classList.remove("hidden");
    } else {
        // Default visibility logic
        upArrow.classList.remove("hidden");
        downArrow.classList.remove("hidden");
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
        upArrow.textContent = "▲"; // Reset to default up arrow
    }
}

// Initialize arrow visibility
updateArrowVisibility();
