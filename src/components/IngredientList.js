import _ from 'lodash';
import React from 'react';
import Ingredient from './Ingredient';

const IngredientList = ({ ingredients }) => {
  return (
    <div>
      {_.map(ingredients, (ingredient) => {
        return (
          <div className='ingredient-grid' key={ingredient.id}>
            <Ingredient {...ingredient} />
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;
