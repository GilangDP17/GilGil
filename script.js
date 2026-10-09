// Teks profesi yang mengetik otomatis (ubah sesuai kamu)
const roles=["Cyber Security Enthusiast","Network Engineering Student","Web Developer"];
const el=document.getElementById("typing");let r=0,c=0,del=false;
(function type(){
  const w=roles[r];el.textContent=w.slice(0,c);
  if(!del&&c===w.length){del=true;return setTimeout(type,1500)}
  if(del&&c===0){del=false;r=(r+1)%roles.length}
  c+=del?-1:1;setTimeout(type,del?45:90);
})();


/* =========================================
   SCROLL REVEAL + SKILL + COUNTER
========================================= */

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const animatedElements = document.querySelectorAll(`
    .reveal,
    header.hero,
    section .tile,
    section .ring,
    section .row,
    section .proj,
    #sertifikat .cert-card,
    section .contact
`);

animatedElements.forEach((element, index) => {
    element.classList.add("scroll-item");
    element.style.setProperty(
        "--reveal-delay",
        `${(index % 4) * 100}ms`
    );
});

function activateElement(element) {
    if (element.dataset.animated === "true") return;

    element.dataset.animated = "true";
    element.classList.add("show", "is-visible");

    element.querySelectorAll(".dial").forEach(dial => {
        dial.style.setProperty("--p", dial.dataset.p);
    });

    element.querySelectorAll("[data-n]").forEach(number => {
        const target = Number(number.dataset.n);

        if (!Number.isFinite(target)) return;

        if (reduceMotion) {
            number.textContent = target + "+";
            return;
        }

        let current = 0;

        const timer = setInterval(() => {
            current++;
            number.textContent = current + "+";

            if (current >= target) {
                clearInterval(timer);
            }
        }, 90);
    });
}

if (reduceMotion) {
    animatedElements.forEach(activateElement);
} else {
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            activateElement(entry.target);
            scrollObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
    });

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Foto miring mengikuti mouse + bar progress scroll
const ph = document.getElementById("photo");

document.addEventListener("mousemove", e => {

    if (!ph) return;

    const x =
        (e.clientX / innerWidth - 0.5) * 12;

    const y =
        (e.clientY / innerHeight - 0.5) * -12;

    ph.style.transform =
        `perspective(700px)
         rotateY(${x}deg)
         rotateX(${y}deg)`;
});
addEventListener("scroll",()=>{
  const h=document.documentElement;
  document.getElementById("progress").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
});
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

/* =========================================  AESTHETIC PIXEL SNOW
   Background + Mouse Interaction
========================================= */

const snowContainer = document.getElementById("pixel-snow");

