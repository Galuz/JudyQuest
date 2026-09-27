import { it, expect } from "vitest";
import { createPin, verifyPin } from "./pin";
import { defaults } from "../data/repositories";
it("almacena un hash con sal y verifica el PIN sin guardarlo en claro", async () => {
  const saved = await createPin("5482");
  expect(saved.pinHash).not.toContain("5482");
  expect(await verifyPin("5482", { ...defaults, ...saved })).toBe(true);
  expect(await verifyPin("0000", { ...defaults, ...saved })).toBe(false);
  expect((await createPin("5482")).pinHash).not.toBe(saved.pinHash);
});
it("rechaza PIN incompleto o no numérico", async () => {
  await expect(createPin("12")).rejects.toThrow();
  await expect(createPin("abcd")).rejects.toThrow();
});
