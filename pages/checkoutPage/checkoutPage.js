//장바구니 상품 상품이름, 간략설명, 이미지, 수량, 가격 가져오기
//배송지 정보가 회원정보랑 동일? 체크- 해당 정보 로컬스토리지에서 가져와 그대로 입력
//비회원이면 해당 체크박스 hidden
//프로모션 코드 먹이기

const checkoutBtn = document.getElementById("checkoutBtn");
const userPhoneInput = document.getElementById("userPhone");
const userEmailInput = document.getElementById("userEmail");
const userNameInput = document.getElementById("userName");
const userAddressInput = document.getElementById("address");
const userAddress2Input = document.getElementById("address2");
const formCheckIfMember = document.getElementById("formCheckIfMember");
const nonMemberOderCheck = document.getElementById("nonMemberOderCheck");
const BringsavedUsercheckbox = document.getElementById("save-info");
const PromotionRegisterInput = document.getElementById(
  "PromotionRegisterInput"
);
const PromotionRegisterBtn = document.getElementById("PromotionRegisterBtn");
//const checkoutProduct = document.querySelector("ul.checkoutProduct")
const productList = document.querySelector(".checkoutProduct");
const creditChekout = document.getElementById("credit");
const kakaoPayCheckout = document.getElementById("kakaoPay");
const accountTransCheckout = document.getElementById("accountTrans");
const creditInput = document.querySelector(".gy-3");
const accountTransNoticeadded = document.querySelector(
  "#accountTransNoticeAdded"
);
const allProductCountInput = document.querySelector(
  ".badge.bg-primary.rounded-pill"
);

const CHECKOUT_API = `https://jsonplaceholder.typicode.com/users`;

let allProductCount = 0;

const PROMOTION_CODE = [
  {
    promotionCode: "WELCOME",
    promotionPrice: 2000,
  },
  {
    promotionCode: "HAPPYNEWYEAR",
    promotionPrice: 3000,
  },
];

//비회원이면 해당 체크박스 안보임
const savedUser = localStorage.getItem("user");
let savedUserObj = JSON.parse(savedUser);
if (!savedUser || savedUserObj.userType === "nonMember") {
  formCheckIfMember.classList.add("hidden");
  const nonMemberOrderFind = `
  <label for="orderPassword" class="form-label">주문조회를 위한 비밀번호를 입력해주세요.</label>
  <input type="password" class="form-control" id="orderPassword" placeholder="password" required>
  <div class="invalid-feedback">
    Please enter your password for order.
  </div>`;
  nonMemberOderCheck.innerHTML = nonMemberOrderFind;
} else {
  formCheckIfMember.classList.remove("hidden");
}

//체크박스 체크여부 - 정보가져오기
async function isChecked() {
  if (BringsavedUsercheckbox.checked) {
    const response = await fetch(CHECKOUT_API);
    //상품 json 받아왔을때, 받는거 실패했을때 나눠어서 error처리 추가
    const users = await response.json();
    const rightUser = users.filter(
      (user) => user.email === savedUserObj.userEmail
    );

    const userName = rightUser[0].name;
    const userEmail = rightUser[0].email;
    const userPhone = rightUser[0].phone;
    const userAddress = rightUser[0].userAddress;

    userPhoneInput.setAttribute("value", userPhone);
    userNameInput.setAttribute("value", userName);
    userEmailInput.setAttribute("value", userEmail);
    userAddressInput.setAttribute("value", userAddress);
  } else {
    const result = "";
    userPhoneInput.setAttribute("value", result);
    userNameInput.setAttribute("value", result);
    userEmailInput.setAttribute("value", result);
    userAddressInput.setAttribute("value", result);
  }
}

//상품가져오기 - 장바구니에서 결제로 넘어갈때, 상품에서 바로 결제로 넘어갈때
//객체로 보낼 상품 정보 저장하기
let total = 0;
let productCart = JSON.parse(localStorage.getItem("productCart"));

class Products {
  constructor(productName, productPrice, productQuantity) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
  }
}

for (let i = 0; i < productCart.length; i++) {
  const productName = productCart[i][1];
  const productPrice = productCart[i][4];
  const productQuantity = productCart[i][2];

  const product = `<div>
  <li class="list-group-item d-flex justify-content-between">
    <div>
      <h6 class="my-0">${productCart[i][1]}</h6>
      <small class="text-muted">구매수량: ${
        productCart[i][2]
      }개, 상품가: ${productCart[i][4].toLocaleString()}원</small>
    </div>
  <span class="text-muted">${productCart[i][3].toLocaleString()}원</span>
  </li>`;

  const perProduct = new Products(productName, productPrice, productQuantity);
  productList.innerHTML += product;
  total += productCart[i][3];
}

if (!productCart) {
  allProductCount = 0;
} else {
  allProductCount = productCart.length;
  allProductCountInput.innerText = allProductCount;
}

