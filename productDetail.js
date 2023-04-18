const productPrice = parseInt(
  document.querySelector(".productPrice").innerHTML
);

const productQuantityInput = document.querySelector(".productQuantityInput");

const productPurchaseButton = document.querySelector(".productPurchaseButton");

productPurchase = (e) => {
  e.preventDefault();
  let totalPrice = productPrice * parseInt(productQuantityInput.value);
  alert(totalPrice);
};

productPurchaseButton.addEventListener("click", productPurchase);
