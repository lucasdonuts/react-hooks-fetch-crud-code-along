import React, { useState } from "react";

function ItemForm({ addNewItem }) {
  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("Produce");
  const [formData, setFormData] = useState( {
    category: 'Produce'
  } )

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: formData.name,
      category: formData.category,
      isInCart: false
    }

    fetch( 'http://localhost:4000/items',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then( res => res.json() )
    .then( newItem => addNewItem(newItem) )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form className="NewItem" onSubmit={ handleSubmit } >
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={ handleChange }
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          onChange={ handleChange }
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
