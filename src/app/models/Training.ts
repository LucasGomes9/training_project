import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Courses from './Courses';
import Employees from './Employees';

@Entity('training')
class Training {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    id_employee: string;

    @ManyToOne(() => Employees)
    @JoinColumn({ name: 'id_employee' })
    employee_id: Employees;

    @Column('uuid')
    id_course: string;

    @ManyToOne(() => Courses)
    @JoinColumn({ name: 'id_course' })
    course_id: Courses;

    @Column()
    training_date: Date;

    @Column()
    training_due_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Training;
