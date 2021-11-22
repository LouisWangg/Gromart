<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Cart">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="cartList" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-5" small @click="openDialog(item)">mdi-pencil</v-icon>
              <v-icon small @click="openConfirmationDialog(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" dark width="530">
            <v-card>
              <v-card-title class="headline">Edit Quantity</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="editedProduct.quantity"
                  label="Quantity of products that want to be purchased"
                ></v-text-field>
                <div class="error" v-html="error" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-2 mb-4 mr-2" @click="save">Save</v-btn>
                <v-btn color="red darken-2 mb-4" @click="dialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="confirmationDialog" dark width="500">
            <v-card>
              <v-card-title class="headline">Delete Product</v-card-title>
              <v-card-text>
                <h3 class="text-center mt-3 mb-2">Are you sure of deleting this product?</h3>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue lighten-2 mb-4 mr-2" @click="deleteProduct">Delete</v-btn>
                <v-btn color="red darken-2 mb-4" @click="confirmationDialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="error" v-html="error2" />
          <v-btn class="mt-4 mb-4" @click="checkout">Checkout</v-btn>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            Delete product successful
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
import BuyerService from '@/services/BuyerService'

export default {
  components: {
    Panel
  },
  data () {
    return {
      search: null,
      snackbar: false,
      dialog: false,
      timeout: 2000,
      confirmationDialog: false,
      editedProductIndex: 0,
      buyerId: null,
      error: null,
      error2: null,
      editedProduct: {
        cartId: null,
        quantity: null
      },
      headers: [
        { text: 'Name', value: 'Product.productName', align: 'center', width: '250px' },
        { text: 'Quantity', value: 'quantity', align: 'center', filterable: false, width: '250px' },
        { text: '', value: 'actions', sortable: false, width: '200px' }
      ],
      cartList: [],
      testing: null
    }
  },
  async mounted () {
    // do a request to the backend for all the products
    this.cartList = (await BuyerService.showCart()).data
  },
  methods: {
    openDialog (item) {
      this.editedProductIndex = this.cartList.indexOf(item)
      this.editedProduct = Object.assign({}, item)
      this.dialog = true
      this.error = null
      this.error2 = null
    },
    async save () {
      try {
        await BuyerService.editQuantity({
          cartId: this.editedProduct.cartId,
          quantity: this.editedProduct.quantity
        })
        this.cartList[this.editedProductIndex].quantity = this.editedProduct.quantity
        this.dialog = false
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async checkout () {
      try {
        await BuyerService.checkout({
          product: this.cartList,
          buyerId: this.$store.state.buyer.buyerId
        })
        // this.snackbar = true
        BuyerService.clearCart()
        this.$router.push('buyerProductList')
      } catch (error) {
        this.error2 = error.response.data.error
      }
    },
    openConfirmationDialog (item) {
      this.editedProductIndex = this.cartList.indexOf(item)
      this.editedProduct = Object.assign({}, item)
      this.confirmationDialog = true
    },
    async deleteProduct () {
      await BuyerService.deleteProduct({
        cartId: this.editedProduct.cartId
      })
      this.cartList.splice(this.editedProductIndex, 1)
      this.confirmationDialog = false
      this.snackbar = true
    },
  }
}
</script>

<style scoped>
.v-data-table {
  width: 700px;
  margin-bottom: 10px;
}

.panel {
  width: 950px;
  margin-bottom: 10px;
}

.search {
  width: 400px;
  margin-left: 280px;
}

.error {
  width: 700px;
  margin-top: 12px;
}
</style>
