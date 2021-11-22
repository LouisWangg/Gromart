import Api from '@/services/Api'

export default {
  addProduct (product) {
    return Api().post('addProduct', product)
  },
  showProduct () {
    return Api().get('sellerProductList')
  },
  editProduct (product) {
    return Api().put('editProduct', product)
  },
  deleteProduct (productId) {
    return Api().delete('deleteProduct', {
      data: { productId: productId }
    })
  },
  showOrderList(sellerId) {
    return Api().post('sellerOrderList', sellerId)
  },
  approveOrder(orderDetailId) {
    return Api().put('approveOrder', orderDetailId)
  },
  showReport(sellerId) {
    return Api().post('report', sellerId)
  },
  fetchData(sellerId) {
    return Api().post('fetchData', sellerId)
  }
}
