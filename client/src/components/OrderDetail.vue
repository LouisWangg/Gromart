<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Order Detail">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="orderDetail" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn v-if="item.status == 'Unpaid'" @click="payment(item)">Pay</v-btn>
            </template>
          </v-data-table>
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
      headers: [
        { text: 'Name', value: 'Product.productName', align: 'center' },
        { text: 'Quantity', value: 'quantity', align: 'center', width: '200px' },
        { text: 'Price', value: 'price', align: 'center', width: '200px' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: '', value: 'actions', sortable: false, width: '150px' }
      ],
      orderDetail: [],
    }
  },
  async mounted () {
    this.orderDetail = (await BuyerService.showOrderDetail({orderListId: this.$route.params.orderListId})).data
  },
  methods: {
    async payment (item) {
      await BuyerService.payment({orderDetailId: item.orderDetailId})
      this.editedOrderDetailIndex = this.orderDetail.indexOf(item)
      this.orderDetail[this.editedOrderDetailIndex].status = "Requested"
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
