<template>
  <div>
    <div class="header">
      <img :src="logo" class="logo" />
      <h2>Policies for your {{ breed }}</h2>
    </div>
    <div v-if="loading">Calculating policy quotes, one moment...</div>
    <div v-else class="price-table">
      <div class="price-column" v-for="quote in quotes" :key="quote.name" :quote="quote">
        <div class="price-column__content">
          <p class="price-column__name">{{ quote.name }}</p>
          <div class="price-column__headline">{{ quote.headline }}</div>
        </div>
        <div class="price-column__price">
          <span>{{ quote.price | currency }}</span>
          <span class="monthly">monthly</span>
        </div>
        <div class="price-column__footer">
          <a
            class="button"
            target="_blank"
            :href="encodeURI(`https://boughtbymany.com?breed=${breed}&postcode=${postcode}&type=${quote.name}`)"
          >Select</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sdk from '@/sdk'
import logo from '@/assets/logo.svg'

export default {
  name: 'PriceListing',
  filters: {
    currency(value) {
      return Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value / 100)
    },
  },
  data() {
    return {
      logo,
      breed: null,
      postcode: null,
      loading: true,
      quotes: [],
    }
  },
  mounted() {
    this.breed = this.$route.query.breed
    this.postcode = this.$route.query.postcode
    this.gender = this.$route.query.gender
    this.dob = this.$route.query.dob
    this.value = this.$route.query.value

    sdk.getCatDogQuotes({
      breed: this.breed,
      postcode: this.postcode,
      gender: this.gender,
      dob: this.dob,
      value: this.value,
    }).then(quotes => {
      this.loading = false
      this.quotes = quotes
    })
  },

}
</script>

<style lang="scss" scoped>
@import '@boughtbymany/patterns/src/sass/ui/ui.scss';

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;

  }
}

.price-table {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.price-column {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  padding: 10px 0;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: 0;
    padding-bottom: 0;
  }

  &__name {
    flex-basis: 120px;
    padding-right: 10px;
    margin: 0;
    font-weight: bold;
  }

  &__content {
    flex: 1;
    line-height: 1.4;
    padding-right: 10px;
  }

  &__headline {
    font-size: 14px;

    @media (max-width: 600px) {
      display: none;
    }
  }

  &__price {
    background: #fcca1b;
    font-size: 24px;
    display: flex;
    flex-basis: 180px;
    height: 100%;
    padding: 10px 15px;
    margin: 0 15px;
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
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }

  .button {
    color: white;
    background-color: #1ac381;
    border-radius: 20px;
    padding: 4px 16px;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
  }
}

.logo {
  width: 200px;
  margin-bottom: 10px;
  float: right;
}
</style>
