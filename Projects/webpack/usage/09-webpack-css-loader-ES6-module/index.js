// const icon = require('./lnj.jpg')
// const _ = require('./index.css')
import icon from './lnj.jpg'
import './index.css'

const img = document.createElement('img')
img.src = icon
img.setAttribute('class', 'size')
document.body.appendChild(img)
