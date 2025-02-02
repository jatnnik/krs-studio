<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./lib/components/Button.svelte";
  import KeyboardInput from "./lib/components/KeyboardInput.svelte";
  import SettingsButton from "./lib/components/settings/Trigger.svelte";
  import { CAM_IP, cameraPositions } from "./lib/constants";
  import { getRequestUrl } from "./lib/util";

  let currentPosition: number | undefined = $state();
  let cameraIp: string | undefined = $state(undefined);

  let dialog: HTMLDialogElement | null = null;

  export function changeCameraPosition(position: number) {
    fetch(getRequestUrl(position), {
      signal: AbortSignal.timeout(3000),
    }).catch((e) => console.error(`request to camera failed`));

    currentPosition = position;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!event.ctrlKey || !/^[0-9]$/.test(event.key)) return;

    const validPositions = Object.values(cameraPositions);
    const key = Number(event.key);

    if (validPositions.includes(key)) {
      event.preventDefault();
      changeCameraPosition(key);
    }
  }

  function openSettings() {
    dialog?.showModal();
  }

  function closeSettings() {
    dialog?.close();
  }

  onMount(() => {
    if (cameraIp === undefined) {
      dialog?.showModal();
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<SettingsButton onclick={openSettings} />

<dialog
  class="shadow-sm p-6 border max-w-md w-full rounded-sm backdrop:bg-black/50 backdrop:backdrop-blur-xs"
  bind:this={dialog}
>
  <div class="flex justify-between items-center">
    <h2 class="font-bold text-lg">Einstellungen</h2>
    <button class="text-sm text-zinc-500" onclick={closeSettings}>Schließen</button>
  </div>

  <div class="mt-4">
    <label for="cam-ip" class="text-sm font-medium">Kamera IP</label>
    <input id="cam-ip" type="text" class="w-full mt-1" bind:value={cameraIp} />
  </div>
</dialog>

<main class="text-center space-y-6 px-6">
  <h1 class="font-bold tracking-tighter text-zinc-900 text-2xl">KRS Studio</h1>
  <p class="leading-normal">
    Klicke auf einen der Buttons oder drücke <KeyboardInput value="Strg" />
    + <KeyboardInput value="Zahl" /> um die Position der Kamera zu ändern.
  </p>

  <div class="space-x-4 space-y-4">
    {#each Object.entries(cameraPositions) as [key, value], i}
      <Button
        onclick={() => changeCameraPosition(value)}
        class="px-4 py-2 bg-zinc-800 font-medium text-white rounded-md enabled:hover:bg-zinc-700 disabled:bg-green-700 transition-colors"
        disabled={currentPosition === value}
      >
        {key} ({i + 1})
      </Button>
    {/each}
  </div>
</main>
