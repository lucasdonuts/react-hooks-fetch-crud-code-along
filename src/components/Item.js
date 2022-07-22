import React from "react";

function Item({ item, updateItem, deleteItem }) {
  const handleClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          isInCart: !item.isInCart
        })
      }
    )
    .then( res => res.json() )
    .then( updatedItem => updateItem(updatedItem));
  }

  const handleDeleteClick = () => {
    fetch( `http://localhost:4000/items/${item.id}`, {
      method: 'DELETE'
    })
    .then( res => res.json() )
    .then( () => deleteItem(item) )
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={ () => handleClick() }  
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button
        className="remove"
        onClick={ handleDeleteClick }
      >
        Delete
      </button>
    </li>
  );
}

export default Item;
