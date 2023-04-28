const container = document.querySelector(".container");

const date = new Date();
const month = date.getMonth() + 1;
date.setDate(date.getDate() + 7);
let monthAfter = date.getMonth() + 1;
const day = date.getDate();

if (month !== monthAfter) {
  monthAfter = `${monthAfter < 10 ? "0" : ""}${monthAfter}`;
}

container.innerHTML = `
    <div>
    <h2> 주문이 완료되었습니다. </h2>
    <p></p>
      <h4 class="my-0">하기 계좌로 ${monthAfter
        .toString()
        .replace(/(^0+)/, "")}월 ${day}일까지 계좌이체 부탁드립니다.</h4>
      <h5><strong>우리은행 1111-11111-11111</strong></h5>
      <button class="btn btn-outline-secondary">메인페이지</button>
    </div>
  `;

const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  window.location.href = "../mainPage/";
});
