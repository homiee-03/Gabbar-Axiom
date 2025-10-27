/* --- Mobile Menu Toggle --- */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

/* --- Typing Effect --- */
const typingText = document.querySelector('.typing-effect');
const words = ["SSC CGL", "RRB NTPC", "SSC CPO", "AFCAT", "Defence Exams"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    let displayText = '';

    if (isDeleting) {
        // Deleting
        displayText = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing
        displayText = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    typingText.textContent = displayText;

    let typeSpeed = 150;
    if (isDeleting) {
        typeSpeed /= 2; // Faster deleting
    }

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at end of word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on page load
document.addEventListener('DOMContentLoaded', type);


/* --- FAQ Accordion --- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Check if this item is already active
        const isActive = item.classList.contains('active');

        // (Optional) Close all other items
        // faqItems.forEach(otherItem => {
        //     otherItem.classList.remove('active');
        //     otherItem.querySelector('i').classList.remove('fa-minus');
        //     otherItem.querySelector('i').classList.add('fa-plus');
        // });

        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
            question.querySelector('i').classList.remove('fa-minus');
            question.querySelector('i').classList.add('fa-plus');
        } else {
            item.classList.add('active');
            question.querySelector('i').classList.remove('fa-plus');
            question.querySelector('i').classList.add('fa-minus');
        }
    });
});


/* --- Scroll Animations --- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
        } 
        // Optional: Remove class to re-animate on scroll up
        // else {
        //     entry.target.classList.remove('show-animation');
        // }
    });
}, {
    threshold: 0.1 // 10% dikhne par animate ho
});

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll('.anim-fade-in, .anim-slide-in');
animatedElements.forEach((el) => observer.observe(el));
