import ItemService from '../services/ItemServices.js'

export const getItems = async (req, res) => {
    try {
        const items = await ItemService.getItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getItemById = async (req, res) => {
    try {
        const item = await ItemService.getItemById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Item not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const createItem = async (req, res) => {
    try {
        const item = await ItemService.createItem(req.body);
        res.status(201).json({ message: 'Item created successfully!', item });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const updateItem = async (req, res) => {
    try {
        const item = await ItemService.updateItem(req.params.id, req.body);
        res.status(200).json({ message: 'Item updated successfully!', item });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Item not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const deleteItem = async (req, res) => {
    try {
        await ItemService.deleteItem(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}