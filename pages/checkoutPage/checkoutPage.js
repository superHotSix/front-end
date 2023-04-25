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
const productList = document.querySelectorAll('li.list-group-item span')
const CHECKOUT_API = `https://jsonplaceholder.typicode.com/users`

const userName = userNameInput.value
const userEmail = userEmailInput.value
const userPhone = userPhoneInput.value
const userAddress = userAddressInput.value


const PROMOTION_CODE = [{
    promotionCode : "WELCOME",
    promotionPrice : 2000
}, {
    promotionCode : "HAPPYNEWYEAR",
    promotionPrice : 3000}]

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
    const response = await fetch(CHECKOUT_API);
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
//상품가져오기 - 장바구니에서 결제로 넘어갈때, 상품에서 바로 결제로 넘어갈때
//총 결제금액


//프로모션 코드먹이기 - 프로모션 코드는 한번만
//어떠한 유저가 프로모션 코드썼다면 다음 결제때 쓴 프로모션 코드는 못씀, 다른 프로모션 코드는 쓸 수 있음<-백이랑 얘기해서 쓴 프로모션 코드는 유저에 넣어질 수 있도록
function onPromotionPrice(e) {
e.preventDefault();

// 프로모션 코드가 있는 요소 찾기
const nodes = Array.from(document.querySelectorAll('li.list-group-item'));
const index = nodes.findIndex(node => node.classList.contains('promotionCode'));

// 프로모션 코드가 이미 사용되었다면 알림
if (index >= 0) {
  alert('프로모션 코드는 하나만 사용가능합니다.');
  return;
}

// 프로모션 코드를 확인
let foundPromotion = false;
for (let i = 0; i < PROMOTION_CODE.length; i++) {
  if (PromotionRegisterInput.value === PROMOTION_CODE[i].promotionCode) {

    // 프로모션 코드가 올바르다면 장바구니에 할인 정보를 추가
    const promotionItem = nodes[nodes.length-1];
    const promoElement = document.createElement('li');
    promoElement.classList.add('list-group-item', 'promotionCode', 'd-flex', 'justify-content-between', 'bg-light');
    promoElement.innerHTML = `
      <div class="text-success">
        <h6 class="my-0">프로모션 코드</h6>
        <small>${PROMOTION_CODE[i].promotionCode}</small>
      </div>
      <span class="text-success">−${PROMOTION_CODE[i].promotionPrice.toLocaleString()}원</span>
    `;
    checkoutProduct.insertBefore(promoElement, promotionItem.previousSibling);

    foundPromotion = true;
    break;
  }
}
//맞는 프로모션 코드가 아니라면
if (!foundPromotion) {
  alert('올바르지 않은 프로모션 코드입니다.');
}
}


async function onCheckoutHandle(){


    try {
        const response = await fetch("/결제완료페이지");
        if (!response.ok) {
          throw new Error("err");
        }
        window.location.href = "/결제완료페이지";
        const html = await response.text();
        document.documentElement.innerHTML = html;
      } catch (e) {
        console.log(e);
      }

}

PromotionRegisterBtn.addEventListener("click", onPromotionPrice)
checkoutBtn.addEventListener("click", onCheckoutHandle)
BringsavedUsercheckbox.addEventListener("click", isChecked)