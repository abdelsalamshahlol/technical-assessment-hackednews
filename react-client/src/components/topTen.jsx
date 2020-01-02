import React from 'react';

// Build out the view for the top ten HackerNews stories here. 
// Each story should have a title, author, and score. 
// You may wish to refactor the existing component structure - that's fine.
const TopTen = ({ topTenStories }) => (
  <div>
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
          topTenStories.map((story, i) => {
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
);

export default TopTen;