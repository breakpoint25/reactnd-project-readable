import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeIcon from 'react-icons/lib/fa/home'
import { getCategories, createPost } from '../actions'
import CreatePostForm from './CreatePostForm'
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'

class CreatePost extends Component {
  componentDidMount() {
    this.props.getCategories()
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
            <Col xs={12}>
              <h2>Create Post</h2>
              <CreatePostForm
                categories={this.props.categories}
                initialValues={this.props.initialCategory}
                action={this.props.createPost}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let defaultCategory = undefined
  if (state.categories.length !== 0) {
    defaultCategory = state.categories[0].name
  }

  return {
    initialCategory: { category: defaultCategory },
    categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    createPost: data => dispatch(createPost(data)),
  }
}

CreatePost = connect(mapStateToProps, mapDispatchToProps)(CreatePost)

export default CreatePost
