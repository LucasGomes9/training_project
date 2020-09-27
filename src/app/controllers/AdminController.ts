import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Admins from '../models/Admins';

interface Request {
    enrollment: number;
    password: string;
}

class AdminsController {
    public async store({ enrollment, password }: Request): Promise<Admins> {
        const adminsRepository = getRepository(Admins);

        const admins = await adminsRepository.find();

        if (admins.length === 2) {
            throw new Error('Limit reached, max 2 admin ');
        }

        const adminsEnrollmentExist = await adminsRepository.findOne({
            where: { enrollment },
        });

        if (adminsEnrollmentExist) {
            throw new Error('Already exists admin with this enrollment');
        }

        const hashedPassword = await hash(password, 8);

        const admin = adminsRepository.create({
            enrollment,
            password: hashedPassword,
        });

        await adminsRepository.save(admin);

        // delete admin.password;
        return admin;
    }
}

export default AdminsController;
