const productCart = JSON.parse(localStorage.getItem("productCart"));
const deleteBtn = document.querySelector(".deleteBtn");

const tbody = document.querySelector("tbody");
var sum = 0;

for (let i = 0; i < productCart.length; i++) {
  let eachrow = `<tr>
    <th scope="row" id="row${i}">${i + 1}</th>
    <td>${productCart[i][0]}</td>
    <td>${productCart[i][1]}</td>
    <td><input type="number" value=${
      productCart[i][2]
    } class="inputVal${i}" ></td>
    <td>${productCart[i][3]}</td>
    <td><img src="../img/x.svg" class="xBtn" /></td>
  </tr>`;

  tbody.innerHTML += eachrow;
  sum += productCart[i][3];
}

for (let i = 0; i < productCart.length; i++) {
  const quantityInput = document.querySelector(`.inputVal${i}`);
  quantityInput.addEventListener("input", (e) => {
    productCart[i][2] = quantityInput.value;
    productCart[i][3] = productCart[i][2] * productCart[i][4];
    localStorage.setItem("productCart", JSON.stringify(productCart));
    location.reload();
  });
}

var totalPrice = document.querySelector(".totalPrice");
totalPrice.innerHTML = sum;

const xBtn = document.querySelectorAll(".xBtn");

for (let i = 0; i < xBtn.length; i++) {
  xBtn[i].addEventListener("click", (e) => {
    const index = e.target.dataset.index; // 클릭한 버튼의 data-index 값을 가져옴
    productCart.splice(index, 1); // 해당 배열 삭제
    localStorage.setItem("productCart", JSON.stringify(productCart)); // 로컬 스토리지에 새로운 카트 정보 저장
    location.reload(); // 페이지 리로드
  });
}

deleteBtn.addEventListener("click", () => {
  const confirmed = confirm("장바구니에 있는 모든 값을 삭제합니다");
  if (confirmed) {
    localStorage.removeItem("productCart");
    location.reload(); // 삭제 작업 후 페이지 리로드
  }
});
