<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  let props: SvelteHTMLElements["kbd"] & { value?: string } = $props();
</script>

<kbd
  class={[
    "pointer-events-none select-none rounded-sm border bg-zinc-50 p-1.5 font-medium font-mono shadow-sm text-sm",
    props.class,
  ]}
>
  {props.value}
</kbd>
