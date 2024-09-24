import { Router } from 'express'
import CartController from '../../controllers/carts.controllers.js';
import TicketController from '../../controllers/ticket.controllers.js';
import { passportCall } from '../../middlewares/passportCall.middleware.js'
import { authorization } from "../../middlewares/authorization.middleware.js";

const router = Router()

const {
    createCart,
    getCart,
    addCart,
    deleteCartProduct,
    deleteCart, updateCartProduct,addManyCartProducts}= new CartController()

const {purchase} = new TicketController()

router.post('/', createCart)
router.get('/:cid', getCart)
router.post('/:cid/product/:pid',addCart)
router.delete('/:cid/product/:pid',deleteCartProduct)
router.delete('/:cid',deleteCart)
router.put('/:cid',addManyCartProducts)
router.put('/:cid/product/:pid',updateCartProduct)
router.post('/:cid/purchase',passportCall('jwt'),authorization('user','premium'), purchase)

export default router