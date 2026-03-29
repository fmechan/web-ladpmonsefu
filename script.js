/* ========================================================== */
/* 1. NAVEGACIÓN Y MENÚ MÓVIL                                 */
/* ========================================================== */

// Efecto de transparencia en el menú al hacer scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = '#0D47A1';
        header.style.padding = '10px 5%';
    } else {
        header.style.background = 'rgba(13, 71, 161, 0.9)';
        header.style.padding = '15px 5%';
    }
});

// Lógica del Menú Hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ========================================================== */
/* 2. ANIMACIONES AL HACER SCROLL (Intersection Observer)     */
/* ========================================================== */

window.addEventListener('load', () => {
    const observerOptions = {
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Si es una agenda-card (página inicio), aplicamos estilo directo si no hay CSS
                if (entry.target.classList.contains('agenda-card')) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos generales y tarjetas de agenda
    document.querySelectorAll('.animate-item, .agenda-card').forEach(item => {
        if (item.classList.contains('agenda-card')) {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.style.transition = "all 0.6s ease-out";
        }
        scrollObserver.observe(item);
    });
});

/* ========================================================== */
/* 3. GALERÍA DE IMÁGENES Y LIGHTBOX (Página Proyectos/Quiénes Somos) */
/* ========================================================== */

function changeImg(element) {
    const mainImg = document.getElementById('current-img');
    if (!mainImg) return;

    mainImg.src = element.src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

function nextSlide(direction) {
    const thumbs = document.querySelectorAll('.thumb');
    if (thumbs.length === 0) return;

    let activeIndex = Array.from(thumbs).findIndex(t => t.classList.contains('active'));
    let nextIndex = (activeIndex + direction) % thumbs.length;
    if (nextIndex < 0) nextIndex = thumbs.length - 1;

    changeImg(thumbs[nextIndex]);
}

function openLightbox() {
    const mainImg = document.getElementById('current-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (mainImg && lightbox && lightboxImg) {
        lightboxImg.src = mainImg.src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
}

/* ========================================================== */
/* 4. MODALES (Yape, Bancos y Eventos)                        */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const yapeModal = document.getElementById("yapeModal");
    const bankModal = document.getElementById("bankModal");
    const eventModal = document.getElementById("eventModal");

    // Botones de apertura
    const btnYapeGlobal = document.getElementById("openYape"); // Footer
    const btnYapeHero = document.getElementById("openYapeHero"); // Sección Apoyo
    const btnBank = document.getElementById("openBankModal");

    if (btnYapeGlobal) btnYapeGlobal.onclick = () => yapeModal.style.display = "flex";
    if (btnYapeHero) btnYapeHero.onclick = () => yapeModal.style.display = "flex";
    if (btnBank) btnBank.onclick = () => bankModal.style.display = "flex";

    // Botones de cierre
    document.querySelectorAll('.close-yape, .close-bank, .close-modal').forEach(btn => {
        btn.onclick = function () {
            if (yapeModal) yapeModal.style.display = "none";
            if (bankModal) bankModal.style.display = "none";
            if (eventModal) eventModal.style.display = "none";
        };
    });

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === yapeModal) yapeModal.style.display = "none";
        if (event.target === bankModal) bankModal.style.display = "none";
        if (event.target === eventModal) eventModal.style.display = "none";
        if (event.target.id === 'lightbox') closeLightbox();
    });
});

// Cerrar con Escape (Global)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeLightbox();
        const modals = ["yapeModal", "bankModal", "eventModal"];
        modals.forEach(id => {
            const m = document.getElementById(id);
            if (m) m.style.display = "none";
        });
    }
});

