import React, { Component } from 'react';
// import './Post.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import UpArrowIcon from 'react-icons/lib/fa/arrow-circle-o-up';
import DownArrowIcon from 'react-icons/lib/fa/arrow-circle-down';
import HomeIcon from 'react-icons/lib/fa/home';
import Moment from 'react-moment';
import API from '../utils';
import { getPost, getComments } from '../actions';

class Post extends Component {
  componentDidMount() {
    API.getPost(this.props.match.params.post_id).then(post => {
      this.props.getPost(post);
    });
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="postHeader">
            <Col className="" xs={12}>
              <Link to="/">
                <HomeIcon className="homeIcon" />
              </Link>
            </Col>
          </Row>
          <Row className="post">
            <Col className="voteScore" xs={5} sm={2}>
              <UpArrowIcon className="arrow" />
              <div className="score">{this.props.post.voteScore}</div>
              <DownArrowIcon className="arrow" />
            </Col>
            <Col className="postRow" xs={7} sm={10}>
              <div className="title">{this.props.post.title}</div>
              <div className="submittedBy">
                Submitted <Moment fromNow>
                  {this.props.post.timestamp}
                </Moment>{' '}
                by <strong>{this.props.post.author}</strong> to{' '}
                <strong>
                  <Link to={`/${this.props.post.category}`}>
                    {this.props.post.category}
                  </Link>
                </strong>
              </div>
              <div className="body"><Panel>{this.props.post.body}</Panel></div>
            </Col>
          </Row>
          <Row className="postFooter">
            <Col className="" xs={12}>
              <Button
                bsStyle="primary"
                onClick={() => {
                  this.props.history.push('/edit');
                }}
              >
                Edit
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => {
                  this.props.history.push('/delete');
                }}
              >
                Delete
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
    post: state.post,
    comments: state.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: data => dispatch(getPost(data)),
    getComments: data => dispatch(getComments(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
