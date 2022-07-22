import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect( () => {
    fetch( 'http://localhost:4000/items' )
    .then( res => res.json() )
    .then( itemList => setItems(itemList) )
  }, [])

  const addNewItem = (newItem) => {
    setItems([
      ...items,
      newItem
    ])
  }

  const updateItem = (updatedItem) => {
    const updatedItems = items.map( item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  const deleteItem = (deletedItem) => {
    const updatedItems = items.filter( item => item.id !== deletedItem.id );
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addNewItem={ addNewItem } />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} updateItem={ updateItem } deleteItem={ deleteItem } />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
