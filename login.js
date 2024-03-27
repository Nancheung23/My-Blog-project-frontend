const baseURL = "http://127.0.0.1:3000"

// get obj
let loginForm = document.querySelector('.login-form')
let ipts = document.querySelectorAll('input')

// resolve login
const fetchLogin = async (url, info) => {
    try {
        const quest = url + '?' + new URLSearchParams(info).toString()
        const response = await fetch(quest, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        })
        if(!response.ok) {
            throw new Error(`HTTP Error, status : ${response.status}`)
        }
        const data = await response.json()
        if(data.code == 1) {
            // get info and set into localstorage --> login with info
            localStorage.setItem('username', data.username)
            localStorage.setItem('nickname', data.nickname)
            localStorage.setItem('uid', data.uid)
            localStorage.setItem('headImgUrl', data.headImgUrl)
            localStorage.setItem('token', data.token)
            // direct to mainpage
            setTimeout(() => {
                location.href = './blog-list.html'
            }, 1000)
        }
    } catch (error) {
        console.log(error);
    }
}

// login event
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let username = ipts[0].value
    let password = ipts[1].value
    let loginApi = `${baseURL}/api/users`
    await fetchLogin(loginApi, { username, password })
})