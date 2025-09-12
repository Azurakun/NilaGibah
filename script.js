document.addEventListener('DOMContentLoaded', () => {
    // Panggil semua fungsi inisialisasi
    initializeMobileMenu();
    initializeHeroSlider(); // Fungsi baru untuk hero slider
    initializeProductSliders();
    initializeReviewSlider();
    initializeScrollAnimations();
    initializeCountdown();
});

// 1. FUNGSI UNTUK MENU MOBILE (HAMBURGER)
function initializeMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    if (!menuIcon || !navMenu) return;

    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// 2. FUNGSI BARU UNTUK HERO SLIDER
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-slider-btn.prev');
    const nextBtn = document.querySelector('.hero-slider-btn.next');
    if (slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;

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

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Ganti gambar setiap 5 detik
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    startSlideShow(); // Mulai slideshow otomatis
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