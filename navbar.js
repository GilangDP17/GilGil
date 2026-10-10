
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("cyberNav");
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    // Hentikan jika elemen navbar tidak ditemukan
    if (!nav || !toggle || !menu) {
        console.warn("Elemen navbar belum sesuai dengan HTML.");
        return;
    }

    // Buka dan tutup menu HP
    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("show");

        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu setelah tautan diklik
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("show");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    // Tutup menu jika pengguna mengeklik luar navbar
    document.addEventListener("click", event => {
        if (!nav.contains(event.target)) {
            menu.classList.remove("show");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    // Efek navbar ketika halaman digulir
    function updateNavbar() {
        nav.classList.toggle("scrolled", window.scrollY > 30);
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    // Tandai menu sesuai section yang terlihat
    const sections = document.querySelectorAll(
        "#beranda, #tentang, #keahlian, #pengalaman, #proyek, #sertifikat, #kontak"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                menu.querySelectorAll(".nav-link").forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            });
        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => observer.observe(section));
    }
});
