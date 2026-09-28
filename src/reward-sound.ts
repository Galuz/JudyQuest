let context: AudioContext | undefined;
let enabled = true;
try {
  enabled = localStorage.getItem("judy-reward-sound") !== "off";
} catch {
  /* Audio is optional. */
}
export const soundEnabled = () => enabled;
export function setRewardSound(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem("judy-reward-sound", value ? "on" : "off");
  } catch {
    /* Keep the in-memory preference. */
  }
  if (!value) {
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* Optional API. */
    }
    void context?.suspend().catch(() => {});
  }
}
// Resume immediately in the tap handler, including iOS's interrupted state.
// Resolve only once playback is ready; don't schedule notes on a suspended clock.
export async function prepareRewardAudio(): Promise<void> {
  if (!enabled) return;
  try {
    const Audio =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Audio) return;
    if (!context || context.state === "closed") context = new Audio();
    if (context.state !== "running") await context.resume();
  } catch {
    /* A blocked speaker must never affect a saved reward. */
  }
}
function announce(text: string) {
  if (!enabled) return;
  // No setTimeout: a replay/test tap must reach speak() in the same user gesture.
  try {
    if (
      "speechSynthesis" in window &&
      typeof SpeechSynthesisUtterance !== "undefined"
    ) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "es-MX";
      speech.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((v) => v.lang === "es-MX") ??
        voices.find((v) => v.lang.startsWith("es"));
      if (voice) speech.voice = voice;
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(speech);
    }
  } catch {
    /* Written amount and the sound remain available. */
  }
  void prepareRewardAudio().then(() => {
    if (!enabled || !context || context.state !== "running") return;
    try {
      const audio = context;
      [880, 1174, 1568, 2093].forEach((frequency, i) => {
        const oscillator = audio.createOscillator(),
          gain = audio.createGain();
        const at = audio.currentTime + i * 0.09;
        oscillator.type = "triangle";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, at);
        gain.gain.linearRampToValueAtTime(0.14, at + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, at + 0.28);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(at);
        oscillator.stop(at + 0.3);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
      });
    } catch {
      /* Audio failure must not look like a saving failure. */
    }
  });
}
export function testRewardSound() {
  announce(
    "¡Hola, Judy! El sonido está listo. Esta es una prueba y no suma dinero.",
  );
}
export function celebrateReward(cents: number) {
  if (!enabled || cents <= 0) return;
  const pesos = Math.floor(cents / 100),
    remainder = cents % 100;
  announce(
    `¡Felicidades, Judy! Ganaste ${pesos} ${pesos === 1 ? "peso" : "pesos"}${remainder ? ` con ${remainder} centavos` : ""} por aprender Español.`,
  );
}
