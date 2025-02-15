document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".hero");
    const heroText = document.querySelector(".hero-text");
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-links li a");
    const logo = document.querySelector(".logo");

    // Fade in hero background
    setTimeout(() => {
        hero.style.opacity = 1;
    }, 500);

    // Fade in hero text
    setTimeout(() => {
        heroText.style.opacity = 1;
        heroText.style.transform = "translateY(0)";
    }, 1000);

    // Fade in header and its elements
    setTimeout(() => {
        header.style.opacity = 1;
        logo.style.opacity = 1;
        navLinks.forEach(link => link.style.opacity = 1);
    }, 1000);

    // Detect scroll and change header background
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});
