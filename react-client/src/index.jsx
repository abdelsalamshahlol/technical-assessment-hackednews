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
            topTen: [],
            newsTabActive: true,
            authorsTabActive: false,
        }
    }

    componentDidMount() {
        axios.get('/api/story')
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    topTen: data
                })
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
                        <a href="#" className="nav-link active" onClick={() => this.switch()}> <h3 className="display-4"> Top Ten Stories </h3></a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={() => this.switch()}><h3 className="display-4"> Top Ten Stories </h3></a>
                    </li>
                </ul>
                {this.state.newsTabActive && <TopTen topTenStories={this.state.topTen} />}
                {this.state.authorsTabActive && < TopTenAuthors />}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

