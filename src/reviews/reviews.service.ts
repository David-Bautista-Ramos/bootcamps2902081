import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private bootcampRepository:Repository<Review>){}

  create(createReviewDto: CreateReviewDto) {
    const nuevoRewie = this.bootcampRepository.create(createReviewDto);
    
    return this.bootcampRepository.save(nuevoRewie)
  }

  findAll() {
    return this.bootcampRepository.find();
  }

  findOne(id: number) {
    return this.bootcampRepository.findOneBy({id : id});
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    // Seleccionar el bootcamp cuto id sea el del parametro
    const updRewie = await this.bootcampRepository.findOneBy({id :id});

    // fucionar los cambios con el objeto hallado
   await this.bootcampRepository.merge(updRewie, updateReviewDto)

  //  Garbar cambios en la bd
  await this.bootcampRepository.save(updRewie)
   return updRewie
  }

  async remove(id: number) {
    const deletRewie = await this.bootcampRepository.findOneBy({ id: id });
  
    if (!deletRewie) {
      throw new Error(`Bootcamp con ID ${id} no encontrado`);
    }
  
    // Elimina el registro encontrado
    await this.bootcampRepository.remove(deletRewie);
  
    // Retorna un mensaje de éxito
    return `Reviews con ID ${id} eliminado correctamente.`;
  }
}
