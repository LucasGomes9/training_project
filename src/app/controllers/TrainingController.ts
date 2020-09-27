import { getRepository } from 'typeorm';
import { startOfHour, parseISO, addHours } from 'date-fns';
import Course from '../models/Courses';
import Employees from '../models/Employees';
import Training from '../models/Training';

interface Request {
    id_employee: string;
    id_course: string;
    training_date: string;
}

class TrainingController {
    public async store({
        id_employee,
        id_course,
        training_date,
    }: Request): Promise<Training> {
        const employeesRepository = getRepository(Employees);
        const coursesRepository = getRepository(Course);
        const TrainingRepository = getRepository(Training);

        const employees = await employeesRepository.findOne({
            where: { id: id_employee },
        });

        if (!employees) {
            throw new Error('does not exist employee with this ID');
        }

        const Courses = await coursesRepository.findOne({
            where: { id: id_course },
        });

        if (!Courses) {
            throw new Error('does not exist course with this ID');
        }

        const trainingDate = startOfHour(parseISO(training_date));
        const trainingDueDate = addHours(
            trainingDate,
            Courses.course_workload,
        );

        const treinamento = TrainingRepository.create({
            id_employee,
            id_course,
            training_date: trainingDate,
            training_due_date: trainingDueDate,
        });

        await TrainingRepository.save(treinamento);

        return treinamento;
    }
}

export default TrainingController;
