const idInput = document.getElementById("idInput")
const passwordInput = document.getElementById("passwordInput")
const loginBtn = document.getElementById("btn1")
const kakaoLoginBtn = document.getElementById("btn2")
const naverLoginBtn = document.getElementById("btn3")
const SingUpBtn = document.getElementById("btn4")
const appleLoginBtn = document.getElementById("btn5")






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