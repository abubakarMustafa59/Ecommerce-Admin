import React from "react";
import "./table.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";

const Table = ({ onClickButton }) => {
  const adminId = useSelector((state) => state.admin.adminId);
  // const adminId="64691b0f90e1cf7a1ec81a61"
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleHover = (productId) => {
    setHoveredProduct(productId);
  };

  const handleHoverOut = () => {
    setHoveredProduct(null);
  };
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/produt/admin/${adminId}`
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setInterval(() => {
        setIsLoading(false); // Set isLoading to false after fetching data
      }, 5000);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleDelete = async (productId) => {
    await axios.delete(
      `http://localhost:5000/api/produt/${adminId}/${productId}`
    );
    getProducts();
  };
  console.log(data);
  return (
    <div className="table-container">
  <table className="custom-table">
    <thead>
      <tr className="header-row">
        <th>ID</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data &&
        data.map((product, index) => (
          <tr key={product._id} className="data-row">
            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td>
              <img src={product.img} alt={product.title} className="product-image" />
            </td>
            <td className="buttons">
              <button
                onClick={() => handleDelete(product._id)}
                onMouseEnter={() => handleHover(product._id)}
                onMouseLeave={handleHoverOut}
                className={`delete-button ${hoveredProduct === product._id ? 'animate__hinge' : ''}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

  );
};

export default Table;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Table = ({ onClickButton }) => {
//   const adminIdFromRedux = useSelector(state => state.admin.adminId);
//   const [data, setData] = useState([]);

//   const getProducts = async () => {
//     try {
//       console.log("first")
//       console.log(adminIdFromRedux)
//       console.log(await axios.get(`http://localhost:5000/api/produt/admin/${adminIdFromRedux}`))
//       const res = await axios.get(`http://localhost:5000/api/produt/admin/${adminIdFromRedux}`);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, [adminIdFromRedux]);

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/product/${adminIdFromRedux}/${productId}`);
//       getProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr className="header-row">
//             <th>ID</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((product) => (
//             <tr key={product._id} className="data-row">
//               <td>{product._id}</td>
//               <td>{product.title}</td>
//               <td>{product.price}</td>
//               <td>
//                 <img src={product.img} alt="Product" className="product-image" />
//               </td>
//               <td className="buttons">
//                 <button onClick={() => handleDelete(product._id)} className="delete-button">
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
