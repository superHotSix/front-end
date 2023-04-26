const productCart = JSON.parse(localStorage.getItem("productCart"));
const productList = document.querySelector(".checkoutProduct");
const totalPrice = document.querySelector(".totalResult");
const promotionBtn = document.querySelector(".promotionBtn");

var total = 0;

for (let i = 0; i < productCart.length; i++) {
  const productOne = `
  <div>
    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">${productCart[i][1]}</h6>
        <small class="text-muted">개당 ${productCart[i][4]}</small>
      </div>
    <span class="text-muted">${productCart[i][3]}</span>
    </li>
  `;

  productList.innerHTML += productOne;
  total += productCart[i][3];
}

productList.innerHTML += `
<li class="list-group-item d-flex justify-content-between">
<span>Total (Won)</span>
<strong>${total} 원</strong>
`;

const promotionList = { ABCD: 5, EFGH: 6 };
const promotionCode = Object.keys(promotionList);

promotionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const promotionHTML = `<li class="list-group-item d-flex justify-content-between bg-light">
    <div class="text-success">
      <h6 class="my-0">Promo code</h6>
      <small>${promotionCode[1]}</small>
    </div>
    <span class/="text-success">${promotionList.promotionCode[1]}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between">
    <span>Total (Won)</span>
    <strong>${total} 원</strong>
  </li>`;
  productList.innerHTML += promotionHTML;
});
