export function indicator(wrapper, content) {
const container = document.createElement("div");
container.id = 'indicator-id'
container.innerHtml = `${content}`
wrapper.prepend(container)

}

export function DisplayContent(currentUser, users) {
  const bodyContainer = document.getElementById("root");
  const HtmlString = `
      <header class="header">
        <h1 class="header__logo">RexPay</h1>
        <a href="../../index.html" class="header__link">Log out</a>
      </header>
    <div class="headline">
      <h2 class='headline__heading'>Hello ${currentUser.name} !</h2>
      <p class="headline__paragraph">Welcome to RexPay, <br> the one and only platform to transfer your money to anyone around the world in a very short time.</p>
    </div>
    ${
      currentUser.admin
        ? `
      <div class='trans-wrapper'>      
      <h2 class='trans-wrapper__heading'>Top up for users</h2>
      <form action="#" id='topup-form' class='trans-wrapper__form'>
          <div class='block'>
              <label for="amount" class='trans-wrapper__form--label'>Enter amount to send:</label>
              <input type="number" name="amount" id="amount-topup" class='trans-wrapper__form--control' >
          </div>
      
          <div class='block'>
              <label for="recipient" class='trans-wrapper__form--label'>Select the recipient:</label>
              <select name="recipient" id="recipient-topup" class='trans-wrapper__form--control'>
              <option value="">--Please select the recipient</option>
              ${users
                .filter(
                  (user) => user.email !== currentUser.email && !user.admin
                )
                .map((person) => {
                  return `<option value=${person.email}>${person.name}</option>`;
                })}
              </select>
          </div>
          <input type="submit" value="Send" id="send" class='wrapper__form--btn'>
      </form>
      </div>
    `
        : `

        <span class='balance'>Balance: ${Number(currentUser.balance)}$ </span>
        <div class='trans-wrapper'>
        <h2 class='trans-wrapper__heading' >Transfer money</h2>
        <form action="#" id='transfer-form' class='trans-wrapper__form' >
            <div class='block'>
                <label for="amount" class='trans-wrapper__form--label'>Enter amount to send:</label>
                <input type="number" name="amount" id="amount" class='trans-wrapper__form--control'>
            </div>
        
            <div class='block'>
                <label for="recipient" class='trans-wrapper__form--label'>Select the recipient:</label>
                <select name="recipient" id="recipient" class='trans-wrapper__form--control'>
                <option value="">--Please select the recipient</option>
                ${users
                  .filter((user) => user.email !== currentUser.email)
                  .map((person) => {
                    return `<option value=${person.email}>${person.name}</option>`;
                  })}
                </select>
            </div>
            <input type="submit" value="Send" id="send" class='wrapper__form--btn'  >
        </form>
        </div>`
    }`;

  bodyContainer.innerHTML = HtmlString;
}
