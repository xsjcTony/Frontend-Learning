import icon from './lnj.jpg'
import cssModule from './index.css'
import { addImage } from './custom'

const img = document.createElement('img')
img.src = icon
img.setAttribute('class', cssModule.size)
document.body.appendChild(img)

addImage()
