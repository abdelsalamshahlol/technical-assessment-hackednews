import React from 'react';
import axios from 'axios';

class AuthorSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            posts: [],
        }
    }

    updateQuery(e) {
        this.setState({
            userId: e.target.value
        });
    }

    getPosts(event) {
        event.preventDefault();
        // Make a call to backend to get the data for that user
        axios.get(`/api/story/${this.state.userId}`)
            .then(({ data }) => {
                console.log(data);
                this.setState({
                    posts: data
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col mt-3">
                        <form action="#" method="POST" onSubmit={(e) => { this.getPosts(e) }}>
                            <label>Author Name</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Name" onInput={(e) => { this.updateQuery(e) }} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    this.state.posts.length ? (
                        <div>
                            <div className="row">
                                <div className="col">
                                    <h6>Showing results for {this.state.userId}</h6>
                                </div>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.posts.map((story, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{story.title}</td>
                                                    <td>{story.by.id}</td>
                                                    <td>{story.score}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : ''

                }
            </div>
        );
    }
}


export default AuthorSearch;
