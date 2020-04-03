const BASE_URL = 'https://bbm-widgets.herokuapp.com/api'

function createUrl(sub, options) {
  const allowed = ['breed', 'postcode', 'gender', 'value', 'dob'];

  const params = Object.entries(options)
    .filter(([key, value]) => value && allowed.includes(key))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${BASE_URL}${sub}?${encodeURI(params)}`;
}

export default {
  getQuoteEstimates(options) {
    return fetch(createUrl('/quote/cat-dog', options))
      .then(d => d.json())
      .then(data => {
        return data.map(item => {
          return {
            name: item.variations[0].name,
            price: item.variations[0].price.monthly.amount,
            headline: item.variations[0].headline,
          };
        });
      });
  },

  getSwedishQuoteEstimates(options) {
    return fetch(createUrl('/quote/katt-hund', options))
      .then(d => d.json())
      .then(data => {
        return data.map(item => {
          return {
            name: item.variations[0].name,
            price: item.variations[0].price.monthly.amount,
            headline: item.variations[0].headline,
          };
        });
      });
  }
}
