import React, { Component } from 'react';
import shortid from 'shortid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';

export class App extends Component {
  state = {
    contacts: [
      { id: shortid.generate(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: shortid.generate(), name: 'Hermione Kline', number: '443-89-12' },
      { id: shortid.generate(), name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  onAddContact = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return (
      <Section title="PhoneBook">
        <ContactForm onAddContact={this.onAddContact} contacts={contacts} />
        <h2>Contacts</h2>
        <ContactFilter filter={filter} onChangeFilter={this.onChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </Section>
    );
  }
}
