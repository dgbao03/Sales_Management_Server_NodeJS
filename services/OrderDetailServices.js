import OrderDetail from "../models/OrderDetail.js";

class OrderDetailService {
    static async createOrderDetail(newOrder, orderDetail) {
        try {
            const newOrderDetail = await OrderDetail.createOrderDetail(newOrder, orderDetail);
            return newOrderDetail;
        } catch (error) {
            throw error;
        }
    }

    static async updateOrderDetail(id, orderDetail) {
        try {
            const updatedOrderDetail = await OrderDetail.updateOrderDetail(id, orderDetail);
            return updatedOrderDetail;
        } catch (error) {
            throw error;
        }
    }
}

export default OrderDetailService;