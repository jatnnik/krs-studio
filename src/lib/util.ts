import { CAM_IP, LOCAL_STORAGE_KEY } from "./constants";
import type { Config } from "./types";

export function makeRequestUrl(position: number) {
  const url = new URL(`http://${CAM_IP}`);
  url.searchParams.set("view", position.toString());

  return url;
}

export function moveCamera(position: number) {
  fetch(makeRequestUrl(position), {
    signal: AbortSignal.timeout(3000),
  }).catch((e) => console.error(`request to camera failed`));
}

export function retrieveConfig() {
  const config = localStorage.getItem(LOCAL_STORAGE_KEY);

  return config ? JSON.parse(config) : undefined;
}

export function saveConfig(config: Config) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
}
