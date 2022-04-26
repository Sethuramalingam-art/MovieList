import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddMovie extends React.Component {
          constructor(props) {
                    super(props);
                    this.changeMovieName = this.changeMovieName.bind(this);
                    this.handleRating = this.handleRating.bind(this);
                    this.createMovie = this.createMovie.bind(this);
                    this.state = {
                              movieName: '',
                              movieRating: '',
                    };
          }

          changeMovieName(e) {
                    this.setState({ movieName: e.target.value });
                    console.log(this); //  this.changeMovieName = this.changeMovieName.bind(this); ==> after done this only we can acheive 'this' variable as addmovie component else this line wont come means 'this' will be undefined
          }
          handleRating(e) {
                    this.setState({ movieRating: e.target.value });
          }

          createMovie() {
                    console.log(this.state);
          }
          render() {
                    return (
                              <div>
                                        <h2>Add Movie</h2>
                                        <div className="formGroup">
                                                  <label> Movie Name : </label>
                                                  <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            value={
                                                                      this.state
                                                                                .movieName
                                                            }
                                                            onChange={
                                                                      this
                                                                                .changeMovieName
                                                            }
                                                            name="movieName"
                                                  />
                                        </div>
                                        <div className="formGroup">
                                                  <label>
                                                            {' '}
                                                            Movie Rating :{' '}
                                                  </label>
                                                  <select
                                                            name="movieRating"
                                                            value={
                                                                      this.state
                                                                                .movieRating
                                                            }
                                                            onChange={
                                                                      this
                                                                                .handleRating
                                                            }
                                                  >
                                                            <option value="select">
                                                                      select
                                                            </option>
                                                            <option value="*">
                                                                      *(1)
                                                            </option>
                                                            <option value="**">
                                                                      **(2)
                                                            </option>
                                                            <option value="***">
                                                                      ***(3)
                                                            </option>
                                                            <option value="****">
                                                                      ****(4)
                                                            </option>
                                                            <option value="*****">
                                                                      *****(5)
                                                            </option>
                                                  </select>
                                        </div>
                                        <button
                                                  onClick={this.createMovie}
                                                  className="btn btn-success"
                                        >
                                                  Submit
                                        </button>
                              </div>
                    );
          }
}
export default connect(null, {})(AddMovie);
