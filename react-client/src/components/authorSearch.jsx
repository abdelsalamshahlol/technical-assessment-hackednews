import React from 'react';

class AuthorSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            posts: [],
            query: null
        }
    }

    updateQuery(e) {
        this.setState({
            query: e.target.value
        });
    }

    getPosts(event) {
        event.preventDefault();
        console.log(232)
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
                    this.state.userId &&
                    <div className="row">
                        <div className="col">
                            <h6>Showing results for {this.state.userId}</h6>
                        </div>
                    </div>
                }
                {this.state.posts}
            </div>
        );
    }
}


export default AuthorSearch;
