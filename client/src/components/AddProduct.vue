<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col align="center" cols="8">
        <panel title="Add Product">
          <v-text-field label="Product Name" v-model="productName"></v-text-field>
          <br />

          <v-text-field label="Stock" v-model="stock"></v-text-field>
          <br />

          <v-text-field label="Price" v-model="price" ></v-text-field>
          <br />

          <div class="error" v-html="error" />
          <br />

          <v-btn class="mb-4" color="blue-grey lighten-1" @click="addProduct" dark>ADD</v-btn>
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
      productName: null,
      stock: null,
      price: null,
      sellerId: null,
      limit: null,
      error: null
    }
  },
  methods: {
    async addProduct () {
      try {
        await SellerService.addProduct({
          productName: this.productName,
          stock: this.stock,
          price: this.price,
          sellerId: this.$store.state.seller.sellerId,
          limit: this.$store.state.seller.limit,
        })
        this.$router.push({
          name: 'sellerProductList'
        })
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
</style>
