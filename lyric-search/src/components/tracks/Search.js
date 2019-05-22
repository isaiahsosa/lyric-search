import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle:''
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();

        axios
            .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_API_KEY
        }`
      )
      .then(res => {
          dispatch({
              type: 'SEARCH_TRACKS',
              payload: res.data.message.body.track_list
          });

          this.setState({ trackTitle: '' })
    })
      .catch(err => console.log(err));
}
    

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                    <div className="card card-body mb-4 p-4">
                        <h1 className="display-4 text-center">
                            <i className="fas fa-music"> Search For A Song</i>
                        </h1>
                        <p className="lead text-center">Find the lyrics</p>
                        <form onSubmit={this.findTrack.bind(this, dispatch)}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="" name="trackTitle" value={this.state.trackTitle} onChange={this.onChange} />
                            </div>
                        </form>
                        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit" onClick={this.findTrack.bind(this, dispatch)}> Get lyrics
                        </button>
                    </div>
                    );
                }}              
            </Consumer>
        )
    }
}

export default Search;
