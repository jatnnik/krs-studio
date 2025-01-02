<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let { onclick, ...props }: HTMLButtonAttributes = $props();
</script>

<button
  {...props}
  onclick={onclick}
  class={["px-4 py-2 bg-zinc-800 font-medium text-white rounded-md enabled:hover:bg-zinc-700 disabled:bg-green-700 transition-colors", props.class]}
>
  {@render props.children?.()}
</button>
