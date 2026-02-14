/* ============================================================
   PORTFOLIO DÉVELOPPEUR FULL STACK JUNIOR
   JavaScript - Toutes les fonctionnalités interactives
   ============================================================ */

'use strict';

/* ============================================================
   1. INITIALISATION AU CHARGEMENT DE LA PAGE
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS (Animate On Scroll)
    initAOS();
    
    // Initialiser le thème (dark mode par défaut)
    initTheme();
    
    // Initialiser la navbar
    initNavbar();
    
    // Initialiser la scroll progress bar
    initScrollProgress();
    
    // Initialiser le bouton retour en haut
    initBackToTop();
    
    // Initialiser l'effet typewriter
    initTypewriter();
    
    // Initialiser les barres de progression des compétences
    initSkillBars();
    
    // Initialiser le filtrage des projets
    initProjectFilters();
    
    // Initialiser la validation du formulaire
    initFormValidation();
    
    // Initialiser les animations GSAP supplémentaires
    initGSAPAnimations();
});

/* ============================================================
   2. INITIALISATION D'AOS (ANIMATE ON SCROLL)
   ============================================================ */

function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });
}

/* ============================================================
   3. GESTION DU THÈME (DARK/LIGHT MODE)
   ============================================================ */

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Charger le thème depuis localStorage ou utiliser dark mode par défaut
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    } else {
        // Dark mode par défaut
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        localStorage.setItem('portfolio-theme', 'dark');
    }
    
    // Basculer le thème au clic
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });
}

/* ============================================================
   4. GESTION DE LA NAVBAR (Scroll & Active Links)
   ============================================================ */

function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Ajouter classe "scrolled" à la navbar au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mettre à jour le lien actif selon la section visible
        updateActiveLink(sections, navLinks);
    });
    
    // Smooth scroll pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile après clic
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
}

/**
 * Met à jour le lien de navigation actif selon la section visible
 */
