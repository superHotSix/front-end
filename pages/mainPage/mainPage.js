const loginCheck = document.querySelector(".login");

if (
  !JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(localStorage.getItem("user")).userType === "nonMember"
) {
  loginCheck.innerHTML = "Login";
  const myPage = document.querySelector(".myPage");
  myPage.addEventListener("click", () => {
    window.location.href = "../loginPage/";
  });
} else {
  loginCheck.innerHTML = "Logout";
  const myPage = document.querySelector(".myPage");
  myPage.addEventListener("click", () => {
    window.location.href = "../myPage/";
  });
}

loginCheck.addEventListener("click", () => {
  window.location.href = "../loginPage/";
});
