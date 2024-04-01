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
            console.log({ content, title });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ content, title })
            })
            if (!response.ok) {
                throw new Error(`HTTP Error, status : ${response.status}`)
            }
            const data = await response.json()
            console.log(data);
            layer.msg(data.msg)
            document.querySelector(".form-control").value = ""
            editor.setHtml("")
            // refresh blog list
            loadBlogList()
        }
    } catch (error) {
        console.log(error);
    }
})

// show blog list
const loadBlogList = async () => {
    let uid = localStorage.getItem('uid')
    if (uid) {
        const url = baseURL + '/api/articles/users/' + uid
        try {
            const response = await fetch(url, {
                method: 'GET',
            })
            const data = await response.json()
            let trArr = data.data.map(v => `
            <tr class="gradeX">
            <td><a href="#">${v.title}</a></td>
            <td>${moment(v.createdAt).format('YYYY-MM-DD h:mm:ss a')}</td>
            <td class="center">${moment(v.updatedAt).format('YYYY-MM-DD h:mm:ss a')}</td>
            <td class="center">${v.views}</td>
            <td class="center">${v.coms}</td>
            <td class="center">
            <button type="button" class="btn btn-danger">Delete</button>
            </td>
            <td class="center">
            <a href="blog-edit.html" type="button" class="btn btn-danger">Modify</a>
            </td>
        </tr>`)
            document.querySelector("tbody").innerHTML = trArr.join("")
        } catch (error) {
            console.log(error);
        }
    }
}

// while direct page
loadBlogList()