function updateActiveLink(sections, navLinks) {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================================
   5. SCROLL PROGRESS BAR
   ============================================================ */

function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

/* ============================================================
   6. BOUTON RETOUR EN HAUT (BACK TO TOP)
   ============================================================ */

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Remonter en haut au clic
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================================
   7. EFFET TYPEWRITER (Machine à écrire)
   ============================================================ */

function initTypewriter() {
    const typingText = document.querySelector('.typing-text');
    
    // 👇 MODIFIER ICI: Personnalisez les textes à afficher
    const texts = [
  "Développeur Full-Stack Junior",
  "Développeur passionné par Angular",
  "Développeur Back-End Java avec Spring Boot",
  "Créateur d’applications web avec Laravel",
  "Développement performant en TypeScript",
  "Maîtrise de Git et du versioning collaboratif"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause avant de supprimer
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause avant le prochain texte
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Démarrer l'animation
    if (typingText) {
        type();
    }
}

/* ============================================================
   8. ANIMATION DES BARRES DE PROGRESSION DES COMPÉTENCES
   ============================================================ */

function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    let animated = false;
    
    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.offsetTop - window.innerHeight / 2;
        
        if (window.scrollY > sectionTop && !animated) {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Vérifier dès le chargement
}

/* ============================================================
   9. FILTRAGE DES PROJETS PAR CATÉGORIE
   ============================================================ */

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie à filtrer
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les projets
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                    
                    // Animation d'apparition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.classList.add('hide');
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ============================================================
   10. VALIDATION DU FORMULAIRE DE CONTACT
   ============================================================ */

function initFormValidation() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Réinitialiser les états de validation
        const inputs = form.querySelectorAll('.form-control');
        let isValid = true;
        
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
        
        // Validation des champs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Valider le nom
        if (name === '' || name.length < 2) {
            showError('name', 'Veuillez entrer un nom valide (minimum 2 caractères)');
            isValid = false;
        }
        
        // Valider l'email
        if (!isValidEmail(email)) {
            showError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        // Valider le sujet
        if (subject === '' || subject.length < 3) {
            showError('subject', 'Veuillez entrer un sujet (minimum 3 caractères)');
            isValid = false;
        }
        
        // Valider le message
        if (message === '' || message.length < 10) {
            showError('message', 'Veuillez entrer un message (minimum 10 caractères)');
            isValid = false;
        }
        
        // Si le formulaire est valide
        if (isValid) {
            // Simuler l'envoi du formulaire (remplacer par votre logique d'envoi)
                // Désactiver le bouton pendant l'envoi
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Envoi en cours.'

        emailjs.send(
        'service_kwysara',        // ← TON SERVICE ID
        'template_sjnqww5',       // ← TON TEMPLATE ID
        {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        },
        'REi58AEadkPdDseHv'        // ← TA PUBLIC KEY
    )
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showFormMessage('success', ' Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
        form.reset();
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    })
    .catch(function(error) {
        console.error('FAILED...', error);
        showFormMessage('error', ' Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.');
        
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
            
            // 👇 MODIFIER ICI: Ajoutez votre logique d'envoi de formulaire
            // Exemple avec EmailJS, Formspree, ou votre propre API
            /*
            fetch('votre-endpoint-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(response => response.json())
            .then(data => {
                showFormMessage('success', 'Message envoyé avec succès !');
                form.reset();
            })
            .catch(error => {
                showFormMessage('error', 'Erreur lors de l\'envoi. Veuillez réessayer.');
            });
            */
        }
    });
}

/**
 * Valider le format de l'email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Afficher une erreur sur un champ
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

/**
 * Afficher un message de succès ou d'erreur pour le formulaire
 */
function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    
    formMessage.style.display = 'block';
    formMessage.textContent = message;
    
    if (type === 'success') {
        formMessage.className = 'alert alert-success mt-3';
    } else {
        formMessage.className = 'alert alert-danger mt-3';
    }
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

/* ============================================================
   11. ANIMATIONS GSAP SUPPLÉMENTAIRES
   ============================================================ */

function initGSAPAnimations() {
    // Vérifier si GSAP est chargé
    if (typeof gsap === 'undefined') {
        console.log('GSAP non chargé - animations désactivées');
        return;
    }
    
    // Animation de la décoration de l'image hero
    gsap.to('.image-decoration', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'linear'
    });
    
    // Animation des icônes de services au hover
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out'
            });
        });
        
        icon.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out'
            });
        });
    });
    
    // Animation parallaxe légère pour les sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            y: 50,
            opacity: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            }
        });
    });
}

/* ============================================================
   12. FONCTIONS UTILITAIRES SUPPLÉMENTAIRES
   ============================================================ */

/**
 * Détection du scroll vers le bas/haut
 */
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const st = window.scrollY || document.documentElement.scrollTop;
    
    if (st > lastScrollTop) {
        // Scroll vers le bas
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        // Scroll vers le haut
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

/**
 * Lazy loading des images (optimisation)
 */
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

/**
 * Animation du compteur (pour les statistiques)
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/**
 * Copier le texte dans le presse-papiers
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texte copié dans le presse-papiers');
    }).catch(err => {
        console.error('Erreur lors de la copie :', err);
    });
}

/**
 * Détecter si l'utilisateur est sur mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Obtenir la position d'un élément
 */
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

/**
 * Débouncage d'une fonction (optimisation performance)
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttling d'une fonction (optimisation performance)
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================================
   13. GESTION DES ÉVÉNEMENTS DE REDIMENSIONNEMENT
   ============================================================ */

// Optimiser les événements de redimensionnement avec debounce
const handleResize = debounce(function() {
    // Réinitialiser AOS sur redimensionnement
    AOS.refresh();
    
    // Ajuster les hauteurs si nécessaire
    adjustHeights();
}, 250);

window.addEventListener('resize', handleResize);

/**
 * Ajuster les hauteurs des éléments si nécessaire
 */
function adjustHeights() {
    // Logique pour ajuster les hauteurs des cartes, etc.
    const projectCards = document.querySelectorAll('.project-card');
    
    if (window.innerWidth > 768) {
        // Égaliser les hauteurs sur desktop
        let maxHeight = 0;
        projectCards.forEach(card => {
            card.style.height = 'auto';
            maxHeight = Math.max(maxHeight, card.offsetHeight);
        });
        projectCards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    } else {
        // Réinitialiser sur mobile
        projectCards.forEach(card => {
            card.style.height = 'auto';
        });
    }
}

/* ============================================================
   14. PRÉCHARGEMENT DES IMAGES (Amélioration performance)
   ============================================================ */

function preloadImages() {
    const images = document.querySelectorAll('img[data-preload]');
    
    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.dataset.src || img.src;
    });
}

