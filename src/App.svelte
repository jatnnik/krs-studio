<script lang="ts">
  import Button from "./lib/components/Button.svelte";
  import { CameraPosition } from "./lib/constants";
  import { changeCameraPosition } from "./lib/util";

  function keydown(event: KeyboardEvent) {
    if (!event.ctrlKey) return;

    const validPositions = Object.values(CameraPosition).filter(
      (value) => typeof value === "number",
    );

    if (isNaN(Number(event.key)) || !validPositions.includes(Number(event.key) as CameraPosition))
      return;

    changeCameraPosition(Number(event.key) as CameraPosition);
  }
</script>

<svelte:window on:keydown={keydown} />

<main class="text-center space-y-6">
  <h1 class="font-extrabold tracking-tight text-zinc-900 text-2xl">KH Studio</h1>
  <p>Klicke auf einen der Buttons, um die Position der Kamera zu ändern.</p>
  <div class="space-x-4 space-y-4">
    <Button onClick={() => changeCameraPosition(CameraPosition.Speaker)}>Redner (1)</Button>
    <Button onClick={() => changeCameraPosition(CameraPosition.Reader)}>Leser/Vorsitz (2)</Button>
    <Button onClick={() => changeCameraPosition(CameraPosition.Table)}>Tisch (3)</Button>
    <Button onClick={() => changeCameraPosition(CameraPosition.Standing)}>
      Aufgabe im Stehen (4)
    </Button>
    <Button onClick={() => changeCameraPosition(CameraPosition.LongShot)}>Totale (5)</Button>
  </div>
</main>
