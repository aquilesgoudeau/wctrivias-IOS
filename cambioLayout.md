Ahora quiero que mires este codigo para que trabajes en campeon.js, lo que quiero es que cuando la animacion confitte termine, usa esta referencia para tener los links share o empezar de nuevo dentro de un card y en saludos usamos Congratulations y la copa al lado igual como se muestra en este archivo, un detalle cuando confitte termine la imagen de la copa tambien pero tiene que ser animada igual que confitte





import { useEffect, useState } from "react"
import ImageMostrar from "./imageMostrar"
import trofeo from "../../public/imagenes/trofeo.webp"
import shareApp from "../../public/imagenes/share.webp"
import playAgain from "../../public/imagenes/playagain.webp"
import shareExpo from "../utilities/shareBoton"

export default function CampeonMenu({ empezarDenuevo, saludos }) {
    const [opacityCard, setOpacityCard] = useState(0)
    const [opacityTrophy, setOpacityTrophy] = useState(1)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)

        // Fade in trophy
        const trophyTimer = setTimeout(() => setOpacityTrophy(1), 100)
        
        // Wait 8s, then crossfade
        const crossfadeTimer = setTimeout(() => {
            setOpacityTrophy(0)
            setOpacityCard(1)
        }, 3000)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(trophyTimer)
            clearTimeout(crossfadeTimer)
        }
    }, [])

    const testFontSize = width < 340 ? 18 : width >= 340 && width < 550 ? 24 : width >= 550 && width < 850 ? 24 : 28
    const testSizeImage = width < 340 ? 40 : width >= 340 && width < 550 ? 45 : width >= 550 && width < 850 ? 45 : 55
    const testMargin = width < 340 ? 6 : width >= 340 && width < 550 ? 8 : width >= 550 && width < 850 ? 10 : 30
    const smallTrophySize = width < 340 ? 30 : width >= 340 && width < 550 ? 40 : width >= 550 && width < 850 ? 50 : 60
    const testSizeCopaCentral = width < 340 ? 200 : width >= 340 && width < 550 ? 280 : width >= 550 && width < 850 ? 400 : 500


    
    const styles = {
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        trofeoCentralContainer: {
            position: "absolute",
            opacity: opacityTrophy,
            transition: 'opacity 1000ms ease-in-out',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        card: {
            backgroundColor: "#f2f2f2",
            padding: '25px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            width: '70%',
            maxWidth: '400px',
            opacity: opacityCard,
            transition: 'opacity 1500ms ease-in-out',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 10
        },
        headerContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: '1px',
        },
        congratulations: {
            fontWeight: "bold",
            color: "#b30000",
            textAlign: "center",
            fontSize: `${testFontSize}px`,
            margin: 0
        },
        contenedorOptiones: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: '1px',
        },
        storeLinksContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
        },
        linkButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
        }
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.trofeoCentralContainer}>
                <ImageMostrar item={trofeo} width={testSizeCopaCentral} height={testSizeCopaCentral} margin={0} />
            </div>

            <div style={styles.card}>
                <div style={styles.headerContainer}>
                    <p style={styles.congratulations}>
                        {saludos}
                    </p>
                    <ImageMostrar item={trofeo} width={smallTrophySize} height={smallTrophySize} margin={10} />
                </div>

                <div style={styles.contenedorOptiones}>
                    <button style={styles.button} onClick={() => empezarDenuevo()}>
                        <ImageMostrar item={playAgain} width={testSizeImage} height={testSizeImage} margin={testMargin} />
                    </button>

                    <button style={styles.button} onClick={() => shareExpo()}>
                        <ImageMostrar item={shareApp} width={testSizeImage} height={testSizeImage} margin={testMargin} />
                    </button>
                </div>
            </div>

           
        </div>
    );
}