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
  <h2 class='heading'>Hello ${currentUser.name} </h2>
    <p class="paragraph">Welcome to RexPay, the one and only platform to transfer your money to anyone around the world in a very short time</p>
    ${
      currentUser.admin
        ? `

        <h2>Top up for users</h2>
        <form action="#" id='topup-form' >
            <div>
                <label for="amount">Enter amount to send</label>
                <input type="number" name="amount" id="amount-topup">
            </div>
        
            <div>
                <label for="recipient">Select the recipient</label>
                <select name="recipient" id="recipient-topup">
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
            <input type="submit" value="Send" id="send">
        </form>
    `
        : `<h2>Balance: ${Number(currentUser.balance)} </h2>
        <h2>Transfer money</h2>
        <form action="#" id='transfer-form' >
            <div>
                <label for="amount">Enter amount to send</label>
                <input type="number" name="amount" id="amount">
            </div>
        
            <div>
                <label for="recipient">Select the recipient</label>
                <select name="recipient" id="recipient">
                <option value="">--Please select the recipient</option>
                ${users
                  .filter((user) => user.email !== currentUser.email)
                  .map((person) => {
                    return `<option value=${person.email}>${person.name}</option>`;
                  })}
                </select>
            </div>
            <input type="submit" value="Send" id="send">
        </form>`
    }`;

  bodyContainer.innerHTML = HtmlString;
}
