<template>
  <div>
    <div class="header">
      <img :src="logo" class="logo" />
      <h2>{{ heading }}</h2>
    </div>
    <div v-if="hasQuote">
      <h3>Insure {{ quote.name }} for a little as {{ quote.price | currency }} a month</h3>
      <a
        target="_blank"
        :href="`https://boughtbymany.com?resume_token=${token}`"
        class="button"
      >Continue</a>
    </div>
    <div v-else>
      <h3>Looking for the best pet insurance?</h3>
      <a
        target="_blank"
        :href="`https://boughtbymany.com?resume_token=${token}`"
        class="button"
      >Get a quote</a>
    </div>
  </div>
</template>

<script>
import sdk from '@/sdk'
import logo from '@/assets/logo.svg'

export default {
  name: 'ResumeQuote',
  filters: {
    currency(value) {
      return Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value / 100)
    },
  },
  data() {
    return {
      logo,
      quote: null,
    }
  },
  computed: {
    hasQuote() {
      return Boolean(!this.loading && this.quote)
    },

    heading() {
      if (this.hasQuote) {
        return `Still need insurance for ${this.quote.name}?`
      }

      return 'Pet Insurance From BoughtByMany'
    }
  },
  mounted() {
    // We will eventually get this value from cookies, at the moment this is just hardcoded for testing.
    this.token = '12345'

    sdk.getQuoteByToken({ token: this.token }).then(quote => {
      this.loading = false
      this.quote = quote
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

.button {
  color: white;
  background-color: #1ac381;
  border-radius: 20px;
  padding: 6px 20px;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
}

.logo {
  width: 200px;
  margin-bottom: 10px;
  float: right;
}
</style>
