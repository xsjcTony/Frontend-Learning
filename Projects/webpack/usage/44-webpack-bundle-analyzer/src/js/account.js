import '../css/account.css'
import $ from 'jquery'
import _ from 'lodash'

const $div = $('<div></div>')
$div.text(_.join(['1', '2', '3'], '+'))
$('body').append($div)

