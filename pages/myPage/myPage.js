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

// user 정보 (데이터베이스로(백엔드)부터 받아오는 값)

const userName = "김종운";
const userEmail = "cdd@kakao.com";
const userPassword = "eliceFighting";
const userPhone = "010-1234-1234";
const userAddress = "부산시 광안대교";

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

saveBtn.addEventListener("click", () => {
  alert("저장이 완료되었습니다!");
  // DB 저장 관련 메서드, 함수
});
