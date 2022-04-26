import React, { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import movieapi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import { useDispatch } from 'react-redux';
import {
          addMovies,
          fetchAsyncMovies,
          fetchAsyncShows,
} from '../../features/movies/movieSlice';
const Home = () => {
          const movieText = 'Harry';
          const seriesText = 'Friends';
          const dispatch = useDispatch(); // useDispatch always in outside of call back function
          useEffect(() => {
                    // for async action creator we should use below line
                    dispatch(fetchAsyncMovies(movieText));
                    dispatch(fetchAsyncShows(seriesText));

                    //syncronous action creator without middleware . now this function shifted to slice with middleware
                    // const fetchMovies = async () => {

                    //   const response = await movieapi
                    //             .get(
                    //                       `?apiKey=${APIKey}&s=${movieText}&type=movie`
                    //             )
                    //             .catch((err) => {
                    //                       console.log('Err:' + err);
                    //             });
                    //   dispatch(addMovies(response.data)); // we should call dispatch function with action creator in slice so addmovies is from slice actions. so this will help dispatch the action to reducer and reducer take it to store.
                    //console.log('The response from API', response);
                    //};
                    //();
          }, [dispatch]);
          return (
                    <div>
                              <div className="banner-img"></div>
                              <MovieListing />
                    </div>
          );
};

export default Home;
