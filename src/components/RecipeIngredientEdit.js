import React from 'react';

const RecipeIngredientEdit = (props) => {
  const { id, name, amount, handleIngredientChange, handleIngredientDelete } =
    props;

  const handleChange = (e) => {
    const ingredient = { ...props, [e.target.name]: e.target.value };
    handleIngredientChange(id, ingredient);
  };

  const handleDelete = () => {
    handleIngredientDelete(id);
  };

  return (
    <>
      <input
        className='recipe-edit__input'
        type='text'
        name='name'
        value={name}
        onChange={(e) => handleChange(e)}
      />
      <input
        className='recipe-edit__input'
        type='text'
        name='amount'
        value={amount}
        onChange={(e) => handleChange(e)}
      />
      <button className='btn btn--danger' onClick={handleDelete}>
        &times;
      </button>
    </>
  );
};

export default RecipeIngredientEdit;
