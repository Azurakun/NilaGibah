document.addEventListener('DOMContentLoaded', function() {

    // 1. FUNGSI UNTUK MENU MOBILE (HAMBURGER)
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');

    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Ganti ikon bars menjadi 'X' saat menu terbuka
        const icon = menuIcon.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menutup menu saat link di-klik (untuk navigasi halaman tunggal)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });


    // 2. FUNGSI HITUNG MUNDUR UNTUK PROMOSI
    // Atur tanggal akhir promosi di sini (Tahun, Bulan-1, Hari)
    const countdownDate = new Date("2025-12-31T23:59:59").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "PROMO TELAH BERAKHIR";
        }
    }, 1000);


    // 3. FUNGSI ANIMASI SAAT SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1 // Muncul saat 10% bagian terlihat
    });

    const hiddenElements = document.querySelectorAll('.section-hidden');
    hiddenElements.forEach((el) => observer.observe(el));

});

// 4. FUNGSI UNTUK IMAGE SLIDER PADA KARTU PRODUK
function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider-container');

    sliders.forEach(sliderContainer => {
        const slider = sliderContainer.querySelector('.image-slider');
        const prevBtn = sliderContainer.querySelector('.prev');
        const nextBtn = sliderContainer.querySelector('.next');
        const images = slider.querySelectorAll('img');
        
        let currentIndex = 0;
        const totalImages = images.length;

        // Sembunyikan tombol jika hanya ada 1 atau 0 gambar
        if (totalImages <= 1) {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            return; // Hentikan fungsi jika tidak perlu slider
        } else {
             if(prevBtn) prevBtn.style.display = 'block';
             if(nextBtn) nextBtn.style.display = 'block';
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

// Panggil fungsi slider saat halaman dimuat
document.addEventListener('DOMContentLoaded', initializeSliders);