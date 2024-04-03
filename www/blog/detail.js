const baseUrl = 'http://127.0.0.1:3000'
const paramsObj = new URLSearchParams(location.search)
const aid = paramsObj.get('aid')
console.log(aid);
// user token
let token = 'Bearer ' + localStorage.getItem('token')

// get time diff
const getTimeAgo = (timeString) => {
    let now = moment();
    let createdAt = moment(timeString);
    let duration = moment.duration(now.diff(createdAt));

    let timeAgo = [];
    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();

    if (days > 0) {
        timeAgo.push(days + " day" + (days > 1 ? "s" : ""));
    }
    if (hours > 0) {
        timeAgo.push(hours + " hour" + (hours > 1 ? "s" : ""));
    }
    if (minutes > 0) {
        timeAgo.push(minutes + " min" + (minutes > 1 ? "s" : ""));
    }
    if (seconds > 0) {
        timeAgo.push(seconds + " sec" + (seconds > 1 ? "s" : ""));
    }

    return timeAgo.join(" ") + " ago";
}

const loadDetail = async () => {
    try {
        const url = baseUrl + '/api/front/articles/' + aid
        const response = await fetch(url, {
            method: 'GET'
        })
        const data = await response.json()
        document.querySelector('.article-title').innerHTML = `<h1>${data.data.title}</h1>`
        document.querySelector('.ibox p').innerHTML = data.data.content
    } catch (error) {
        console.log(error);
    }
}

loadDetail()

// Comment list
const loadCommentList = async () => {
    try {
        const url = baseUrl + '/api/front/comments/articles/' + aid
        const response = await fetch(url, {
            method: 'GET'
        })
        const data = await response.json()
        let commentArr = data.data.map(c => `
        <div class="social-feed-box">
            <div class="social-avatar">
                <a href="default.htm" class="pull-left">
                    <img alt="image" src="${baseUrl + c.reply_user_id.headImgUrl}" />
                </a>
                <div class="media-body">
                    <a href="#"> ${c.reply_user_id.nickname} </a>
                    <small class="text-muted">${getTimeAgo(c.updatedAt)}</small>
                </div>
            </div>
            <div class="social-body">
                <p>${c.content}</p>
            </div>
        </div>
        `)
        document.querySelector('.comment-list').innerHTML = commentArr
    } catch (error) {
        console.log(error);
    }
}

loadCommentList()

// post comment
const sendBtn = document.querySelector('.send-btn')
const sendIpt = document.querySelector('.send-ipt')
sendBtn.addEventListener('click', async () => {
    let content = sendIpt.value
    try {
        const url = baseUrl + '/api/front/comments'
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
        layer.msg(data.msg)
        loadCommentList()
    } catch (error) {
        console.log(error);
    }
})
