const baseURL = 'http://127.0.0.1:3000'
//?aid=660bf3942c2a65b78d3f0b27
const aidObj = new URLSearchParams(location.search)
const aid = aidObj.get("aid");

// fetch article and update
const fetchArticle = async () => {
    try {
        let url = baseURL + '/api/articles/' + aid
        const response = await fetch(url, {
            method : 'GET',
        })
        const data = await response.json()
    } catch (error) {
        console.log(error);
    }
}
