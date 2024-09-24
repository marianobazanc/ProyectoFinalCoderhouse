
import { UserDao, ProductDao, CartDao, TicketDao } from "../daos/factory.js"
import ProductRepositories  from "../repositories/product.repositories.js";
import CartRepositories  from "../repositories/cart.repositories.js";
import UserRepositories  from "../repositories/user.repositories.js";
import TicketRepositories  from "../repositories/ticket.repositories.js";

export const productService = new ProductRepositories(new ProductDao())
export const cartService = new CartRepositories(new CartDao())
export const userService = new UserRepositories(new UserDao())
export const ticketService = new TicketRepositories(new TicketDao())