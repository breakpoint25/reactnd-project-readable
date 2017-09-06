import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeIcon from 'react-icons/lib/fa/home'
import { Field, reduxForm } from 'redux-form'
import { getCategories, createPost } from '../actions'
import {
  Grid,
  Row,
  Col,
  Button,
  // DropdownButton,
  // MenuItem,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'

class CreatePost extends Component {
  renderInputField(field) {
    return (
      <FormGroup className="has-danger">
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl type="text" placeholder={field.label} {...field.input} />
        <div className="danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormGroup>
    )
  }

  renderSelectField(field) {
    const renderOptionList = field.options.map(option => {
      return (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      )
    })

    return (
      <FormGroup>
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl componentClass="select" {...field.input}>
          {renderOptionList}
        </FormControl>
        <div className="danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormGroup>
    )
  }

  renderTextAreaField(field) {
    return (
      <FormGroup>
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder={field.label}
          {...field.input}
        />
        <div className="danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormGroup>
    )
  }

  onSubmit = values => {
    this.props.history.push('/')
    this.props.createPost(values)
  }

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
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  label="Title"
                  name="title"
                  component={this.renderInputField}
                />

                <Field
                  label="Author"
                  name="author"
                  component={this.renderInputField}
                />

                <Field
                  component={this.renderSelectField}
                  label="Category"
                  name="category"
                  options={this.props.categories}
                />

                <Field
                  label="Body"
                  name="body"
                  component={this.renderTextAreaField}
                />

                <Button bsStyle="primary" type="submit">
                  Submit
                </Button>
                <Button
                  bsStyle="danger"
                  onClick={() => {
                    this.props.history.push('/')
                  }}
                >
                  Cancel
                </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 5) {
    errors.title = 'Title must be atleast 5 characters long'
  }

  if (!values.author) {
    errors.author = 'Required'
  } else if (values.author.length < 5) {
    errors.author = 'Author must be atleast 5 characters long'
  }

  if (!values.category) {
    errors.category = 'Required'
  }

  if (!values.body) {
    errors.body = 'Required'
  } else if (values.body.length < 5) {
    errors.body = 'Body must be atleast 5 characters long'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    createPost: data => dispatch(createPost(data)),
  }
}

CreatePost = reduxForm({
  form: 'CreatePost',
  validate,
})(CreatePost)

CreatePost = connect(mapStateToProps, mapDispatchToProps)(CreatePost)

export default CreatePost
