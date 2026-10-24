
const themeButton = document.getElementById("theme-toggle");
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const skillsContainer = document.querySelector(".skills-container");

// 1. Dark and light mode
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-mode");

    themeButton.textContent = isLight ? "🌙" : "☀️";
    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

updateThemeButton();

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    const theme = document.body.classList.contains("light-mode")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", theme);
    updateThemeButton();
});

// 2. Mobile navigation menu
menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.textContent = "☰";
    });
});

// 3. Animate skill bars when they enter the screen
if ("IntersectionObserver" in window && skillsContainer) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                skillsContainer.classList.add("animate");
                observer.unobserve(skillsContainer);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsContainer);
} else if (skillsContainer) {
    skillsContainer.classList.add("animate");
}

// 4. Automatically update copyright year
document.getElementById("year").textContent = new Date().getFullYear();
