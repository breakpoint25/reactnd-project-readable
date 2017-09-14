import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class CreatePostForm extends Component {
  renderInputField(field) {
    return (
      <FormGroup>
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl type="text" placeholder={field.label} {...field.input} />
        <div className="error danger">
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
        <div className="error danger">
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
        <div className="error danger">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </FormGroup>
    )
  }

  onSubmit = values => {
    this.props.action(values)
    // TODO - make this a call back that pends on success response of post added
    this.props.history.push('/')
  }

  render() {
    return (
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

CreatePostForm  = reduxForm({
  form: 'CreatePostForm',
  validate,
  enableReinitialize : true,
})(CreatePostForm)

// This form pushes url changes and is not directly
// hooked up to a Route so it needs to import withRouter
CreatePostForm  = withRouter(CreatePostForm)

export default CreatePostForm
