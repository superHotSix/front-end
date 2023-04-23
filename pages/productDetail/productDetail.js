const productPrice = parseInt(
  document.querySelector(".productPrice").innerText
);

const productQuantityInput = document.querySelector(".productQuantityInput");
const totalPrice = document.querySelector(".totalPrice");
const cartSubmitBtn = document.querySelector(".cartSubmit");

const colorOptionBtn = document.querySelector(".colorOptionBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");

// get from back-end
const productImg = "img";
const productName = "something";
const productQuantity = 2;
const rowPrice = (parseInt(productQuantityInput.value) || 0) * productPrice;

// Event Listeners

const updateTotalPrice = () => {
  const quantity = parseInt(productQuantityInput.value) || 0;
  const total = productPrice * quantity;
  totalPrice.innerHTML = `총 금액: ${total} 원`;
};

productQuantityInput.addEventListener("input", updateTotalPrice);

cartSubmitBtn.addEventListener("click", function () {
  const product = {
    productImg: productImg,
    productName: productName,
    productQuantity: productQuantity,
    productPrice: rowPrice,
  }; // 객체를 만들지 말고 배열로 진행하는 방법으로 로직 구현

  const productString = JSON.stringify(product);

  localStorage.setItem("product", productString);

  window.location.href = "../productCart/productCart.html";
});

colorOptionBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropdownMenu.classList.toggle("show");
});
