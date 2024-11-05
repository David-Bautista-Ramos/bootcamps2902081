import { PartialType } from '@nestjs/mapped-types';
import { CreateBootcampDto } from './create-bootcamp.dto';

export class UpdateBootcampDto extends PartialType(CreateBootcampDto) {
    readonly phone?:number
    readonly name? : string
    readonly averageRating?: number
    readonly address?:string
    readonly topics?:string
    readonly createdAt?:Date
}
