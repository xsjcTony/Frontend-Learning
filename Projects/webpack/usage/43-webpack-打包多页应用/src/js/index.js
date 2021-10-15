import '../css/index.css'
import $ from 'jquery'
import _ from 'lodash'
import FastClick from 'fastclick'

$(() => {
  FastClick.attach(document.body)
  
  const div = $('<div></div>')
  div.text(_.join([1, 2, 3], '+'))
  $('body').append(div)
})
