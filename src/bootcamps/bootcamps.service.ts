import { Injectable } from '@nestjs/common';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bootcamp } from './entities/bootcamp.entity';

@Injectable()
export class BootcampsService {
 constructor(@InjectRepository(Bootcamp) private bootcampRepository:Repository<Bootcamp>){}


  create(createBootcampDto: CreateBootcampDto) {
    //crear la instancia del obj a guardar
     
    const nuevoBootcamps = this.bootcampRepository.create(createBootcampDto);
    
    return this.bootcampRepository.save(nuevoBootcamps)
  }

  findAll() {
    return this.bootcampRepository.find();
  }

  findOne(id: number) {
    return this.bootcampRepository.findOneBy({id : id});
  }

  async update(id: number, updateBootcampDto: UpdateBootcampDto) {
    // Seleccionar el bootcamp cuto id sea el del parametro
    const updBootcamp = await this.bootcampRepository.findOneBy({id :id});

    // fucionar los cambios con el objeto hallado
   await this.bootcampRepository.merge(updBootcamp, updateBootcampDto)

  //  Garbar cambios en la bd
  await this.bootcampRepository.save(updBootcamp)
   return updBootcamp
  }

  async remove(id: number): Promise<string> {
    // Encuentra el registro antes de eliminarlo
    const deletbootcamp = await this.bootcampRepository.findOneBy({ id: id });
  
    if (!deletbootcamp) {
      throw new Error(`Bootcamp con ID ${id} no encontrado`);
    }
  
    // Elimina el registro encontrado
    await this.bootcampRepository.remove(deletbootcamp);
  
    // Retorna un mensaje de éxito
    return `Bootcamp con ID ${id} eliminado correctamente.`;
  }
  
} 
