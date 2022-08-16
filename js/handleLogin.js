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
            return
    } else {
        const container = document.createElement('div');
        container.innerHTML = `<span class='invalid-span' >Invalid Email or password</span>`
        form.prepend(container);

        setTimeout(() => {
            form.removeChild(container);
        }, 1000);
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
