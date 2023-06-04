import { Component } from 'react';
import shortid from 'shortid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { PhoneBookForm, AddButton, Message } from './ContactForm.styled';
import { Formik, Field, ErrorMessage } from 'formik';

const initialValues = {
  name: '',
  number: '',
};

function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/i.test(value)
  ) {
    error = 'Name may contain only letters, apostrophe, dash and spaces.';
  }
  return error;
}

function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
      value
    )
  ) {
    error = 'Name may contain only letters, apostrophe, dash and spaces.';
  }
  return error;
}

export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    for (const contact of this.props.contacts) {
      if (contact.name === values.name) {
        Notify.warning(`${contact.name} is already in contact`);
        resetForm();
        return;
      }
    }

    this.props.onAddContact({
      id: shortid.generate(),
      name: values.name,
      number: values.number,
    });
    resetForm();
  };

  render() {
    return (
      <Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
        <PhoneBookForm>
          <label>
            <span>Name</span>
            <ErrorMessage name="name" component={Message} />
            <Field type="text" name="name" validate={validateName} />
          </label>

          <label>
            <span>Number</span>
            <ErrorMessage name="number" component={Message} />
            <Field type="tel" name="number" validate={validateNumber} />
          </label>

          <AddButton type="submit">Add contact</AddButton>
        </PhoneBookForm>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onAddContact: PropTypes.func,
};
