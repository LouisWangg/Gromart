<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Seller List">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="sellerList" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-5" small @click="openDialog(item)">mdi-pencil</v-icon>
              <v-icon v-if="item.status !== 'Active'" @click="editStatus(item)">mdi-account-check</v-icon>
              <v-icon v-if="item.status == 'Active'" @click="editStatus(item)">mdi-account-cancel</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" dark width="500">
            <v-card>
              <v-card-title class="headline">Edit Limit</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="editedSeller.limit"
                  label="Limit of products that can be made"
                ></v-text-field>
                <div class="error" v-html="error" />
                <br />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-2 mb-4 mr-2" @click="save">Save</v-btn>
                <v-btn color="red darken-2 mb-4" @click="dialog = false, error = null">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            Seller status has been changed
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
import AdminService from '@/services/AdminService'

export default {
  components: {
    Panel
  },
  data () {
    return {
      search: null,
      dialog: false,
      error: null,
      snackbar: false,
      timeout: 2000,
      editedSellerIndex: 0,
      editedSeller: {
        sellerId: 0,
        limit: 0,
        status: ''
      },
      headers: [
        { text: 'ID', align: 'center', sortable: false, value: 'sellerId' },
        { text: 'Name', value: 'User.name', align: 'center' },
        { text: 'Registration Date', value: 'createdAt', align: 'center', filterable: false } ,
        { text: 'Limit', value: 'limit', align: 'center', filterable: false },
        { text: 'Active Product', value: 'Product.activeProduct', align: 'center'},
        { text: 'Status', value: 'status', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      sellerList: []
    }
  },
  async mounted () {
    // do a request to the backend for all the products
    this.sellerList = (await AdminService.showSeller()).data
  },
  methods: {
    openDialog (item) {
      this.editedSellerIndex = this.sellerList.indexOf(item)
      this.editedSeller = Object.assign({}, item)
      this.dialog = true
    },
    async save () {
      try {
        await AdminService.editLimit({
          sellerId: this.editedSeller.sellerId,
          limit: this.editedSeller.limit
        })
        this.sellerList[this.editedSellerIndex].limit = this.editedSeller.limit
        this.dialog = false
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async editStatus (item) {
      this.snackbar = true
      if (item.status == "Inactive" || item.status == "Requested") {
        this.editedSeller.status = "Active"
        await AdminService.editStatus({
          sellerId: item.sellerId,
          status: this.editedSeller.status
        })
        this.editedSellerIndex = this.sellerList.indexOf(item)
        this.sellerList[this.editedSellerIndex].status = this.editedSeller.status
      } else if (item.status == "Active") {
        this.editedSeller.status = "Inactive"
        await AdminService.editStatus({
          sellerId: item.sellerId,
          status: this.editedSeller.status
        })
        this.editedSellerIndex = this.sellerList.indexOf(item)
        this.sellerList[this.editedSellerIndex].status = this.editedSeller.status
      }
    },
  }
}
</script>

<style scoped>
.search {
  width: 400px;
  margin-left: 720px;
}

.v-data-table {
  margin-bottom: 10px;
}

</style>
