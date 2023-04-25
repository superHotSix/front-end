
let productRow = document.querySelector('.product-li'); // 상품목록 HTML 
const lowerBtn = document.querySelector('.lower-price');
const higherBtn = document.querySelector('.higher-price');
const nomalUrl = '../product.json'
let obj = null; // 상품목록 init
let start = 1; // 상품목록 탐색을위한 페이지 상수
const limit = 8; // 한페이지에 표시할 상품목록 갯수 상수


fetchProducts(nomalUrl);



// 서버에서 상품목록 받아오기

function fetchProducts(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        obj = data
        console.log(obj)
        renderBySort();
        render(start, limit)
        createToast();
        sortByconcept();
    })
}

// img 경로 추후수정필요

function render() {
    const startIdx = (start - 1) * limit;
    const endIdx = startIdx + limit;

    for (let i = startIdx; i < Math.min(endIdx, obj.length) ; i++){
        const product = obj
        const productEl = creatProductEl(product[i])
        productRow.appendChild(productEl);
    }
    if (endIdx < obj.length) {
        if(start !== 1)removeBtn();
        moreBtnRender();
    }
} 

// 더보기 버튼 클릭시 제 랜더링 실행함수
function onloadMore() {
    start++;
    render();
    createToast();
    const endIdx = start * limit
    if(endIdx >= obj.length) removeBtn()
}

// productHTML 생성 함수
function creatProductEl(product) {
    const productEl = document.createElement('div');
    productEl.className = 'col-md-3';
    productEl.innerHTML =`
    <div class="card border-0">
      <img src="${product.thumnailImg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.productName}
          <span class="badge rounded-pill ${product.concept}">${product.concept}</span>
        </h5>
        <p class="card-text d-flex justify-content-between align-items-end">₩ ${product.productPrice}
          <i class="bi bi-cart3 add-cart"></i>
        </p>
      </div>
    </div>
  `;
    return productEl;
}
// 렌더링후 더보기버튼 추가 함수
function moreBtnRender(start, limit) {
    start, limit;
    const morebtnEl = document.createElement('div');
    morebtnEl.className = 'row more-btn-row';
    const morebtnEl_div = document.createElement('div');
    morebtnEl_div.className = 'col-12 text-center mb-5';
    morebtnEl.appendChild(morebtnEl_div);
    const morebtnEl_div_btn = document.createElement('button');
    morebtnEl_div_btn.className = 'btn more-btn';
    morebtnEl_div_btn.type = 'button';
    morebtnEl_div_btn.textContent = '더보기'
    morebtnEl_div_btn.addEventListener('click', onloadMore);
    morebtnEl_div.appendChild(morebtnEl_div_btn);
    productRow.appendChild(morebtnEl);
}


// 추가 물품 렌더링후 더보기버튼 제거 함수
function removeBtn() {
    document.querySelector('.more-btn-row').remove()
}




//concept버튼부분 버그있음 

const conceptBtn = document.querySelectorAll('.concept-div');
const wramBtn = document.querySelector('.w-c');
const vintageBtn = document.querySelector('.v-m');
const calmBtn = document.querySelector('.c-e');

function sortByconcept() {
    wramBtn.addEventListener('click', () => {
        switch (wramBtn) {
            case wramBtn:
                let warmurl = '../warmcoolList.json'
                start = 1;
                productRow.innerHTML = '';
                wramBtn.style.filter = `grayscale(${0})` // toggle 방식으로 구현하는게 나을듯 
                fetchProducts(warmurl);
                renderBySort();
                createToast();
                break;

            case vintageBtn:
                break;
        }
    })
    
}


//상품 정렬 

function sortByHighPrice() {
    obj.sort((a, b) => parseFloat(b.productPrice.replace('$', '')) - parseFloat(a.productPrice.replace('$', '')));
    start = 1;
    productRow.innerHTML = "";
    render(start, limit);
    createToast();
};
  
function sortByLowPrice() {
    obj.sort((a, b) => parseFloat(a.productPrice.replace('$', '')) - parseFloat(b.productPrice.replace('$', '')));
    start = 1;
    productRow.innerHTML = "";
    render(start, limit);
    createToast();
};

function renderBySort() {
    lowerBtn.addEventListener('click', sortByLowPrice);
    higherBtn.addEventListener('click', sortByHighPrice);
}



//장바구니 토스트 생성 함수

function createToast() {
    document.querySelectorAll('.add-cart').forEach(e => {
        e.addEventListener('click', (e) => {
            const toastLiveExample = document.querySelector('.toast');
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        });
    })
}