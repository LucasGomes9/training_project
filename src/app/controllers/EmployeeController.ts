import { getRepository } from 'typeorm';
import Employees from '../models/Employees';

interface Request {
    name: string;
    email: string;
}

class FuncionariosController {
    public async store({ name, email }: Request): Promise<Employees> {
        const employeesRepository = getRepository(Employees);

        const verifyEmployee = await employeesRepository.findOne({
            where: { email },
        });

        if (verifyEmployee) {
            throw new Error('Email already registered, pick another one');
        }

        const user = employeesRepository.create({
            name,
            email,
        });

        await employeesRepository.save(user);

        return user;
    }
}

export default FuncionariosController;
