let context: AudioContext | undefined;
let speechTimer: ReturnType<typeof setTimeout> | undefined;
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
    clearTimeout(speechTimer);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    void context?.suspend().catch(() => {});
  }
}
// Call directly from a tap, before waiting for the database transaction.
export function prepareRewardAudio() {
  if (!enabled) return;
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") void context.resume().catch(() => {});
  } catch {
    /* The visible reward works even without audio support. */
  }
}
export function celebrateReward(cents: number) {
  if (!enabled || cents <= 0) return;
  prepareRewardAudio();
  try {
    const audio = context;
    if (audio)
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
    /* Never block saving a prize because of a sound failure. */
  }
  clearTimeout(speechTimer);
  if ("speechSynthesis" in window) {
    speechTimer = setTimeout(() => {
      if (!enabled) return;
      const pesos = Math.floor(cents / 100),
        remainder = cents % 100;
      const speech = new SpeechSynthesisUtterance(
        `¡Felicidades, Judy! Ganaste ${pesos} ${pesos === 1 ? "peso" : "pesos"}${remainder ? ` con ${remainder} centavos` : ""} por aprender Español.`,
      );
      speech.lang = "es-MX";
      speech.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((v) => v.lang === "es-MX") ??
        voices.find((v) => v.lang.startsWith("es"));
      if (voice) speech.voice = voice;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }, 650);
  }
}
