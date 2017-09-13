import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class EditCommentForm extends Component {
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
    this.props.action(values, this.props.commentId)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field label="Body" name="body" component={this.renderTextAreaField} />
        <Button bsStyle="primary" type="submit">
          Submit
        </Button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.body) {
    errors.body = 'Required'
  } else if (values.body.length < 5) {
    errors.body = 'Body must be atleast 5 characters long'
  }

  return errors
}

EditCommentForm = reduxForm({
  validate,
})(EditCommentForm)

export default EditCommentForm
