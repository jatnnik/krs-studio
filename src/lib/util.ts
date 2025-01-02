import { CAM_IP } from "./constants";

export function getRequestUrl(position: number) {
  const url = new URL(`http://${CAM_IP}`);
  url.searchParams.set("view", position.toString());

  return url;
}
