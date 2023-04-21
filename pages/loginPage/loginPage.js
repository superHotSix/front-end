const idInput = document.getElementById("idInput")
const passwordInput = document.getElementById("passwordInput")
const loginBtn = document.getElementById("btn1")
const kakaoLoginBtn = document.getElementById("btn2")
const naverLoginBtn = document.getElementById("btn3")
const SingUpBtn = document.getElementById("btn4")
const appleLoginBtn = document.getElementById("btn5")
const searchInput = document.getElementById("searchInput")

async function onLoinSubmit(e) {
    e.preventDefault
    
    const userEmail = idInput.value;
    const userPassword = passwordInput.value;

    const userData = {
      userEmail,
      userPassword
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    //json 받아왔을때, 받는거 실패했을때 나눠어서 error처리 추가
    const users = await response.json();
    const rightUser = users.filter((user) => user.email === userData.userEmail)
    
    if(rightUser[0] && rightUser[0].name === userData.userPassword){
    alert("로그인에 성공하였습니다.")
    localStorage.removeItem("user")

    const savedUserInLocalStorage = {
      userEmail : `${rightUser[0].email}`,
      userType : "member"
    }

    saveUserLocalStorage(savedUserInLocalStorage)
    
    }else if(rightUser[0] && rightUser[0].name !== userData.userPassword){
      alert("비밀번호가 일치 하지 않습니다.")
    }else{
      alert("아이디가 일치 하지 않습니다.")
    }
   }


//local storage 유저 아이디 저장 
function saveUserLocalStorage(savedUserInLocalStorage){
  localStorage.setItem("user", JSON.stringify(savedUserInLocalStorage))
 }
  
let savedUser = localStorage.getItem("user");
let savedUserObj = JSON.parse(savedUser)

//로컬스토리지에 유저정보가 없을때 - 기본 nonMember로 로컬스토리지 저장
if(savedUser === null){
savedUserDataInLocalStorage()
}

function savedUserDataInLocalStorage(){
  const savedUserInLocalStorage = {
    userType : "nonMember"
  }
  
  localStorage.setItem("user", JSON.stringify(savedUserInLocalStorage))
  }




function savedUserCheck(){
  if(savedUser === null){
    //로그인, 회원가입 버튼 보이기
  }else{
    //로그인, 회원가입 버튼 안보이게; 로그아웃, 마이페이지 보이게?
  }

}


loginBtn.addEventListener("click",onLoinSubmit)


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