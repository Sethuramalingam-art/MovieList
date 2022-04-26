import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
// import Home from './components/Home/Home';
// import MovieDetail from './components/MovieDetail/MovieDetail';
// import PageNotFound from './components/PageNotFound/PageNotFound';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Home = lazy(() => import('./components/Home/Home'));
const MovieDetail = lazy(() => import('./components/MovieDetail/MovieDetail'));
const PageNotFound = lazy(() =>
          import('./components/PageNotFound/PageNotFound')
);
const AddMovie = lazy(() => import('./components/AddMovie/AddMovie'));

function App() {
          return (
                    <div className="App">
                              <Router>
                                        <Header></Header>
                                        <div className="container">
                                                  <Suspense
                                                            fallback={
                                                                      <div>
                                                                                Loading...
                                                                      </div>
                                                            }
                                                  >
                                                            <Routes>
                                                                      <Route
                                                                                path="/"
                                                                                element={
                                                                                          <Home />
                                                                                }
                                                                      />
                                                                      <Route
                                                                                path="/createmovie"
                                                                                element={
                                                                                          <AddMovie />
                                                                                }
                                                                      />
                                                                      <Route
                                                                                path="/movie/:imdbID"
                                                                                element={
                                                                                          <MovieDetail />
                                                                                }
                                                                      />
                                                                      <Route
                                                                                path="*"
                                                                                element={
                                                                                          <PageNotFound />
                                                                                }
                                                                      />
                                                            </Routes>
                                                  </Suspense>
                                        </div>
                                        <Footer></Footer>
                              </Router>
                    </div>
          );
}

export default App;
