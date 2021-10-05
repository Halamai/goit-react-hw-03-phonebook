import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";
import axios from "axios";

class ContactForm extends Component {
  state = {
    // contacts: [],
    name: "",
    number: "",
  };

  onHandleChenge = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://reactdz3-default-rtdb.firebaseio.com/contacts.json",
        this.state
      )
      .then((res) =>
        this.props.addContact({ ...this.state, id: res.data.name })
      )
      .catch((err) => console.log(err))
      .finally(() => {
        this.reset();
      });
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <form className={s.namelist} onSubmit={this.onHandleSubmit}>
        <label>
          Name:
          <input
            className={s.nameinput}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.onHandleChenge}
          />
        </label>
        <label>
          Number:
          <input
            className={s.nameinput}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.onHandleChenge}
          />
        </label>
        <button className={s.btncon} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

export default ContactForm;
