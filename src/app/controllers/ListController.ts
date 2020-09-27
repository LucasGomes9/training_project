import { getRepository } from 'typeorm';
import Courses from '../models/Courses';
import Employees from '../models/Employees';
import Training from '../models/Training';

interface Request {
    id: string;
}

interface Response {
    id_employee: string;
    name_employee: string;
    id_course: string;
    name_course: string;
    training_date: Date;
    training_due_date: Date;
}

class ListarController {
    public async show({ id }: Request): Promise<Response> {
        const employeesRepository = getRepository(Employees);
        const coursesRepository = getRepository(Courses);
        const trainningsRepository = getRepository(Training);

        const trainning = await trainningsRepository.findOne({
            where: { id: id },
        });
        if (!trainning) {
            throw new Error('does not exist training with this ID');
        }

        const employee = await employeesRepository.findOne({
            where: { id: trainning.id_employee },
        });
        if (!employee) {
            throw new Error('does not exist employee with this ID');
        }

        const course = await coursesRepository.findOne({
            where: { id: trainning.id_course },
        });
        if (!course) {
            throw new Error('does not exist course with this ID');
        }
        return {
            id_employee: employee.id,
            name_employee: employee.name,
            id_course: course.id,
            name_course: course.name,
            training_date: trainning.training_date,
            training_due_date: trainning.training_due_date,
        };
    }
}

export default ListarController;
