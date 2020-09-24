import React, { useState, useEffect } from 'react';
import {dishCategories} from '../../constants';
import { useStateValue } from '../../contextState';
import Dish from '../Dish';
import NewDish from '../NewDish';
import './index.scss';

const DayComponent = ({
  name,
  open,
  dishes,
}) => {
  const [days, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(open);

  const save = () => {
    dispatch({
      type: 'saveDish',
      days,
    })
  }

  const onBlur = () => {
    setIsOpen(!isOpen);

    setTimeout(() => {
      dispatch({
        type: 'updateOpen',
        open: !isOpen,
        dayName: name,
      });
    }, 100)
  };

  const getDishByCategory = (category) => {
      return dishes.map((dish, index) => {
        const { dishName } = dish;
        if (dish.category == category) {
          return (
            <Dish
              key={`${dishName}_${index}`}
              index={index}
              data={dish}
              dayName={name}
            />
          )
        }
      })
  }

  return (
    <section className="day">
      <header>
        <h2>{name} <small>{isOpen ? "(open)" : "(closed)"}</small></h2>
        <label className="switch">
          <input type="checkbox" defaultChecked={isOpen} onChange={() => onBlur()}/>
          <span className="slider round"></span>
        </label>
      </header>
          {dishCategories.map((category, index) => {
            const dishList= getDishByCategory(index+1);

            if (dishList.length > 0) {
              return (
                <>
                  <h3>{category.text}</h3>
                  {dishList}
                </>
              );
            }
          })}

          <NewDish
            dayName={name}
          />
      <button className="btn" onClick={save}>save</button>
    </section>
  )
}

export default DayComponent;
