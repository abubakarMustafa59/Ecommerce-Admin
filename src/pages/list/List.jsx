import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import Table from "../Table/Table";
import { useState } from "react";
import New from "../new/New";

const List = () => {
  const [display, setDisplay] = useState(false);
  const handleDisplay=()=>{
    setDisplay(!display)
  }
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        {/* <Datatable/> */}
        <div className="display">
          <div className="prod  animate__fadeOutTopLeft">
            <button onClick={handleDisplay} className="animate__fadeOutTopLeft">
              {display ? "Close" :  "Add Product Here"}
            </button>
          </div>
        </div>
        {display ? <New display={display} handleDisplay={handleDisplay} /> : ""}
        <Table />
      </div>
    </div>
  );
};

export default List;
