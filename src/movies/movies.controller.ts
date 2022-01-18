import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAllMovies(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/search')
    search(@Query('year') searchingYear: string) {
        return `We are Searching for a Movie with a title : ${searchingYear}`
    }

    @Get('/:id')
    getOneMovie(@Param('id') id: number): Movie {
        return this.moviesService.getOne(id);
    }

    @Post()
    createMovie(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    removeMovie(@Param('id') id: number) {
        return this.moviesService.deleteOne(id);
    }

    @Patch('/:id')
    updateMovie(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(id, updateData);
    }

}
