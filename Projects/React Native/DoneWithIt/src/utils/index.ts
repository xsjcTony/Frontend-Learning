const capitalize = (str: number | string): string =>
  `${str.toString().at(0)?.toUpperCase() ?? ''}${str.toString().slice(1)}`


export {
  capitalize
}
