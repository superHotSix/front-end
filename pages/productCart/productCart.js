const productCartString = localStorage.getItem("product");
const productObj = JSON.parse(productCartString);

const tbody = document.querySelector("tbody");

const eachrow = `<tr>
<th scope="row">1</th>
<td>${productObj.productImg}</td>
<td>${productObj.productName}</td>
<td>${productObj.productQuantity}</td>
<td>${productObj.productPrice}</td>
</tr>`;

tbody.innerHTML += eachrow;
