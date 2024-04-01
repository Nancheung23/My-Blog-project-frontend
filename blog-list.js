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

// click event for submit, editor.getHtml()
let sendBtn = document.querySelector('.send')
sendBtn.addEventListener('click', async () => {
    let content = editor.getHtml()
    let title = document.getElementById('a-title').value
    try {
        const url = baseURL + '/api/articles'
        // user token
        let token = 'Bearer ' + localStorage.getItem('token')
        if (token) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization' : token
                },
                body: JSON.stringify({content, title})
            })
            if (!response.ok) {
                throw new Error(`HTTP Error, status : ${response.status}`)
            }
            const data = await response.json()
            console.log(data);
            layer.msg(data.msg)
            document.querySelector(".form-control").value = ""
            editor.setHtml("")
        }
    } catch (error) {
        console.log(error);
    }
})