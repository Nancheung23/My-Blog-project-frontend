const baseURL = "http://127.0.0.1:3000"
// get localStorage
let username = localStorage.getItem('username')
let nickname = localStorage.getItem('nickname')
let headImgUrl = localStorage.getItem('headImgUrl')

// names, headimg
let headImg = document.querySelector('.social-avatar img')
headImg.src = baseURL + '/' + headImgUrl

let usernameA = document.querySelector('.social-avatar .media-body a')
usernameA.innerHTML = `username : ${username}`

let nicknameA = document.querySelector('.social-avatar .media-body small')
nicknameA.innerHTML = `nickname : ${nickname}`