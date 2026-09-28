import { afterEach, beforeEach, expect, it, vi } from "vitest";

const speak = vi.fn();
const createOscillator = vi.fn(() => ({
  frequency: { value: 0 },
  connect: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  disconnect: vi.fn(),
}));
let resumeAudio: () => void;
beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  class Audio {
    state = "interrupted";
    currentTime = 1;
    destination = {};
    resume() {
      return new Promise<void>((resolve) => {
        resumeAudio = () => {
          this.state = "running";
          resolve();
        };
      });
    }
    suspend() {
      this.state = "suspended";
      return Promise.resolve();
    }
    createOscillator = createOscillator;
    createGain() {
      return {
        gain: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
        disconnect: vi.fn(),
      };
    }
  }
  vi.stubGlobal("localStorage", { getItem: () => null, setItem: vi.fn() });
  vi.stubGlobal("window", {
    AudioContext: Audio,
    speechSynthesis: {
      getVoices: () => [],
      cancel: vi.fn(),
      resume: vi.fn(),
      speak,
    },
  });
  vi.stubGlobal(
    "SpeechSynthesisUtterance",
    class {
      constructor(public text: string) {}
    },
  );
});
afterEach(() => vi.unstubAllGlobals());

it("announces the actual amount synchronously during a tap, without a delayed timer", async () => {
  const { celebrateReward } = await import("./reward-sound");
  celebrateReward(1250);
  expect(speak).toHaveBeenCalledTimes(1);
  expect(speak.mock.calls[0][0].text).toContain("12 pesos con 50 centavos");
  expect(createOscillator).not.toHaveBeenCalled();
  resumeAudio();
  await vi.waitFor(() => expect(createOscillator).toHaveBeenCalledTimes(4));
});
it("does not announce money when testing sound, muted, or the award is zero", async () => {
  const sound = await import("./reward-sound");
  sound.testRewardSound();
  expect(speak.mock.calls[0][0].text).toContain("no suma dinero");
  sound.setRewardSound(false);
  resumeAudio();
  sound.celebrateReward(1000);
  sound.testRewardSound();
  sound.setRewardSound(true);
  sound.celebrateReward(0);
  expect(speak).toHaveBeenCalledTimes(1);
});
it("a speech exception never propagates as a failed reward save", async () => {
  speak.mockImplementationOnce(() => {
    throw new Error("blocked");
  });
  const { celebrateReward } = await import("./reward-sound");
  expect(() => celebrateReward(1000)).not.toThrow();
  resumeAudio();
  await vi.waitFor(() => expect(createOscillator).toHaveBeenCalledTimes(4));
});
