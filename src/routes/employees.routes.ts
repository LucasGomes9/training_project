import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import EmployeeController from '../app/controllers/EmployeeController';
import Employees from '../app/models/Employees';
import AvatarController from '../app/controllers/AvatarController';
import Authenticated from '../middleawares/ensureAuthenticated';
import Upload from '../config/upload';

const employeeRouter = Router();
const upload = multer(Upload);
employeeRouter.use(Authenticated);

employeeRouter.post('/', async (request, response) => {
    try {
        const { name, email } = request.body;
        const employeesController = new EmployeeController();

        const user = await employeesController.store({
            name,
            email,
        });

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

employeeRouter.get('/', async (request, response) => {
    const employeeRepository = getRepository(Employees);
    const user = await employeeRepository.find();

    return response.json(user);
});

employeeRouter.get('/:id', async (request, response) => {
    const employeeRepository = getRepository(Employees);
    const { id } = request.params;
    const user = await employeeRepository.findOne(id);

    return response.json(user);
});

employeeRouter.delete('/:id', async (request, response) => {
    const employeeRepository = getRepository(Employees);
    const { id } = request.params;
    await employeeRepository.delete(id);

    return response.send();
});

employeeRouter.put('/:id', async (request, response) => {
    const employeeRepository = getRepository(Employees);
    const { id } = request.params;
    const { name, email } = request.body;
    const func = await employeeRepository.findOne(id);

    if (!func) {
        throw new Error('Invalid employee');
    }

    func.name = name;
    func.email = email;

    await employeeRepository.save(func);
    return response.json(func);
});

employeeRouter.patch(
    '/avatar/:id',
    upload.single('avatar'),
    async (request, response) => {
        try {
            const avatarController = new AvatarController();
            const { id } = request.params;
            const func = await avatarController.update({
                id,
                avatar: request.file.filename,
            });
            return response.json(func);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

export default employeeRouter;
