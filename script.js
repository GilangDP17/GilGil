// Teks profesi yang mengetik otomatis (ubah sesuai kamu)
const roles=["Cyber Security Enthusiast","Network Engineering Student","Web Developer"];
const el=document.getElementById("typing");let r=0,c=0,del=false;
(function type(){
  const w=roles[r];el.textContent=w.slice(0,c);
  if(!del&&c===w.length){del=true;return setTimeout(type,1500)}
  if(del&&c===0){del=false;r=(r+1)%roles.length}
  c+=del?-1:1;setTimeout(type,del?45:90);
})();

// Muncul saat di-scroll, isi lingkaran skill, hitung angka
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const t=e.target;t.classList.add("show");
  t.querySelectorAll(".dial").forEach(d=>d.style.setProperty("--p",d.dataset.p));
  t.querySelectorAll("[data-n]").forEach(n=>{
    const to=+n.dataset.n;let i=0;
    const id=setInterval(()=>{i++;n.textContent=i+"+";if(i>=to)clearInterval(id)},90);
  });
  io.unobserve(t);
}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(s=>io.observe(s));

// Foto miring mengikuti mouse + bar progress scroll
const ph=document.getElementById("photo");
document.addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5)*12,y=(e.clientY/innerHeight-.5)*-12;
  ph.style.transform=`perspective(700px) rotateY(${x}deg) rotateX(${y}deg)`;
});
addEventListener("scroll",()=>{
  const h=document.documentElement;
  document.getElementById("progress").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
});
document.getElementById("year").textContent=new Date().getFullYear();

/* =========================================
   AESTHETIC PIXEL SNOW
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


    /* =========================
       START
    ========================= */

    window.addEventListener(
        "resize",
        resizeSnow
    );

    resizeSnow();

    animateSnow();
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

const skipIntro =
    document.getElementById("skipIntro");


/* =========================================
   CEK ELEMENT
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
       Robot memperkenalkan diri
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

        robotIntro.classList.add("ready");

    }, 3800);


    /* =========================================
   HIGH FIVE INTERACTION
========================================= */

highFiveArea.addEventListener("pointerdown", (event) => {

    /* posisi flash mengikuti tangan */
    robotIntro.style.setProperty(
        "--flash-x",
        event.clientX + "px"
    );

    robotIntro.style.setProperty(
        "--flash-y",
        event.clientY + "px"
    );


    /* efek sukses */

    robotIntro.classList.add("high-five");
    robotIntro.classList.add("success");


    robotText.textContent =
        "HIGH FIVE! ✋";

    robotSubtext.textContent =
        "ACCESS GRANTED";


    /* robot sedikit mundur */

    document.querySelector(".robot-wrapper")
        ?.classList.add("robot-hit");


    /* buka website */

    setTimeout(() => {

        robotIntro.classList.add("hide");

    }, 1400);

});