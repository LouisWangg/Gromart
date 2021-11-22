<template>
    <v-container>
        <v-row justify="center" no-gutters>
            <v-col align="center" cols="8">
              <panel title="Profile">
                  <v-text-field label="Name" v-model="name" disabled></v-text-field>
                  <br />

                  <v-text-field label="Email" v-model="email"></v-text-field>
                  <br />

                  <v-text-field label="Old Password" type="password" v-model="oldPassword"></v-text-field>
                  <br />

                  <v-text-field label="New Password" type="password" v-model="newPassword"></v-text-field>
                  <br />

                  <v-text-field label="Confirm New Password" type="password" v-model="confirmNewPassword"></v-text-field>
                  <br />

                  <div class="error" v-html="error" />
                  <br />

                  <v-btn color="blue lighten-2 mb-4 mr-2" @click="editProfile">Save</v-btn>
                  <v-btn color="red darken-2 mb-4" @click="error = null, oldPassword = null, newPassword = null, confirmNewPassword = null">Cancel</v-btn>
              
                  <v-snackbar v-model="snackbar" :timeout="timeout">
                    Edit profile successful
                    <template v-slot:action="{ attrs }">
                      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
                    </template>
                  </v-snackbar>
              </panel>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      dialog: false,
      userId: this.$store.state.user.userId,
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
      error: null,
      snackbar: false,
      timeout: 2000,
      editedProfileIndex: 0,
      editedProfile: {
        name: null,
        email: null,
        password: null
      },
      profile: []
    }
  },
  methods: {
    async editProfile () {
      try {
        await AuthenticationService.editProfile({
          userId: this.userId,
          email: this.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword
        })
        this.snackbar = true
        this.oldPassword = null
        this.newPassword = null
        this.confirmNewPassword = null
      } catch (error) {
        console.log(error)
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
.v-text-field {
  width: 500px;
}

.error {
  color: black;
  width: 500px;
}
</style>
