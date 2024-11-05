import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bootcamp {

@PrimaryGeneratedColumn()
id:number

@Column({type:"integer",
        nullable:true
        })
phone:number

@Column ({type:"varchar",
    nullable:true}
)
name: string

@Column({name : 'average_number'})
averageRating: number

@Column({type:"varchar",
           nullable:false,
        })
address:string

@Column({type:"varchar"})
topics:string

@Column({type:"timestamp",
            name:"created_at",
            default:()=>"CURRENT_TIMESTAMP"
        })
createdAt:Date
}