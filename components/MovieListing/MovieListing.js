import React from 'react';
import { render } from 'react-dom';
import Slider from 'react-slick';
import { settings } from '../../common/settings.js'; // for react slick settings for slider
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.scss';
const MovieListing = () => {
          const movies = useSelector(getAllMovies);
          const shows = useSelector(getAllShows);
          let renderMovies,
                    renderShows = '';
          renderMovies =
                    movies.Response === 'True' ? (
                              movies.Search.map((movie, i) => {
                                        return (
                                                  <MovieCard
                                                            key={i}
                                                            data={movie}
                                                  />
                                        );
                              })
                    ) : (
                              <div className="movies-error">
                                        <h3>{movies.Error}</h3>
                              </div>
                    );

          renderShows =
                    shows.Response === 'True' ? (
                              shows.Search.map((show, i) => {
                                        return (
                                                  <MovieCard
                                                            key={i}
                                                            data={show}
                                                  />
                                        );
                              })
                    ) : (
                              <div className="movies-error">
                                        <h3>{shows.Error}</h3>
                              </div>
                    );

          return (
                    <div className="movie-wrapper">
                              <div className="movie-list">
                                        <h2>Movies</h2>
                                        <div
                                                  style={{
                                                            margin: '0 5px',
                                                            cursor: 'pointer',
                                                  }}
                                        >
                                                  <span
                                                            style={{
                                                                      fontSize: '20px',
                                                            }}
                                                  >
                                                            +
                                                  </span>
                                                  Movie
                                        </div>
                                        <div className="movie-container">
                                                  <Slider {...settings}>
                                                            {renderMovies}
                                                  </Slider>
                                        </div>
                              </div>

                              <div className="movie-list">
                                        <h2>Shows</h2>
                                        <div className="movie-container">
                                                  <Slider {...settings}>
                                                            {renderShows}
                                                  </Slider>
                                        </div>
                              </div>
                    </div>
          );
};
export default MovieListing;
