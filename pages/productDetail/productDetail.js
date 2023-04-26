const productPrice = parseInt(
  document.querySelector(".productPrice").innerText
);

const productQuantityInput = document.querySelector(".productQuantityInput");
const totalPrice = document.querySelector(".totalPrice");
const cartSubmitBtn = document.querySelector(".cartSubmit");

const colorOptionBtn = document.querySelector(".colorOptionBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");

const productPurchaseButton = document.querySelector(".productPurchaseButton");

// fetch

// mockup Data
const productImg = "img";
const productName = "coach";
const productQuantity = parseInt(productQuantityInput.value);
const rowPrice = productQuantity * productPrice;

async function cartSave() {
  const productQuantity = parseInt(productQuantityInput.value); // 최신 값으로 업데이트
  const rowPrice = productQuantity * productPrice;

  let productCart;
  if (localStorage.getItem("productCart")) {
    productCart = await JSON.parse(localStorage.getItem("productCart"));
  } else {
    productCart = [];
  }

  let isProductFound = false;

  for (let i = 0; i < productCart.length; i++) {
    if (productCart[i][1] === productName) {
      productCart[i][2] += productQuantity;
      productCart[i][3] += rowPrice;
      isProductFound = true;
    }
  }

  if (!isProductFound) {
    const productOne = [
      productImg,
      productName,
      productQuantity,
      rowPrice,
      productPrice,
    ];
    productCart.push(productOne);
  }

  const productString = JSON.stringify(productCart);
  localStorage.setItem("productCart", productString);

  alert("장바구니에 추가가 완료되었습니다");
}

// Event Listeners

const updateTotalPrice = () => {
  const quantity = productQuantityInput.value;
  const total = productPrice * quantity;
  totalPrice.innerHTML = `총 금액: ${total} 원`;
};

productQuantityInput.addEventListener("input", updateTotalPrice);

cartSubmitBtn.addEventListener("click", cartSave);

productPurchaseButton.addEventListener("click", () => {
  cartSave();
  window.location.href = "../checkoutPage";
});

colorOptionBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropdownMenu.classList.toggle("show");
});
