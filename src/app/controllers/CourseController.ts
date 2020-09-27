import { getRepository } from 'typeorm';
import Courses from '../models/Courses';

interface Request {
    name: string;
    course_workload: number;
}

class CursosController {
    public async store({
        name,
        course_workload,
    }: Request): Promise<Courses> {
        const courseRepository = getRepository(Courses);

        const verifyCourse = await courseRepository.findOne({
            where: { name },
        });

        if (verifyCourse) {
            throw new Error('Course already registered');
        }

        const user = courseRepository.create({
            name,
            course_workload,
        });

        await courseRepository.save(user);

        return user;
    }
}

export default CursosController;
