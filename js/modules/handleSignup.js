const SignupForm = document.getElementById("signup-form");

SignupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email-signup").value;
  const passwordInput = document.getElementById("password-signup").value;
  const adminCheckbox = document.getElementById("admin-checkbox").checked;

  const user = {
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    balance: 0,
    admin: adminCheckbox,
  };

  saveToLocalStorage("userData", user);
  SignupForm.reset();
  window.location.href = "../index.html";
});

function saveToLocalStorage(name, data) {
  const StoreArray = [];
  StoreArray.push(data);
  if (localStorage[name]) {
    const store = JSON.parse(localStorage.getItem(name));
    store.push(data);
    localStorage.setItem(name, JSON.stringify(store));
  } else {
    localStorage.setItem(name, JSON.stringify(StoreArray));
  }
}