if (snowContainer) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    snowContainer.appendChild(canvas);

    let width = 0;
    let height = 0;

    let snowflakes = [];

    const mouse = {
        x: -1000,
        y: -1000,
        active: false
    };

    /* =========================
       SETTINGS
    ========================= */

    const SETTINGS = {
        density: 150,
        minSize: 1,
        maxSize: 4,

        minSpeed: 0.25,
        maxSpeed: 1.2,

        wind: 0.15,

        mouseRadius: 130,
        mouseForce: 0.8
    };


    /* =========================
       RESIZE
    ========================= */

    function resizeSnow() {

        width = window.innerWidth;
        height = window.innerHeight;

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createSnow();
    }


    /* =========================
       CREATE SNOW
    ========================= */

    function createSnow() {

        snowflakes = [];

        const amount =
            window.innerWidth < 768
                ? 80
                : SETTINGS.density;

        for (let i = 0; i < amount; i++) {

            snowflakes.push({

                x: Math.random() * width,

                y: Math.random() * height,

                size:
                    Math.random() *
                    (SETTINGS.maxSize -
                     SETTINGS.minSize)
                    + SETTINGS.minSize,

                speed:
                    Math.random() *
                    (SETTINGS.maxSpeed -
                     SETTINGS.minSpeed)
                    + SETTINGS.minSpeed,

                drift:
                    Math.random() * 0.5 - 0.25,

                opacity:
                    Math.random() * 0.7 + 0.2,

                rotation:
                    Math.random() *
                    Math.PI * 2,

                rotationSpeed:
                    Math.random() *
                    0.01 - 0.005,

                depth:
                    Math.random(),

                pulse:
                    Math.random() * Math.PI * 2
            });
        }
    }


    /* =========================
       DRAW PIXEL SNOW
    ========================= */

    function drawSnowflake(flake) {

        ctx.save();

        ctx.translate(
            Math.round(flake.x),
            Math.round(flake.y)
        );

        ctx.rotate(flake.rotation);

        /*
         * Depth:
         * salju jauh = kecil & transparan
         * salju dekat = besar & terang
         */

        const depthScale =
            0.5 + flake.depth * 1.3;

        const size =
            flake.size * depthScale;

        const pulse =
            Math.sin(flake.pulse) * 0.08 + 1;

        ctx.globalAlpha =
            flake.opacity *
            (0.6 + flake.depth * 0.4);

        ctx.fillStyle = "#ffffff";

        const s = size * pulse;

        /*
         * Pixel shape
         */

        ctx.fillRect(
            -s / 2,
            -s / 2,
            s,
            s
        );

        /*
         * Pixel cross
         */

        if (flake.depth > 0.45) {

            ctx.fillRect(
                -s * 1.5,
                -s / 4,
                s * 3,
                s / 2
            );

            ctx.fillRect(
                -s / 4,
                -s * 1.5,
                s / 2,
                s * 3
            );
        }

        ctx.restore();
    }


    /* =========================
       ANIMATION
    ========================= */

    function animateSnow() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        snowflakes.forEach(flake => {

            /*
             * Gerakan turun
             */

            flake.y += flake.speed;


            /*
             * Angin lembut
             */

            flake.x +=
                flake.drift +
                SETTINGS.wind *
                flake.depth;


            /*
             * Rotasi
             */

            flake.rotation +=
                flake.rotationSpeed;


            /*
             * Pulse kecil
             */

            flake.pulse += 0.015;


            /* =========================
               MOUSE INTERACTION
            ========================= */

            if (mouse.active) {

                const dx =
                    flake.x - mouse.x;

                const dy =
                    flake.y - mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (
                    distance <
                    SETTINGS.mouseRadius
                ) {

                    const force =
                        (1 -
                        distance /
                        SETTINGS.mouseRadius)
                        *
                        SETTINGS.mouseForce;

                    flake.x +=
                        (dx / (distance || 1))
                        * force;

                    flake.y +=
                        (dy / (distance || 1))
                        * force;
                }
            }


            /*
             * Reset jika keluar layar
             */

            if (flake.y > height + 20) {

                flake.y = -20;

                flake.x =
                    Math.random() * width;
            }


            if (flake.x > width + 20) {

                flake.x = -20;
            }


            if (flake.x < -20) {

                flake.x = width + 20;
            }


            drawSnowflake(flake);
        });


        requestAnimationFrame(
            animateSnow
        );
    }


    /* =========================
       MOUSE
    ========================= */

    window.addEventListener(
        "mousemove",
        (event) => {

            mouse.x = event.clientX;
            mouse.y = event.clientY;

            mouse.active = true;
        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.active = false;
        }
    );


    /* =========================
       TOUCH
    ========================= */

    window.addEventListener(
        "touchmove",
        (event) => {

            if (!event.touches.length)
                return;

            mouse.x =
                event.touches[0].clientX;

            mouse.y =
                event.touches[0].clientY;

            mouse.active = true;
        },
        { passive: true }
    );


    window.addEventListener(
    "touchend",
    () => {
        mouse.active = false;
    }
);


/* =========================================
   START PIXEL SNOW
========================================= */

resizeSnow();
animateSnow();

window.addEventListener(
    "resize",
    resizeSnow
);

}

/* =========================================
   SOUND EFFECT SYSTEM
========================================= */

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    return audioCtx;
}


/* =========================================
   SOUND: HIGH FIVE
========================================= */

function playHighFiveSound() {

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Impact / pukulan tos
    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();

    impact.type = "square";

    impact.frequency.setValueAtTime(
        220,
        now
    );

    impact.frequency.exponentialRampToValueAtTime(
        65,
        now + 0.18
    );

    impactGain.gain.setValueAtTime(
        0.0001,
        now
    );

    impactGain.gain.exponentialRampToValueAtTime(
        0.35,
        now + 0.015
    );

    impactGain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.20
    );

    impact.connect(impactGain);
    impactGain.connect(ctx.destination);

    impact.start(now);
    impact.stop(now + 0.21);


    // Digital beep
    const beep = ctx.createOscillator();
    const beepGain = ctx.createGain();

    beep.type = "sine";

    beep.frequency.setValueAtTime(
        650,
        now
    );

    beep.frequency.exponentialRampToValueAtTime(
        1300,
        now + 0.12
    );

    beepGain.gain.setValueAtTime(
        0.0001,
        now
    );

    beepGain.gain.exponentialRampToValueAtTime(
        0.16,
        now + 0.02
    );

    beepGain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.16
    );

    beep.connect(beepGain);
    beepGain.connect(ctx.destination);

    beep.start(now);
    beep.stop(now + 0.18);
}


/* =========================================
   SOUND: ACCESS GRANTED
========================================= */

