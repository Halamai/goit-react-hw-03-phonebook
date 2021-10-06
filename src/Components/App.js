// import axios from "axios";
import React, { Component } from "react";

import { v4 as uuidv4 } from "uuid";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    console.log(contacts);
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  // componentDidMount = () => {
  //   axios
  //     .get("https://reactdz3-default-rtdb.firebaseio.com/contacts.json")
  //     .then((res) => {
  //       if (res.data) {
  //         const keys = Object.keys(res.data);
  //         const contacts = keys.map((key) => ({ id: key, ...res.data[key] }));
  //         this.setState({ contacts });
  //       }
  //     });
  // };

  addContact = (addNewContact) => {
    if (this.isContactExist(addNewContact.name))
      return alert(`${addNewContact.name} is already in contacts`);

    this.setState((prev) => {
      return {
        contacts: [...prev.contacts, { id: uuidv4(), ...addNewContact }],
      };
    });
  };
  onHandleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  isContactExist = (name) =>
    this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  getOnHandleFilter = () =>
    this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  onDeleteContact = (e) => {
    const id = e.target.id;
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));

    // axios
    //   .delete(
    //     `https://reactdz3-default-rtdb.firebaseio.com/contacts/${id}.json`
    //   )
    //   .then(() => {
    //     this.setState((prev) => ({
    //       contacts: prev.contacts.filter((contact) => contact.id !== id),
    //     }));
    //   });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>

        <Filter
          onHandleFilter={this.onHandleFilter}
          filter={this.state.filter}
        />
        <ContactList
          getOnHandleFilter={this.getOnHandleFilter()}
          onDeleteContact={this.onDeleteContact}
        />
      </>
    );
  }
}

export default App;
