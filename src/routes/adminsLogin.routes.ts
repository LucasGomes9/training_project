import { Router } from 'express';
import AdminsLoginController from '../app/controllers/AdminLoginController';

const adminsLoginRouter = Router();

adminsLoginRouter.post('/', async (request, response) => {
    const adminsLoginController = new AdminsLoginController();
    try {
        const { enrollment, password } = request.body;
        const { admins, token } = await adminsLoginController.store({
            enrollment,
            password,
        });

        return response.json({ admins, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default adminsLoginRouter;
