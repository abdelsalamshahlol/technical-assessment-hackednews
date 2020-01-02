import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';
// import $ from 'jquery';
import axios from 'axios';
import TopTenAuthors from './components/topTenAuthors.jsx';
import AuthorSearch from './components/authorSearch.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topTenStories: [],
            topTenAuthors: [],
            newsTabActive: true,
            authorsTabActive: false,
            searchTabActive: false
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
            })
            .catch(error => {
                console.error(error);
            });
    }

    switch(tab) {
        let newsTabState = false;
        let searchTabState = false;
        let authorsTabState = false;

        if (tab === 'news') {
            newsTabState = true;
        } else if (tab === 'authors') {
            authorsTabState = true;
        } else {
            searchTabState = true;
        }

        this.setState({
            newsTabActive: newsTabState,
            authorsTabActive: authorsTabState,
            searchTabActive: searchTabState,
        });
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#" className={(this.state.newsTabActive ? "active " : '') + " nav-link"} onClick={() => this.switch('news')}>
                            <h6> Top Ten Stories </h6>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={(this.state.authorsTabActive ? "active " : '') + " nav-link"} onClick={() => this.switch('authors')}>
                            <h6> Top Ten Authors </h6>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={(this.state.searchTabActive ? "active " : '') + " nav-link"} onClick={() => this.switch('search')}>
                            <h6> Author Search </h6>
                        </a>
                    </li>
                </ul>
                {this.state.newsTabActive && <TopTen topTenStories={this.state.topTenStories} />}
                {this.state.authorsTabActive && < TopTenAuthors topTenAuthors={this.state.topTenAuthors} />}
                {this.state.searchTabActive && <AuthorSearch />}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

