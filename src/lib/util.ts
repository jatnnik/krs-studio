import { CAM_IP, type CameraPosition } from "./constants";

export function changeCameraPosition(position: CameraPosition) {
  const url = getRequestUrl(position);
  fetch(url).catch((e) => console.error(`request to camera failed`));
}

function getRequestUrl(position: CameraPosition) {
  const url = new URL(`http://${CAM_IP}`);
  url.searchParams.set("view", position.toString());

  return url;
}
