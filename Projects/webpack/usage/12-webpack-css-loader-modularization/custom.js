import icon from './lnj.jpg'

function addImage () {
  const img = document.createElement('img')
  img.src = icon
  img.setAttribute('class', 'size')
  document.body.appendChild(img)
}

export { addImage }
