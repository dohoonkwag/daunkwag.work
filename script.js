document.addEventListener("DOMContentLoaded", function () {
    // Only run animations on homepage
    if (document.querySelector(".hero")) {
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
        }, 1500);

        // Fade in header and its elements
        setTimeout(() => {
            header.style.opacity = 1;
            logo.style.opacity = 1;
            navLinks.forEach(link => link.style.opacity = 1);
        }, 1000);
    } else {
        // For other pages, make header immediately visible with background
        const header = document.querySelector(".header");
        const navLinks = document.querySelectorAll(".nav-links li a");
        const logo = document.querySelector(".logo");
        
        header.style.opacity = 1;
        header.classList.add("scrolled");
        logo.style.opacity = 1;
        navLinks.forEach(link => link.style.opacity = 1);
    }

    // Common elements for all pages
    const header = document.querySelector(".header");
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li a");

    // Detect scroll and change header background
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            if (!navLinksContainer.classList.contains("active") && document.querySelector(".hero")) {
                header.classList.remove("scrolled");
            }
        }
    });

    // Toggle menu and add active class to hamburger
    hamburger.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
        hamburger.classList.toggle("active");
        
        // Add menu-active class to header when menu is open (for mobile background)
        if (navLinksContainer.classList.contains("active")) {
            header.classList.add("menu-active");
        } else {
            header.classList.remove("menu-active");
            
            // Remove scrolled if we're at the top and on homepage
            if (window.scrollY <= 50 && document.querySelector(".hero")) {
                header.classList.remove("scrolled");
            }
        }
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("active");
            hamburger.classList.remove("active");
            header.classList.remove("menu-active");
        });
    });
});