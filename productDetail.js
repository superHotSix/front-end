const productPrice = parseInt(
  document.querySelector(".productPrice").innerHTML
); // 색상,

const productQuantityInput = document.querySelector(".productQuantityInput");
const totalPrice = document.querySelector(".totalPrice");
const cartSubmit = document.querySelector(".cartSubmit");

const colorOptionBtn = document.querySelector(".colorOptionBtn");
const colorOptionList = document.querySelector(".colorOptionList");

const updateTotalPrice = () => {
  const quantity = parseInt(productQuantityInput.value) || 0;
  const total = productPrice * quantity;
  totalPrice.innerHTML = total;
};

productQuantityInput.addEventListener("input", updateTotalPrice);
cartSubmit.addEventListener("click", () => {
  window.location.href = "./productCart.html";
});

colorOptionBtn.addEventListener("click", () => {
  colorOptionList.classList.toggle("show");
});
