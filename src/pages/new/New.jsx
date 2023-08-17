import React, { useEffect, useState } from "react";
import "./new.css";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from "./../../components/ColorSelect/ColorPicker";

const New = ({display,handleDisplay}) => {
  // const adminId=localStorage.getItem("adminId")
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  var adminId;
  adminId= useSelector((state) => state.admin.adminId);
  const [percent, setPercent] = useState(0);
  const myColors = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Gray",
    "Silver",
    "Gold",
    "Cyan",
    "Magenta",
  ];
  const mySizes = ["XS", "S", "M", "L", "XL"];
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    categories: "",
    size: "",
    color: "",
    price: 0,
    inStock: false,
    image: null,
    adminId:adminId
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: selectedColor,
      size: selectedSize,
      adminId: adminId,
    }));
  }, [selectedColor, selectedSize, adminId]);
  

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    console.log("ASSSSSSSSSSSSSSSSSSSSSS")
    console.log(formData)
    e.preventDefault();
      if (!formData.image) {
      alert("Please upload an image first!");
      return;
    }
      const storageRef = ref(storage, `/${formData.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, formData.image);
      uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
      },
      (err) => {
        console.log(err);
        // Handle error during upload
      },
      async () => {
        try {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const updatedFormData = { ...formData, image: imageUrl };
  
          console.log("Updated formData:", updatedFormData);
          // Perform your API request with updatedFormData
          const response = await axios.post("http://localhost:5000/api/produt", updatedFormData);
          console.log("Response:", response.data);
          // Reset the form if needed
          setFormData({
            title: "",
            desc: "",
            categories: "",
            size: "",
            color: "",
            price: 0,
            inStock: false,
            image: null,
            adminId:adminId
          });
          setPercent(0)

        } catch (error) {
          console.log("Error:", error);
        }
      }
    );
  };
  
  return (
    <form id="productForm" onSubmit={handleSubmit}>
      <p className="cancle" onClick={handleDisplay}>X</p>
      <div className="container">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="categories">Categories:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="size">Size:</label>
          <select value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select a size</option>
          {mySizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
        {selectedSize && (
          <p>You have selected size: {selectedSize}</p>
        )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <select value={selectedColor} onChange={handleColorChange}>
        <option value="">Select a color</option>
        {myColors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
      {selectedColor && (
        <p>You have selected: {selectedColor}</p>
      )}
          {/* <ColorPicker formColor={setMyColor} /> */}
          {/* <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          /> */}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="inStock">In Stock:</label>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
      </div>
    {/* <p>Loading {percent}</p> */}
    {/* { */}
      {/* // (percent>0 && percent<100 ) ? */}
      {((percent > 0 && percent<100) || (percent>0 && percent < 100) )? (
        <button class="button__loader" disabled>
          <span class="button__text">Uploading...</span>
        </button>
      ) : (
        <>
        <button
          type="submit"
          disabled={(percent > 0 && percent < 100) ? true : false}
        >
          Add Product 
          {/* {percent === 0 || percent === 100
            ? "Submit"
            : "Uploading...  " + percent + " %"} */}
        </button>
        </>
      )}
      {/* <button class="button__loader">
            <span class="button__text">
                Loading...
            </span>
        </button>
      <button type="submit" disabled={(percent>0 && percent<100 ) ? true :false} >{(percent===0 || percent===100 ) ? "Submit" : "Uploading...  "+percent +" %"}</button> */}
        {/* // : */}
    {/* } */}
      </div>
      </form>
      );
};

export default New;


// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";

// const New = ({ inputs, title }) => {
//   const [file, setFile] = useState("");

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               {inputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input type={input.type} placeholder={input.placeholder} />
//                 </div>
//               ))}
//               <button>Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default New;














  // const handleSusbmit = (e) => {
  //   e.preventDefault();
  //   if (!formData.image) {
  //     alert("Please upload an image first!");
  // }
  // const storageRef = ref(storage, `/${formData.image.name}`);
  // const uploadTask = uploadBytesResumable(storageRef, formData.image);
  // uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //         const percent = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //             formData.image=url;
  //         });
  //     }
  // );
  //   console.log(formData);
   
  // };
  // useEffect(() => {
  //   if (percent === 100) {
  //     // Call your function here when percent becomes 100
  //     console.log("Percent reached 100!");
  //     // Run your desired function
  //     const sendData = async () => {
  //       console.log("frommmmmm", formData);
      
  //       try {
  //         const response = await axios.post("http://localhost:5000/api/produt", formData);
  //         console.log("Response:", response.data);
      
  //         // Reset the form if needed
  //         setFormData({
  //           title: "",
  //           desc: "",
  //           categories: "",
  //           size: "",
  //           color: "",
  //           price: 0,
  //           inStock: false,
  //           image: null,
  //         });
  //       } catch (error) {
  //         console.log("Error:", error);
  //       }
  //     };
      
  //     sendData();
      
  //   }
  // }, [percent]);
  
//   const handleSubsmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) {
//       alert("Please upload an image first!");
//       return;
//     }  
//     try {
//       let downloadURL;
//       const storageRef = ref(storage, `images/${formData.image.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, formData.image);
//       await new Promise((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress = Math.round(
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );
//             setPercent(progress);
//           },
//           (error) => {
//             console.error(error);
//             reject(error);
//           },
//           async () => {
//             // Get the download URL of the uploaded image
//              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           }
//         );
//       });
  
//       // Update formData with the downloadURL
//       setFormData({ ...formData, image: downloadURL });
  
//       // Make the API request
//       const response = await axios.post("http://localhost:5000/api/produt", formData);
//       console.log(response.data);
  
//       // Reset the form if needed
//       setFormData({
//         title: "",
//         desc: "",
//         categories: "",
//         size: "",
//         color: "",
//         price: 0,
//         inStock: false,
//         image: null,
//       });
//     } catch (error) {
//        console.error(error); // Log any error occurred during the API request
//     alert("An error occurred while uploading the image.");
//  }
//   };
  
//   const handleUpload = () => {
//     if (!formData.image) {
//         alert("Please upload an image first!");
//     }

//     const storageRef = ref(storage, `/${formData.image.name}`);

//     // progress can be paused and resumed. It also exposes progress updates.
//     // Receives the storage reference and the file to upload.
//     const uploadTask = uploadBytesResumable(storageRef, formData.image);

//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );

//             // update progress
//             setPercent(percent);
//         },
//         (err) => console.log(err),
//         () => {
//             // download url
//             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                 console.log(url);
//             });
//         }
//     );
// };
