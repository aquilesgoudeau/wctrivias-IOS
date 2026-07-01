puedes modificar la animacion de confitte en campeon.js con la misma implementacion que se usa en este archivo que pertenece a otro proyecto, la idea es que repliques la expreiencia desde este extracto de confitte:

import { useEffect, useState } from "react"
import Preguntas from "./preguntas"
import Respuestas from "./respuestas"
import ImageMostrar from "./imageMostrar"
import trofeo from "../../public/imagenes/trofeo.webp"
import confetti from "canvas-confetti"
import victorySound from "../../public/sonidos/iniciojuego.wav"

export default function Campeon({ arrayTorneo, indexjuego, option, setOption, indexRespuesta }) {
  const [opacityOne, setOpacityOne] = useState(1)
  const [opacityTwo, setOpacityTwo] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    const audio = new Audio(victorySound);
    audio.volume = 0.3;
    audio.play().catch(err => console.log("Audio play error:", err));

    // Fase 1: Ocultar preguntas y respuestas
    const phaseOneTimer = setTimeout(() => {
      setOpacityOne(0)
      
      // Fase 2: Mostrar trofeo y lanzar confetti
      const phaseTwoTimer = setTimeout(() => {
        setOpacityTwo(1)
        lanzarConfetti();
        
        // Fase 3: Ir al menú
        const phaseThreeTimer = setTimeout(() => {
            setOption('11')
        }, 3000)
        
        return () => clearTimeout(phaseThreeTimer)
      }, 1000)

      return () => clearTimeout(phaseTwoTimer)
    }, 1000)

    return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(phaseOneTimer)
    }
  }, [setOption])

  const lanzarConfetti = () => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    
    const masiveBurst = () => {
      confetti({ particleCount: 150, spread: 70, origin: { x: 0.2, y: 0.5 }, zIndex: 9999 });
      confetti({ particleCount: 150, spread: 70, origin: { x: 0.8, y: 0.5 }, zIndex: 9999 });
      confetti({ particleCount: 200, spread: 160, origin: { x: 0.5, y: 0.7 }, zIndex: 9999, scalar: 1.5 });
    };
    
    masiveBurst();

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 20,
        startVelocity: -20,
        gravity: 0.5,
        origin: { x: Math.random(), y: -0.1 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        zIndex: 9999
      });

      const corners = [
        { x: 0, y: 0 }, { x: 1, y: 0 },
        { x: 0, y: 1 }, { x: 1, y: 1 }
      ];
      
      corners.forEach(corner => {
        confetti({
          particleCount: 15,
          angle: corner.x === 0 ? (corner.y === 0 ? 315 : 45) : (corner.y === 0 ? 225 : 135),
          spread: 90,
          origin: corner,
          zIndex: 9999
        });
      });

      if (Math.random() > 0.6) {
        confetti({
          particleCount: 60,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() },
          colors: ['#FFE15D', '#FF96AD', '#BCCEF8', '#F8FFD4'],
          zIndex: 9999,
          shapes: ['circle', 'square'],
          scalar: Math.random() * 1 + 0.5
        });
      }
    }, 150);
  };

  const testTrofeoSize = width < 340 ? 200 : width >= 340 && width < 550 ? 280 : width >= 550 && width < 850 ? 400 : 500

  const styles = {
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    groupOne: {
        opacity: opacityOne,
        marginTop: '100px',
        transition: 'opacity 1000ms ease-in-out'
    },
    trofeoEstilo: {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: opacityTwo,
        transition: 'opacity 1000ms ease-in-out',
        zIndex: 100
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.groupOne}>
        <Preguntas pregunta={arrayTorneo.preguntas} indexjuego={indexjuego} />
        <Respuestas correcta={arrayTorneo.respuestas[indexjuego]} respuestas={arrayTorneo.menuRespuestas} indexjuego={indexjuego} option={option} indexRespuesta={indexRespuesta} />
      </div>
      <div style={styles.trofeoEstilo}>
        <ImageMostrar item={trofeo} width={testTrofeoSize} height={testTrofeoSize} margin={0} />
      </div>
    </div>
  )
}