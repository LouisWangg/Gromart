import Api from '@/services/Api'

export default {
  showSeller () {
    return Api().get('adminSellerList')
  },
  showBuyer () {
    return Api().get('adminBuyerList')
  },
  showProduct () {
    return Api().get('adminProductList')
  },
  detailProduct () {
    return Api().get('detailProduct')
  },
  editLimit(sellerLimit) {
    return Api().put('editSellerLimit', sellerLimit)
  },
  editStatus(sellerStatus) {
    return Api().put('editSellerStatus', sellerStatus)
  },
  editCreditInvoice(buyerCreditInvoice) {
    return Api().put('editBuyerCreditInvoice', buyerCreditInvoice)
  },
}
