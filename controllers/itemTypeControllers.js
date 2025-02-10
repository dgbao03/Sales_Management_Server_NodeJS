import ItemTypeService from "../services/ItemTypeServices.js";

// DONE
export const getItemTypes = async (req, res) => {
    try {
        const itemTypes = await ItemTypeService.getItemTypes();
        res.status(200).json(itemTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DONE
export const getItemTypeById = async (req, res) => {
    try {
        const { type, items } = await ItemTypeService.getItemTypeById(req.params.id);
        res.status(200).json({ type, items });
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Item type not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const createItemType = async (req, res) => {
    try {
        const itemType = await ItemTypeService.createItemType(req.body);
        res.status(201).json({ message: 'Item type created successfully!', itemType });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '409-EXISTED') {
            res.status(409).json({ message: 'Name of the item type is already existed! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const updateItemType = async (req, res) => {
    try {
        const itemType = await ItemTypeService.updateItemType(req.params.id, req.body);
        res.status(200).json({ message: 'Item type updated successfully!', itemType });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Item type not found! Please try again!' });
        } else if (error.message === '409-EXISTED') {
            res.status(409).json({ message: 'Name of the item type is already existed! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const deleteItemType = async (req, res) => {
    try {
        await ItemTypeService.deleteItemType(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

