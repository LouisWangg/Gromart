<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Register">
          <v-text-field label="Email" v-model="email" class="mt-4"></v-text-field>
          <br />

          <v-text-field label="Password" type="password" v-model="password" dense></v-text-field>
          <br />

          <v-text-field label="Name" type="name" v-model="name" dense></v-text-field>
          <br />

          <v-select :items="items" label="Role" v-model="role" outlined dense></v-select>

          <div class="error" v-html="error" />
          <br />

          <v-btn class="mb-4" color="blue-grey lighten-1"
            @click="register" dark>Register</v-btn>
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
      name: '',
      role: '',
      items: ['Buyer', 'Seller'],
      error: null
      // emailRules: [
      //   v => !!v || 'E-mail is required',
      //   v => /.+@.+/.test(v) || 'E-mail must be valid'
      // ]
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          name: this.name,
          role: this.role
        })
        this.$router.push('/')
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

.v-select {
  width: 250px;
}

.panel {
  width: 700px;
  margin-top: 50px;
}

</style>
