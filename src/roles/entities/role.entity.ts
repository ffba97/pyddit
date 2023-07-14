import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import { Role_description } from "./role_description.entity"

@Entity({name:"roles"})
export class Role {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    name:string

    @OneToOne(()=> Role_description)
    @JoinColumn()
    description:Role_description

}
