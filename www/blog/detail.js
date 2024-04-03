const baseUrl = 'http://127.0.0.1:3000'
const paramsObj = new URLSearchParams(location.search)
const aid = paramsObj.get('aid')
console.log(aid);

const loadDetail = async () => {
    try {
        const url = baseUrl + '/api/front/articles/' + aid
        const response = await fetch(url, {
            method : 'GET'
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

loadDetail()