const BASE_URL = 'https://bbm-widgets.herokuapp.com/api/quote/cat-dog'

function createUrl(options) {
  const allowed = ['breed', 'postcode', 'gender', 'value', 'dob'];

  const params = Object.entries(options)
    .filter(([key, value]) => value && allowed.includes(key))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${BASE_URL}?${encodeURI(params)}`;
}

export default {
  getQuotes(options) {
    return fetch(createUrl(options))
      .then(d => d.json())
      .then(data => {
        return data.map(item => {
          return {
            name: item.variations[0].name,
            price: item.variations[0].price.monthly.amount
          };
        });
      });
  }
}
