/* =========================================
   ANIMACIONES REPETIBLES + SWOOSH
   SUBE Y BAJA
========================================= */


/* =========================================
   AUDIO PARA LAS ANIMACIONES
========================================= */

let audioAnimaciones = null;
let audioActivado = false;

/*
Si una animación aparece antes de que
el navegador desbloquee el audio,
guardamos su swoosh.
*/

let swooshPendiente = null;


/* =========================================
   ACTIVAR AUDIO
========================================= */

async function activarAudioAnimaciones() {

    if (!audioAnimaciones) {

        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;


        audioAnimaciones =
            new AudioCtx();

    }


    try {

        if (
            audioAnimaciones.state ===
            "suspended"
        ) {

            await audioAnimaciones.resume();

        }


        audioActivado =
            audioAnimaciones.state ===
            "running";


        /*
        Si una sección ya intentó hacer
        swoosh antes de desbloquearse
        el audio, lo reproducimos ahora.
        */

        if (
            audioActivado &&
            swooshPendiente !== null
        ) {

            const tonoPendiente =
                swooshPendiente;


            swooshPendiente = null;


            setTimeout(
                function () {

                    sonidoSwoosh(
                        tonoPendiente
                    );

                },
                40
            );

        }

    }

    catch (error) {

        audioActivado = false;

    }

}


/* =========================================
   DESBLOQUEAR LO MÁS RÁPIDO POSIBLE
========================================= */

/*
En celular touchstart ocurre apenas
el dedo toca la pantalla, antes de
que empiece realmente el scroll.
*/

document.addEventListener(
    "touchstart",
    activarAudioAnimaciones,
    {
        once: true,
        passive: true,
        capture: true
    }
);


/*
Mouse, lápiz o pantalla táctil.
*/

document.addEventListener(
    "pointerdown",
    activarAudioAnimaciones,
    {
        once: true,
        capture: true
    }
);


/*
Teclado.
*/

document.addEventListener(
    "keydown",
    activarAudioAnimaciones,
    {
        once: true,
        capture: true
    }
);


/* =========================================
   SONIDO SWOOSH
========================================= */

function sonidoSwoosh(
    tono = 900
) {

    /*
    Si todavía no está permitido sonar,
    guardamos este primer swoosh.
    */

    if (
        !audioActivado ||
        !audioAnimaciones ||
        audioAnimaciones.state !== "running"
    ) {

        swooshPendiente =
            tono;

        return;

    }


    const ctx =
        audioAnimaciones;


    const duracion =
        0.30;


    const buffer =
        ctx.createBuffer(
            1,
            ctx.sampleRate *
                duracion,
            ctx.sampleRate
        );


    const datos =
        buffer.getChannelData(0);


    for (
        let i = 0;
        i < datos.length;
        i++
    ) {

        datos[i] =
            Math.random() * 2 - 1;

    }


    const ruido =
        ctx.createBufferSource();


    ruido.buffer =
        buffer;


    const filtro =
        ctx.createBiquadFilter();


    filtro.type =
        "bandpass";


    filtro.frequency.setValueAtTime(
        tono,
        ctx.currentTime
    );


    filtro.frequency.exponentialRampToValueAtTime(
        tono * 1.7,
        ctx.currentTime +
            duracion
    );


    filtro.Q.value =
        0.8;


    const volumen =
        ctx.createGain();


    volumen.gain.setValueAtTime(
        0.001,
        ctx.currentTime
    );


    volumen.gain.exponentialRampToValueAtTime(
        0.09,
        ctx.currentTime + 0.06
    );


    volumen.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime +
            duracion
    );


    ruido.connect(
        filtro
    );


    filtro.connect(
        volumen
    );


    volumen.connect(
        ctx.destination
    );


    ruido.start();


    ruido.stop(
        ctx.currentTime +
            duracion
    );

}

/* =========================================
   INICIAR TODO
========================================= */

