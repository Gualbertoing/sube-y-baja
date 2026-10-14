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
           0.035 = 3.5 %
        ================================= */

        musica.volume = 0.035;


        let musicaActivada = true;


        /* =================================
           REPRODUCIR MÚSICA
        ================================= */

        async function reproducirMusica() {

            if (!musicaActivada) {
                return;
            }


            try {

                await musica.play();

                boton.textContent = "🔊";

            }

            catch (error) {

                /* Autoplay bloqueado */

            }

        }


        /* =================================
           INTENTO AUTOMÁTICO
        ================================= */

        reproducirMusica();


        /* =================================
           PRIMERA INTERACCIÓN
           
           IMPORTANTE:
           NO SE ACTIVA SI TOCAS
           DIRECTAMENTE EL BOTÓN DE MÚSICA.
        ================================= */

        function primeraInteraccion(evento) {

            if (
                evento.target.closest(
                    "#boton-musica"
                )
            ) {

                return;

            }


            reproducirMusica();


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
           BOTÓN DE MÚSICA
        ================================= */

        boton.addEventListener(
            "click",
            async function () {

                if (musica.paused) {

                    musicaActivada = true;

                    try {

                        await musica.play();

                        boton.textContent =
                            "🔊";

                    }

                    catch (error) {

                        console.log(
                            "No se pudo iniciar la música."
                        );

                    }

                }

                else {

                    musicaActivada = false;

                    musica.pause();

                    boton.textContent =
                        "🔇";

                }

            }
        );

    }
);