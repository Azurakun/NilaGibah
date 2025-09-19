document.addEventListener('DOMContentLoaded', () => {
    // Panggil semua fungsi inisialisasi
    initializeMobileMenu();
    initializeHeroSlider(); 
    initializeScrollAnimations();
});

// 1. FUNGSI UNTUK MENU MOBILE (HAMBURGER) - FIXED
function initializeMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const siteOverlay = document.getElementById('site-overlay');

    if (!menuIcon || !navMenu || !siteOverlay) return;

    const toggleMenu = () => {
        // Toggle the 'active' class on the menu and the overlay
        navMenu.classList.toggle('active');
        siteOverlay.classList.toggle('active');
        
        const icon = menuIcon.querySelector('i');
        // Change the icon from hamburger to 'X' and back
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    // Event listeners to open/close the menu
    menuIcon.addEventListener('click', toggleMenu);
    siteOverlay.addEventListener('click', toggleMenu);

    // Close the menu when a link inside it is clicked
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}


// 2. FUNGSI UNTUK HERO SLIDER
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }
    
    // Initial slide
    showSlide(currentIndex);
    
    // Start slideshow
    setInterval(nextSlide, 5000); // Change image every 5 seconds
}


// 3. FUNGSI ANIMASI SAAT SCROLL
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


// 3. FUNGSI HITUNG MUNDUR UNTUK PROMOSI
function initializeCountdown() {
    const countdownDate = new Date("2025-12-31T23:59:59").getTime();
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownEl.innerHTML = "PROMO TELAH BERAKHIR";
            return;
        }

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
}

// 4. FUNGSI ANIMASI SAAT SCROLL
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

// 5. FUNGSI UNTUK IMAGE SLIDER PADA KARTU PRODUK
function initializeProductSliders() {
    document.querySelectorAll('.image-slider-container').forEach(sliderContainer => {
        const slider = sliderContainer.querySelector('.image-slider');
        const prevBtn = sliderContainer.querySelector('.prev');
        const nextBtn = sliderContainer.querySelector('.next');
        const images = slider.querySelectorAll('img');
        
        let currentIndex = 0;
        const totalImages = images.length;

        if (totalImages <= 1) {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            return;
        }
        
        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSliderPosition();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSliderPosition();
        });
    });
}

// 6. FUNGSI BARU UNTUK REVIEW SLIDER (CSS ANIMATION)
function initializeReviewSlider() {
    const sliderContainer = document.querySelector('.review-slider-container');
    if (!sliderContainer) return;

    const slider = sliderContainer.querySelector('.review-slider');
    const reviews = Array.from(slider.children);

    // Duplikasi konten agar animasi loop berjalan mulus
    reviews.forEach(review => {
        const clone = review.cloneNode(true);
        // Tambahkan atribut agar tidak bisa difokuskan (baik untuk aksesibilitas)
        clone.setAttribute('aria-hidden', true); 
        slider.appendChild(clone);
    });
}