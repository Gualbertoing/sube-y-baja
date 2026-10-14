/* =========================================
   SONIDOS GENERALES - SUBE Y BAJA
========================================= */

let contextoAudio = null;


/* =========================================
   CREAR AUDIO
========================================= */

function obtenerAudio() {

    if (!contextoAudio) {

        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        contextoAudio = new AudioCtx();

    }

    if (contextoAudio.state === "suspended") {
        contextoAudio.resume();
    }

    return contextoAudio;
}


/* =========================================
   CREAR UNA NOTA
========================================= */

function nota(
    frecuencia,
    duracion = 0.15,
    volumen = 0.18,
    tipo = "sine",
    retraso = 0
) {

    const ctx = obtenerAudio();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const inicio =
        ctx.currentTime + retraso;

    osc.type = tipo;

    osc.frequency.setValueAtTime(
        frecuencia,
        inicio
    );

    gain.gain.setValueAtTime(
        volumen,
        inicio
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        inicio + duracion
    );

    osc.start(inicio);
    osc.stop(inicio + duracion);

}


/* =========================================
   SONIDO MENÚ
========================================= */

function sonidoMenu() {

    nota(500, 0.12, 0.18);

    nota(
        680,
        0.14,
        0.16,
        "sine",
        0.06
    );

}


/* =========================================
   SONIDO APRENDAMOS
========================================= */

function sonidoAprendamos() {

    nota(523, 0.18, 0.18);

    nota(
        659,
        0.18,
        0.18,
        "sine",
        0.08
    );

    nota(
        784,
        0.20,
        0.18,
        "sine",
        0.16
    );

}


/* =========================================
   SONIDO JUEGOS
========================================= */

function sonidoJuego() {

    nota(
        430,
        0.15,
        0.20,
        "triangle"
    );

    nota(
        620,
        0.16,
        0.20,
        "triangle",
        0.07
    );

    nota(
        820,
        0.17,
        0.17,
        "triangle",
        0.14
    );

}


/* =========================================
   SONIDO RECURSOS
========================================= */

function sonidoRecurso() {

    nota(
        600,
        0.18,
        0.18,
        "sine"
    );

    nota(
        820,
        0.22,
        0.18,
        "sine",
        0.09
    );

}


/* =========================================
   SONIDO PARA PAPÁS
========================================= */

function sonidoPapas() {

    nota(
        392,
        0.18,
        0.18,
        "sine"
    );

    nota(
        523,
        0.22,
        0.17,
        "sine",
        0.09
    );

}


/* =========================================
   SONIDO REDES SOCIALES
========================================= */

function sonidoRedes() {

    const ctx = obtenerAudio();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";

    osc.frequency.setValueAtTime(
        700,
        ctx.currentTime
    );

    osc.frequency.exponentialRampToValueAtTime(
        1100,
        ctx.currentTime + 0.15
    );

    gain.gain.setValueAtTime(
        0.20,
        ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.18
    );

    osc.start();
    osc.stop(ctx.currentTime + 0.18);

}


/* =========================================
   SONIDO BUSCADOR
========================================= */

function sonidoBuscar() {

    nota(
        900,
        0.10,
        0.17,
        "square"
    );

    nota(
        650,
        0.11,
        0.14,
        "square",
        0.06
    );

}


/* =========================================
   ABRIR ENLACE DESPUÉS DEL SONIDO
========================================= */

function abrirConRetraso(enlace, tiempo = 220) {

    const destino =
        enlace.getAttribute("href");

    if (!destino) {
        return;
    }


    /* Nueva pestaña */

    if (
        enlace.target === "_blank"
    ) {

        setTimeout(() => {

            window.open(
                destino,
                "_blank",
                "noopener,noreferrer"
            );

        }, tiempo);

        return;
    }


    /* Página normal */

    setTimeout(() => {

        window.location.href =
            destino;

    }, tiempo);

}


/* =========================================
   DETECTAR CLICS
========================================= */

document.addEventListener(
    "click",

    function (evento) {

        const enlace =
            evento.target.closest(
                "a[href]"
            );


        /* =================================
           ENLACES
        ================================= */

        if (enlace) {

            const href =
                enlace.getAttribute("href") || "";


            /* -----------------------------
               ¡APRENDAMOS!
            ----------------------------- */

            if (
                enlace.classList.contains(
                    "boton-aprender"
                )
            ) {

                sonidoAprendamos();

                return;

            }


            /* -----------------------------
               MENÚ SUPERIOR
            ----------------------------- */

            if (
                enlace.closest(".menu")
            ) {

                sonidoMenu();

                return;

            }


            /* -----------------------------
               JUEGOS
            ----------------------------- */

            if (
                href.includes(
                    "memorama.html"
                ) ||

                href.includes(
                    "sopaletras.html"
                ) ||

                href.includes(
                    "rompecabezas.html"
                )
            ) {

                evento.preventDefault();

                sonidoJuego();

                abrirConRetraso(
                    enlace,
                    220
                );

                return;

            }


            /* -----------------------------
               RECURSOS
            ----------------------------- */

            if (
                href.includes(
                    "audiolibros.html"
                ) ||

                href.includes(
                    "videos.html"
                ) ||

                href.includes(
                    "cuentos.html"
                )
            ) {

                evento.preventDefault();

                sonidoRecurso();

                abrirConRetraso(
                    enlace,
                    220
                );

                return;

            }


            /* -----------------------------
               PARA PAPÁS
            ----------------------------- */

            if (
                href.includes(
                    "bienvenida.html"
                ) ||

                href.includes(
                    "articulos.html"
                ) ||

                (
                    href.includes(
                        "familias.html"
                    ) &&
                    !enlace.closest(".menu")
                )
            ) {

                evento.preventDefault();

                sonidoPapas();

                abrirConRetraso(
                    enlace,
                    220
                );

                return;

            }


            /* -----------------------------
               INSTAGRAM / TIKTOK
            ----------------------------- */

            if (
                href.includes(
                    "instagram.com"
                ) ||

                href.includes(
                    "tiktok.com"
                )
            ) {

                evento.preventDefault();

                sonidoRedes();

                abrirConRetraso(
                    enlace,
                    200
                );

                return;

            }

        }


        /* =================================
           BUSCADOR
        ================================= */

        const botonBuscar =
            evento.target.closest(
                "#buscador-sitio button"
            );

        if (botonBuscar) {

            sonidoBuscar();

        }

    }
);