import { Injectable, NotFoundException } from '@nestjs/common';
import {  v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO} from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Carolla'
        // }, 
    ]

    findAll() {
        return this.cars;
    }

    findOneById( id: string ) {

        const car = this.cars.find( car => car.id === id );

        if( !car ) throw new NotFoundException(`Car with id: ${id}, Not Found`);
        

        return car;
    }

    create( createCarDTO: CreateCarDTO ) {
        
        const car: Car = {
            id: uuid(),
            ...createCarDTO
        }

        this.cars.push( car );

        return car;
    }

    update( id: string, updateCarDTO: UpdateCarDTO ) {

        let carDB = this.findOneById( id );

        if( updateCarDTO.id && updateCarDTO.id !== id ) {
            throw new NotFoundException(`Car with id: ${id}, Not Found`);
        }

        this.cars = this.cars.map( car => {

            if( car.id === id ) {
                carDB = {
                    ...carDB,
                    ...updateCarDTO,
                    id
                }
                return carDB;
            }

            return car;
        });

        return carDB;
    }

    delete( id: string ) {
        const car = this.findOneById( id );

        if(  !car ) throw new NotFoundException(`Car with id: ${id}, Not Found`);

        this.cars = this.cars.filter( car => car.id !== id );

        return car;
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars;
        return this.cars;
    }
}
