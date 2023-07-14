import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


@Entity({name:"role_description"})
export class Role_description{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    crear_post:boolean

    @Column()
    editar_post:boolean

    @Column()
    borrar_post:boolean
    
    @Column()
    moderar_post:boolean

    @Column()
    crear_comentario:boolean

    @Column()
    editar_comentario:boolean

    @Column()
    borrar_comentario:boolean

    @Column()
    moderar_comentario:boolean
}