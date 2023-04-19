// 쿼리 스트링 파싱
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// 선택된 상품 정보 가져오기
const productImage = urlParams.get("image");
const productName = urlParams.get("name");
const productPrice = urlParams.get("price");
const productQuantity = urlParams.get("quantity");

const tableBody = document.querySelector("tbody");
const productRow = document.createElement("tr");
const productImageCell = document.createElement("td");

productImage.src = productImage;
productImageCell.appendChild(productImage);
productImageCell.appendChild(document.createTextNode(productName));

const productQuantityCell = document.createElement("td");
productQuantityCell.textContent = productQuantity;

const productPriceCell = document.createElement("td");
productPriceCell.textContent = productPrice;

const productTotalCell = document.createElement("td");
productTotalCell.textContent =
  parseInt(productPrice) * parseInt(productQuantity);

productRow.appendChild(productImageCell);
productRow.appendChild(productQuantityCell);
productRow.appendChild(productPriceCell);
productRow.appendChild(productTotalCell);

tableBody.appendChild(productRow);
