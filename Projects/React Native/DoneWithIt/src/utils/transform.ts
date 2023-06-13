const stringToNumber = (val: string): number | string => {
  if (val === '') {
    return val
  }

  const float = +val

  return Number.isNaN(float) ? val : float
}


export {
  stringToNumber
}
