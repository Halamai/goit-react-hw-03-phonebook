import React from "react";
import PropTypes from "prop-types";
import s from "./ContactList.module.css";

const ContactList = ({ getOnHandleFilter, onDeleteContact }) => {
  // console.log(getOnHandleFilter);
  return (
    <ul className={s.menu}>
      {getOnHandleFilter.map((contact) => (
        <li className={s.list} key={contact.id}>
          <span>{contact.name}: </span>
          <span>{contact.number}</span>
          <button
            className={s.btn}
            type="button"
            id={contact.id}
            onClick={onDeleteContact}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  getOnHandleFilter: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
