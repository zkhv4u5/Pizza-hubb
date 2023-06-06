import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MenuCard = ({ menu, handleDelete }) => {
  return (
    <div className="card" style={{width: '18rem', margin: '10px'}}>
      <div className="card-body">
        <h5 className="card-title">{menu.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted" >{menu.price}</h6>
        <h7 className="card-subtitle mb-2 ">{menu.ingredients}</h7>
        <div className="mt-3">
          <button className="btn btn-danger" onClick={() => handleDelete(menu._id)} >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ManageComp() {
  const [items, setMenu] = useState([]);
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
    const response = await fetch('http://localhost:5050/api/menu');
    if (!response.ok) {
      throw Error(`Could not fetch the data for that resource: ${response.status}`);
    }
    const items = await response.json();
    setMenu(items);
  }

  const deleteMenuItem = async (id) => {
    const response = await fetch(`http://localhost:5050/api/menu/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw Error(`Could not delete the item: ${response.status}`);
    }
    fetchMenuItems();
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'ingredients') {
      setFormData({
        ...formData,
        [name]: value.split(',')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }
  

//   const submitForm = async (event) => {
//     event.preventDefault();
//     const method = formData._id ? 'PATCH' : 'POST';
//     const url = formData._id ? `http://localhost:5050/api/menu/${formData._id}` : 'http://localhost:5050/api/menu';
//     const response = await fetch(url, {
//       method: method,
//       body: JSON.stringify(formData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw Error(`Could not submit the form: ${response.status}`);
//     }
//     fetchMenuItems();
//   }
const submitForm = async (event) => {
    event.preventDefault();
    
    // Ensure correct types for formData before sending
    const preparedData = {
      ...formData,
      name: String(formData.name),
      description: String(formData.description),
      price: Number(formData.price),
      image_url: String(formData.image_url),
    };
    console.log(preparedData)
    const method = formData._id ? 'PATCH' : 'POST';
    const url = formData._id ? `http://localhost:5050/api/menu/${formData._id}` : 'http://localhost:5050/api/menu';
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(preparedData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw Error(`Could not submit the form: ${response.status}`);
    }
    fetchMenuItems();
  }
  
  const menuList = () => {
    return items.map((menu, index) => {
      return (
        <MenuCard
          key={index}
          menu={menu}
          handleDelete={deleteMenuItem}
        />
      );
    });
  }

  return (
    <div>
      <h3>Menu</h3>
      <div className="d-flex flex-wrap justify-content-start" style={{ marginTop: 20 }}>
        {menuList()}
      </div>
      <form onSubmit={submitForm}>
        <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Name" />
        <input type="text" name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" />
        <input type="text" name="ingredients" value={formData.ingredients} onChange={handleFormChange} placeholder="Ingredients"  />
        <input type="double" name="price" value={formData.price} onChange={handleFormChange} placeholder="Price" />
        <input type="text" name="image_url" value={formData.image_url} onChange={handleFormChange} placeholder="Image URL" />
        <button type="submit">{formData._id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

