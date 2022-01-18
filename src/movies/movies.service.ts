import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id: number): void {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: { title: string; year: number; genres: string[]; }) {
        this.movies.push({
            id: this.movies.length + 1,
            title: movieData.title,
            year: movieData.year,
            genres: movieData.genres
        })
    }

    update(id: number, updateData: UpdateMovieDto): void {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }


}
