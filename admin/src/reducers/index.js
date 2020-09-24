import axios from 'axios';
import { getApiURL } from '../constants';

const writeData = async (data) => {
  try {
    await axios.post(getApiURL(), data);
  } catch (err) {
    console.log(`... could not write data, failed with ${err}`);
  }
}

const Reducer = (state, action) => {
  switch (action.type) {
    case 'addDish':
      return {
        ...state,
        [action.dayName]: {
          ...state[action.dayName],
          dishes: [...state[action.dayName].dishes, action.dishContent]
        }
      };
    case 'removeDish':
      const newStateWithDeletedDish = {
        ...state,
        [action.dayName]: {
          ...state[action.dayName],
          dishes: [...state[action.dayName].dishes.filter((dish, index) => {
            if (index != action.index) {
              return dish
            }
          })]
        }
      }

      // ---- PERSIST
      writeData(newStateWithDeletedDish);

      return newStateWithDeletedDish;
    case 'editDish':
      return {
        ...state,
        [action.dayName]: {
          ...state[action.dayName],
          dishes: Object.assign([], state[action.dayName].dishes, { [action.index]: action.dishContent })
        }
      };
    case 'saveDish':
      // ---- PERSIST
      writeData(state);

      return {
        ...state,
      };
    case 'updateOpen':
      console.log('state: ', action.open);
      return {
        ...state,
        [action.dayName]: {
          ...state[action.dayName],
          open: action.open,
        }
      };
    default:
      return state;
  }
};

export default Reducer;
