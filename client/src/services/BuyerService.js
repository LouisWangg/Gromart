import Api from '@/services/Api'

export default {
  showProduct () {
    return Api().get('buyerProductList')
  },
  addToCart (product) {
    return Api().post('addToCart', product)
  },
  showCart (buyerId) {
    return Api().get('buyerCartList', buyerId)
  },
  editQuantity(productQuantity) {
    return Api().put('editQuantity', productQuantity)
  },
  deleteProduct (cartId) {
    return Api().delete('deleteCartProduct', {
      data: { cartId: cartId }
    })
  },
  checkout(product) {
    return Api().put('checkout', product)
  },
  clearCart() {
    return Api().delete('clearCart')
  },
  showOrderList(buyerId) {
    return Api().post('buyerOrderList', buyerId)
  },
  showOrderDetail(orderListId) {
    return Api().post('buyerOrderDetail', orderListId)
  },
  payment(orderDetailId) {
    return Api().put('payment', orderDetailId)
  },
  buyerHeader(buyerId) {
    return Api().post('buyerHeader', buyerId)
  }
}
