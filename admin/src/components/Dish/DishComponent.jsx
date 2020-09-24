import React from 'react';
import { useState } from 'react';
import { dishTags, dishCategories } from '../../constants';
import Fieldset from '../Fieldset';
import { useStateValue } from '../../contextState';
import './index.scss';

const DishComponent = ({
  data,
  index,
  dayName,
}) => {
  const [days, dispatch] = useStateValue();
  const [fieldValues, setFieldValue] = useState({
    dishName: data.dishName,
    tag: data.tag,
    allergens: data.allergens,
    price: data.price,
    category: data.category,
  });

  const onChange = (e, data) => {
    setFieldValue({ ...fieldValues, [e.target.name]: e.target.value });
  };

  const onBlur = (e) => {
    dispatch({
      type: 'editDish',
      dishContent: fieldValues,
      dayName,
      index,
    });
  };

  const onTagChange = (e, data) => {
    dispatch({
      type: 'editDish',
      dishContent: { ...fieldValues, tag: data.value },
      dayName,
      index,
    });
  }

  const onCategoryChange = (e, data) => {
    dispatch({
      type: 'editDish',
      dishContent: { ...fieldValues, category: data.value },
      dayName,
      index,
    });
  }

  const remove = () => {
    dispatch({
      type: 'removeDish',
      dayName,
      index,
    });
  }

  return (
    <article className={"dish"}>
      <Fieldset
        name="dishName"
        type="text"
        value={fieldValues.dishName}
        onChange={onChange}
        onBlur={onBlur}
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
        onChange={onTagChange}
        dropdownOptions={dishTags}
        isDropdown
      />
      <Fieldset
        name="allergens"
        type="text"
        value={fieldValues.allergens}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Fieldset
        name="price"
        type="number"
        value={fieldValues.price}
        onChange={onChange}
        onBlur={onBlur}
      />
      <button className="btn-remove" onClick={remove}>x</button>
    </article>
  );
}

export default DishComponent;
