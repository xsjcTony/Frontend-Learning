declare const $: (selector: string) => {
  width (): number
  height (): number
  ajax (url: string, config: {}): void
}

$('.main').height()
$('.main').width()
