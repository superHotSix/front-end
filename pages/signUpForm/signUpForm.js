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

const SIGNUP_API = `/signUp`
const LOGIN_API="/login"



async function handleEvent(e){
e.preventDefault()

const userEmail = emailInput.value
const userName = nameInput.value
const userPassword = passwordInput.value
const userPasswordConfirmInput = passwordConfirmInput.value
const userAddress = addressInput.value + address2Input.value


if(userPassword.length > 8){
    alert('비밀번호는 8자 이상되어야 합니다.')
}
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

const res = await fetch(SIGNUP_API, {
    method: 'POST',
    headers:{
         'Content-Type': 'application/json',
    },
    body: dataJson
})


try {
    const response = await fetch(LOGIN_API);
    if (!response.ok) {
      alert('회원가입에 실패하였습니다.')
      throw new Error("err");
    }
    alert('회원가입에 성공하였습니다!')
    window.location.href = LOGIN_API;
    const html = await response.text();
    document.documentElement.innerHTML = html;
  } catch (e) {
    console.log(e);
  }


}

button.addEventListener("click", handleEvent)