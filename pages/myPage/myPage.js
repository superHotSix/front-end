const userInfo = document.querySelector(".userInfo");
const userCart = document.querySelector(".userCart");
const contact = document.querySelector(".contact");
const userInfoForm = document.querySelector(".userInfoForm");
const contactForm = document.querySelector("#contact");

const userNameInput = document.querySelector("#userName");
const userEmailInput = document.querySelector("#userEmail");
const userPasswordInput = document.querySelector("#userPassword");
const userPhoneInput = document.querySelector("#userPhone");
const userAddressInput = document.querySelector("#userAddress");

// user 정보 (받아오는 값)
const userName = "김종운";
const userEmail = "cdd@kakao.com";
const userPassword = "eliceFighting";
const userPhone = 010;
const userAddress = "부산시 광안대교";

userInfo.addEventListener("click", (e) => {
  e.preventDefault();
  if (userInfoForm.style.display === "none") {
    contactForm.style.display = "none";
    userInfoForm.style.display = "flex";
  } else userInfoForm.style.display = "none";

  userNameInput.value = userName;
  userEmailInput.value = userEmail;
  userPasswordInput.value = userPassword;
  userPhoneInput.value = userPhone;
  userAddressInput.value = userAddress;
});

userCart.addEventListener("click", () => {
  alert("개인정보 변경");
});

contact.addEventListener("click", (e) => {
  e.preventDefault();
  if (contactForm.style.display === "none") {
    contactForm.style.display = "flex";
    userInfoForm.style.display = "none";
  } else contactForm.style.display = "none";
});
