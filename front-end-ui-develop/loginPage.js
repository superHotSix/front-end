const idInput = document.getElementById("idInput")
const passwordInput = document.getElementById("passwordInput")
const loginBtn = document.getElementById("btn1")
const kakaoLoginBtn = document.getElementById("btn2")
const naverLoginBtn = document.getElementById("btn3")
const SingUpBtn = document.getElementById("btn4")
const appleLoginBtn = document.getElementById("btn5")
const searchInput = document.getElementById("searchInput")



//검색어 자동완성 기능
//https://velog.io/@1703979/JS-30-06 참고


// 로그인 폼 제출
// 아이디 15자 이내, 비밀번호 24자 이내, 
//아이디는 영소문자와 숫자로 이루어질것, 비밀번호는 영소대문자, 숫자, 특수문자로 이루어질것

function onLoinSubmit(event){
    event.preventDefault();
    const id = idInput.value;
    const password = passwordInput.value;

    if(id.length > 15){
        confirm("id 15보다 작게 입력")
    }

    if(password.length > 15){
        confirm("password 15보다 작게 입력")
    }
  
}

loginBtn.addEventListener("click",onLoinSubmit)

//카카오 연동하여 로그인하기
//https://tyrannocoding.tistory.com/49
//https://developers.kakao.com/console/app/896721

//네이버 연동하여 로그인하기
//https://developers.naver.com/docs/login/devguide/devguide.md#3-4-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%97%B0%EB%8F%99-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0

//apple 연동하여 로그인하기
