<template>
    <v-card class="mb-8">
        <v-toolbar dense class="blue-grey lighten-1" dark>
            <v-toolbar-title class="mr-2 ml-2">Gromart</v-toolbar-title>
            <v-divider class="mx-4" color="white" inset vertical />
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller == null && $store.state.buyer == null" class="mr-6 header">
                <span @click="navigateTo({name: 'adminSellerList'})">Seller List</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller == null && $store.state.buyer == null" class="mr-6 header">
                <span @click="navigateTo({name: 'adminBuyerList'})">Buyer List</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller == null && $store.state.buyer == null" class="header">
                <span @click="navigateTo({name: 'adminProductList'})">Product List</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'sellerProductList'})">Product List</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'sellerOrderList'})">Order List</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'report'})">Report</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.buyer !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'buyerProductList'})">Product List</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.buyer !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'cart'})">Cart</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.buyer !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'buyerOrderList'})">Order List</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.buyer !== null" class="mr-6 header">
                <span @click="navigateTo({name: 'profile'})">Profile</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-title v-if="!$store.state.isLoggedIn" class="mr-8 header">
                <span @click="navigateTo({name: 'root'})">Login</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="!$store.state.isLoggedIn" class="mr-4 header">
                <span @click="navigateTo({name: 'register'})">Register</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.seller !== null" class="mr-4">
                <span>Limit : {{ $store.state.seller.limit }}</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.buyer !== null" class="mr-4">
                <span>Credit : {{ buyerList.data.remainingCredit }}</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="$store.state.isLoggedIn && $store.state.buyer !== null" class="mr-4">
                <span>Invoice : {{ buyerList.data.remainingInvoice }}</span>
            </v-toolbar-title>

            <v-toolbar-title v-if="$store.state.isLoggedIn" class="mr-4 header">
                <span @click="logout">Logout</span>
            </v-toolbar-title>
        </v-toolbar>
    </v-card>
</template>

<script>
import BuyerService from '@/services/BuyerService'

export default {
    data () {
        return {
            buyerList: []
        }
    },
    async mounted () {
        // do a request to the backend for all the products
        this.buyerList = (await BuyerService.buyerHeader({buyerId: this.$store.state.buyer.buyerId}))
    },
    methods: {
        navigateTo (route) {
            this.$router.push(route)
        },
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$store.dispatch('setSeller', null)
            this.$store.dispatch('setBuyer', null)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.header {
  cursor: pointer;
}

.header:hover {
  color: black;
}
</style>
