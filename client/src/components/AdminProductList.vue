<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Product List">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="productList" :search="search" class="elevation-1" @click:row="openDialog">
          </v-data-table>
          <v-dialog v-model="dialog" dark width="500">
            <v-card>
              <v-card-title class="headline">Detail Product</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="showedProduct.productId"
                  disabled
                  label="ID of the product"
                ></v-text-field>
                <v-text-field
                  v-model="showedProduct.productName"
                  disabled
                  label="Name of the product"
                ></v-text-field>
                <v-text-field
                  v-model="showedProduct.stock"
                  disabled
                  label="ID of the product"
                ></v-text-field>
                <v-text-field
                  v-model="showedProduct.price"
                  disabled
                  label="Name of the product"
                ></v-text-field>
                <v-text-field
                  v-model="showedProduct.status"
                  disabled
                  label="ID of the product"
                ></v-text-field>
                <v-text-field
                  v-model="showedProduct.createdAt"
                  disabled
                  label="Name of the product"
                ></v-text-field>
              </v-card-text>
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
      showedProductIndex: 0,
      showedProduct: {
        productId: null,
        productName: null,
        stock: null,
        price: null,
        status: null,
        createdAt: null
      },
      headers: [
        { text: 'Product ID', align: 'start', sortable: false, value: 'productId', align: 'center' },
        { text: 'Product Name', value: 'productName', align: 'center' },
        { text: 'Registration Date', value: 'createdAt', align: 'center' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: 'Seller ID', value: 'sellerId', align: 'center', filterable: false },
        { text: 'Seller Name', value: 'Seller.User.name', align: 'center', filterable: false }
      ],
      productList: []
    }
  },
  async mounted () {
    // do a request to the backend for all the products
    this.productList = (await AdminService.showProduct()).data
  },
  methods: {
    async openDialog (item) {
      await AdminService.detailProduct({
        productId: this.showedProduct.productId,
        productName: this.showedProduct.productName,
        stock: this.showedProduct.stock,
        price: this.showedProduct.price,
        status: this.showedProduct.status
      })
      this.showedProductIndex = this.productList.indexOf(item)
      this.showedProduct = Object.assign({}, item)
      this.dialog = true
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
