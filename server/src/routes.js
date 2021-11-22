const AuthenticationController = require('./controllers/AuthenticationController')
const AdminController = require('./controllers/AdminController')
const SellerController = require('./controllers/SellerController')
const BuyerController = require('./controllers/BuyerController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProductPolicy = require('./policies/ProductPolicy')
const UserPolicy = require('./policies/UserPolicy')

module.exports = (app) => {
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)
    app.put('/editProfile', AuthenticationControllerPolicy.editProfile, AuthenticationController.editProfile)

    app.get('/adminSellerList', AdminController.showSeller)
    app.put('/editSellerLimit', UserPolicy.editLimit, AdminController.editLimit)
    app.put('/editSellerStatus', AdminController.editStatus)

    app.get('/adminBuyerList', AdminController.showBuyer)
    app.put('/editBuyerCreditInvoice', UserPolicy.editCreditInvoice, AdminController.editCreditInvoice)

    app.get('/adminProductList', AdminController.showProduct)
    app.get('/detailProduct', AdminController.detailProduct)

    app.post('/addProduct', ProductPolicy.addProduct, SellerController.addProduct)
    app.get('/sellerProductList', SellerController.showProduct)
    app.put('/editProduct', ProductPolicy.editProduct, SellerController.editProduct)
    app.delete('/deleteProduct', SellerController.deleteProduct)
    app.post('/sellerOrderList', SellerController.showOrderList)
    app.put('/approveOrder', SellerController.approveOrder)
    app.post('/report', SellerController.showReport)
    app.post('/fetchData', SellerController.fetchData)

    app.get('/buyerProductList', BuyerController.showProduct)
    app.post('/buyerHeader', BuyerController.buyerHeader)
    app.post('/addToCart', BuyerController.addToCart)
    app.get('/buyerCartList', BuyerController.showCart)
    app.put('/editQuantity', ProductPolicy.editQuantity, BuyerController.editQuantity)
    app.delete('/deleteCartProduct', BuyerController.deleteProduct)
    app.put('/checkout', BuyerController.checkout)
    app.delete('/clearCart', BuyerController.clearCart)
    app.post('/buyerOrderList', BuyerController.showOrderList)
    app.post('/buyerOrderDetail', BuyerController.showOrderDetail)
    app.put('/payment', BuyerController.payment)
}
