import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [],
    price: 0,
    image_url: "",
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const response = await axios.get('/api/menu');
    setMenuItems(response.data);
  }

  const deleteMenuItem = async (id) => {
    await axios.delete(`/api/menu/${id}`);
    fetchMenuItems();
  }

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const submitForm = async (event) => {
    event.preventDefault();
    if (formData._id) {
      await axios.patch(`/api/menu/${formData._id}`, formData);
    } else {
      await axios.post('/api/menu', formData);
    }
    fetchMenuItems();
  }

  return (
    <div>
      <h1>Menu</h1>
      {menuItems.map(item => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <button onClick={() => deleteMenuItem(item._id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={submitForm}>
        <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Name" required />
        <input type="text" name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" required />
        <input type="text" name="ingredients" value={formData.ingredients} onChange={handleFormChange} placeholder="Ingredients" required />
        <input type="number" name="price" value={formData.price} onChange={handleFormChange} placeholder="Price" required />
        <input type="text" name="image_url" value={formData.image_url} onChange={handleFormChange} placeholder="Image URL" required />
        <button type="submit">{formData._id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default ManagePage;