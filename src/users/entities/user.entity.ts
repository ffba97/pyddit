import { Role } from "src/roles/entities/role.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    email:string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @Column({ nullable: true })
    authStrategy: string

    @OneToOne(() => Role)
    @JoinColumn()
    rol: Role
}