// Exécuter le préchargement après le chargement de la page
window.addEventListener('load', preloadImages);

/* ============================================================
   15. ANALYTICS & TRACKING (Optionnel)
   ============================================================ */

/**
 * Tracker les clics sur les boutons importants
 */
function trackButtonClick(buttonName) {
    // 👇 MODIFIER ICI: Ajoutez votre code de tracking (Google Analytics, etc.)
    console.log(`Bouton cliqué: ${buttonName}`);
    
    // Exemple avec Google Analytics (si configuré)
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Button',
            'event_label': buttonName
        });
    }
    */
}

// Ajouter le tracking aux boutons principaux
document.querySelectorAll('.btn-primary, .btn-outline-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackButtonClick(buttonText);
    });
});

/* ============================================================
   16. EASTER EGGS & INTERACTIONS AMUSANTES (Optionnel)
   ============================================================ */

/**
 * Konami Code Easter Egg
 */
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Animation ou message secret
    alert('🎉 Code Konami activé ! Vous avez trouvé l\'Easter Egg !');
    
    // Ajouter une animation spéciale
    document.body.style.animation = 'rainbow 2s infinite';
}

/* ============================================================
   17. GESTION DES ERREURS GLOBALES
   ============================================================ */

window.addEventListener('error', function(e) {
    console.error('Erreur détectée:', e.error);
    // Optionnel: Envoyer les erreurs à un service de monitoring
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejetée:', e.reason);
    // Optionnel: Envoyer les erreurs à un service de monitoring
});

/* ============================================================
   18. PERFORMANCE MONITORING (Optionnel)
   ============================================================ */

window.addEventListener('load', function() {
    // Mesurer le temps de chargement
    if ('performance' in window && 'timing' in performance) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Temps de chargement de la page: ${loadTime}ms`);
    }
    
    // Mesurer le First Contentful Paint
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    console.log(`FCP: ${entry.startTime}ms`);
                }
            }
        });
        
        observer.observe({ entryTypes: ['paint'] });
    }
});

/* ============================================================
   19. ACCESSIBILITÉ - NAVIGATION AU CLAVIER
   ============================================================ */

/**
 * Améliorer l'accessibilité pour la navigation au clavier
 */
document.addEventListener('keydown', function(e) {
    // Échapper pour fermer les modales (si présentes)
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
});

/**
 * Annoncer les changements de page pour les lecteurs d'écran
 */
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/* ============================================================
   20. CONSOLE EASTER EGG (Message de bienvenue)
   ============================================================ */

console.log(
    '%c🚀 Portfolio Développeur Full Stack Junior',
    'font-size: 20px; font-weight: bold; color: #FF6B35;'
);

console.log(
    '%c👨‍💻 Développé avec passion par [Votre Nom]',
    'font-size: 14px; color: #F7931E;'
);

console.log(
    '%c💼 Vous recrutez ? Contactez-moi !',
    'font-size: 12px; color: #B8B8B8;'
);

console.log(
    '%c🔧 Technologies: HTML5, CSS3, JavaScript, Bootstrap 5, AOS, GSAP',
    'font-size: 11px; color: #808080;'
);

/* ============================================================
   FIN DU SCRIPT
   ============================================================ */