/* ========================================================== */
/* 5. CALENDARIO FULLCALENDAR (Página Eventos)                */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modal-body');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        height: 'auto',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        events: [
            {
                title: 'Gran Culto de Adoración',
                start: '2026-03-22',
                color: '#B01E23',
                extendedProps: {
                    image: 'img/galeria1.jpeg',
                    category: 'cultos',
                    time: '6:30 PM',
                    location: 'Templo Central - Monsefú'
                }
            },
            {
                title: 'Reunión de Jóvenes',
                start: '2026-03-25',
                color: '#0D47A1',
                extendedProps: {
                    image: 'img/galeria2.jpeg',
                    category: 'jovenes',
                    time: '7:30 PM',
                    location: 'Salón de Usos Múltiples'
                }
            }
        ],
        eventClick: function (info) {
            const e = info.event;
            const props = e.extendedProps;
            modalBody.innerHTML = `
                <div class="modal-grid">
                    <div class="modal-img-column"><img src="${props.image}"></div>
                    <div class="modal-info-column">
                        <span style="color: #B01E23; font-weight: bold;">${props.category}</span>
                        <h2 style="color: #0D47A1; margin: 10px 0;">${e.title}</h2>
                        <p><i class="fas fa-clock"></i> ${props.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${props.location}</p>
                        <a href="https://wa.me/51937510101" class="btn-more-info" style="display:block; background:#0D47A1; color:white; padding:10px; border-radius:5px; text-align:center; text-decoration:none; margin-top:15px;">Confirmar Asistencia</a>
                    </div>
                </div>`;
            modal.style.display = "flex";
        }
    });
    calendar.render();
});

/* ========================================================== */
/* 6. TESTIMONIOS (Página Inicio)                             */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const activeContent = document.getElementById('active-testimonial-content');
    if (!activeContent) return;

    const testimonialData = {
        '1': { name: 'Dante Tullume', text: 'Enfrente a los 26 años una grave enfermedad digestiva que, tras constantes hemorragias y diagnósticos médicos desalentadores, lo condenaba a una cirugía y una vida llena de limitaciones físicas. En medio de su desesperación, decidió buscar a Dios y realizó un pacto solemne: si era sanado, dedicaría cada día de su existencia a servirle y honrarle fielmente. La respuesta divina fue un milagro sobrenatural donde experimente una restauración total de mi salud, eliminando toda dolencia sin necesidad de intervenciones humanas. Hoy, tras más de diez años de vivir plenamente sano y restaurado, comparto mi testimonio como prueba del poder real de Dios. Mi vida es ahora un mensaje de esperanza que invita a otros a creer en lo imposible y en lo sobrenatural del poder de Dios.', stars: 5, category: 'Culto Central' },
        '2': { name: 'Jesus Cordova', text: 'En un ayuno me mostró un gran acto de amor y lo maravilloso que es nuestro Dios.', stars: 5, category: 'Culto de Ayuno' },
        '3': { name: 'Francis Mechán Chavesta', text: 'Yo vivía sumergido en el afán: mis metas eran títulos, estabilidad laboral y el éxito de mi emprendimiento. En mi vida no había espacio para Dios, hasta que me enfrente en un tema de salud que la ciencia médica no lograba explicar; mientras mi economía se agotaba buscando una cura humana, mi orgullo se resistía a creer en Dios. Pero allí, en mi punto más débil, me alcanzó su misericordia. Dios no solo restauró mi salud, sino que transformó mis finanzas y mi carrera de formas que la lógica no puede explicar. Hoy, le doy la gloria y la honra a Jesucristo por la paz y el gozo que solo Él ofrece. No importa tu condición actual, solo importa tu disposición: rinde tu corazón al Dios vivo y permítele hacer lo sobrenatural en ti. Cristo te ama', stars: 5, category: 'Culto Central' }
    };

    function renderTestimonial(id) {
        const data = testimonialData[id];
        let stars = '<i class="fas fa-star" style="color:#FFD700"></i>'.repeat(data.stars);
        activeContent.innerHTML = `
            <div class="testimonial-content-wrapper">
                <span style="color:#B01E23; font-weight:700;">${data.category}</span>
                <h3 style="color:#0D47A1; font-size:1.8rem;">${data.name}</h3>
                <div style="border-top:1px solid #eee; padding-top:15px;">
                    ${stars}
                    <p style="font-style:italic; margin-top:10px;">"${data.text}"</p>
                </div>
            </div>`;
        document.querySelectorAll('.testimonial-select').forEach(s => s.classList.remove('active'));
        document.querySelector(`.testimonial-select[data-id="${id}"]`).classList.add('active');
    }

    document.querySelectorAll('.testimonial-select').forEach(dot => {
        dot.addEventListener('click', function () {
            renderTestimonial(this.getAttribute('data-id'));
        });
    });

    renderTestimonial('1'); // Inicial
});

/*---------para que me direcione como mensaje de whatsapp las peticiones---------*/

