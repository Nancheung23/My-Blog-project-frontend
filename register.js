const baseURL = "http://127.0.0.1:3000"
// select all inputs
let formIpt = document.querySelectorAll('.form-control')

let headImgUrl
// solve upload
const fetchUpload = async (url, formData) => {
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })
    if (!response.ok) {
        throw new Error(`HTTP Error, status : ${response.status}`)
    }
    const data = await response.json()
    headImgUrl = data.data
}
// upload headImg
formIpt[3].addEventListener('change', (e) => {
    e.preventDefault()
    let file = e.target.files[0]
    console.log(file)
    let uploadAPI = `${baseURL}/api/upload`
    let formData = new FormData()
    formData.append('img', file)
    fetchUpload(uploadAPI, formData)
})

const fetchRegister = async (url, info) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        })
        if (!response.ok) {
            throw new Error(`HTTP Error, status : ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}

// solve submit register
const regForm = document.querySelector('.reg-form')
regForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // upload info
    let username = formIpt[0].value
    let nickname = formIpt[1].value
    let password = formIpt[2].value

    let response = await fetchRegister(`${baseURL}/api/users`, { username, nickname, password, headImgUrl })
    console.log(response);
    layer.msg(response.msg)
    if (response.code == 1) {
        setTimeout(() => {
            location.href = './login.html'
        }, 1000)
    }
})
