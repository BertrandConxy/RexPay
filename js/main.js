import transfer from './transactions';

const bodyContainer = document.getElementById("root");

const CurrentUser = JSON.parse(localStorage.getItem("currentUser"));
const UserData = JSON.parse(localStorage.getItem("userData"));
DisplayContent(CurrentUser, UserData);

if (!CurrentUser.admin) {
  const TransferForm = document.getElementById("transfer-form");
  TransferForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amountInput = document.getElementById("amount").value;
    const selectionBox = document.getElementById("recipient");
    const recipient = selectionBox.options[selectionBox.selectedIndex];
    const receiver = UserData.find((user) => user.email === recipient.value);

    TransferForm.reset();

    updateStore(UserData, receiver, amountInput, TransferForm);

    transfer(UserData, CurrentUser, amountInput, TransferForm);

    window.location.reload();
  });
} else {
  const TopupForm = document.getElementById("topup-form");

  TopupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amountInput = document.getElementById("amount-topup").value;
    const selectionBox = document.getElementById("recipient-topup");
    const recipient = selectionBox.options[selectionBox.selectedIndex];
    const receiver = UserData.find((user) => user.email === recipient.value);

    updateStore(UserData, receiver, amountInput, TopupForm);

    TopupForm.reset();
  });
}

function updateStore(store, user, amount, form) {
  store.map((person) => {
    if (person.email === user.email) {
      person.balance = parseInt(person.balance) + parseInt(amount);
      indicator(form, "Transfer/Top-up  was made successfully!");
    } else {
      return null;
    }
  });

  localStorage.setItem("userData", JSON.stringify(store));
}

// function transfer(store, sender, amount, form) {
//   store.map((person) => {
//     if (person.email === sender.email) {
//       if (Number(sender.balance) >= Number(amount)) {
//         person.balance = parseInt(person.balance) - parseInt(amount);
//         const current = {
//           ...sender,
//           balance: parseInt(sender.balance) - parseInt(amount),
//         };

//         localStorage.setItem("currentUser", JSON.stringify(current));
//       } else {
//         indicator(form, "Transfer/Top-up  was made successfully!");
//       }
//     } else {
//       return null;
//     }
//   });

//   localStorage.setItem("userData", JSON.stringify(store));
// }


function indicator (wrapper, content) {
          const container = document.createElement("div");
          container.innerHTML = `<span class='invalid-span' >${content}</span>`;
          wrapper.prepend(container);

          setTimeout(() => {
            wrapper.removeChild(container);
          }, 1000);
}

function DisplayContent(currentUser, users) {
  const HtmlString = `<h1>Hello ${currentUser.name} </h1>
    <p>Welcome to RexPay, the one and only platform to transfer your money to anyone around the world in a very short time</p>
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
