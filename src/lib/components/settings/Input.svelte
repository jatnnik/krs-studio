<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  let { ...props }: HTMLInputAttributes = $props();
</script>

<input
  {...props}
  class={["border-zinc-500 border-2 rounded-md focus-visible:ring-0", props.class]}
/>
