<script lang="ts">
  import Button from "./lib/components/Button.svelte";
  import KeyboardInput from "./lib/components/KeyboardInput.svelte";
  import Input from "./lib/components/settings/Input.svelte";
  import SettingsButton from "./lib/components/settings/TriggerButton.svelte";
  import { cameraPositions } from "./lib/constants";
  import { configSchema, type Config, type Position } from "./lib/types";
  import { moveCamera, saveConfig } from "./lib/util";

  let currentPosition: number | undefined = $state();
  let positionInputs: number = $state(0);

  let dialog: HTMLDialogElement | null = null;

  function handleCameraPositionChange(position: number) {
    currentPosition = position;

    moveCamera(position);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!event.ctrlKey || !/^[0-9]$/.test(event.key)) return;

    const validPositions = Object.values(cameraPositions);
    const key = Number(event.key);

    if (validPositions.includes(key)) {
      event.preventDefault();
      handleCameraPositionChange(key);
    }
  }

  function handleSaveSettings(event: Event) {
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    );
    const positions: Position[] = [];

    // Find the highest index to know how many positions to process
    const maxPositionIndex = Math.max(
      ...Object.keys(formData)
        .map((key) => key.match(/positions\[(\d+)\]/)?.[1])
        .filter(Boolean)
        .map(Number)
    );

    // Build the positions array
    for (let i = 0; i <= maxPositionIndex; i++) {
      const name = formData[`positions[${i}].name`];
      const position = formData[`positions[${i}].position`];

      if (name && position) {
        positions.push({ name: name as string, position: Number(position) });
      }
    }

    const result = configSchema.safeParse({ ip: formData.ip, positions });

    if (result.success) {
      saveConfig(result.data);
    } else {
      console.error(result.error);
      alert("Ein Fehler ist aufgetreten.");
    }
  }

  function openSettings() {
    dialog?.showModal();
  }

  function closeSettings() {
    dialog?.close();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<SettingsButton onclick={openSettings} />

<dialog
  class="shadow-sm p-6 border max-w-md w-full rounded-sm backdrop:bg-black/50 backdrop:backdrop-blur-xs relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  bind:this={dialog}
>
  <div class="flex justify-between items-center">
    <h2 class="font-bold text-lg">Einstellungen</h2>
    <button class="text-sm text-zinc-500" onclick={closeSettings}
      >Schließen</button
    >
  </div>

  <div class="mt-4">
    <form onsubmit={handleSaveSettings} autocomplete="off" class="space-y-6">
      <div>
        <label for="ip" class="text-sm font-medium">Kamera IP</label>
        <Input
          id="ip"
          name="ip"
          type="text"
          class="w-full mt-1"
          required
          autofocus
        />
      </div>

      <div>
        <p class="text-sm font-medium">Kamera Positionen</p>

        {#each Array.from({ length: positionInputs }) as _, i}
          <div class="my-2 flex space-x-2">
            <Input
              type="text"
              class="w-2/3"
              placeholder="Name"
              name="positions[{i}].name"
              required
            />
            <Input
              type="number"
              min="0"
              class="w-1/3"
              placeholder="Position"
              name="positions[{i}].position"
              required
            />
          </div>
        {/each}

        <button
          type="button"
          class="mt-2 bg-zinc-100 ring ring-zinc-200 w-full text-sm font-medium rounded-md px-4 py-2"
          onclick={() => (positionInputs += 1)}
        >
          + Hinzufügen
        </button>
      </div>

      <div class="mt-6 flex justify-end">
        <Button class="text-sm" type="submit">Speichern</Button>
      </div>
    </form>
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
        onclick={() => handleCameraPositionChange(value)}
        class="px-4 py-2 bg-zinc-800 font-medium text-white rounded-md enabled:hover:bg-zinc-700 disabled:bg-sky-600 transition-colors"
        disabled={currentPosition === value}
      >
        {key} ({i + 1})
      </Button>
    {/each}
  </div>
</main>
