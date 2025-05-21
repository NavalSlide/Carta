document.addEventListener('DOMContentLoaded', function() {
    const sobre = document.getElementById('sobre');
    const solapa = sobre.querySelector('.sobre-solapa-interna');
    const cartaExpandida = document.getElementById('carta-expandida');
    const cerrarExpandida = document.getElementById('cerrar-expandida');
    let estaAbierto = false;
    const sonidoCarta = document.getElementById('sonido-carta');
    const sonidoExpandir = document.getElementById('sonido-expanir');
    const song = document.getElementById('song');
    const lyricsDisplay = document.getElementById('lyrics-display');
    const notificacion = document.getElementById('notificacion');
    const iniciarMusica = document.getElementById('iniciar-musica');
    const overlay = document.getElementById('overlay');
    const container = document.querySelector('.container');
    const contador = document.getElementById('contador');


    
    // Desactivar la carta inicialmente
    sobre.classList.add('desactivado');
    
    // Función para el contador
    function iniciarContador() {
        let segundos = 20;
        contador.textContent = segundos;
        contador.style.display = 'block'; // Mostrar el contador
        
        const intervalo = setInterval(function() {
            segundos--;
            contador.textContent = segundos;
            
            if (segundos <= 0) {
                clearInterval(intervalo);
                contador.style.display = 'none';
                sobre.classList.remove('desactivado');
            }
        }, 1000);
    }
    
    // Iniciar el contador cuando se inicia la música
    iniciarMusica.addEventListener('click', function() {
        notificacion.classList.add('oculta');
        overlay.classList.add('oculto');
        container.style.pointerEvents = 'auto'; // Habilita interacción con la carta
        song.volume = 0.2;
        song.play();
        updateLyricsInterval = setInterval(updateLyrics, 100);
        iniciarContador(); // Iniciar el contador
    });
    
    // Obtener todos los elementos de brillo solar
    const sunGlows = document.querySelectorAll('.sun-glow');
    
    // Función para mostrar u ocultar los brillos solares
    function toggleSunGlows(show) {
        sunGlows.forEach(glow => {
            if (show) {
                glow.classList.add('visible');
            } else {
                glow.classList.remove('visible');
            }
        });
    }
    
    // Función para actualizar las letras y mostrar efectos especiales
    function updateLyrics() {
        // Código existente para actualizar letras
        
        // Verificar si la letra actual contiene "Feel like sun"
        const currentLyrics = lyricsDisplay.textContent.trim();
        if (currentLyrics.includes("Feel like sun")) {
            toggleSunGlows(true); // Mostrar brillos solares
            createHearts(10, true); // Crear más corazones intensos cuando aparece el sol
        } else {
            toggleSunGlows(false); // Ocultar brillos solares
        }
    }
    
    sobre.addEventListener('click', function() {
        if (!estaAbierto) {
            sonidoCarta.currentTime = 0;
            
            sonidoCarta.play();

            sobre.classList.add('abierto');
            solapa.classList.add('oculto');
            estaAbierto = true;
        } else {
            // Mostrar carta expandida Y reproducir sonido de expansión
            cartaExpandida.classList.add('visible');
            sonidoExpandir.currentTime = 0;
            sonidoExpandir.play();
        }
    });

    cerrarExpandida.addEventListener('click', function(e) {
        e.stopPropagation();
        cartaExpandida.classList.remove('visible');
    });
    
    // Letras de "Lover Rock" con tiempos en segundos
    const lyrics = [
        { time: 0, text: "Sube el volumen 🎵🎵🎵" },
        { time: 16.97, text: "Feel like sun" },
        { time: 18.73, text: "on my skin" },
        { time: 21.11, text: "So this is love" },
        { time: 23.10, text: "I know it is" },
        { time: 25.39, text: "I know it sounds super cliché" },
        { time: 28.23, text: "But you make me feel some type of way" },
        { time: 30.06, text: "This is falling," },
        { time: 32.10, text: "falling in love, yeah" },
        { time: 35.23, text: "Mh-mh-mh-mh-mh-mmh, yeah" },
        { time: 41.67, text: "I got a lot on my mind" },
        { time: 43.66, text: "Got some more on my plate" },
        { time: 45.52, text: "My baby got me looking forward to the end of the day" },
        { time: 49.09, text: "What you say?" },
        { time: 50.40, text: "You and me" },
        { time: 52.80, text: "Just forget about the past," },
        { time: 54.80, text: "throw it in the trash" },
        { time: 56.24, text: "What you say?" },
        { time: 57.60, text: "You and me" },
        { time: 60.52, text: "Live the life we never had" },
        { time: 63.36, text: "like we're never going back" },
        { time: 67.19, text: "Feel like sun" },
        { time: 68.98, text: "on my skin" },
        { time: 72.36, text: "So this is love," },
        { time: 74.25, text: "I know it is" },
        { time: 76.40, text: "I know it sounds super cliché" },
        { time: 78.37, text: "But you make me feel some type of way" },
        { time: 80.27, text: "This is falling," },
        { time: 82.00, text: "falling in love" },
        { time: 85.49, text: "I know it sounds super cliché" },
        { time: 87.38, text: "But you make me feel some type of way" },
        { time: 89.14, text: "This is falling," },
        { time: 91.00, text: "falling in love (yeah)" },
        { time: 94.63, text: "This is falling," },
        { time: 96.40, text: "falling in love (ooh)" },
        { time: 98.46, text: "This is falling," },
        { time: 100.10, text: "falling in love" }
    ];
    
    // Función para actualizar las letras
    function updateLyrics() {
        const currentTime = song.currentTime;
        
        // Encontrar la letra actual basada en el tiempo
        let currentLyric = lyrics[0].text;
        let currentIndex = 0;
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time) {
                currentLyric = lyrics[i].text;
                currentIndex = i;
            } else {
                break;
            }
        }
        
        // Si la letra ha cambiado, aplicar la animación
        if (lyricsDisplay.textContent !== currentLyric) {
            // Limpiar el contenedor
            lyricsDisplay.innerHTML = '';
            
            // Crear elemento con animación
            const typingSpan = document.createElement('span');
            typingSpan.className = 'typing-animation';
            
            // Detectar si es móvil
            const isMobile = window.innerWidth <= 768;
            
            // Resaltar la palabra "love" en rojo - Enfoque mejorado
            let processedText = currentLyric;
            if (currentLyric.toLowerCase().includes("love")) {
                // En lugar de usar regex y reemplazo, dividamos el texto y creemos elementos separados
                const words = currentLyric.split(' ');
                typingSpan.innerHTML = ''; // Limpiar el contenido
                
                words.forEach(word => {
                    const wordSpan = document.createElement('span');
                    
                    // Si la palabra es "love" (ignorando mayúsculas/minúsculas), aplicar clase especial
                    if (word.toLowerCase() === "love" || word.toLowerCase() === "love," || 
                        word.toLowerCase() === "love." || word.toLowerCase() === "love!") {
                        wordSpan.textContent = word;
                        wordSpan.className = 'love-emphasis'; // Usar la clase existente
                    } else {
                        wordSpan.textContent = word;
                    }
                    
                    typingSpan.appendChild(wordSpan);
                    
                    // Añadir espacio después de cada palabra excepto la última
                    if (word !== words[words.length - 1]) {
                        typingSpan.appendChild(document.createTextNode(' '));
                    }
                });
                
                lyricsDisplay.appendChild(typingSpan);
            } else {
                if (isMobile && currentLyric.length > 25) {
                    // Dividir el texto en líneas más cortas para móviles
                    const words = currentLyric.split(' ');
                    let lines = [];
                    let currentLine = '';
                    
                    for (let word of words) {
                        if ((currentLine + word).length < 25) {
                            currentLine += (currentLine ? ' ' : '') + word;
                        } else {
                            if (currentLine) lines.push(currentLine);
                            currentLine = word;
                        }
                    }
                    if (currentLine) lines.push(currentLine);
                    
                    // Mostrar solo la primera línea con animación
                    typingSpan.textContent = lines[0];
                    lyricsDisplay.appendChild(typingSpan);
                    
                    // Mostrar el resto de líneas sin animación
                    for (let i = 1; i < lines.length; i++) {
                        const lineBreak = document.createElement('br');
                        lyricsDisplay.appendChild(lineBreak);
                        
                        const lineSpan = document.createElement('span');
                        lineSpan.textContent = lines[i];
                        lyricsDisplay.appendChild(lineSpan);
                    }
                } else {
                    typingSpan.textContent = currentLyric;
                    lyricsDisplay.appendChild(typingSpan);
                }
            }
            
            // Verificar si la letra contiene "love" o "falling in love" para crear corazones
            const lowerLyric = currentLyric.toLowerCase();
            if (lowerLyric.includes("falling in love")) {
                createHearts(27, true); // Reducido de 15 a 5 corazones intensos
            } else if (lowerLyric.includes("love")) {
                createHearts(19, false); // Reducido de 5 a 3 corazones normales
            }
            if (currentLyric.toLowerCase().includes("feel like sun")) {
                toggleSunGlows(true); // Mostrar brillos solares
            } else {
                toggleSunGlows(false); // Ocultar brillos solares
            }
        }
    }
    
    // Función para crear corazones animados
    function createHearts(count, intense) {
        // Reducir la cantidad de corazones en dispositivos móviles
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            count = Math.max(1, Math.floor(count / 2)); // Reducir a la mitad en móviles, mínimo 1
        }
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = intense ? 'heart intense' : 'heart normal';
                
                // Posición horizontal aleatoria
                const randomX = Math.floor(Math.random() * window.innerWidth);
                heart.style.left = randomX + 'px';
                
                // Tamaño aleatorio
                const size = intense ? 
                    Math.floor(Math.random() * 20) + 15 : // 15-35px para intensos
                    Math.floor(Math.random() * 10) + 10;  // 10-20px para normales
                
                heart.style.width = size + 'px';
                heart.style.height = size + 'px';
                
                // Ajustar los pseudo-elementos
                heart.style.setProperty('--size', size + 'px');
                
                // Color aleatorio (tonos de rojo y rosa)
                const colors = intense ? 
                    ['#cc0000', '#ff0000', '#ff3366', '#ff6699'] : // Colores intensos
                    ['#cc0000', '#ff6666', '#ff9999'];              // Colores suaves
                
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                heart.style.backgroundColor = randomColor;
                
                // Duración de animación aleatoria
                const duration = intense ? 
                    Math.random() * 2 + 2 : // 2-4s para intensos
                    Math.random() * 3 + 4;  // 4-7s para normales
                
                heart.style.animationDuration = duration + 's';
                
                // Movimiento horizontal aleatorio
                const randomTranslateX = intense ? 
                    (Math.random() - 0.5) * 100 : // -50px a 50px para intensos
                    (Math.random() - 0.5) * 40;   // -20px a 20px para normales
                
                heart.style.animationName = 'none';
                document.body.appendChild(heart);
                
                // Forzar un reflow para que la animación se reinicie
                void heart.offsetWidth;
                
                // Personalizar la animación
                heart.style.animationName = 'heartfloat';
                heart.style.transform = `rotate(-45deg) translateX(${randomTranslateX}px)`;
                
                // Eliminar el corazón después de la animación
                setTimeout(() => {
                    document.body.removeChild(heart);
                }, duration * 1000);
            }, i * (intense ? 150 : 250)); // Aumentado el intervalo entre corazones
        }
    }
    
    // Actualizar las letras cuando la canción termina
    song.addEventListener('ended', function() {
        clearInterval(updateLyricsInterval);
        lyricsDisplay.innerHTML = '<span class="typing-animation">Gracias por escuchar ❤️</span>';
    });
    
    // Variable para el intervalo
    let updateLyricsInterval;
});