document.addEventListener(
    "DOMContentLoaded",

    function () {


        /* =================================
           SECCIONES 3, 4, 5 Y 6
        ================================= */

        const secciones =
            document.querySelectorAll(
                ".seccion-3, .seccion-4, .seccion-5, .seccion-6"
            );


        secciones.forEach(
            (seccion) => {

                seccion.classList.add(
                    "seccion-con-entrada"
                );

            }
        );


        /* =================================
           ACTIVIDADES
        ================================= */

        document
            .querySelectorAll(
                ".actividad-boton"
            )
            .forEach(
                (boton, indice) => {

                    const tarjeta =
                        boton.parentElement;


                    if (!tarjeta) {
                        return;
                    }


                    tarjeta.classList.add(
                        "elemento-entrada"
                    );


                    tarjeta.style.setProperty(
                        "--retraso",
                        `${indice * 0.13}s`
                    );


                    tarjeta.dataset.sonidoDelay =
                        indice * 130;


                    tarjeta.dataset.swooshTono =
                        750 +
                        indice * 130;

                }
            );


        /* =================================
           RECURSOS
        ================================= */

        document
            .querySelectorAll(
                ".recurso-boton"
            )
            .forEach(
                (boton, indice) => {

                    const tarjeta =
                        boton.parentElement;


                    if (!tarjeta) {
                        return;
                    }


                    tarjeta.classList.add(
                        "elemento-entrada"
                    );


                    tarjeta.style.setProperty(
                        "--retraso",
                        `${indice * 0.13}s`
                    );


                    tarjeta.dataset.sonidoDelay =
                        indice * 130;


                    tarjeta.dataset.swooshTono =
                        850 +
                        indice * 120;

                }
            );


        /* =================================
           PARA PAPÁS
        ================================= */

        document
            .querySelectorAll(
                ".papas-boton"
            )
            .forEach(
                (boton, indice) => {

                    const tarjeta =
                        boton.parentElement;


                    if (!tarjeta) {
                        return;
                    }


                    tarjeta.classList.add(
                        "elemento-entrada"
                    );


                    tarjeta.style.setProperty(
                        "--retraso",
                        `${indice * 0.13}s`
                    );


                    tarjeta.dataset.sonidoDelay =
                        indice * 130;


                    tarjeta.dataset.swooshTono =
                        700 +
                        indice * 100;

                }
            );


        /* =================================
           CONTACTO
        ================================= */

        const contacto =
            document.querySelector(
                ".contacto-tarjeta"
            );


        if (contacto) {

            contacto.classList.add(
                "elemento-entrada",
                "entrada-contacto"
            );


            contacto.dataset.sonidoDelay =
                0;


            contacto.dataset.swooshTono =
                950;

        }


        /* =================================
           TEMPORIZADORES DE SONIDO
        ================================= */

        const temporizadores =
            new WeakMap();


        /* =================================
           OBSERVADOR DE SECCIONES

           AHORA:
           ENTRA  = aparece
           SALE   = vuelve a ocultarse
        ================================= */

        const observadorSecciones =
            new IntersectionObserver(

                (entradas) => {

                    entradas.forEach(
                        (entrada) => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target
                                    .classList
                                    .add(
                                        "seccion-visible"
                                    );

                            }

                            else {

                                entrada.target
                                    .classList
                                    .remove(
                                        "seccion-visible"
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }

            );


        secciones.forEach(
            (seccion) => {

                observadorSecciones.observe(
                    seccion
                );

            }
        );


        /* =================================
           OBSERVADOR DE TARJETAS
        ================================= */

        const elementos =
            document.querySelectorAll(
                ".elemento-entrada"
            );


        const observadorElementos =
            new IntersectionObserver(

                (entradas) => {

                    entradas.forEach(
                        (entrada) => {

                            const elemento =
                                entrada.target;


                            /* =====================
                               CUANDO ENTRA
                            ===================== */

                            if (
                                entrada.isIntersecting
                            ) {

                                elemento.classList.add(
                                    "elemento-visible"
                                );


                                const retraso =
                                    Number(
                                        elemento
                                            .dataset
                                            .sonidoDelay ||
                                        0
                                    );


                                const tono =
                                    Number(
                                        elemento
                                            .dataset
                                            .swooshTono ||
                                        900
                                    );


                                /* BORRAR TIMER ANTERIOR */

                                const timerAnterior =
                                    temporizadores.get(
                                        elemento
                                    );


                                if (
                                    timerAnterior
                                ) {

                                    clearTimeout(
                                        timerAnterior
                                    );

                                }


                                /* NUEVO SWOOSH */

                                const timer =
                                    setTimeout(
                                        function () {

                                            sonidoSwoosh(
                                                tono
                                            );

                                        },

                                        retraso
                                    );


                                temporizadores.set(
                                    elemento,
                                    timer
                                );

                            }


                            /* =====================
                               CUANDO SALE
                            ===================== */

                            else {

                                elemento.classList.remove(
                                    "elemento-visible"
                                );


                                const timer =
                                    temporizadores.get(
                                        elemento
                                    );


                                if (timer) {

                                    clearTimeout(
                                        timer
                                    );


                                    temporizadores.delete(
                                        elemento
                                    );

                                }

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        elementos.forEach(
            (elemento) => {

                observadorElementos.observe(
                    elemento
                );

            }
        );


        /* =================================
           EQUIPO / PROPÓSITO / APORTE

           ESTA SECCIÓN YA TENÍA
           SU PROPIA ANIMACIÓN.
           AHORA TAMBIÉN SE REPITE.
        ================================= */

        const bloquesProyecto =
            document.querySelectorAll(
                ".seccion-2 .bloque-proyecto"
            );


        const observadorProyecto =
            new IntersectionObserver(

                (entradas) => {

                    entradas.forEach(
                        (entrada) => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                            }

                            else {

                                entrada.target
                                    .classList
                                    .remove(
                                        "visible"
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.18
                }

            );


        bloquesProyecto.forEach(
            (bloque) => {

                observadorProyecto.observe(
                    bloque
                );

            }
        );

    }
);