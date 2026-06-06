/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const hiddenElements = document.querySelectorAll(
    ".project-card, .skill-card, .summary-card, .contact-item, .reflection, .about-text"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.12 }
);

hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background   = "rgba(255,255,255,0.98)";
        navbar.style.boxShadow    = "0 5px 20px rgba(0,0,0,.08)";
    } else {
        navbar.style.background   = "rgba(255,255,255,.92)";
        navbar.style.boxShadow    = "0 2px 15px rgba(0,0,0,.05)";
    }
}, { passive: true });

/* =========================
   ACTIVE MENU SECTION
========================= */

const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop    = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.pageYOffset >= sectionTop &&
            window.pageYOffset <  sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}, { passive: true });

/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top:      target.offsetTop - 70,
                behavior: "smooth"
            });

            // Close mobile menu if open
            navMenu.classList.remove("mobile-open");
        }
    });
});

/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navLinks");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("mobile-open");
    });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (
        !navMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        navMenu.classList.remove("mobile-open");
    }
});

/* =========================
   TYPING EFFECT HERO
========================= */

const heroTitle = document.querySelector(".hero-left h1");

if (heroTitle) {
    const originalHTML = heroTitle.innerHTML;
    heroTitle.innerHTML = "";

    let i = 0;

    function typeEffect() {
        if (i < originalHTML.length) {
            heroTitle.innerHTML += originalHTML.charAt(i);
            i++;
            setTimeout(typeEffect, 35);
        }
    }

    // Start after a short delay
    setTimeout(typeEffect, 500);
}

/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target  = +counter.dataset.target;
                let   count   = 0;
                const speed   = target / 100;

                const updateCount = () => {
                    if (count < target) {
                        count += speed;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                counterObserver.unobserve(counter); // run once
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

/* =========================
   CURRENT YEAR FOOTER
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}