import React, { useContext } from 'react';
import { GlobalContext } from './App';
import IngredientList from './IngredientList';

const Recipe = (props) => {
  const { id, name, servings, cookTime, instructions, ingredients } = props;
  const globalContext = useContext(GlobalContext);
  const { handleRecipeDelete, handleRecipeSelect } = globalContext;
  return (
    <div className='recipe'>
      <header className='recipe__header'>
        <h3 className='recipe__title'>{name}</h3>
        <div>
          <button
            className='btn btn--primary mr-1'
            onClick={() => {
              handleRecipeSelect(id);
            }}>
            Edit
          </button>
          <button
            className='btn btn--danger'
            onClick={() => {
              handleRecipeDelete(id);
            }}>
            Delete
          </button>
        </div>
      </header>
      <div className='recipe__row'>
        <span className='recipe__label'>Cook Time: </span>
        <span className='recipe__value'>{cookTime}</span>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Servings: </span>
        <span className='recipe__value'>{servings}</span>
      </div>
      <div className='recipe__row '>
        <span className='recipe__label'>Instructions: </span>
        <div className='recipe__value recipe__value--indented recipe__instructions'>
          {instructions}
        </div>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Ingredient: </span>
        <div className='recipe__value recipe__value--indented recipe__instructions'>
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
