const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const indicator = document.querySelector(".nav-indicator");
const scrollToTopButton = document.createElement("button");

// Crear el botón para subir
scrollToTopButton.id = "scrollToTop";
scrollToTopButton.innerHTML = "↑";
scrollToTopButton.title = "Subir";
scrollToTopButton.onclick = scrollToTop;
document.body.appendChild(scrollToTopButton);

// Mostrar el botón para subir si el usuario ha hecho scroll hacia abajo
function showScrollToTopButton() {
    if (window.pageYOffset > 200) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
}

// Mobile Menu Toggle Logic


// Relayout indicator on resize to fix position if switching between desktop/mobile
window.addEventListener('resize', () => {
    updateIndicator();
});

// Función para subir suavemente al principio de la página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Animación suave
    });
}

function abrirImagen(img) {
    var modal = document.getElementById("modalImagen");
    var imgAmpliada = document.getElementById("imgAmpliada");
    imgAmpliada.src = img.src;
    modal.style.display = "flex";
    document.body.classList.add('modal-open');
    if (!modal.dataset.listenerAdded) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                cerrarImagen();
            }
        });
        modal.dataset.listenerAdded = 'true';
    }
}

function cerrarImagen() {
    var modal = document.getElementById("modalImagen");
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
}

// Función para actualizar el indicador de la barra de navegación
function updateIndicator() {
    let currentSection = "";
    let isAtTop = window.pageYOffset === 0;

    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 3;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            currentSection = section.getAttribute("id");
        }
    });

    if (isAtTop) {
        navLinks.forEach(link => link.classList.add("active"));
        indicator.style.width = `${document.querySelector("nav").offsetWidth - 30}px`;
        indicator.style.left = `15px`;
        indicator.style.opacity = 1;
    } else if (currentSection) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
                updateIndicatorPosition(link);
            }
        });
    } else {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes("habilidades")) {
                link.classList.add("active");
                updateIndicatorPosition(link);
            }
        });
    }
}

// Función para actualizar la posición del indicador
function updateIndicatorPosition(element) {
    indicator.style.width = `${element.offsetWidth + 40}px`;
    indicator.style.left = `${element.offsetLeft - 20}px`;
    indicator.style.opacity = 1;
}

// Agregar un evento de clic a cada enlace de la barra de navegación
navLinks.forEach(link => {
    if (!link || !link.addEventListener) return;
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        const targetId = link.getAttribute('href').substring(1); // Obtener el ID de la sección
        const targetSection = document.getElementById(targetId); // Obtener la sección con el ID correspondiente

        // Desplazar suavemente hasta la sección deseada
        targetSection.scrollIntoView({
            behavior: 'smooth', // Animación suave
            block: 'start' // Asegura que la sección quede al principio de la ventana
        });
    });
});

// Función para manejar el scroll
window.addEventListener("scroll", () => {
    updateIndicator(); // Actualizamos el indicador
    showScrollToTopButton(); // Mostrar u ocultar el botón de subir
});

// Inicialización al cargar la página
window.addEventListener('load', function () {
    updateIndicator(); // Asegura que el indicador se muestre correctamente desde el principio

    // Al cargar, asegurarse de que los enlaces reflejen la sección visible
    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 3;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(section.getAttribute("id"))) {
                    link.classList.add("active");
                }
            });
        }
    });
});
document.querySelectorAll('.proyecto-card').forEach(card => {
    const carousel = card.querySelector('.carrusel');
    if (!carousel) return;
    const images = carousel.querySelectorAll('img');
    let index = 0;
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!images.length) return;
            images[index].classList.remove('active');
            index = (index - 1 + images.length) % images.length;
            images[index].classList.add('active');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!images.length) return;
            images[index].classList.remove('active');
            index = (index + 1) % images.length;
            images[index].classList.add('active');
        });
    }
});





