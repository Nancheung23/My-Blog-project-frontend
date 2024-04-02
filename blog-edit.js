const baseURL = 'http://127.0.0.1:3000'
//?aid=660bf3942c2a65b78d3f0b27
const aidObj = new URLSearchParams(location.search)
const aid = aidObj.get("aid");
console.log(aid);
// user token
let token = 'Bearer ' + localStorage.getItem('token')

// fetch article and update
const fetchArticle = async () => {
    try {
        let url = baseURL + '/api/articles/' + aid
        const response = await fetch(url, {
            method: 'GET',
        })
        const data = await response.json()
        layer.msg(data.msg)
        // console.log(data.data);
        // Title
        let ipt = document.querySelector('input')
        ipt.value = data.data.title
        // content
        editor.setHtml(data.data.content)
    } catch (error) {
        console.log(error);
    }
}
fetchArticle()

// Save function
const saveBtn = document.getElementById('save')
saveBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let title = document.querySelector('input').value
    let content = editor.getHtml()
    try {
        const url = baseURL + '/api/articles/' + aid
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, title })
        })
        const data = await response.json()
        layer.msg(data.msg)
        // location.href = './blog-list.html'
    } catch (error) {
        console.log(error);
    }
})

// post comment
const sendBtn = document.querySelector('.send-btn')
const sendIpt = document.querySelector('.send-ipt')
sendBtn.addEventListener('click', async () => {
    let content = sendIpt.value
    try {
        const url = baseURL + '/api/comments'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article_id: aid, content })
        })
        const data = await response.json()
        console.log(data);
        // clear input
        sendIpt.value = ''
        loadCommentList()
    } catch (error) {
        console.log(error);
    }
})

// load comment list
const loadCommentList = async () => {
    try {
        const url = baseURL + '/api/comments/articles/' + aid
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        const data = await response.json()
        // map comments
        let commentArr = data.data.map(v => `
            <div class="social-feed-box">
            <div class="social-avatar">
                <a href="#" class="pull-left">
                <img alt="image" src="${baseURL + v.reply_user_id.headImgUrl}" />
                </a>
                <div class="media-body">
                <a href="#">${v.reply_user_id.nickname}</a>
                <small class="text-muted">${moment(v.createdAt).fromNow()}</small>
                </div>
            </div>
            <div class="social-body">
                <p>${v.content}</p>
            </div>
            <div class="social-footer">
                <button type="button" class="btn btn-danger del" data-id="${v._id}">Delete</button>
            </div>
            </div>`)
        document.querySelector('.com-list').innerHTML = commentArr
    } catch (error) {
        console.log(error);
    }
}
loadCommentList()

// delete comment
const comList = document.querySelector('.com-list')
comList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del')) {
        let cid = e.target.dataset.id
        console.log(cid);
        try {
            const url = baseURL + '/api/comments/' + cid
            const response = await fetch(url, {
                method : 'DELETE',
                headers : {
                    'Authorization': token,
                }, 
            })
            const data = await response.json()
            layer.msg(data.msg)
            loadCommentList()
        } catch (error) {
            console.log(error);
        }
    }
})