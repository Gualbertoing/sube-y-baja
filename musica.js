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

            console.log(
                "No se encontró el audio o el botón."
            );

            return;
        }


        /* =================================
           VOLUMEN DE FONDO
           
           0.04 = 4 %
        ================================= */

        musica.volume = 0.04;


        let musicaActivada = true;


        /* =================================
           REPRODUCIR
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

                /*
                Algunos navegadores bloquean
                la reproducción automática.
                Se iniciará al primer toque.
                */

            }

        }


        /* =================================
           INTENTO AUTOMÁTICO
        ================================= */

        reproducirMusica();


        /* =================================
           PRIMER TOQUE / CLIC
        ================================= */

        function primeraInteraccion() {

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
            function () {

                if (musica.paused) {

                    musicaActivada = true;

                    reproducirMusica();

                }

                else {

                    musicaActivada = false;

                    musica.pause();

                    boton.textContent = "🔇";

                }

            }
        );

    }
);