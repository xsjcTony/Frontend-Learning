const stringToNumber = (val: unknown): unknown => {
  if (typeof val !== 'string' || val === '') {
    return val
  }

  const float = +val

  return Number.isNaN(float) ? val : float
}


export {
  stringToNumber
}
