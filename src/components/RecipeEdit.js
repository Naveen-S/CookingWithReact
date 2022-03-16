import React, { useContext } from 'react';
import _ from 'lodash';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { GlobalContext } from './App';
import { v4 } from 'uuid';

const RecipeEdit = ({ recipe }) => {
  const { id, name, servings, cookTime, instructions, ingredients } =
    recipe || {};
  const { handleRecipeEdit, clearSelectedRecipe } = useContext(GlobalContext);

  const handleChange = (e) => {
    handleRecipeEdit(id, {
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (idx, ingredient) => {
    const newIngredients = _.map(ingredients, (ingre) => {
      if (ingre.id === idx) {
        return ingredient;
      }
      return ingre;
    });
    handleRecipeEdit(id, {
      ...recipe,
      ingredients: newIngredients,
    });
  };

  const handleIngredientDelete = (idx) => {
    const newIngredients = _.filter(ingredients, (ingre) => {
      return ingre.id !== idx;
    });
    handleRecipeEdit(id, {
      ...recipe,
      ingredients: newIngredients,
    });
  };

  const handleAddIngredient = () => {
    handleRecipeEdit(id, {
      ...recipe,
      ingredients: [...recipe?.ingredients, { id: v4(), name: '', amount: '' }],
    });
  };
  return (
    <div className='recipe-edit'>
      <div className='recipe-edit__remove-button-container'>
        <button
          className='btn recipe-edit__remove-button'
          onClick={clearSelectedRecipe}>
          &times;
        </button>
      </div>
      <div className='recipe-edit__details-grid'>
        <label className='recipe-edit__label' htmlFor='name'>
          Name
        </label>
        <input
          className='recipe-edit__input'
          type='text'
          name='name'
          placeholder='Name'
          id='name'
          value={name}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label className='recipe-edit__label' htmlFor='cookTime'>
          Cook Time
        </label>
        <input
          type='text'
          name='cookTime'
          placeholder='Cook Time'
          id='cookTime'
          className='recipe-edit__input'
          value={cookTime}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label className='recipe-edit__label' htmlFor='serving'>
          Servings
        </label>
        <input
          type='number'
          name='servings'
          placeholder='Serving'
          id='servings'
          className='recipe-edit__input'
          value={servings || ''}
          onChange={(e) => {
            e.target.value = parseInt(e.target.value);
            handleChange(e);
          }}
        />

        <label className='recipe-edit__label' htmlFor='instructions'>
          Instructions
        </label>
        <textarea
          name='instructions'
          id='instructions'
          cols='30'
          rows='10'
          className='recipe-edit__input'
          value={instructions}
          onChange={(e) => {
            handleChange(e);
          }}>
          {instructions}
        </textarea>
      </div>
      <br />
      <label className='recipe-edit__label'>Ingredients</label>
      <div className='recipe-edit__ingredient_grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {_.map(ingredients, (ingredient) => {
          return (
            <RecipeIngredientEdit
              key={ingredient.id}
              {...ingredient}
              handleIngredientChange={handleIngredientChange}
              handleIngredientDelete={handleIngredientDelete}
            />
          );
        })}
      </div>
      <div className='recipe-edit__add-ingredient-btn-container'>
        <button className='btn btn--primary' onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default RecipeEdit;
