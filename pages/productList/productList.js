let productRow = document.querySelector(".product-li"); // 상품목록 HTML
const lowerBtn = document.querySelector(".lower-price");
const higherBtn = document.querySelector(".higher-price");
const productContainer = document.querySelector(".product");
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const categoryUrl = `/${category}`;
let obj = null; // 상품목록 init
let start = 1; // 상품목록 탐색을위한 페이지 상수
const limit = 8; // 한페이지에 표시할 상품목록 갯수 상수
console.log(categoryUrl);
const concept = urlParams.get("concept");

if (concept) {
  fetchProducts(`/${category}/concept/${concept}`);
} else {
  fetchProducts(categoryUrl);
}

// 서버에서 상품목록 받아오기

function fetchProducts(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      obj = data;
      renderBySort();
      render(start, limit);
      createToast();
      // sortByconcept();
    });
}

// img 경로 추후수정필요

function render() {
  const startIdx = (start - 1) * limit;
  const endIdx = startIdx + limit;

  for (let i = startIdx; i < Math.min(endIdx, obj.length); i++) {
    const product = obj;
    const productEl = creatProductEl(product[i]);
    productEl.addEventListener("click", () => {
      const productId = productEl.classList[0];
      const queryString = `?productId=${productId}`; // 예시로 상품 ID를 123으로 설정
      window.location.href = `../productDetail/${queryString}`;
    });
    productRow.appendChild(productEl);
  }
  if (endIdx < obj.length) {
    if (start !== 1) removeBtn();
    moreBtnRender();
  }
}

// 더보기 버튼 클릭시 제 랜더링 실행함수
function onloadMore() {
  start++;
  render();
  createToast();
  const endIdx = start * limit;
  if (endIdx >= obj.length) removeBtn();
}

// productHTML 생성 함수
function creatProductEl(product) {
  const productEl = document.createElement("div");
  productEl.className = `${product.itemId} card border-0`;
  productEl.innerHTML = `
  <img src="${product.thumnailUrl}" class="card-img-top" alt="...">
  <div class="card-img-overlay d-flex align-items-end">
    <div class="card-body">
      <p class="card-title fs-4 fw-bold">${product.name}
        <span class="badge rounded-pill ${product.concept[0]}">${product.concept[0]}</span>
      </p>
      <p class="card-text d-flex fs-5 fw-bold justify-content-between align-items-end">₩ ${product.price}
        <i class="bi bi-cart3 add-cart"></i>
      </p>
    </div>
  </div>
</div>
`;
  return productEl;
}
// 렌더링후 더보기버튼 추가 함수
function moreBtnRender(start, limit) {
  start, limit;
  const morebtnEl = document.createElement("div");
  morebtnEl.className = "row more-btn-row";
  const morebtnEl_div = document.createElement("div");
  morebtnEl_div.className = "col-12 text-center mb-3";
  morebtnEl.appendChild(morebtnEl_div);
  const morebtnEl_div_btn = document.createElement("button");
  morebtnEl_div_btn.className = "btn more-btn text-black";
  morebtnEl_div_btn.type = "button";
  morebtnEl_div_btn.textContent = "더보기";
  morebtnEl_div_btn.addEventListener("click", onloadMore);
  morebtnEl_div.appendChild(morebtnEl_div_btn);
  productContainer.appendChild(morebtnEl);
}

// 추가 물품 렌더링후 더보기버튼 제거 함수
function removeBtn() {
  document.querySelector(".more-btn-row").remove();
}

//concept버튼부분 버그있음

const conceptBtn = document.querySelectorAll(".concept-div");
const btns = document.querySelectorAll(".conceptBtn"); //제가 추가한 부분
// console.log(wramBtn.innerHTML);

const vintageBtn = document.querySelector(".v-m");
const calmBtn = document.querySelector(".c-e");

// fetch(`/${sticker}/${cool}`)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     // 에러 처리
//   });

// function sortByconcept() {
//   wramBtn.addEventListener("click", () => {
//     switch (wramBtn) {
//       case wramBtn:
//         let warmurl = "../warmcoolList"; // url 수정
//         start = 1;
//         productRow.innerHTML = "";
//         wramBtn.style.filter = `grayscale(${0})`; // toggle 방식으로 구현하는게 나을듯
//         fetchProducts(warmurl);
//         renderBySort();
//         createToast();
//         break;

//       case vintageBtn:
//         break;
//     }
//   });
// }

//제가 테스트용으로 새로 짜본 코드임다.

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(category, "hi");
    let text = btn.innerText.toLowerCase();
    window.location.href = `../productList/?concept=${text}&category=${category}`;
    // console.log(text);
    fetchProducts(`/${category}/concept/${text}`);
  });
});

//여기까지 임다!

//상품 정렬

function sortByHighPrice() {
  obj.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  start = 1;
  productRow.innerHTML = "";
  render(start, limit);
  createToast();
}

function sortByLowPrice() {
  obj.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  start = 1;
  productRow.innerHTML = "";
  render(start, limit);
  createToast();
}

function renderBySort() {
  lowerBtn.addEventListener("click", sortByLowPrice);
  higherBtn.addEventListener("click", sortByHighPrice);
}

//장바구니 토스트 생성 함수

function createToast() {
  document.querySelectorAll(".add-cart").forEach((e) => {
    e.addEventListener("click", (e) => {
      const toastLiveExample = document.querySelector(".toast");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    });
  });
}
