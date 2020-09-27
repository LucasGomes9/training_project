import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Admins from '../models/Admins';
import auth from '../../config/auth';

interface Request {
    enrollment: number;
    password: string;
}

interface Response {
    admins: Admins;
    token: string;
}

class AdminsSessionController {
    public async store({ enrollment, password }: Request): Promise<Response> {
        const adminsRepository = getRepository(Admins);
        const admins = await adminsRepository.findOne({
            where: { enrollment },
        });

        if (!admins) {
            throw new Error('Wrong enrollment or password');
        }

        const verifyPassword = await compare(password, admins.password);

        if (!verifyPassword) {
            throw new Error('Wrong enrollment or password');
        }

        const token = sign({}, auth.jwt.secret, {
            subject: admins.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return {
            admins,
            token,
        };
    }
}

export default AdminsSessionController;
