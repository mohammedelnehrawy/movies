import { Subscription } from 'rxjs';
import { Imovie } from '../imovie';
import { MyServiceService } from './../my-service.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Imovie[] = [];
  moviesSub: Subscription = new Subscription();
  imgPath: string = 'https://image.tmdb.org/t/p/w500';
  getMoviesData(): void {
    this.moviesSub = this.MyServiceService.getMovies().subscribe({
      next: (res) => {
        console.log(res.results);
        this.movies = res.results;
      },
      error: () => {},
    });
  }
  ngOnInit(): void {
    this.getMoviesData();
  }
  private readonly MyServiceService = inject(MyServiceService);

  ngOnDestroy(): void {
    this.moviesSub.unsubscribe();
  }
}