//프로모션 코드먹이기 - 프로모션 코드는 한번만
//어떠한 유저가 프로모션 코드썼다면 다음 결제때 쓴 프로모션 코드는 못씀, 다른 프로모션 코드는 쓸 수 있음<-백이랑 얘기해서 쓴 프로모션 코드는 유저에 넣어질 수 있도록
function onPromotionPrice(e) {
  e.preventDefault();

  // 프로모션 코드가 있는 요소 찾기
  const nodes = Array.from(document.querySelectorAll("li.list-group-item"));
  const index = nodes.findIndex((node) =>
    node.classList.contains("promotionCode")
  );

  // 프로모션 코드가 이미 사용되었다면 알림
  if (index >= 0) {
    alert("프로모션 코드는 하나만 사용가능합니다.");
    return;
  }

  // 프로모션 코드를 확인
  let foundPromotion = false;
  for (let i = 0; i < PROMOTION_CODE.length; i++) {
    if (PromotionRegisterInput.value === PROMOTION_CODE[i].promotionCode) {
      // 프로모션 코드가 올바르다면 장바구니에 할인 정보를 추가
      const promotionItem = nodes[nodes.length - 1];
      const promoElement = document.createElement("li");
      promoElement.classList.add(
        "list-group-item",
        "promotionCode",
        "d-flex",
        "justify-content-between",
        "bg-light"
      );
      promoElement.innerHTML = `
      <div class="text-success">
        <h6 class="my-0">프로모션 코드</h6>
        <small>${PROMOTION_CODE[i].promotionCode}</small>
      </div>
      <span class="text-success">−${PROMOTION_CODE[
        i
      ].promotionPrice.toLocaleString()}원</span>
    `;

      productList.insertBefore(promoElement, promotionItem.previousSibling);

      foundPromotion = true;
      total -= PROMOTION_CODE[i].promotionPrice;

      const totalNode = document.querySelector(".totalPrice");
      totalNode.innerHTML = `
      <span>총 결제 금액</span>
      <strong>${total.toLocaleString()} 원</strong>
      `;
      totalPrice = total.toLocaleString();
      break;
    }
  }

  //맞는 프로모션 코드가 아니라면
  if (!foundPromotion) {
    alert("올바르지 않은 프로모션 코드입니다.");
  }
}

//총 결제 금액
let totalProduct = `
<li class="list-group-item d-flex totalPrice justify-content-between">
<span>총 결제 금액</span>
<strong>${total.toLocaleString()} 원</strong>
`;
productList.innerHTML += totalProduct;
let totalPrice = total.toLocaleString();

//결제 방식 체크
creditChekout.addEventListener("change", () => {
  creditInput.classList.toggle("hidden");
  accountTransNoticeadded.classList.add("hidden");
});
kakaoPayCheckout.addEventListener("change", () => {
  creditInput.classList.add("hidden");
  accountTransNoticeadded.classList.add("hidden");
});
accountTransCheckout.addEventListener("change", () => {
  creditInput.classList.add("hidden");
  accountTransNoticeadded.classList.remove("hidden");
  const accoutNotice = document.createElement("li");
  accoutNotice.classList.add("accoutNotice");

  const date = new Date();
  const month = date.getMonth() + 1;
  date.setDate(date.getDate() + 7);
  let monthAfter = date.getMonth() + 1;
  const day = date.getDate();

  if (month !== monthAfter) {
    monthAfter = `${monthAfter < 10 ? "0" : ""}${monthAfter}`;
  }

  accountTransNoticeadded.innerHTML = `
      <div>
        <h6 class="my-0">하기 계좌로 ${monthAfter
          .toString()
          .replace(/(^0+)/, "")}월 ${day}일까지 계좌이체 부탁드립니다.</h6>
        <span>우리은행 1111-11111-11111</span>
      </div>
    `;
});

//결제하기 버튼 이벤트 핸들러
async function onCheckoutHandle(e) {
  e.preventDefault();

  const userName = userNameInput.value;
  const userEmail = userEmailInput.value;
  const userPhone = userPhoneInput.value;
  const userAddress = userAddressInput.value + " " + userAddress2Input.value;

  const productsData = productCart.map((product) => ({
    productName: product[1],
    productPrice: product[4],
    productQuantity: product[2],
  }));

  if (!savedUser || savedUserObj.userType === "nonMember") {
    const orderPassword = document.getElementById("orderPassword").value;

    const nuserDataArray = productsData.map((product) => ({
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      totalPrice: product.productPrice * product.productQuantity,
      userName,
      userEmail,
      userPhone,
      userAddress,
      orderPassword,
    }));

    const nuserData =
      nuserDataArray.length > 1 ? nuserDataArray : nuserDataArray[0];

    try {
      await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuserData),
      }).then((response) => {
        if (response.ok) {
          alert("비회원주문성공!");
          window.location.href = "../checkoutComplete/";
        } else {
          alert("비회원주문실패!");
        }
      });
    } catch (e) {
      alert(e);
    }
  } else {
    const userDataArray = productsData.map((product) => ({
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      totalPrice: product.productPrice * product.productQuantity,
      userName,
      userEmail,
      userPhone,
      userAddress,
    }));

    const userData =
      userDataArray.length > 1 ? userDataArray : userDataArray[0];

    try {
      await fetch("/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((response) => {
        if (response.ok) {
          alert("회원주문성공!");
          window.location.href = "../checkoutComplete/";
        } else {
          alert("회원주문실패!");
        }
      });
    } catch (e) {
      alert(e);
    }
  }

  //   try {
  //     const response = await fetch("/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to order");
  //     }
  //     // try {
  //     //     const response = await fetch("/결제완료페이지");
  //     //     if (!response.ok) {
  //     //       throw new Error("err");
  //     //     }
  //     //     window.location.href = "/결제완료페이지";
  //     //     const html = await response.text();
  //     //     document.documentElement.innerHTML = html;
  //     //   } catch (e) {
  //     //     console.log(e);
  //     //   }

  //     }catch (e) {
  //           console.log(e);
  //           }
}

PromotionRegisterBtn.addEventListener("click", onPromotionPrice);
checkoutBtn.addEventListener("click", onCheckoutHandle);
BringsavedUsercheckbox.addEventListener("click", isChecked);
