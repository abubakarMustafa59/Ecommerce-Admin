import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Products from "./components/products/Products";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const user = useSelector((state) => state.admin.currentAdmin);
  const navidator = useNavigate()
  useEffect(() => {
    if (user) {
      navidator("/")
    } else {
      navidator("/login-admin")
    }
  }, [user])

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* <BrowserRouter> */}
        <Routes>
          {/* <Route path="/"> */}
            <Route path="/" element={<Home />} />
            <Route path="/login-admin" element={<Login />} />
            <Route path="/users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New title="Add New Products" />}
              />
            </Route>
            {/* <Route path="products" element={<Products />} /> */}
              <Route path="/products" >
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              {/* <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              /> */}
            </Route>
          {/* </Route> */}
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
