import { Audio } from "expo-av";


export async function playSound(soundFilePath, volume) {
  let sound;

  try {
    // Configurar el modo de audio
    await Audio.setAudioModeAsync({
      staysActiveInBackground: false, // Permitir reproducción en segundo plano
      playsInSilentModeIOS: true,
   
    });
    // Crear y cargar el sonido
    const { sound: loadedSound } = await Audio.Sound.createAsync(
      soundFilePath
    );
    sound = loadedSound;

    // Configurar el volumen
    await sound.setVolumeAsync(volume);

    // Reproducir el sonido
    await sound.playAsync();

    // Descargar el sonido después de que termine la reproducción
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        await sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error("Error al reproducir el sonido:", error);
    if (sound) {
      await sound.unloadAsync().catch((unloadError) =>
        console.error("Error al descargar el sonido:", unloadError)
      );
    }
  }
}
