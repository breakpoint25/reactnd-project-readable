import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UpArrowIcon from 'react-icons/lib/fa/arrow-circle-o-up'
import DownArrowIcon from 'react-icons/lib/fa/arrow-circle-down'
import HomeIcon from 'react-icons/lib/fa/home'
import Moment from 'react-moment'
import EditPostForm from './EditPostForm'
import CreateCommentForm from './CreateCommentForm'
import EditCommentForm from './EditCommentForm'
import {
  getPost,
  editPost,
  deletePost,
  updateVote,
  setPostToEdit,
  getComments,
  createComment,
  editComment,
  deleteComment,
  updateCommentVote,
  setCommentToEdit,
} from '../actions'
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap'

class Post extends Component {
  generateEditPostForm = post => {
    return (
      <Row className="postForm">
        <Col xs={12}>
          <h4>Edit Post</h4>
          <EditPostForm
            initialValues={{
              title: post.title,
              body: post.body,
            }}
            postId={post.id}
            action={this.props.editPost}
          />
        </Col>
      </Row>
    )
  }

  generateEditCommentsForm = comment => {
    return (
      <Row className="postForm">
        <Col xs={12}>
          <h4>Edit Comment</h4>
          <EditCommentForm
            form={`EditCommentForm-${comment.id}`}
            initialValues={{
              body: comment.body,
            }}
            commentId={comment.id}
            action={this.props.editComment}
          />
        </Col>
      </Row>
    )
  }

  generateCommentsList = () => {
    if (Object.keys(this.props.comments).length === 0) {
      return (
        <Row className="post">
          <Col xs={12}>
            <p>No comments, be the first to reply!</p>
          </Col>
        </Row>
      )
    }

    const commentIds = Object.keys(this.props.comments)

    commentIds.sort((a, b) => {
      return this.props.comments[b].voteScore - this.props.comments[a].voteScore
    })

    return commentIds.map(id => {
      const comment = this.props.comments[id]

      return (
        <Row key={comment.id} className="post">
          <Row>
            <Col className="voteScore" xs={5} sm={2}>
              <UpArrowIcon
                className="arrow"
                onClick={() => {
                  const vote = {
                    id: comment.id,
                    type: 'upVote',
                  }

                  this.props.updateCommentVote(vote)
                }}
              />
              <div className="score">{comment.voteScore}</div>
              <DownArrowIcon
                className="arrow"
                onClick={() => {
                  const vote = {
                    id: comment.id,
                    type: 'downVote',
                  }

                  this.props.updateCommentVote(vote)
                }}
              />
            </Col>
            <Col className="postRow" xs={7} sm={10}>
              <div className="submittedBy">
                <strong>{comment.author}</strong> commented{' '}
                <Moment fromNow>{comment.timestamp}</Moment>
              </div>
              <div className="body">
                <Panel>{comment.body}</Panel>
              </div>
              <Button
                bsStyle="link"
                onClick={() => {
                  this.props.setCommentToEdit(comment.id)
                }}
              >
                Edit
              </Button>
              <Button
                className="danger"
                bsStyle="link"
                onClick={() => {
                  this.props.deleteComment(comment.id)
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
          {comment.id === this.props.commentToEdit ? (
            this.generateEditCommentsForm(comment)
          ) : null}
        </Row>
      )
    })
  }

  generatePost = () => {
    // Server returns a payload with an error property if post never existed
    // or an empty payload if post was deleted. Yeah, that is odd.
    if (this.props.post.error || Object.keys(this.props.post).length === 0) {
      return (
        <Row className="post">
          <Col xs={12}>No post to show or post was removed.</Col>
        </Row>
      )
    }

    return (
      <div>
        <Row className="post">
          <Row>
            <Col xs={12}>
              <h2>{this.props.post.title}</h2>
            </Col>
            <Col className="voteScore" xs={5} sm={2}>
              <UpArrowIcon
                className="arrow"
                onClick={() => {
                  const vote = {
                    id: this.props.post.id,
                    type: 'upVote',
                  }

                  this.props.updateVote(vote)
                }}
              />
              <div className="score">{this.props.post.voteScore}</div>
              <DownArrowIcon
                className="arrow"
                onClick={() => {
                  const vote = {
                    id: this.props.post.id,
                    type: 'downVote',
                  }

                  this.props.updateVote(vote)
                }}
              />
            </Col>
            <Col className="postRow" xs={7} sm={10}>
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
              <div className="body">
                <Panel>{this.props.post.body}</Panel>
              </div>
              <Button
                bsStyle="link"
                onClick={() => {
                  this.props.setPostToEdit()
                }}
              >
                Edit
              </Button>
              <Button
                className="danger"
                bsStyle="link"
                onClick={() => {
                  this.props.deletePost(this.props.post.id)
                  // TODO - make this a call back that pends on success response of post added
                  this.props.history.push('/')
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
          <Row>
            {this.props.postToEdit ? (
              this.generateEditPostForm(this.props.post)
            ) : null}
          </Row>
        </Row>
        <Row className="post">
          <Col xs={12}>
            <h4>Create Comment</h4>
            <CreateCommentForm
              postId={this.props.post.id}
              action={this.props.createComment}
            />
          </Col>
        </Row>
        <Row className="postFooter">
          <Col className="" xs={12}>
            <h3>{Object.keys(this.props.comments).length} comments</h3>
          </Col>
        </Row>
        {this.generateCommentsList()}
      </div>
    )
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id)
    this.props.getComments(this.props.match.params.post_id)
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
          {this.generatePost()}
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.post.post,
    postToEdit: state.post.postToEdit,
    comments: state.comments.comments,
    commentToEdit: state.comments.commentToEdit,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: data => dispatch(getPost(data)),
    editPost: (data, postId) => dispatch(editPost(data, postId)),
    deletePost: data => dispatch(deletePost(data)),
    updateVote: data => dispatch(updateVote(data)),
    setPostToEdit: () => dispatch(setPostToEdit()),
    getComments: data => dispatch(getComments(data)),
    createComment: (data, postId) => dispatch(createComment(data, postId)),
    editComment: (data, commentId) => dispatch(editComment(data, commentId)),
    deleteComment: data => dispatch(deleteComment(data)),
    updateCommentVote: data => dispatch(updateCommentVote(data)),
    setCommentToEdit: data => dispatch(setCommentToEdit(data)),
  }
}

Post = connect(mapStateToProps, mapDispatchToProps)(Post)

export default Post
