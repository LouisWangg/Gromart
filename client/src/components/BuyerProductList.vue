<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Product List">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="productList" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="addToCart(item)" class="cartButton grey lighten-3">Add to Cart</v-btn>
            </template>
          </v-data-table>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            Product successfully added to cart
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
  data () {
    return {
      search: null,
      snackbar: false,
      timeout: 2000,
      productId: null,
      productIndex: null,
      buyerId: this.$store.state.buyer.buyerId,
      headers: [
        { text: 'Name', value: 'productName', align: 'center', width: '150px' },
        { text: 'Price', value: 'price', align: 'center', filterable: false, width: '150px' },
        { text: '', value: 'actions', sortable: false, width: '200px'}
      ],
      productList: [],
      added: []
    }
  },
  async mounted () {
    // do a request to the backend for all the products
    this.productList = (await BuyerService.showProduct()).data
  },
  methods: {
    async addToCart (item) {
      this.snackbar = true
      this.productIndex = this.productList.indexOf(item)
      if (this.added[this.productIndex] !== true) {
        await BuyerService.addToCart({
          buyerId: this.buyerId,
          productId: item.productId
        })
      }
      this.added[this.productIndex] = true
    },
  },
  components: {
    Panel
  },
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.clickable:hover {
  color: black;
}

.v-data-table {
  width: 800px;
  margin-bottom: 10px;
}

.panel {
  width: 1000px;
  margin-bottom: 10px;
}

.cartButton {
  width: 150px;
  margin-left: 50px;
}

.search {
  width: 400px;
  margin-left: 380px;
}
</style>
