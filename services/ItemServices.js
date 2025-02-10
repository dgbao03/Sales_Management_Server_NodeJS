import Item from '../models/Item.js';

class ItemService {
    static async getItems() {
        try {
            const items = await Item.getItems();
            return items;
        } catch (error) {
            throw error;
        }
    }

    static async getItemById(id) {
        try {
            const item = await Item.getItemById(id);
            if (!item) {
                throw new Error('404-NOTFOUND');
            }
            return item;
        } catch (error) {
            throw error;
        }
    }

    static async createItem(item) {
        try {
            if (!item.tenhang || !item.macongty || !item.maloaihang || !item.soluong || !item.donvitinh || !item.giahang) {
                throw new Error('400-NULL');
            }

            const newItem = await Item.createItem(item);
            return newItem;
        } catch (error) {
            throw error;
        }
    }

    static async updateItem(id, item) {
        try {
            if (!item.tenhang || !item.macongty || !item.maloaihang || !item.soluong || !item.donvitinh || !item.giahang) {
                throw new Error('400-NULL');
            }

            const updatedItem = await Item.updateItem(id, item);
            return updatedItem;
        } catch (error) {
            throw error;
        }
    }

    static async deleteItem(id) {
        try {
            await Item.deleteItem(id);
        } catch (error) {
            throw error;
        }
    }
}

export default ItemService;