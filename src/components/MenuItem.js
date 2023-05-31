// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
 
// const Menu = ({menu}) => (
//   <tr>
//     <td>{menu.name}</td>
//     <td>{menu.price}</td>
//     <td>{menu.ingredients}</td>
//   </tr>
//  );

// export default function MenuList() {
//  const [items, setMenu] = useState([]);
 
//  // This method fetches the items from the database.
//  useEffect(() => {
//    async function getMenu() {
//      const response = await fetch(`http://localhost:5050/menu/`);
 
//      if (!response.ok) {
//        const message = `An error occurred: ${response.statusText}`;
//        window.alert(message);
//        return;
//      }
 
//      const items = await response.json();
//      console.log(items);
//      setMenu(items);
//    }
 
//   //  getMenu();
//    getMenu().catch(error => console.error(error));

//    return;
//  }, [items.length]);

// function menuList() {
//   return items.map(({name, price, ingredients}, index) => {
//     return (
//       <Menu
//         key={index}
//         menu={{name, price, ingredients}}
//       />
//     );
//   });
// }

//  return (
//   <div>
//     <h3>Menu</h3>
//     <table className="table table-striped" style={{ marginTop: 20 }}>
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>Price</th>
//         <th>Ingredients</th>
//       </tr>
//     </thead>
//       <tbody>{menuList()}</tbody>
//     </table>
//   </div>
// );
// }
 
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./menuItem.css";

const MenuCard = ({menu, handleAddToCart}) => (
  <div className="card" style={{width: '18rem', margin: '10px'}}>
    <div className="card-body">
      <h5 className="card-title">{menu.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted" >{menu.price}</h6>
      <h7 className="card-subtitle mb-2 ">{menu.ingredients}</h7>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={alert}>Add to Cart</button>
      </div>
    </div>
  </div>
);
export default function MenuList() {
 const [items, setMenu] = useState([]);

 useEffect(() => {
   async function getMenu() {
     const response = await fetch(`http://localhost:5050/menu/`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const items = await response.json();
     console.log(items);
     setMenu(items);
   }

   getMenu().catch(error => console.error(error));

   return;
 }, [items.length]);

function menuList() {
  return items.map((menu, index) => {
    return (
      <MenuCard
        key={index}
        menu={menu}
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
  </div>
);
}