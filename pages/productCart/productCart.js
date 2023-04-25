const productCart = JSON.parse(localStorage.getItem("productCart"));

const tbody = document.querySelector("tbody");

for (let i = 0; i < productCart.length; i++) {
  let eachrow = `<tr>
    <th scope="row" id="row${i}">${i + 1}</th>
    <td>${productCart[i][0]}</td>
    <td>${productCart[i][1]}</td>
    <td>${productCart[i][2]}</td>
    <td>${productCart[i][3]}</td>
    <td><img src="../img/x.svg" class="xBtn" /></td>
  </tr>`;

  tbody.innerHTML += eachrow;
}

const xBtn = document.querySelectorAll(".xBtn");

for (let i = 0; i < xBtn.length; i++) {
  xBtn[i].addEventListener("click", (e) => {
    const index = e.target.dataset.index; // 클릭한 버튼의 data-index 값을 가져옴
    productCart.splice(index, 1); // 해당 배열 삭제
    localStorage.setItem("productCart", JSON.stringify(productCart)); // 로컬 스토리지에 새로운 카트 정보 저장
    location.reload(); // 페이지 리로드
  });
}
