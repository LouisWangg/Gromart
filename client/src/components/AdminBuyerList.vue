<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Buyer List">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="buyerList" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="editCreditInvoice(item)">mdi-pencil</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" dark width="500">
            <v-card>
              <v-card-title class="headline">Edit Limit</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="editedBuyer.creditLimit"
                  label="Limit of credit that can be used"
                ></v-text-field>
                <v-text-field
                  v-model="editedBuyer.invoiceLimit"
                  label="Limit of invoice that can be made"
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
      editedBuyerIndex: 0,
      editedBuyer: {
        buyerId: 0,
        creditLimit: 0,
        invoiceLimit: 0
      },
      headers: [
        { text: 'ID', value: 'buyerId', sortable: false, align: 'center' },
        { text: 'Name', value: 'User.name', align: 'center' },
        { text: 'Credit Limit', value: 'creditLimit', filterable: false, align: 'center' },
        { text: 'Remaining Credit', value: 'remainingCredit', filterable: false, align: 'center' },
        { text: 'Invoice Limit', value: 'invoiceLimit', filterable: false, align: 'center' },
        { text: 'Remaining Invoice', value: 'remainingInvoice', filterable: false, align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      buyerList: []
    }
  },
  async mounted () {
    // do a request to the backend for all the products
    this.buyerList = (await AdminService.showBuyer()).data
  },
  methods: {
    editCreditInvoice (item) {
      this.editedBuyerIndex = this.buyerList.indexOf(item)
      this.editedBuyer = Object.assign({}, item)
      this.dialog = true
    },
    async save () {
      try {
        await AdminService.editCreditInvoice({
          buyerId: this.editedBuyer.buyerId,
          creditLimit: this.editedBuyer.creditLimit,
          invoiceLimit: this.editedBuyer.invoiceLimit
        })
        this.buyerList[this.editedBuyerIndex].creditLimit = this.editedBuyer.creditLimit
        this.buyerList[this.editedBuyerIndex].invoiceLimit = this.editedBuyer.invoiceLimit
        this.dialog = false
      } catch (error) {
        this.error = error.response.data.error
      }
    }
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
