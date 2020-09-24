const container = document.getElementById('container');

const loadJSON = (callback) => {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'http://dev.suche-transport.at/home/data.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      document.getElementById('container').className = 'loaded';
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

const renderDishes = (dishData, dayContainer, categoryName) => {
  if (dishData.length > 0) {
    const dishCategoryHeadline = document.createElement("h3");
    const dishesContainer = document.createElement("ul");
    dishesContainer.setAttribute('itemscope', '');
    dishesContainer.setAttribute('itemtype', 'https://schema.org/MenuSection');
    dishesContainer.setAttribute('name', categoryName);

    dayContainer.appendChild(dishCategoryHeadline);
    dayContainer.appendChild(dishesContainer);

    dishCategoryHeadline.innerHTML = categoryName;

    dishData.map(dish => {
      const singleDishContainer = document.createElement("li");
      const singleDishHeadline = document.createElement("h4");
      const singleDishPrice = document.createElement("span");
      const singleDishAllergens = document.createElement("p");
      singleDishAllergens.setAttribute('class', 'allergens');
      singleDishContainer.setAttribute('itemscope', '');
      singleDishContainer.setAttribute('itemtype', 'https://schema.org/MenuItem');
      singleDishContainer.setAttribute('name', dish.dishName);

      dishesContainer.appendChild(singleDishContainer);
      singleDishContainer.appendChild(singleDishHeadline);
      singleDishContainer.appendChild(singleDishAllergens);

      singleDishHeadline.innerHTML = dish.dishName;

      if (dish.price) {
        singleDishHeadline.appendChild(singleDishPrice);
        singleDishPrice.innerHTML = `${dish.price} €`;
      }

      if (dish.allergens) {
        singleDishAllergens.innerHTML = `allergens: ${dish.allergens}`;
      }
    });
  }
}

const renderDay = (dayName, dayData) => {
  const dayContainer = document.createElement("section");
  dayContainer.setAttribute('class', 'day');
  const dayHeadline = document.createElement("h2");

  dayContainer.setAttribute('itemscope', '');
  dayContainer.setAttribute('itemtype', 'https://schema.org/Menu');
  dayContainer.setAttribute('author', 'Kiss');

  container.appendChild(dayContainer);
  dayContainer.appendChild(dayHeadline);

  if (dayData.open == true) {
    const firstDishes = dayData.dishes.filter(dish => {
      return dish.category == 1;
    });

    const secondDishes = dayData.dishes.filter(dish => {
      return dish.category == 2;
    });

    const thirdDishes = dayData.dishes.filter(dish => {
      return dish.category == 3;
    });

    renderDishes(firstDishes, dayContainer, 'First course');
    renderDishes(secondDishes, dayContainer, 'Main course');
    renderDishes(thirdDishes, dayContainer, 'Dessert');
  } else {
    const dayClosedHeadline = document.createElement("h3");
    dayContainer.appendChild(dayClosedHeadline);
    dayClosedHeadline.innerHTML = "Closed";
  }

  dayHeadline.innerHTML = dayName;
}

const createMenu = (menuData) => {
  Object.keys(menuData).map(dayName => {
    const dayData = menuData[dayName]
    renderDay(dayName, dayData);
  });
}

loadJSON(function (response) {
  var menuData = JSON.parse(response);

  createMenu(menuData);
});
