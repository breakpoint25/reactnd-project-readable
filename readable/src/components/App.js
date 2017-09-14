import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UpArrowIcon from 'react-icons/lib/fa/arrow-circle-o-up'
import DownArrowIcon from 'react-icons/lib/fa/arrow-circle-down'
import HomeIcon from 'react-icons/lib/fa/home'
import Moment from 'react-moment'
import {
  getPosts,
  deletePost,
  updateVote,
  sortByPosts,
  setPostToEdit,
} from '../actions'
import {
  Grid,
  Row,
  Col,
  Button,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'

class App extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.match.params.category)
  }

  generatePostsList = () => {
    if (Object.keys(this.props.posts).length === 0) {
      return (
        <Row className="post">
          <Col xs={12}>No posts to show in this category.</Col>
        </Row>
      )
    }

    const postIds = Object.keys(this.props.posts)

    if (this.props.sortBy === 'timestampDesc') {
      postIds.sort((a, b) => {
        return this.props.posts[b].timestamp - this.props.posts[a].timestamp
      })
    } else if (this.props.sortBy === 'voteScoreDesc') {
      postIds.sort((a, b) => {
        return this.props.posts[b].voteScore - this.props.posts[a].voteScore
      })
    }

    return postIds.map(id => {
      const post = this.props.posts[id]

      return (
        <Row key={post.id} className="post">
          <Col className="voteScore" xs={5} sm={2}>
            <UpArrowIcon
              className="arrow"
              onClick={() => {
                const vote = {
                  id: post.id,
                  type: 'upVote',
                }

                this.props.updateVote(vote)
              }}
            />
            <div className="score">{post.voteScore}</div>
            <DownArrowIcon
              className="arrow"
              onClick={() => {
                const vote = {
                  id: post.id,
                  type: 'downVote',
                }

                this.props.updateVote(vote)
              }}
            />
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
              <p className="commentCount">
                <Link to={`/${post.category}/${post.id}#comment-section`}>
                  {post.comments} comments
                </Link>
              </p>
            </div>
            <Button
              bsStyle="link"
              onClick={() => {
                this.props.setPostToEdit(true)
                this.props.history.push(`/${post.category}/${post.id}`)
              }}
            >
              Edit
            </Button>
            <Button
              className="danger"
              bsStyle="link"
              onClick={() => {
                this.props.deletePost(post.id)
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      )
    })
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
              <DropdownButton
                id="sort"
                bsStyle="default"
                title="Sort order"
                onSelect={eventKey => {
                  this.props.sortByPosts(eventKey)
                }}
              >
                <MenuItem
                  eventKey="voteScoreDesc"
                  active={this.props.sortBy === 'voteScoreDesc' ? true : false}
                >
                  Top score
                </MenuItem>
                <MenuItem
                  eventKey="timestampDesc"
                  active={this.props.sortBy === 'timestampDesc' ? true : false}
                >
                  Date submitted
                </MenuItem>
              </DropdownButton>
            </Col>
          </Row>

          {this.generatePostsList()}

          <Row className="postFooter">
            <Col xs={12}>
              <Button
                bsStyle="primary"
                onClick={() => {
                  this.props.history.push('/create')
                }}
              >
                Create Post
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    sortBy: state.posts.sortBy,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: data => dispatch(getPosts(data)),
    deletePost: data => dispatch(deletePost(data)),
    updateVote: data => dispatch(updateVote(data)),
    sortByPosts: data => dispatch(sortByPosts(data)),
    setPostToEdit: data => dispatch(setPostToEdit(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
