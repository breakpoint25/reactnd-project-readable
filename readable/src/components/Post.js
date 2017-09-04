import React, { Component } from 'react';
// import './Post.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import UpArrowIcon from 'react-icons/lib/fa/arrow-circle-o-up';
import DownArrowIcon from 'react-icons/lib/fa/arrow-circle-down';
import HomeIcon from 'react-icons/lib/fa/home';
import Moment from 'react-moment';
import { getPost, getComments } from '../actions';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id);
    this.props.getComments(this.props.match.params.post_id);
  }

  generateCommentsList = () => {
    if (Object.keys(this.props.comments).length === 0) {
      return (
        <Row className="post">
          <Col xs={12}>No comments to show in this post.</Col>
        </Row>
      );
    }

    return Object.keys(this.props.comments).map(key => {
      const comment = this.props.comments[key];

      return (
        <Row key={comment.id} className="post">
          <Col className="voteScore" xs={5} sm={2}>
            <UpArrowIcon className="arrow" />
            <div className="score">{comment.voteScore}</div>
            <DownArrowIcon className="arrow" />
          </Col>
          <Col className="postRow" xs={7} sm={10}>
            <div className="submittedBy">
              <strong>{comment.author}</strong> commented <Moment fromNow>{comment.timestamp}</Moment>
            </div>
            <div className="body"><Panel>{comment.body}</Panel></div>
            <Button
            bsStyle="link"
            onClick={() => {
              this.props.history.push('/edit');
            }}
          >
            Edit
          </Button>
          <Button
            bsStyle="link"
            onClick={() => {
              this.props.history.push('/delete');
            }}
          >
            Delete
          </Button>
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

          {this.generateCommentsList()}

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
