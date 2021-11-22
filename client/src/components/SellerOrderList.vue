<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Order List">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="orderDetail" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn v-if="item.status == 'Requested'" @click="approveOrder(item)" color="grey lighten-3">Approve</v-btn>
            </template>
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
        { text: 'ID', value: 'orderDetailId', align: 'center' },
        { text: 'Buyer Name', value: 'Product.Seller.User.name', align: 'center' },
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
    this.orderDetail = (await SellerService.showOrderList({sellerId: this.$store.state.seller.sellerId})).data
  },
  methods: {
    async approveOrder (item) {
      await SellerService.approveOrder({orderDetailId: item.orderDetailId})
      this.editedOrderDetailIndex = this.orderDetail.indexOf(item)
      this.orderDetail[this.editedOrderDetailIndex].status = "Accepted"
    }
  }
}
</script>

<style scoped>
.search {
  width: 400px;
  margin-left: 720px;
}
</style>
