import { Router } from 'express';
import { getRepository } from 'typeorm';
import ListController from '../app/controllers/ListController';
import TrainingController from '../app/controllers/TrainingController';
import Training from '../app/models/Training';
import Authenticated from '../middleawares/ensureAuthenticated';

const trainingRouter = Router();
trainingRouter.use(Authenticated);

trainingRouter.post('/', async (request, response) => {
    const trainingController = new TrainingController();
    try {
        const { id_employee, id_course, training_date } = request.body;
        const training = await trainingController.store({
            id_employee,
            id_course,
            training_date,
        });
        return response.json(training);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

trainingRouter.get('/', async (request, response) => {
    const trainingRepository = getRepository(Training);
    const training = await trainingRepository.find();

    return response.json(training);
});

trainingRouter.get('/:id', async (request, response) => {
    const trainingRepository = getRepository(Training);
    const { id } = request.params;
    const training = await trainingRepository.findOne(id);

    return response.json(training);
});

trainingRouter.put('/:id', async (request, response) => {
    const trainingRepository = getRepository(Training);
    const { id } = request.params;
    const { id_employee, id_course, training_date } = request.body;
    const training = await trainingRepository.findOne(id);

    if (!training) {
        throw new Error('Invalid Training');
    }

    training.id_employee = id_employee;
    training.id_course = id_course;
    training.training_date = training_date;

    await trainingRepository.save(training);
    return response.json(training);
});

trainingRouter.delete('/:id', async (request, response) => {
    const trainingRepository = getRepository(Training);
    const { id } = request.params;
    await trainingRepository.delete(id);

    return response.send();
});

trainingRouter.get('/list/:id', async (request, response) => {
    const listRepository = new ListController();
    const { id } = request.params;
    const training = await listRepository.show({
        id,
    });

    return response.json(training);
});

export default trainingRouter;
