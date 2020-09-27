import { Router } from 'express';
import { getRepository } from 'typeorm';
import CourseController from '../app/controllers/CourseController';
import Course from '../app/models/Courses';
import authentication from '../middleawares/ensureAuthenticated';

const courseRouter = Router();
courseRouter.use(authentication);

courseRouter.post('/', async (request, response) => {
    try {
        const { name, course_workload } = request.body;
        const courseController = new CourseController();

        const user = await courseController.store({
            name,
            course_workload,
        });
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

courseRouter.get('/', async (request, response) => {
    const courseRepository = getRepository(Course);
    const user = await courseRepository.find();

    return response.json(user);
});

courseRouter.get('/:id', async (request, response) => {
    const courseRepository = getRepository(Course);
    const { id } = request.params;
    const user = await courseRepository.findOne(id);

    return response.json(user);
});

courseRouter.delete('/:id', async (request, response) => {
    const courseRepository = getRepository(Course);
    const { id } = request.params;
    await courseRepository.delete(id);

    return response.send();
});

courseRouter.put('/:id', async (request, response) => {
    const courseRepository = getRepository(Course);
    const { id } = request.params;
    const { name, course_workload } = request.body;

    const course = await courseRepository.findOne(id);

    if (!course) {
        throw new Error('does not exist this course');
    }

    course.name = name;
    course.course_workload = course_workload;

    await courseRepository.save(course);
    return response.json(course);
});

export default courseRouter;
