import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';


@Controller('cars')
// @UsePipes( ValidationPipe ) 
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }) ) id: string ) {

        return {
            car: this.carsService.findOneById(id)
        }
    }

    @Post()
    createCar( @Body() createCarDTO: CreateCarDTO ) {
        
        return this.carsService.create(createCarDTO);
    }

    @Patch(':id')
    updateCar( 
        @Param('id', new ParseUUIDPipe({ version: '4', errorHttpStatusCode: 422 }) ) id: string,
        @Body() updateCarDTO: UpdateCarDTO   
    ) {

        return this.carsService.update(id, updateCarDTO);
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe ) id: string ) {
        return this.carsService.delete(id);
    }
}
