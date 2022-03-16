import React, { useContext } from 'react';
import Recipe from './Recipe';
import { GlobalContext } from './App';
import _ from 'lodash';

const RecipeList = (props) => {
  const { recipes } = props;
  const globalContext = useContext(GlobalContext);
  const { handleRecipeAdd } = globalContext;
  return (
    <div className='recipe-list'>
      <div>
        {_.map(recipes, (recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className='recipe-list__add-recipe-btn-container'>
        <button className='btn btn--primary' onClick={handleRecipeAdd}>
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
