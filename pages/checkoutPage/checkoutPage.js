//장바구니 상품 상품이름, 간략설명, 이미지, 수량, 가격 가져오기
//배송지 정보가 회원정보랑 동일? 체크- 해당 정보 로컬스토리지에서 가져와 그대로 입력
//비회원이면 해당 체크박스 hidden
//프로모션 코드 먹이기

const checkoutBtn = document.getElementById("checkoutBtn")
const userPhoneInput = document.getElementById("userPhone")
const userEmailInput = document.getElementById("userEmail")
const userNameInput = document.getElementById("userName")
const userAddressInput = document.getElementById("address")
const userAddress2Input = document.getElementById("address2")
const formCheckIfMember = document.getElementById("formCheckIfMember")
const BringsavedUsercheckbox = document.getElementById("save-info")
const PromotionRegisterInput = document.getElementById("PromotionRegisterInput")
const PromotionRegisterBtn = document.getElementById("PromotionRegisterBtn")
const checkoutProduct = document.querySelector("ul.checkoutProduct")

const userName = userNameInput.value
const userEmail = userEmailInput.value
const userPhone = userPhoneInput.value
const userAddress = userAddressInput.value + " " + userAddress2Input.value


const PROMOTION_CODE = {
    promotionCode : "WELCOME",
    promotionPrice : 2000
}

//saveUserLocalStorage()

//비회원이면 해당 체크란 안보임
/*function saveUserLocalStorage(){
    localStorage.setItem("userEmail", userData.userEmail)
   }

const savedUser = localStorage.getItem("userEmail");

if(savedUser === null){
    formCheckIfMember.classList.add("hidden")
}*/

//체크박스 체크여부 - 정보가져오기
function isChecked() {
 if(BringsavedUsercheckbox.checked){
    var result = '성공';
    userAddressInput.setAttribute("value", result)
   
 }else{
    var result = '';
    userAddressInput.setAttribute("value", result)

 }
}

//프로모션 코드먹이기
function onPromotionPrice(e){
    e.preventDefault()
    if(PromotionRegisterInput.value === PROMOTION_CODE.promotionCode){
        checkoutProduct.innerHTML = `<li class="list-group-item d-flex justify-content-between bg-light">
        <div class="text-success">
          <h6 class="my-0">프로모션 코드</h6>
          <small>WELCOME</small>
        </div>
        <span class="text-success">−${PROMOTION_CODE.promotionPrice}</span>
      </li>`
      
        console.log("성공")
    }

}

function onCheckoutHandle(){


}

PromotionRegisterBtn.addEventListener("click", onPromotionPrice)
checkoutBtn.addEventListener("click", onCheckoutHandle)
BringsavedUsercheckbox.addEventListener("click", isChecked)