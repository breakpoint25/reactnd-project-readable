import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import UpArrowIcon from 'react-icons/lib/fa/arrow-circle-o-up';
import DownArrowIcon from 'react-icons/lib/fa/arrow-circle-down';
import HomeIcon from 'react-icons/lib/fa/home';
import Moment from 'react-moment';
import { getPosts } from '../actions';
import {
  Grid,
  Row,
  Col,
  Button,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

class App extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.match.params.category);
  }

  generatePostsList = () => {
    if (Object.keys(this.props.posts).length === 0) {
      return (
        <Row className="post">
          <Col xs={12}>No posts to show in this category.</Col>
        </Row>
      );
    }

    return Object.keys(this.props.posts).map(key => {
      const post = this.props.posts[key];

      return (
        <Row key={post.id} className="post">
          <Col className="voteScore" xs={5} sm={2}>
            <UpArrowIcon className="arrow" />
            <div className="score">{post.voteScore}</div>
            <DownArrowIcon className="arrow" />
          </Col>
          <Col className="postRow" xs={7} sm={10}>
            <Link className="title" to={`/${post.category}/${post.id}`}>
              {post.title}
            </Link>
            <div className="submittedBy">
              Submitted <Moment fromNow>{post.timestamp}</Moment> by{' '}
              <strong>{post.author}</strong> to{' '}
              <strong>
                <Link to={`/${post.category}`}>{post.category}</Link>
              </strong>
            </div>
          </Col>
        </Row>
      );
    });
  };

  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="postHeader">
            <Col className="" xs={12}>
              <Link to="/">
                <HomeIcon className="homeIcon" />
              </Link>
              <DropdownButton id="sort" bsStyle="default" title="Sort order">
                <MenuItem eventKey="1" active>
                  Date suvmitted
                </MenuItem>
                <MenuItem eventKey="2">Top score</MenuItem>
              </DropdownButton>
            </Col>
          </Row>

          {this.generatePostsList()}

          <Row className="postFooter">
            <Col className="" xs={12}>
              <Button
                bsStyle="primary"
                onClick={() => {
                  this.props.history.push('/create');
                }}
              >
                Create Post
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: data => dispatch(getPosts(data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
