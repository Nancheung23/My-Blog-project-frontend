const baseUrl = 'http://127.0.0.1:3000'
let pagenum = 1
let pagesize = 3

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

// load article list
const loadList = async () => {
    // params :{pagenum, pagesize }
    const url = baseUrl + '/api/front/articles' + `?pagenum=${pagenum}&pagesize=${pagesize}`
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        const data = await response.json()
        let articleArr = data.data.map(a => `
        <div class="ibox-content">
            <a href="./detail.html/aid=${v._id}" class="btn-link">
                <h2>
                ${a.title}
                </h2>
            </a>
            <div class="small m-b-xs">
                <strong>${a.author? a.author.nickname : ''}</strong>
                <span class="text-muted"
                ><i class="fa fa-clock-o"></i> ${getTimeAgo(a.updatedAt)}
                </span>
            </div>
            <p>
                ${a.content}
            </p>
            <div class="row">
                <div class="col-md-1"><i class="fa fa-eye"> </i> ${a.views} views</div>
                <div class="col-md-1">
                <i class="fa fa-comments-o"> </i> ${a.coms.length} comments
                </div>
                <!-- <div class="col-md-2">
                <button class="btn btn-primary btn-xs" type="button">
                    Apple Watch
                </button>
                </div> -->
            </div>
        </div>`)
        document.querySelector('.ibox').innerHTML = articleArr
    } catch (error) {
        console.log(error);
    }
}

loadList()

// load more evt
const loadMoreBtn = document.querySelector('.pager a')
loadMoreBtn.addEventListener('click', () => {
    pagenum++
    loadList()
})