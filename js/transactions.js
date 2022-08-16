 function transfer(store, sender, amount, form) {
  store.map((person) => {
    if (person.email === sender.email) {
      if (Number(sender.balance) >= Number(amount)) {
        person.balance = parseInt(person.balance) - parseInt(amount);
        const current = {
          ...sender,
          balance: parseInt(sender.balance) - parseInt(amount),
        };

        localStorage.setItem("currentUser", JSON.stringify(current));
      } else {
        indicator(form, "Transfer/Top-up  was made successfully!");
      }
    } else {
      return null;
    }
  });

  localStorage.setItem("userData", JSON.stringify(store));
}

export default transfer