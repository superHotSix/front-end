//회원가입폼 post
//로그인 페이지 랜딩
//되면 localstorage 저장, 자동 로그인

const emailInput = document.getElementById("email");
const nameInput = document.getElementById("passwordInput");
const passwordInput = document.getElementById("passwordInput");
const passwordConfirmInput = document.getElementById("passwordCofirm");
const addressInput = document.getElementById("address");
const address2Input = document.getElementById("address2");
const button = document.getElementById("submitButton");
const userPhoneInput = document.querySelector("#userPhone");

const SIGNUP_API = "/signUp";
const LOGIN_API = "/login";

async function handleEvent(e) {
  e.preventDefault();

  const userEmail = emailInput.value;
  const userName = nameInput.value;
  const userPassword = passwordInput.value;
  const userPasswordConfirmInput = passwordConfirmInput.value;
  const userAddress = addressInput.value + address2Input.value;
  const userPhone = userPhoneInput.value;

  if (userPassword !== userPasswordConfirmInput) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (userPassword.length > 8) {
    alert("비밀번호는 8자 이상되어야 합니다.");
    return;
  }

  const newUserData = {
    userEmail,
    userName,
    userPassword,
    userAddress,
    userPhone,
  };

  const dataJson = JSON.stringify(newUserData);

  try {
    const response = await fetch(SIGNUP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    alert("회원가입에 성공하였습니다.");
    window.location.href = "../loginPage/";
  } catch (e) {
    alert(e);
  }
}

button.addEventListener("click", handleEvent);
