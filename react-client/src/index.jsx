import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';
// import $ from 'jquery';
import axios from 'axios';
import TopTenAuthors from './components/topTenAuthors.jsx';

// const App = (props) => <TopTen />;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topTen: [],
            newsTabActive: true
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

            });
    }

    render() {
        return (
            <div>
                {this.state.newsTabActive && <TopTen topTenStories={this.state.topTen} />}
                < TopTenAuthors />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

