const productQuantityInput = document.querySelector(".productQuantityInput");
const totalPrice = document.querySelector(".totalPrice");
const cartSubmitBtn = document.querySelector(".cartSubmit");
const colorOptionBtn = document.querySelector(".colorOptionBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const productPurchaseButton = document.querySelector(".productPurchaseButton");

// QueryString Parsing
const urlParams = new URLSearchParams(window.location.search);
// const category = urlParams.get("category");
const productId = urlParams.get("productId");

const parsingImg = document.querySelector(".productImage");
const parsingName = document.querySelector(".productName");
const parsingPrice = document.querySelector(".productPrice");
const parsingRowPrice = document.querySelector(".rowPrice");

fetch(`/category/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    // parsingImg = data.detailURL[0];
    parsingName.innerHTML = data.name;
    parsingPrice.innerHTML = data.price;
    parsingImg.src = data.detailUrl;
    parsingRowPrice.innerHTML = data.price;
  })
  .catch((error) => {
    alert(error);
  });

async function cartSave() {
  const productQuantity = parseInt(productQuantityInput.value);
  const productPrice = parseInt(
    document.querySelector(".productPrice").innerText
  ); // 최신 값으로 업데이트
  const rowPrice = productQuantity * productPrice;

  let productCart;
  if (localStorage.getItem("productCart")) {
    productCart = await JSON.parse(localStorage.getItem("productCart"));
  } else {
    productCart = [];
  }

  let isProductFound = false;

  for (let i = 0; i < productCart.length; i++) {
    if (productCart[i][1] === parsingName.innerHTML) {
      productCart[i][2] += productQuantity;
      productCart[i][3] += rowPrice;
      isProductFound = true;
    }
  }

  if (!isProductFound) {
    const productOne = [
      parsingImg.src,
      parsingName.innerHTML,
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

const updateTotalPrice = () => {
  const quantity = parseInt(productQuantityInput.value);
  const total = parseInt(parsingPrice.innerHTML) * quantity;
  parsingRowPrice.innerHTML = total;
};

// Event Listeners

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
