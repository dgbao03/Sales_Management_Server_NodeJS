import ItemType from "../models/ItemType.js";

class ItemTypeService {
    static async getItemTypes() {
        try {
            const itemTypes = await ItemType.getItemTypes();
            return itemTypes;
        } catch (error) {
            throw error;
        }
    }

    static async getItemTypeById(id) {
        try {
            const { type, items } = await ItemType.getItemTypeById(id);

            if (!type) {
                throw new Error('404-NOTFOUND');
            }

            return { type, items };
        } catch (error) {
            throw error;
        }
    }

    static async createItemType(itemType) {
        try {
            if (!itemType.tenloaihang) {
                throw new Error('400-NULL');
            }

            const checkTypeExisted = await ItemType.checkTypeExisted(undefined, itemType);
            if (checkTypeExisted) {
                throw new Error('409-EXISTED');
            }

            const newItemType = await ItemType.createItemType(itemType);
            return newItemType;
        } catch (error) {
            throw error;
        }
    }

    static async updateItemType(id, itemType) {
        try {
            if (!itemType.tenloaihang) {
                throw new Error('400-NULL');
            }

            const checkTypeExisted = await ItemType.checkTypeExisted(id, itemType);
            if (checkTypeExisted) {
                throw new Error('409-EXISTED');
            }

            const updatedItemType = await ItemType.updateItemType(id, itemType);

            if (!updatedItemType) {
                throw new Error('404-NOTFOUND');
            }

            return updatedItemType;
        } catch (error) {
            throw error;
        }
    }

    static async deleteItemType(id) {
        try {
            await ItemType.deleteItemType(id);
        } catch (error) {
            throw error;
        }
    }
}

export default ItemTypeService;