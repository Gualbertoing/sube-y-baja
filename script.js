
/* ==================================
   BUSCADOR DE SUBE Y BAJA
================================== */

const formularioBusqueda =
    document.getElementById("buscador-sitio");

const campoBusqueda =
    document.getElementById("campo-busqueda");

// Contenidos que el buscador puede encontrar

const contenidos = [

    {
        palabras: ["memorama", "memoria", "parejas"],
        ruta: "paginas/memorama.html"
    },

    {
        palabras: ["sopa de letras", "sopaletras", "palabras"],
        ruta: "paginas/sopaletras.html"
    },

    {
        palabras: ["rompecabezas", "puzzle", "piezas"],
        ruta: "paginas/rompecabezas.html"
    },

    {
        palabras: ["audiolibros", "audiolibro", "escuchar"],
        ruta: "paginas/audiolibros.html"
    },

    {
        palabras: ["videos", "video"],
        ruta: "paginas/videos.html"
    },

    {
        palabras: ["cuentos", "cuento", "historias"],
        ruta: "paginas/cuentos.html"
    },

    {
        palabras: ["familias", "familia"],
        ruta: "paginas/familias.html"
    },

    {
        palabras: ["bienvenida", "mensaje de bienvenida"],
        ruta: "paginas/bienvenida.html"
    },

    {
        palabras: ["articulos", "biblioteca de articulos"],
        ruta: "paginas/articulos.html"
    },

    {
        palabras: ["actividades", "juegos"],
        ruta: "#actividades"
    },

    {
        palabras: ["recursos", "materiales"],
        ruta: "#recursos"
    },

    {
        palabras: ["para papas", "padres", "papas"],
        ruta: "#papas"
    },

    {
        palabras: ["biblioteca"],
        ruta: "paginas/biblioteca.html"
    }

];

// Permite buscar aunque el usuario no escriba acentos

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}

// Ejecutar búsqueda

if (formularioBusqueda && campoBusqueda) {

    formularioBusqueda.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const busqueda = normalizarTexto(campoBusqueda.value);

        if (busqueda === "") {
            return;
        }

        
// Buscar una coincidencia exacta

const resultado = contenidos.find(contenido => {

    return contenido.palabras.some(palabra => {

        return normalizarTexto(palabra) === busqueda;

    });


        });

        if (resultado) {

            window.location.href = resultado.ruta;

        } else {

            alert(
                "No encontramos ese contenido. " +
                "Prueba con memorama, cuentos, videos o actividades."
            );

        }

    });

}
/* =========================================
   ANIMACIÓN AL HACER SCROLL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const tarjetas = document.querySelectorAll(
        ".seccion-2 .bloque-proyecto"
    );

    const observador = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    tarjetas.forEach((tarjeta) => {

        observador.observe(tarjeta);

    });

});
/* =========================================
   SONIDOS DE BOTONES - SUBE Y BAJA
========================================= */

let audioBotones = null;


/* CREAR / OBTENER AUDIO */

function obtenerAudioBotones() {

    if (!audioBotones) {

        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        audioBotones =
            new AudioCtx();

    }

    if (
        audioBotones.state === "suspended"
    ) {

        audioBotones.resume();

    }

    return audioBotones;

}


/* =========================================
   1. CLICK NORMAL
   Menú, regresar, etc.
========================================= */

function sonidoClick() {

    const ctx =
        obtenerAudioBotones();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    osc.connect(gain);

    gain.connect(
        ctx.destination
    );


    osc.type = "sine";


    osc.frequency.setValueAtTime(
        520,
        ctx.currentTime
    );


    osc.frequency.exponentialRampToValueAtTime(
        690,
        ctx.currentTime + 0.06
    );


    gain.gain.setValueAtTime(
        0.14,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.10
    );


    osc.start();

    osc.stop(
        ctx.currentTime + 0.10
    );

}


/* =========================================
   2. BOTÓN DE JUEGO
   Sonido más juguetón
========================================= */

