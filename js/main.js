import {transfer, updateStore } from './modules/transactions.js';
import { DisplayContent } from './modules/renderView.js';


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

