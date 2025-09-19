document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeImageSlider(); // <-- Logika slider baru
    initializeLightbox(); // <-- Logika lightbox baru
});


// 1. FUNGSI UNTUK MENU MOBILE (HAMBURGER)
function initializeMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const siteOverlay = document.getElementById('site-overlay');

    if (!menuIcon || !navMenu || !siteOverlay) return;

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        siteOverlay.classList.toggle('active');
        
        const icon = menuIcon.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    menuIcon.addEventListener('click', toggleMenu);
    siteOverlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}


// 2. FUNGSI UNTUK IMAGE SLIDER BARU
function initializeImageSlider() {
    const slider = document.querySelector('.image-slider');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');

    if (!slider || !prevBtn || !nextBtn) return;

    const slides = slider.querySelectorAll('img');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function goToSlide(index) {
        // Logika looping
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
}


// 3. FUNGSI UNTUK LIGHTBOX (KLIK UNTUK MEMPERBESAR GAMBAR)
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const sliderImages = document.querySelectorAll('.image-slider img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox || !lightboxImg || sliderImages.length === 0 || !closeBtn) return;

    sliderImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('visible');
            lightboxImg.src = img.src;
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('visible');
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        // Hanya tutup jika klik di area background (bukan di gambar)
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}


// 4. FUNGSI ANIMASI SAAT SCROLL (untuk section lainnya)
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-hidden').forEach((el) => observer.observe(el));
}