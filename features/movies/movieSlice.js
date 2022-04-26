import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieapi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import BooksDataService from '../../services/books.service';
import { useDispatch } from 'react-redux';

// create actions for list of the movies
export const fetchAsyncMovies = createAsyncThunk(
          'movies/fetchAsyncMovies',
          async (term) => {
                    // <------------------- before included data service  ------------------>
                    // const movieText = 'Harry';
                    // const response = await movieapi
                    //           .get(`?apiKey=${APIKey}&s=${term}&type=movie`)
                    //           .catch((err) => {
                    //                     console.log('Err:' + err);
                    //           });
                    // <------------------- included data service  ------------------>
                    const response = await BooksDataService.get(term);
                    return response.data;
          } // this is the function from home.js b4 it should be in sync action creator in home.js now it is async
);

// create actions for list of the shows => go to extrareducers
export const fetchAsyncShows = createAsyncThunk(
          'movies/fetchAsyncShows',
          async (seriesText) => {
                    // const seriesText = 'Friends';
                    const response = await movieapi
                              .get(
                                        `?apiKey=${APIKey}&s=${seriesText}&type=series`
                              )
                              .catch((err) => {
                                        console.log('Err:' + err);
                              });
                    return response.data;
          } // this is the function from home.js b4 it should be in sync action creator in home.js now it is async
);

export const fetchAsyncMoviesOrShowsDetails = createAsyncThunk(
          'movies/fetchAsyncMoviesOrShowsDetails',
          async (id) => {
                    const response = await movieapi
                              .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
                              .catch((err) => {
                                        console.log('Err:' + err);
                              });
                    return response.data;
          }
);

export const createMovies = createAsyncThunk(
          'movies/createmoviesdetails',
          async (data) => {
                    const response = await BooksDataService.create(data);
                    return response;
          }
);

//settingup initial state for an app
const initialState = {
          movies: {},
          shows: {},
          selectedMoviesOrShows: {},
};

//create a slice
// syncronous action creators

// from syncronous action creators to async action creators we go for middleware thunk
const movieSlice = createSlice({
          name: 'movies', // name of the slice
          initialState, // initial state
          reducers: {
                    // this reducers for sync action creators
                    addMovies: (state, { payload }) => {
                              // addMovies is action creators that is actions
                              state.movies = payload;
                              // {...state, payload}  => this old redux way without RTK we could update a state using payload with mutability but in RTK it will handle mutability inbuilt
                    },
                    removeSelectedMovieOrShow: (state) => {
                              // this function will clean up the previously selected movieor show details
                              // means when u click on one movie in listing and go back select other movies means state holds the old movie selections for a sec so for that one we need to clear the state and add new movie object on state
                              state.selectedMoviesOrShows = {};
                    },
          },
          extraReducers: {
                    //fetchAsyncMovies => defined b4 in the slice which is used for api call
                    [fetchAsyncMovies.pending]: () => {
                              console.log('Pending');
                    },
                    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
                              console.log('fulfilled');
                              console.log(state);
                              return { ...state, movies: payload };
                    },
                    [fetchAsyncMovies.rejected]: () => {
                              console.log('rejected');
                    },
                    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
                              console.log('fulfilled');
                              console.log(state);
                              return { ...state, shows: payload };
                    },
                    [fetchAsyncMoviesOrShowsDetails.fulfilled]: (
                              state,
                              { payload }
                    ) => {
                              return {
                                        ...state,
                                        selectedMoviesOrShows: payload,
                              };
                    },
          }, // while we have common action functions we need to use.
});
export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies; //(state, slice name => movies, slice property it is in initial state value => movies)

export const getAllShows = (state) => state.movies.shows;

export const getSelectMovieOrShow = (state) =>
          state.movies.selectedMoviesOrShows;

export default movieSlice.reducer;
