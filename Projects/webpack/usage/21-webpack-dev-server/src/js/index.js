import $ from 'jquery'

$.get('/user', function (result) {
  console.log(result)
})

$.get('/login', function (result) {
  console.log(result)
})