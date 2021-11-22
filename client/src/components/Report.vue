<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Report">
          <v-row no-gutters>
            <download-excel :fetch="fetchData" >
              <v-btn class="ml-2 mt-3 green darken-3" dark>Download Report</v-btn>
            </download-excel>
            <v-spacer class="mr-12 pr-12" />
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search mx-12" hide-details />
          </v-row>
          <v-data-table :headers="headers" :items="orderDetail" :search="search" class="elevation-1">
          </v-data-table>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import SellerService from '@/services/SellerService'

export default {
  components: {
    Panel
  },
  data () {
    return {
      search: null,
      editedOrderDetailIndex: null,
      headers: [
        { text: 'Product Name', value: 'Product.productName', align: 'center' },
        { text: 'Order Date', value: 'createdAt', align: 'center' },
        { text: 'Quantity', value: 'quantity', align: 'center' },
        { text: 'Price', value: 'price', align: 'center' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      orderDetail: [],
    }
  },
  async mounted () {
    this.orderDetail = (await SellerService.showReport({sellerId: this.$store.state.seller.sellerId})).data
  },
  methods: {
    async fetchData () {
      const data = await SellerService.fetchData({sellerId: this.$store.state.seller.sellerId})
      return data.data
    },
  }
}
</script>

<style scoped>
.search {
  width: 1px;
  margin-left: 1000px;
}
</style>
