/* =========================================
   MÚSICA DE FONDO
   SUBE Y BAJA
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const musica =
            document.getElementById(
                "musica-fondo"
            );

        const boton =
            document.getElementById(
                "boton-musica"
            );


        if (!musica || !boton) {
            return;
        }


        /* =================================
           VOLUMEN
           0.06 = 6 %
        ================================= */

        musica.volume = 0.06;


        let musicaActivada = true;


        /* =================================
           INICIAR SUAVEMENTE
        ================================= */

        async function iniciarMusica() {

            if (!musicaActivada) {
                return;
            }


            try {

                await musica.play();

                boton.textContent =
                    "🔊";

            }

            catch (error) {

                /*
                   El navegador bloqueó
                   el autoplay.

                   Se iniciará con la
                   primera interacción.
                */

            }

        }


        /* =================================
           INTENTAR AL ABRIR LA PÁGINA
        ================================= */

        iniciarMusica();


        /* =================================
           SI EL NAVEGADOR LA BLOQUEA,
           INICIAR CON EL PRIMER CLIC
        ================================= */

        function primeraInteraccion() {

            iniciarMusica();


            document.removeEventListener(
                "pointerdown",
                primeraInteraccion
            );

            document.removeEventListener(
                "keydown",
                primeraInteraccion
            );

        }


        document.addEventListener(
            "pointerdown",
            primeraInteraccion
        );


        document.addEventListener(
            "keydown",
            primeraInteraccion
        );


        /* =================================
           BOTÓN ACTIVAR / DESACTIVAR
        ================================= */

        boton.addEventListener(
            "click",
            function () {

                if (
                    musica.paused
                ) {

                    musicaActivada =
                        true;

                    musica.play();

                    boton.textContent =
                        "🔊";

                }

                else {

                    musicaActivada =
                        false;

                    musica.pause();

                    boton.textContent =
                        "🔇";

                }

            }
        );

    }
);