const idInput = document.getElementById("idInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("btn1");
const kakaoLoginBtn = document.getElementById("btn2");
const naverLoginBtn = document.getElementById("btn3");
const SignUpBtn = document.querySelector("#btn4");
const appleLoginBtn = document.getElementById("btn5");
const searchInput = document.getElementById("searchInput");
const TYPE_NONMEMBER = "nonMember";
const TYPE_MEMBER = "member";
const USER = "user";
const LOGIN_API = "/login";

localStorage.removeItem(USER);

async function onLoginSubmit(e) {
  e.preventDefault();

  const userEmail = idInput.value;
  const userPassword = passwordInput.value;

  const userData = {
    userEmail,
    userPassword,
  };

  fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error("로그인 실패");
    })
    .then((data) => {
      alert("로그인에 성공하였습니다.");

      const savedUserInLocalStorage = {
        userEmail: `${userData.userEmail}`,
        userName: data.data.userName,
        userType: TYPE_MEMBER,
      };

      saveUserLocalStorage(savedUserInLocalStorage);
      window.location.href = "../mainPage";

      console.log(data.userEmail);
      console.log(data.userAddress);
    })
    .catch((err) => {
      alert(err);
    });

  // } catch (e) {
  //   alert(e);
  // }
}

// local storage 유저 아이디 저장
function saveUserLocalStorage(savedUserInLocalStorage) {
  localStorage.setItem(USER, JSON.stringify(savedUserInLocalStorage));
}

let savedUser = localStorage.getItem(USER);
let savedUserObj = JSON.parse(savedUser);

// 로컬스토리지에 유저정보가 없을 때 - 기본 nonMember로 로컬스토리지 저장
if (savedUser === null) {
  savedUserDataInLocalStorage();
}

function savedUserDataInLocalStorage() {
  const savedUserInLocalStorage = {
    userType: TYPE_NONMEMBER,
  };

  localStorage.setItem(USER, JSON.stringify(savedUserInLocalStorage));
}

function savedUserCheck() {
  if (savedUser === null) {
    //로그인, 회원가입 버튼 보이기
  } else {
    //로그인, 회원가입 버튼 안보이게; 로그아웃, 마이페이지 보이게?
  }
}

loginBtn.addEventListener("click", onLoginSubmit);
// SignUpBtn.addEventListener("click",(async () => {
//   try {
//     const response = await fetch("/signUp");
//     if (!response.ok) {
//       throw new Error("err");
//     }
//     window.location.href = "/signUp";
//     const html = await response.text();
//     document.documentElement.innerHTML = html;
//   } catch (e) {
//     console.log(e);
//   }
// })
// )

SignUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../signUpForm/";
});

//카카오 연동하여 로그인하기
//https://tyrannocoding.tistory.com/49
//https://developers.kakao.com/console/app/896721

//네이버 연동하여 로그인하기
//https://developers.naver.com/docs/login/devguide/devguide.md#3-4-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%97%B0%EB%8F%99-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0

//apple 연동하여 로그인하기

//비회원 주문조회
//페이지 이동

//검색어 자동완성 기능
//https://velog.io/@1703979/JS-30-06 참고
