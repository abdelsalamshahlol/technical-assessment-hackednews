import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';
// import $ from 'jquery';
import axios from 'axios';
import TopTenAuthors from './components/topTenAuthors.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topTenStories: [],
            topTenAuthors: [],
            newsTabActive: true,
            authorsTabActive: false,
        }
    }

    componentDidMount() {
        // Get top ten stories
        axios.get('/api/story')
            .then(({ data }) => {
                // Get top ten authors for the top ten stories
                let authors = data.map((post) => {
                    return post.by;
                }).sort((a, b) => {
                    return a.karma - b.karma;
                });

                this.setState({
                    topTenStories: data,
                    topTenAuthors: authors,
                });
                console.log(data, authors);
            })
            .catch(error => {
                console.error(error);
            });
    }

    switch() {
        this.setState({
            newsTabActive: !this.state.newsTabActive,
            authorsTabActive: !this.state.authorsTabActive,
        })
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#" className={(this.state.newsTabActive ? "active " : '') + " nav-link"} onClick={() => this.switch()}> <h3 className="display-4"> Top Ten Stories </h3></a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={(this.state.authorsTabActive ? "active " : '') + " nav-link"} onClick={() => this.switch()}><h3 className="display-4"> Top Ten Stories </h3></a>
                    </li>
                </ul>
                {this.state.newsTabActive && <TopTen topTenStories={this.state.topTenStories} />}
                {this.state.authorsTabActive && < TopTenAuthors topTenAuthors={this.state.topTenAuthors} />}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

