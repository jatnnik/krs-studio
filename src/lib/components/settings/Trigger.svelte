<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let props: HTMLButtonAttributes = $props();
</script>

<button {...props} class={["absolute top-6 right-6", props.class]} aria-label="Einstellungen">
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
