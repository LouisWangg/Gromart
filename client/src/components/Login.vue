<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Login">
          <form name="gromart-form" class="mt-4">
            <v-text-field label="Email" v-model="email"></v-text-field>
            <br />

            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <br />
          </form>

          <div class="error" v-html="error" />
          <br />

          <v-btn class="mb-4" color="blue-grey lighten-1"
            @click="login" dark>Login</v-btn>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script> // object that has different kind of methods, so we can bind the v- type to here
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      error: null
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+/.test(v) || 'E-mail must be valid'
      // ]
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        
        if (response.data.user.role == 'Seller') {
          this.$store.dispatch('setSeller', response.data.seller)
          if (response.data.seller.status == 'Active') {
            this.$router.push('sellerProductList')
          } else {
            this.error = "This account has not been approved yet"
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$store.dispatch('setSeller', null)
          }
        } else if (response.data.user.role == 'Buyer') {
          this.$store.dispatch('setBuyer', response.data.buyer)
          this.$router.push('buyerProductList')
        } else {
          this.$router.push('adminSellerList')
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: black;
  width: 500px;
}

.v-text-field {
  width: 500px;
}

.panel {
  width: 700px;
  margin-top: 100px;
}

</style>
