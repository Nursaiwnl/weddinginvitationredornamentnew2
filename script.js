// --- 1. ОТКРЫТИЕ КОНВЕРТА ---
function startInvitation() {
    const overlay = document.getElementById('start-overlay');
    const music = document.getElementById('bg-music');
    const musicCtrl = document.getElementById('music-ctrl');

    overlay.classList.add('open-envelope');

    if (music) {
        music.play().then(() => {
            musicCtrl.classList.add('playing'); // CSS сам переключит на паузу
        }).catch(err => {
            console.log("Автозапуск заблокирован политикой браузера. Ждем клика.");
        });
    }

    setTimeout(() => {
        overlay.classList.add('disappeared');

        // РАЗБЛОКИРУЕМ СКРОЛЛ: убираем класс, когда конверт полностью исчез
        document.body.classList.remove('no-scroll');
    }, 1400);
}

// --- 2. МУЗЫКАЛЬНЫЙ ПЛЕЕР ---
const music = document.getElementById('bg-music');
const musicCtrl = document.getElementById('music-ctrl');

if (musicCtrl && music) {
    musicCtrl.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicCtrl.classList.add('playing'); // Включит анимацию и иконку паузы
        } else {
            music.pause();
            musicCtrl.classList.remove('playing'); // Вернет треугольник Play
        }
    });
}

// --- 3. СКРОЛЛ АНИМАЦИИ ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

document.querySelectorAll('.reveal, .ribbon-img-container').forEach(el => {
    observer.observe(el);
});

// --- 4. ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ДО 31 АВГУСТА 2026 ---
const targetDate = new Date("2026-08-31T18:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
