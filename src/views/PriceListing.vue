<template>
  <div class="container">
    <h3 class="heading fullstop">Best insurance quotes for you</h3>

    <div class="price-table">
      <div class="price-column" v-for="quote in quotes" :key="quote.name" :quote="quote">
        <p>{{ quote.name }}</p>
        <div class="price-column__header">
          <span>{{ quote.price | currency }}</span>
          <span class="monthly">monthly</span>
        </div>
        <div class="price-column__footer">
          <a
            target="_blank"
            :href="encodeURI(`https://boughtbymany.com?breed=${breed}&postcode=${postcode}&type=${quote.name}`)" class="select-link"
          >Select</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sdk from '@/sdk'

export default {
  name: 'PriceListing',
  filters: {
    currency(value) {
      return `£${value/100}`
    },
  },
  data() {
    return {
      breed: null,
      postcode: null,
      quotes: [],
    }
  },
  mounted() {
    this.breed = this.$route.query.breed
    this.postcode = this.$route.query.postcode

    sdk.getQuotes({
      breed: this.breed,
      postcode: this.postcode,
    }).then(quotes => this.quotes = quotes.slice(0, 3))
  },

}
</script>

<style lang="scss" scoped>
@import '@boughtbymany/patterns/src/sass/ui/ui.scss';

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 4px;
}

.heading {
  font-weight: lighter;
  background-color: #fafafa;
  margin: 0;
  padding: 12px 24px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.price-table {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex: 1;
  background-color: #304858;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 15px 20px;
}

.select-link {
  color: #1ac381;
  border-radius: 40px;
  display: inline-block;
  text-decoration: underline;
}

.price-column {
  background: white;
  text-align: center;
  margin: 0 8px;
  flex: 1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  &__header {
    background: #fcca1b;
    font-size: 24px;
    line-height: 1.75;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .monthly {
      font-size: 14px;
      padding-left: 4px;
    }
  }

  &__footer {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 0;
    font-size: 15px;
  }
}
</style>
