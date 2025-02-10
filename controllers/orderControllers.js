import OrderDetailService from "../services/OrderDetailServices.js";
import OrderService from "../services/OrderServices.js";

// DONE
export const getOrders = async (req, res) => {
    try {
        const orders = await OrderService.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DONE
export const getOrderById = async (req, res) => {
    try {
        const { order, totalBill } = await OrderService.getOrderById(req.params.id);
        res.status(200).json({ order, totalBill });
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Order not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const createOrder = async (req, res) => {
    try {
        const order = req.body.order;
        const orderDetail = req.body.orderDetail;

        const newOrder = await OrderService.createOrder(order);
        const newOrderDetails = await OrderDetailService.createOrderDetail(newOrder, orderDetail);

        res.status(201).json({ message: 'Order created successfully!', newOrder, newOrderDetails });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const updateOrder = async (req, res) => {
    try {
        const order = req.body.order;
        const orderDetail = req.body.orderDetail;

        const updateOrder = await OrderService.updateOrder(req.params.id, order);
        const updateOrderDetails = await OrderDetailService.updateOrderDetail(req.params.id, orderDetail);

        res.status(200).json({ message: 'Order updated successfully!', updateOrder, updateOrderDetails });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

// DONE
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderService.deleteOrder(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
