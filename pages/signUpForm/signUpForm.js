//회원가입폼 post
//로그인 페이지 랜딩
//되면 localstorage 저장, 자동 로그인

const emailInput = document.getElemenyById("email")
const nameInput = document.getElemenyById("passwordInput")
const passwordInput = document.getElemenyById("passwordInput")
const passwordConfirmInput = document.getElemenyById("passwordConfirm")
const addressInput = document.getElemenyById("address")
const address2Input = document.getElemenyById("address2")
const button = document.getElementById("submitButton")

const API = `https://${window.location.hostname}:8190/api/register`



async function handleEvent(e){
e.preventDefault()

const userEmail = emailInput.value
const userName = nameInput.value
const userPassword = passwordInput.value
const userPasswordConfirmInput = passwordConfirmInput.value
const userAddress = addressInput.value + address2Input.value



if(userPassword != userPasswordConfirmInput){
    alert('비밀번호가 일치하지 않습니다.')
}

const newUserData = {
    userEmail,
    userName,
    userPassword,
    userAddress,
}

const dataJson = JSON.stringify(newUserData)

const res = await fetch(API, {
    method: 'POST',
    headers:{
         'Content-Type': 'application/json',
    },
    body: dataJson
})

if(res.status === 201){
    alert('회원가입에 성공하였습니다!')
    location.replace("로그인페이지")
}else{
    alert('회원가입에 실패하였습니다.')
}



}

button.addEventListener("click", handleEvent)