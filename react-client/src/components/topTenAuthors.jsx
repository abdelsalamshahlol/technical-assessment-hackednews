import React from 'react';

const TopTenAuthors = ({ topTenAuthors }) => (
    <div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Karma</th>
                    <th>About</th>
                </tr>
            </thead>
            <tbody>
                {
                    topTenAuthors.map((story, i) => {
                        return (
                            <tr key={i}>
                                <td>{story.id}</td>
                                <td>{story.karma}</td>
                                <td dangerouslySetInnerHTML={{ __html: story.about }}></td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    </div>
);

export default TopTenAuthors;