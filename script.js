document.addEventListener("DOMContentLoaded", () => {

    /* Preloader */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.style.display = "none";

        }, 500);

    });

    /* Dark theme */

    const themeBtn = document.getElementById("themeToggle");

    const body = document.body;

    const icon = themeBtn.querySelector("i");

    // Load saved theme

    if (localStorage.getItem("theme") === "dark") {

        body.classList.add("dark");

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        } else {

            localStorage.setItem("theme", "light");

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

        }

    });

    /* Mobile menu*/

    const menuBtn = document.getElementById("menuBtn");

    const navLinks = document.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            menuBtn.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

    // Close menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

    /* Smooth Scroll */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });

    /* Active navigation */

    const sections = document.querySelectorAll("section");

    const navItems = document.querySelectorAll(".nav-links a");

    function activateMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activateMenu);

    activateMenu();

    /* Scrll to top button */

    const scrollBtn = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});

/* Typing animation*/

const typingElement = document.getElementById("typing");

const words = [
    "Software Engineering Undergraduate",
    "Frontend Developer",
    "UI / UX Designer",
    "Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();

/* Scroll reveal */

const revealElements = document.querySelectorAll(
    ".section, .skill-card, .project-card, .experience-card, .repo-card"
);

revealElements.forEach(item => {

    item.classList.add("fade-up");

});

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.2

    }

);

revealElements.forEach(item => observer.observe(item));

/* Project model */

const modal = document.getElementById("projectModal");

const modalTitle = document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalTech =
    document.getElementById("modalTech");

const closeModal =
    document.querySelector(".close-modal");

document.querySelectorAll(".view-project")
.forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent =
            button.dataset.title;

        modalDescription.textContent =
            button.dataset.description;

        modalTech.textContent =
            button.dataset.tech;

        modal.classList.add("active");

    });

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});

window.addEventListener("click", e => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});

/* GitHub API */

const repoContainer =
document.getElementById("githubRepos");

fetch(
"https://api.github.com/users/Thisha00/repos?sort=updated&per_page=6"
)

.then(response => response.json())

.then(repos => {

    repoContainer.innerHTML = "";

    repos.forEach(repo => {

        const card = document.createElement("div");

        card.className = "repo-card";

        card.innerHTML = `

        <h3>${repo.name}</h3>

        <p>
        ${repo.description || "No description available."}
        </p>

        <div class="repo-info">

            <span class="repo-language">

                ${repo.language || "Unknown"}

            </span>

            <a
                href="${repo.html_url}"
                target="_blank"
                class="repo-link">

                View →

            </a>

        </div>

        `;

        repoContainer.appendChild(card);

    });

})

.catch(error => {

    repoContainer.innerHTML = `

    <div class="repo-card">

        <h3>GitHub API Error</h3>

        <p>

            Unable to load repositories.

        </p>

    </div>

    `;

    console.error(error);

});

/* Contact form */

const contactForm =
document.querySelector(".contact-form");

contactForm.addEventListener("submit", e => {

    e.preventDefault();

    const name =
        contactForm.querySelector(
            'input[type="text"]'
        ).value.trim();

    const email =
        contactForm.querySelector(
            'input[type="email"]'
        ).value.trim();

    const message =
        contactForm.querySelector(
            "textarea"
        ).value.trim();

    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        alert("Please fill in all fields.");

        return;

    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email.");

        return;

    }

    alert(
        "Thank you! Your message has been received."
    );

    contactForm.reset();

});

/* Current year */

const yearElement =
document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}