function playAccessGrantedSound() {

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [
        {
            frequency: 523.25,
            delay: 0
        },
        {
            frequency: 659.25,
            delay: 0.12
        },
        {
            frequency: 783.99,
            delay: 0.24
        },
        {
            frequency: 1046.50,
            delay: 0.38
        }
    ];

    notes.forEach(note => {

        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value =
            note.frequency;

        const start =
            now + note.delay;

        gain.gain.setValueAtTime(
            0.0001,
            start
        );

        gain.gain.exponentialRampToValueAtTime(
            0.18,
            start + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            start + 0.30
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start(start);

        oscillator.stop(
            start + 0.32
        );
    });
}

   /* =========================================
   ROBOT INTRO SYSTEM
========================================= */

const robotIntro =
    document.getElementById("robotIntro");

const robotText =
    document.getElementById("robotText");

const robotSubtext =
    document.getElementById("robotSubtext");

const highFiveArea =
    document.getElementById("highFiveArea");


/* =========================================
   CEK ELEMENT ROBOT
========================================= */

if (
    robotIntro &&
    robotText &&
    robotSubtext &&
    highFiveArea
) {


    /* =====================================
       STEP 1
       Robot menyapa
    ===================================== */

    setTimeout(() => {

        robotText.textContent =
            "Halo, Gilang 👋";

        robotSubtext.textContent =
            "Saya robot penjaga website ini.";

    }, 800);


    /* =====================================
       STEP 2
       Robot memberikan instruksi
    ===================================== */

    setTimeout(() => {

        robotText.textContent =
            "Selamat datang!";

        robotSubtext.textContent =
            "Sebelum masuk, kita tos dulu.";

    }, 2500);


    /* =====================================
       STEP 3
       Aktifkan HIGH FIVE
    ===================================== */

    setTimeout(() => {

        robotIntro.classList.add(
            "ready"
        );

    }, 3800);


    /* =====================================
       HIGH FIVE INTERACTION
    ===================================== */

    highFiveArea.addEventListener(
        "pointerdown",
        (event) => {


            /* =============================
               CEGAH KLIK KEDUA
            ============================= */

            if (
                robotIntro.classList.contains(
                    "high-five"
                )
            ) {
                return;
            }


            /* =============================
               🔊 SOUND HIGH FIVE
            ============================= */

            playHighFiveSound();


            /* =============================
               POSISI FLASH
            ============================= */

            const rect =
                robotIntro.getBoundingClientRect();

            const x =
                (
                    (event.clientX - rect.left)
                    / rect.width
                ) * 100;

            const y =
                (
                    (event.clientY - rect.top)
                    / rect.height
                ) * 100;


            robotIntro.style.setProperty(
                "--flash-x",
                x + "%"
            );

            robotIntro.style.setProperty(
                "--flash-y",
                y + "%"
            );


            /* =============================
               AKTIFKAN HIGH FIVE
            ============================= */

            robotIntro.classList.add(
                "high-five"
            );

            robotIntro.classList.add(
                "success"
            );


            /* =============================
               UBAH TEKS
            ============================= */

            robotText.textContent =
                "HIGH FIVE! ✋";

            robotSubtext.textContent =
                "ACCESS GRANTED";


            /* =============================
               EFEK ROBOT TERKENA TOS
            ============================= */

            const robotWrapper =
                document.querySelector(
                    ".robot-wrapper"
                );

            if (robotWrapper) {

                robotWrapper.classList.add(
                    "robot-hit"
                );

            }


            /* =============================
               MATIKAN INTERAKSI
            ============================= */

            highFiveArea.style.pointerEvents =
                "none";


            /* =============================
               🔊 SOUND ACCESS GRANTED
            ============================= */

            setTimeout(() => {

                playAccessGrantedSound();

            }, 650);


            /* =============================
               ROBOT KELUAR
            ============================= */

            setTimeout(() => {

                robotIntro.classList.add(
                    "hide"
                );

            }, 1400);

        }
    );

}

```javascript
/* =========================================
   FILTER SERTIFIKAT
========================================= */

const certFilters = document.querySelectorAll(".cert-filter");
const certCards = document.querySelectorAll(".cert-card");

certFilters.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        certFilters.forEach(item => {
            const active = item === button;

            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });

        certCards.forEach(card => {
            const match =
                filter === "all" ||
                card.dataset.category === filter;

            card.hidden = !match;
        });
    });
});

/* =========================================
   LIHAT SERTIFIKAT
========================================= */

document.querySelectorAll(".cert-view").forEach(button => {
    button.addEventListener("click", () => {
        const image = button.dataset.image;

        if (image) {
            window.open(image, "_blank", "noopener,noreferrer");
        }
    });
});
```