document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Capturar los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value || "No proporcionado";
    const mensaje = document.getElementById('mensaje').value;

    // 2. Número de teléfono de la iglesia
    const numeroIglesia = "51937510101";

    // 3. Crear el mensaje estructurado
    const textoWhatsApp = `*NUEVO MENSAJE DE LA WEB*%0A%0A` +
                          `*Nombre:* ${nombre}%0A` +
                          `*Teléfono:* ${telefono}%0A` +
                          `*Email:* ${email}%0A` +
                          `*Mensaje:* ${mensaje}`;

    // 4. Crear la URL y abrirla
    const url = `https://api.whatsapp.com/send?phone=${numeroIglesia}&text=${textoWhatsApp}`;
    window.open(url, '_blank');

    // 5. LIMPIAR EL FORMULARIO (Esta es la parte nueva)
    this.reset(); 
});

/* ================================================================
   CONTROLADOR DE VIDEO MODAL (HISTORIA / PROYECTOS)
   ================================================================ */

document.addEventListener("DOMContentLoaded", function() {
    // Referencias a los elementos
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("historyVideo");

    /**
     * ABRE EL MODAL
     * Se activa desde el onclick="openVideoModal()" en el HTML
     */
    window.openVideoModal = function() {
        if (modal) {
            modal.style.display = "flex"; // Usamos flex para el centrado CSS
            if (video) {
                video.play().catch(error => {
                    console.log("El navegador requiere interacción manual o el video está silenciado.");
                });
            }
        } else {
            console.error("Error: No se encontró el elemento #videoModal");
        }
    };

    /**
     * CIERRA EL MODAL
     * Detiene el video y resetea el tiempo a cero
     */
    window.closeVideoModal = function() {
        if (modal) {
            modal.style.display = "none";
            if (video) {
                video.pause();
                video.currentTime = 0; // Reinicia el video para la próxima vez
            }
        }
    };

    /**
     * CIERRE POR INTERACCIÓN EXTERNA
     */
    
    // 1. Cerrar al hacer clic en el fondo oscuro (fuera del video)
    if (modal) {
        modal.addEventListener("click", function(event) {
            // Si el clic fue directamente en el fondo (modal) y no en el contenido (video)
            if (event.target === modal) {
                closeVideoModal();
            }
        });
    }

    // 2. Cerrar al presionar la tecla "Escape"
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeVideoModal();
        }
    });
});

/**
 * Función de respaldo para el atributo onclick="closeVideoModalOutside(event)"
 * que tienes en el HTML.
 */
function closeVideoModalOutside(event) {
    if (event.target.id === "videoModal") {
        closeVideoModal();
    }
}

/* ================================================================
   CONTROLADOR DE VIDEO MODAL: PROYECTOS (CONSTRUCCIÓN)
   ================================================================ */

document.addEventListener("DOMContentLoaded", function() {
    // Referencias únicas para la página de Proyectos
    const projectModal = document.getElementById("projectVideoModal");
    const constructionVideo = document.getElementById("constructionVideo");

    /**
     * ABRE EL MODAL DE PROYECTOS
     * onclick="openProjectVideoModal()"
     */
    window.openProjectVideoModal = function() {
        if (projectModal) {
            projectModal.style.display = "flex"; // Usamos flex para centrar
            if (constructionVideo) {
                constructionVideo.play().catch(error => {
                    console.log("El navegador bloqueó el autoplay.");
                });
            }
        } else {
            console.error("Error: No se encontró #projectVideoModal");
        }
    };

    /**
     * CIERRA EL MODAL DE PROYECTOS
     */
    window.closeProjectVideoModal = function() {
        if (projectModal) {
            projectModal.style.display = "none";
            if (constructionVideo) {
                constructionVideo.pause();
                constructionVideo.currentTime = 0; // Reset a cero
            }
        }
    };

    /**
     * CIERRE POR INTERACCIÓN EXTERNA (Proyectos)
     */
    
    // 1. Cerrar al hacer clic en el fondo oscuro
    if (projectModal) {
        projectModal.addEventListener("click", function(event) {
            if (event.target === projectModal) {
                closeProjectVideoModal();
            }
        });
    }

    // 2. Cerrar con la tecla "Escape" (Detecta si el modal de proyectos está abierto)
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && projectModal && projectModal.style.display === "flex") {
            closeProjectVideoModal();
        }
    });
});

/**
 * Función de respaldo para onclick="closeProjectVideoOutside(event)" en Proyectos
 */
function closeProjectVideoOutside(event) {
    if (event.target.id === "projectVideoModal") {
        closeProjectVideoModal();
    }
}