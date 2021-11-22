<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Product List">
          <v-row no-gutters>
            <v-btn class="mx-2 mt-2" fab small dark color="grey darken-1">
              <v-icon @click="navigateTo({name: 'addProduct'})" dark>mdi-plus</v-icon>
            </v-btn>
            <v-spacer class="mr-12 pr-12" />
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search mx-12" hide-details />
          </v-row>
          <v-data-table :headers="headers" :items="productList" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-5" small @click="openDialog(item)">mdi-pencil</v-icon>
              <v-icon small @click="openConfirmationDialog(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" dark width="500">
            <v-card>
              <v-card-title class="headline">Edit Product</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="editedProduct.productId"
                  disabled
                  label="ID of the product"
                ></v-text-field>
                <v-text-field
                  v-model="editedProduct.productName"
                  label="Name of the product"
                ></v-text-field>
                <v-text-field
                  v-model="editedProduct.status"
                  label="Status of the product"
                ></v-text-field>
                <v-text-field
                  v-model="editedProduct.stock"
                  label="Quantity of product in inventory"
                ></v-text-field>
                <v-text-field
                  v-model="editedProduct.price"
                  label="Price of the product"
                ></v-text-field>
                <v-text-field
                  v-model="editedProduct.createdAt"
                  disabled
                  label="Date of the product been made"
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
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import SellerService from '@/services/SellerService'

export default {
  data () {
    return {
      search: null,
      dialog: false,
      confirmationDialog: false,
      editedProductIndex: 0,
      error: null,
      editedProduct: {
        productId: null,
        productName: null,
        status: null,
        stock: null,
        price: null,
        createdAt: null
      },
      headers: [
        {
          text: 'ID',
          sortable: false,
          value: 'productId'
        },
        { text: 'Name', value: 'productName', align: 'center'},
        { text: 'Status', value: 'status', align: 'center'},
        { text: 'Created Date', value: 'createdAt', align: 'center'},
        { text: '', value: 'actions', sortable: false}
      ],
      productList: []
    }
  },
  async mounted () {
    // do a request to the backend for all the products
    this.productList = (await SellerService.showProduct()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    openDialog (item) {
      this.editedProductIndex = this.productList.indexOf(item)
      this.editedProduct = Object.assign({}, item)
      this.dialog = true
      this.error = null
    },
    async save () {
      try {
        await SellerService.editProduct({
          productId: this.editedProduct.productId,
          productName: this.editedProduct.productName,
          status: this.editedProduct.status,
          stock: this.editedProduct.stock,
          price: this.editedProduct.price
        })
        this.productList[this.editedProductIndex].productName = this.editedProduct.productName
        this.productList[this.editedProductIndex].status = this.editedProduct.status
        this.productList[this.editedProductIndex].stock = this.editedProduct.stock
        this.productList[this.editedProductIndex].price = this.editedProduct.price
        this.dialog = false
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    openConfirmationDialog (item) {
      this.editedProductIndex = this.productList.indexOf(item)
      this.editedProduct = Object.assign({}, item)
      this.confirmationDialog = true
    },
    async deleteProduct () {
      await SellerService.deleteProduct({
        productId: this.editedProduct.productId
      })
      this.productList.splice(this.editedProductIndex, 1)
      this.confirmationDialog = false
    }
  },
  components: {
    Panel
  },
}
</script>

<style scoped>
.search {
  width: 1px;
  margin-left: 1000px;
}
</style>
