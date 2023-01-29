<script lang="ts">
  let count = 0
  const increment = (): void => {
    count += 1
  }
</script>

<button on:click={increment}>
    count is {count}
</button>
