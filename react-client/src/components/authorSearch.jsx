import React from 'react';

const AuthorSearch = () => (
    <div className="container">
        <div className="row">
            <div className="col mt-3">
                <form action="#" method="POST">
                    <div className="form-group">
                        <label>Author Name</label>
                        <input type="text" className="form-control" placeholder="Name" />
                        <button className="btn btn-primary">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

export default AuthorSearch;
