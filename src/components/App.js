import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import { v4 } from 'uuid';
import _ from 'lodash';

import '../css/app.css';
import RecipeEdit from './RecipeEdit';

export const GlobalContext = React.createContext();
const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions:
      '1. Put salt on chicken.\n2. Put Chicken in oven\n3. Eat Chicken',
    ingredients: [
      { id: 989, name: 'Chicken', amount: '2 Pounds' },
      { id: 898, name: 'Salt', amount: '1 Tbs' },
    ],
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork.\n2. Put Pork in oven\n3. Eat Pork',
    ingredients: [
      { id: 323, name: 'Pork', amount: '3 Pounds' },
      { id: 411, name: 'Paprika', amount: '2 Tbs' },
    ],
  },
];
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON !== null) {
      setRecipes(JSON.parse(recipeJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeAdd = () => {
    const newRecipes = {
      id: v4(),
      name: 'New Recipe',
      servings: 1,
      cookTime: '0',
      instructions: '',
      ingredients: [],
    };
    setRecipes((prevRecipes) => {
      setSelectedRecipeId(newRecipes.id);
      return [...prevRecipes, newRecipes];
    });
  };

  const handleRecipeDelete = (id) => {
    const newRecipes = _.filter(recipes, (recipe) => {
      return recipe.id !== id;
    });
    setRecipes(newRecipes);
  };

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleRecipeEdit = (id, recipeEdited) => {
    setRecipes(
      _.map(recipes, (recipe) => {
        if (recipe.id === id) {
          return recipeEdited;
        }
        return recipe;
      })
    );
  };

  const clearSelectedRecipe = () => {
    setSelectedRecipeId();
  };

  return (
    <GlobalContext.Provider
      value={{
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeEdit,
        clearSelectedRecipe,
      }}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </GlobalContext.Provider>
  );
}

export default App;
