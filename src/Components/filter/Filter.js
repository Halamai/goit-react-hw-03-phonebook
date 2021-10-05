import React from "react";
import s from "./Filter.module.css";

const Filter = ({ filter, onHandleFilter }) => {
  return (
    <label className={s.filterinput}>
      Find contacs by name:
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onHandleFilter}
      />
    </label>
  );
};

export default Filter;
