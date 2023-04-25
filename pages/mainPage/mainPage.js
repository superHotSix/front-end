const loginBtn = document.querySelector(".login");

loginBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("/login");
    if (!response.ok) {
      throw new Error("err");
    }
    window.location.href = "/login";
    const html = await response.text();
    document.documentElement.innerHTML = html;
  } catch (e) {
    console.log(e);
  }
});

window.location.href("");