function sonidoJuego() {

    const ctx =
        obtenerAudioBotones();


    const notas = [
        450,
        650
    ];


    notas.forEach(
        (nota, i) => {

            const osc =
                ctx.createOscillator();

            const gain =
                ctx.createGain();


            osc.connect(gain);

            gain.connect(
                ctx.destination
            );


            const inicio =
                ctx.currentTime +
                i * 0.06;


            osc.type = "triangle";


            osc.frequency.setValueAtTime(
                nota,
                inicio
            );


            gain.gain.setValueAtTime(
                0.15,
                inicio
            );


            gain.gain.exponentialRampToValueAtTime(
                0.001,
                inicio + 0.13
            );


            osc.start(inicio);

            osc.stop(
                inicio + 0.13
            );

        }
    );

}


/* =========================================
   3. BOTÓN PRINCIPAL
   ¡APRENDAMOS!
========================================= */

function sonidoAprendamos() {

    const ctx =
        obtenerAudioBotones();


    const notas = [
        523,
        659,
        784
    ];


    notas.forEach(
        (nota, i) => {

            const osc =
                ctx.createOscillator();

            const gain =
                ctx.createGain();


            osc.connect(gain);

            gain.connect(
                ctx.destination
            );


            const inicio =
                ctx.currentTime +
                i * 0.07;


            osc.type = "sine";


            osc.frequency.setValueAtTime(
                nota,
                inicio
            );


            gain.gain.setValueAtTime(
                0.14,
                inicio
            );


            gain.gain.exponentialRampToValueAtTime(
                0.001,
                inicio + 0.16
            );


            osc.start(inicio);

            osc.stop(
                inicio + 0.16
            );

        }
    );

}


/* =========================================
   4. REDES SOCIALES
========================================= */

function sonidoRedSocial() {

    const ctx =
        obtenerAudioBotones();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    osc.connect(gain);

    gain.connect(
        ctx.destination
    );


    osc.type = "sine";


    osc.frequency.setValueAtTime(
        700,
        ctx.currentTime
    );


    osc.frequency.exponentialRampToValueAtTime(
        950,
        ctx.currentTime + 0.10
    );


    gain.gain.setValueAtTime(
        0.14,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.14
    );


    osc.start();

    osc.stop(
        ctx.currentTime + 0.14
    );

}


/* =========================================
   CONECTAR LOS SONIDOS
========================================= */


/* MENÚ SUPERIOR */

document
    .querySelectorAll(".menu a")
    .forEach((boton) => {

        boton.addEventListener(
            "pointerdown",
            sonidoClick
        );

    });


/* BOTÓN ¡APRENDAMOS! */

document
    .querySelectorAll(".boton-aprender")
    .forEach((boton) => {

        boton.addEventListener(
            "pointerdown",
            sonidoAprendamos
        );

    });


/* ACTIVIDADES */

document
    .querySelectorAll(`
        .actividad-imagen-enlace,
        .actividad-boton
    `)
    .forEach((boton) => {

        boton.addEventListener(
            "pointerdown",
            sonidoJuego
        );

    });


/* RECURSOS */

document
    .querySelectorAll(`
        .recurso-imagen-enlace,
        .recurso-boton
    `)
    .forEach((boton) => {

        boton.addEventListener(
            "pointerdown",
            sonidoJuego
        );

    });


/* PARA PAPÁS */

document
    .querySelectorAll(`
        .papas-imagen-enlace,
        .papas-boton
    `)
    .forEach((boton) => {

        boton.addEventListener(
            "pointerdown",
            sonidoClick
        );

    });


/* INSTAGRAM Y TIKTOK */

document
    .querySelectorAll(".red-social")
    .forEach((boton) => {

        boton.addEventListener(
            "pointerdown",
            sonidoRedSocial
        );

    });


/* BOTÓN DEL BUSCADOR */

const botonBuscar =
    document.querySelector(
        "#buscador-sitio button"
    );

if (botonBuscar) {

    botonBuscar.addEventListener(
        "pointerdown",
        sonidoClick
    );

}