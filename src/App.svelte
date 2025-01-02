<script lang="ts">
  import Button from "./lib/components/Button.svelte";
  import KeyboardInput from "./lib/components/KeyboardInput.svelte";
  import { cameraPositions } from "./lib/constants";
  import { getRequestUrl } from "./lib/util";

  let currentPosition: number | undefined = $state();

  export function changeCameraPosition(position: number) {
    const url = getRequestUrl(position);
    fetch(url).catch((e) => console.error(`request to camera failed`));

    currentPosition = position;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!event.ctrlKey || isNaN(Number(event.key))) return;

    const validPositions = Object.values(cameraPositions);
    const key = Number(event.key);

    if (validPositions.includes(key)) {
      event.preventDefault();
      changeCameraPosition(key);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<button class="absolute top-6 right-6" aria-label="Einstellungen">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-6"
    ><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle
      cx="7"
      cy="7"
      r="3"
    /></svg
  >
</button>

<main class="text-center space-y-6 px-6">
  <h1 class="font-bold tracking-tighter text-zinc-900 text-2xl">KRS Studio</h1>
  <p class="leading-normal">
    Klicke auf einen der Buttons oder drücke <KeyboardInput value="Strg" />
    + <KeyboardInput value="Zahl" /> um die Position der Kamera zu ändern.
  </p>

  <div class="space-x-4 space-y-4">
    {#each Object.entries(cameraPositions) as [key, value]}
      <Button
        onclick={() => changeCameraPosition(value)}
        class="px-4 py-2 bg-zinc-800 font-medium text-white rounded-md enabled:hover:bg-zinc-700 disabled:bg-green-700 transition-colors"
        disabled={currentPosition === value}
      >
        {key} ({value})
      </Button>
    {/each}
  </div>
</main>
