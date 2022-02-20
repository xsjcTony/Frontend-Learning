/*
interface Square {
  kind: 'square'
  x: number
}
interface Rectangle {
  kind: 'rectangle'
  x: number
  y: number
}
interface Circle {
  kind: 'circle'
  radius: number
}

type Shape = Square | Rectangle | Circle

function area(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.x ** 2
    case 'rectangle':
      return s.x * s.y
    case 'circle':
      return Math.PI * (s.radius ** 2)
  }
}
*/
