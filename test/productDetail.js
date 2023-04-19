const productPrice = parseInt(
  document.querySelector(".productPrice").innerText
);

const productQuantityInput = document.querySelector(".productQuantityInput");
const totalPrice = document.querySelector(".totalPrice");
const cartSubmit = document.querySelector(".cartSubmit");

const colorOptionBtn = document.querySelector(".colorOptionBtn");
const dropdownMenu = document.querySelector(".dropdown-menu");

// Event Listeners

const updateTotalPrice = () => {
  const quantity = parseInt(productQuantityInput.value) || 0;
  const total = productPrice * quantity;
  totalPrice.innerHTML = `총 금액: ${total}원`;
};

productQuantityInput.addEventListener("input", updateTotalPrice);

cartSubmit.addEventListener("click", () => {
  window.location.href = "./productCart.html";
});

colorOptionBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  if (!dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove("show");
  }
});
