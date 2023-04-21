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
const listGroupItem = document.querySelectorAll(".list-group-item")
const checkoutProduct = document.querySelector("ul.checkoutProduct")
const promotionCode = document.querySelector("li.promotionCode")

const userName = userNameInput.value
const userEmail = userEmailInput.value
const userPhone = userPhoneInput.value
const userAddress = userAddressInput.value


const PROMOTION_CODE = {
    promotionCode : "WELCOME",
    promotionPrice : 2000
}

//비회원이면 해당 체크박스 안보임
const savedUser = localStorage.getItem("user");
let savedUserObj = JSON.parse(savedUser);
if(savedUserObj.userType === "nonMember"){
    formCheckIfMember.classList.add("hidden")
}else{
    formCheckIfMember.classList.remove("hidden")
}

//체크박스 체크여부 - 정보가져오기
async function isChecked() {
 if(BringsavedUsercheckbox.checked){
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    //상품 json 받아왔을때, 받는거 실패했을때 나눠어서 error처리 추가
    const users = await response.json();
    const rightUser = users.filter((user) => user.email === savedUserObj.userEmail)

    const userName = rightUser[0].name
    const userEmail = rightUser[0].email
    const userPhone = rightUser[0].phone
    const userAddress = rightUser[0].userAddress

    userPhoneInput.setAttribute("value", userPhone)
    userNameInput.setAttribute("value", userName)
    userEmailInput.setAttribute("value", userEmail)
    userAddressInput.setAttribute("value", userAddress)
   
 }else{
    const result = '';
    userPhoneInput.setAttribute("value", result)
    userNameInput.setAttribute("value", result)
    userEmailInput.setAttribute("value", result)
    userAddressInput.setAttribute("value", result)

 }
}
//상품가져오기 - 장바구니 참고해서 짜기

//프로모션 코드먹이기 - 프로모션 코드는 한번만
function onPromotionPrice(e){
    e.preventDefault()
    if(PromotionRegisterInput.value === PROMOTION_CODE.promotionCode){
        for(i = 0; i < listGroupItem.length; i++){
            for(j = 0; j < 5; j++){
                if(listGroupItem.classList[j] === 'promotionCode'){
                    alert("프로모션 코드가 이미 적용되었습니다.")
                }else{
                    checkoutProduct.innerHTML += `<li class="list-group-item promotionCode d-flex justify-content-between bg-light">
                    <div class="text-success">
                      <h6 class="my-0">프로모션 코드</h6>
                      <small>${PROMOTION_CODE.promotionCode}</small>
                    </div>
                    <span class="text-success">−${PROMOTION_CODE.promotionPrice.toLocaleString()}원</span>
                  </li>`
                }
                
        
            }
        }
    }else{
        alert("올바르지 않은 프로모션 코드입니다.")

        }
       
    }
        
      

function onCheckoutHandle(){


}

PromotionRegisterBtn.addEventListener("click", onPromotionPrice)
checkoutBtn.addEventListener("click", onCheckoutHandle)
BringsavedUsercheckbox.addEventListener("click", isChecked)