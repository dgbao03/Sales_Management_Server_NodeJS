import Order from "../models/Order.js";

class OrderService {
    static async getOrders() {
        try {
            const orders = await Order.getOrders();
            return orders;
        } catch (error) {
            throw error;
        }
    }

    static async getOrderById(id) {
        try {
            const { order, totalBill }= await Order.getOrderById(id);

            if (!order) {
                throw new Error('404-NOTFOUND');
            }

            return { order, totalBill };
        } catch (error) {
           throw error;
        }
    }

    static async createOrder(order){
        try {
            if (!order.makhachhang || !order.manhanvien || !order.ngaydathang || !order.noigiaohang) {
                throw new Error('400-NULL');
            }
            const newOrder = await Order.createOrder(order);
            if (!newOrder) {
                throw new Error();
            }
            return newOrder;
        } catch (error) {
            throw error;
        }
    }

    static async updateOrder(id, order){
        try {
            if (!order.makhachhang || !order.manhanvien || !order.ngaydathang || !order.noigiaohang) {
                throw new Error('400-NULL');
            }

            const updatedOrder = await Order.updateOrder(id, order);

            if (!updatedOrder) {
                throw new Error("404-NOTFOUND");
            }

            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }

    static async deleteOrder(id){
        try {
            const deletedOrder = await Order.deleteOrder(id);
            return deletedOrder;
        } catch (error) {
            throw error;
        }
    }
    
}

export default OrderService;