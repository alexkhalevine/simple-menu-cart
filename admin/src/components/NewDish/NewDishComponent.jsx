import React from 'react';
import { useState, useEffect } from 'react';
import { useStateValue } from '../../contextState';
import Fieldset from '../Fieldset';
import {dishTags, dishCategories} from '../../constants';
import './index.scss';

const NewDishComponent = ({
  dayName,
}) => {
  const defaultState = {
    dishName: "",
    tag: "fit",
    allergens: "",
    category: "1",
  };

  const [days, dispatch] = useStateValue();
  const [fieldValues, setFieldValue] = useState(defaultState);

  const onChange = (e) => {
    setFieldValue({ ...fieldValues, [e.target.name]: e.target.value });
  };

  const addNewDish = () => {
    dispatch({
      type: 'addDish',
      dishContent: fieldValues,
      dayName,
    });

    setFieldValue(defaultState);
  }

  const onDropdownChange = (e, data) => {
    setFieldValue({ ...fieldValues, tag: data.value });
  }

  const onCategoryChange = (e, data) => {
    setFieldValue({ ...fieldValues, category: data.value });
  }

  return (
    <section className={"newDishWrapper"}>
      <h3>Add new dish</h3>
      <article className={"newDish"}>
        <Fieldset
          name="dishName"
          type="text"
          value={fieldValues.dishName}
          onChange={onChange}
          isArea
        />
        <Fieldset
          name="category"
          value={fieldValues.category}
          onChange={onCategoryChange}
          dropdownOptions={dishCategories}
          isDropdown
        />
        <Fieldset
          name="tag"
          value={fieldValues.tag}
          onChange={onDropdownChange}
          dropdownOptions={dishTags}
          isDropdown
        />
        <Fieldset
          name="allergens"
          type="text"
          value={fieldValues.allergens}
          onChange={onChange}
        />
        <Fieldset
          name="price"
          type="number"
          value={fieldValues.price}
          onChange={onChange}
        />
        <button className="btn-add" onClick={addNewDish}>+</button>
      </article>
    </section>
  );
}

export default NewDishComponent;
