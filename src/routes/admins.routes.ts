import { Router } from 'express';
import { getRepository } from 'typeorm';
import AdminsController from '../app/controllers/AdminController';
import Admins from '../app/models/Admins';

const adminRouter = Router();

adminRouter.post('/', async (request, response) => {
    const adminsController = new AdminsController();
    try {
        const { enrollment, password } = request.body;
        const admin = await adminsController.store({
            enrollment,
            password,
        });
        // delete admin.password;

        return response.json(admin);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

adminRouter.get('/', async (request, response) => {
    const adminsRepository = getRepository(Admins);
    const admin = await adminsRepository.find();

    return response.json(admin);
});

adminRouter.delete('/:id', async (request, response) => {
    const adminsRepository = getRepository(Admins);
    const { id } = request.params;
    await adminsRepository.delete(id);

    return response.send('Admin account deleted');
});

export default adminRouter;
