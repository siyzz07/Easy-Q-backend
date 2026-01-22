import experss from 'express'
import { isCustomer, isVendor, verifyToken } from '../middlewares/authTokenVerify'
import { walletControllerInstance } from '../di/commonDi'

const walletRoutes = experss.Router()

walletRoutes.get('/customer-wallet',verifyToken,isCustomer,walletControllerInstance.getCustomerWalletData)
walletRoutes.get('/vendor-wallet',verifyToken,isVendor,walletControllerInstance.getVendorWalletData)
export default walletRoutes