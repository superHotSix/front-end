const userInfo = document.querySelector(".userInfo");
const userCart = document.querySelector(".userCart");
const contact = document.querySelector(".contact");
const userInfoForm = document.querySelector(".userInfoForm");
const contactForm = document.querySelector("#contact");
const userCartForm = document.querySelector(".userCartForm");

const saveBtn = document.querySelector(".saveBtn");

// value 용 input 값
// 사용법: userNameInput.value = ...;
const userNameInput = document.querySelector("#userName");
const userEmailInput = document.querySelector("#userEmail");
const userPasswordInput = document.querySelector("#userPassword");
const userAddressInput = document.querySelector("#userAddress");
const userPhoneInput = document.querySelector("#userPhoneInput");

// Mock-Up Data
// const userName = "김종운";
// const userEmail = "cdd@kakao.com";
// const userPassword = "eliceFighting";
// const userPhone = "010-1234-1234";
// const userAddress = "부산시 광안대교";

// GET 요청을 통해 URL 접근시 곧바로 백엔드로부터 받아오는 기존 데이터 값
// 이때 장바구니 같은 경우 로컬스토리지에서 가져오는 것이 좋을 것 같음
// 혹은 마이페이지 옵션들을 각각 라우팅 처리하여 여러 POST 요청을 할 수 있도록 해야 할 것 같음
fetch("/myPage")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Network response was not ok");
    }
  })
  .then((data) => {
    data.userName = userNameInput.value;
    data.userEmail = userEmailInput.value;
    data.userPassword = userPasswordInput.value;
    data.userAddress = userAddressInput.value;
    data.userPhone = userPhoneInput.value;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

userInfo.addEventListener("click", (e) => {
  e.preventDefault();

  contactForm.style.display = "none";
  userCartForm.style.display = "none";
  userInfoForm.style.display = "block";

  userNameInput.value = userName;
  userEmailInput.value = userEmail;
  userPasswordInput.value = userPassword;
  userAddressInput.value = userAddress;
  userPhoneInput.value = userPhone;
});

userCart.addEventListener("click", (e) => {
  e.preventDefault();
  userInfoForm.style.display = "none";
  userCartForm.style.display = "block";
  contactForm.style.display = "none";
});

contact.addEventListener("click", (e) => {
  e.preventDefault();

  userInfoForm.style.display = "none";
  userCartForm.style.display = "none";
  contactForm.style.display = "flex";
});

userPhoneInput.addEventListener("input", function () {
  const value = userPhoneInput.value.replace(/\D/g, ""); // 입력된 숫자 이외의 문자 모두 제거
  const regex = /^([0-9]{2,3})([0-9]{3,4})([0-9]{4})$/;
  const groups = regex.exec(value);

  if (groups) {
    const tel = groups[1] + "-" + groups[2] + "-" + groups[3];
    userPhoneInput.value = tel;
  } else {
    userPhoneInput.value = value;
  }
});

async function saveInfo() {
  const saveInfo = {
    userName: userNameInput.value,
    userEmail: userEmailInput.value,
    userPassword: userPasswordInput.value,
    userAddress: userAddressInput.value,
    userPhone: userPhoneInput.value,
  };
  fetch("/myPage", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveInfo),
  })
    .then((response) => {
      if (response.ok) {
        alert("저장이 완료되었습니다");
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then(() => {
      alert("저장 성공 !");
    });
} // SAVE Button을 눌렀을 때, Json 형식으로 백엔드에 데이터들을 보내줌, POST 방식

saveBtn.addEventListener("click", saveInfo);
