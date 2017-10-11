import React from 'react'

const state = {
   categories: [],
   posts: [],
   comments: []
}

export function PostList() {
  return (
    <div className="post-list">
      <div className="container">
        <nav className="nav nav-pills nav-fill">
          <a className="nav-item nav-link active" href="#">All</a>
          <a className="nav-item nav-link" href="#">React</a>
          <a className="nav-item nav-link" href="#">Redux</a>
          <a className="nav-item nav-link" href="#">udacity</a>
        </nav>
        <div className="d-flex justify-content-between my-4">
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
              Order By: Votes
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item active" href="#">Votes</a>
              <a className="dropdown-item" href="#">Date</a>
            </div>
          </div>
          <button type="button" className="btn btn-outline-primary">New Post</button>
        </div>
      </div>
      <div className="container">
        <ul className="list-unstyled">
          <li className="border border-top-0 border-left-0 border-right-0 my-3">
            <h6 className="text-secondary">
              <small>React</small>
              <span className="mx-2">&middot;</span>
              <small>3h</small>
              <span className="mx-2">&middot;</span>
              <small>Carlin</small>
            </h6>
            <a href=""><h5 className="my-3">Udacity is the best place to learn React</h5></a>
            <h6 className="text-secondary d-flex justify-content-between">
              <small>5 Comments</small>
              <div className="votes">
                <span className="oi oi-caret-top mx-3"></span>
                <small>25109</small>
                <span className="oi oi-caret-bottom mx-3"></span>
              </div>
            </h6>
          </li>
          <li className="my-3">
            <h6 className="text-secondary">
              <small>React</small>
              <span className="mx-2">&middot;</span>
              <small>3h</small>
              <span className="mx-2">&middot;</span>
              <small>Carlin</small>
            </h6>
            <a href=""><h5 className="my-3">Udacity is the best place to learn React</h5></a>
            <h6 className="text-secondary d-flex justify-content-between">
              <small>5 Comments</small>
              <div className="votes">
                <span className="oi oi-caret-top mx-3"></span>
                <small>25109</small>
                <span className="oi oi-caret-bottom mx-3"></span>
              </div>
            </h6>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function PostDetail() {
  return (
    <div className="post-detail">
      <div className="container">
        <h6 className="text-secondary">
          <small>React</small>
          <span className="mx-2">&middot;</span>
          <small>3h</small>
          <span className="mx-2">&middot;</span>
          <small>Carlin</small>
        </h6>
        <h5 className="my-3">Udacity is the best place to learn React</h5>
        <p>
          Everyone says so after all.
        </p>
        <h6 className="text-secondary d-flex justify-content-end">
          <small className="mr-auto">5 Comments</small>
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Edit</a>
              <a className="dropdown-item" href="#">Delete</a>
            </div>
          </div>
          <div className="votes align-self-center">
            <span className="oi oi-caret-top mx-3"></span>
            <small>25109</small>
            <span className="oi oi-caret-bottom mx-3"></span>
          </div>
        </h6>
        <hr />
      </div>
      <div className="container">
        <div className="d-flex justify-content-between my-4">
          <div className="dropdown">
            <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
              Order Comments By: Votes
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item active" href="#">Votes</a>
              <a className="dropdown-item" href="#">Date</a>
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-outline-primary">Write a Comment</button>
        </div>
      </div>
      <div className="container">
        <ul className="list-unstyled">
          <li>
            <h6 className="text-secondary">
              <small>Carlin</small>
              <span className="mx-2">&middot;</span>
              <small>6h</small>
            </h6>
            <p>
              Everyone says so after all.
            </p>
            <h6 className="text-secondary d-flex justify-content-end">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Edit</a>
                  <a className="dropdown-item" href="#">Delete</a>
                </div>
              </div>
              <div className="votes align-self-center">
                <span className="oi oi-caret-top mx-3"></span>
                <small>25109</small>
                <span className="oi oi-caret-bottom mx-3"></span>
              </div>
            </h6>
          </li>
          <li>
            <h6 className="text-secondary">
              <small>Carlin</small>
              <span className="mx-2">&middot;</span>
              <small>6h</small>
            </h6>
            <p>
              Everyone says so after all.
            </p>
            <h6 className="text-secondary d-flex justify-content-end">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Edit</a>
                  <a className="dropdown-item" href="#">Delete</a>
                </div>
              </div>
              <div className="votes align-self-center">
                <span className="oi oi-caret-top mx-3"></span>
                <small>25109</small>
                <span className="oi oi-caret-bottom mx-3"></span>
              </div>
            </h6>
            <ul className="list-unstyled ml-5">
              <li className="border border-secondary border-top-0 border-bottom-0 px-3">
                <h6 className="text-secondary">
                  <small>Carlin</small>
                  <span className="mx-2">&middot;</span>
                  <small>6h</small>
                </h6>
                <p>
                  Everyone says so after all.
                </p>
                <h6 className="text-secondary d-flex justify-content-end">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Edit</a>
                      <a className="dropdown-item" href="#">Delete</a>
                    </div>
                  </div>
                  <div className="votes align-self-center">
                    <span className="oi oi-caret-top mx-3"></span>
                    <small>25109</small>
                    <span className="oi oi-caret-bottom mx-3"></span>
                  </div>
                </h6>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
