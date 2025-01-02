<script lang="ts">
  export let onClick: () => void;
</script>

<button
  on:click={onClick}
  class="px-4 py-2 bg-zinc-800 font-medium text-white rounded-md transition-colors hover:bg-zinc-700"
>
  <slot />
</button>
