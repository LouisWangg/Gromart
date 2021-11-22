<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Order List">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
          <v-data-table :headers="headers" :items="orderList" :search="search" class="elevation-1" @click:row="navigateTo">
            <template>
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
        { text: 'ID', value: 'orderListId', align: 'center', width: '150px' },
        { text: 'Total Price', value: 'totalPrice', align: 'center', width: '180px' },
        { text: 'Order Date', value: 'createdAt', align: 'center', width: '200px' },
      ],
      orderList: [],
    }
  },
  async mounted () {
    this.orderList = (await BuyerService.showOrderList({buyerId: this.$store.state.buyer.buyerId})).data
  },
  methods: {
    navigateTo: function (item, row) {    
      this.$router.push({path: '/orderDetail/' + item.orderListId})
    }
  }
}
</script>

<style scoped>
.v-data-table {
  width: 800px;
  margin-bottom: 10px;
}

.panel {
  width: 1000px;
  margin-bottom: 10px;
}

.search {
  width: 400px;
  margin-left: 380px;
}
</style>
