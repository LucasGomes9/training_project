import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Employees from '../models/Employees';
import Upload from '../../config/upload';

interface Request {
    id: string;
    avatar: string;
}

class AvatarController {
    public async update({ id, avatar }: Request): Promise<Employees> {
        const employeesRepository = getRepository(Employees);

        const employee = await employeesRepository.findOne({
            where: { id },
        });

        if (!employee) {
            throw new Error('Employee do not exists');
        }

        if (employee.avatar) {
            const AvatarPath = path.join(
                Upload.directory,
                employee.avatar,
            );
            const employeeAvatarExists = await fs.promises.stat(
                AvatarPath,
            );
            if (employeeAvatarExists) {
                await fs.promises.unlink(AvatarPath);
            }
        }
        employee.avatar = avatar;

        await employeesRepository.save(employee);

        return employee;
    }
}

export default AvatarController;
