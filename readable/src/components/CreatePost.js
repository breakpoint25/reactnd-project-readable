import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';
import { Field, reduxForm } from 'redux-form';
import { getCategories } from '../actions';
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
} from 'react-bootstrap';

class CreatePost extends Component {
  renderInputField(field) {
    return (
      <FormGroup>
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl type="text" placeholder={field.label} {...field.input} />
      </FormGroup>
    );
  }

  renderSelectField = field => {
    const renderOptionList = field.options.map(option => {
      return (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      );
    });

    return (
      <FormGroup>
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl componentClass="select" {...field.input}>
          {renderOptionList}
        </FormControl>
      </FormGroup>
    );
  };

  renderTextAreaField(field) {
    return (
      <FormGroup>
        <ControlLabel>{field.label}</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder={field.label}
          {...field.input}
        />
      </FormGroup>
    );
  }

  componentDidMount() {
    this.props.getCategories();
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
              <form>
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
                  name="Category"
                  label="Category"
                  options={this.props.categories}
                />

                <Field
                  label="Body"
                  name="body"
                  component={this.renderTextAreaField}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: data => dispatch(getCategories(data)),
  };
}

CreatePost = reduxForm({
  form: 'CreatePost',
})(CreatePost);

CreatePost = connect(mapStateToProps, mapDispatchToProps)(CreatePost);

export default CreatePost;
