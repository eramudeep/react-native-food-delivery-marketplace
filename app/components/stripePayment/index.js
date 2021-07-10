"use strict";

const stripe_url = "https://api.stripe.com/v1/";
const secret_key = "sk_test_51IDUnGIu5WYQsn65VM5FKIr1PuIdkAodZzE4fk0uCNIUp7PFRQxY8oCw04SKry6IBonHAgEe6zMFfA3iiu4cOOed00dyZ6mLGI";

module.exports.createCardToken = function (cardNumber, expMonth, expYear, cvc) {
  const cardDetails = {
    "card[number]": cardNumber,
    "card[exp_month]": expMonth,
    "card[exp_year]": expYear,
    "card[cvc]": cvc,
  };

  var formBody = [];
  for (var property in cardDetails) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(stripe_url + "tokens", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + secret_key,
    },
    body: formBody,
  });
};