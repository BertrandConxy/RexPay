import { indicator } from "./renderView.js";

const LoginForm = document.getElementById("login-form");

LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("email-login").value;
  const passwordInput = document.getElementById("password-login").value;


  const user = {
    email: emailInput,
    password: passwordInput,
  };

  loginAuth('userData', user, LoginForm);
  
});

function loginAuth(database, user, form) {
    const userData = JSON.parse(localStorage.getItem(database));
    userData.forEach((data) => {
        if((data.email === user.email) && (data.password === user.password)){
            setCurrentUser('userData', user.email)
            form.reset()
            window.location.href = '../pages/main.html';
            return true
          } else {
            indicator(form, `Invalid Email or password`)

          }
        });
}

function setCurrentUser(database, userMail) {
  const userData = JSON.parse(localStorage.getItem(database));
    userData.forEach((user) => {
      if (user.email === userMail) {
        localStorage.setItem('currentUser',  JSON.stringify(user));
        return user
      } else {
        return null
      }
    });
}
