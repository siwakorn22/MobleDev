import React, { useState } from "react";
import {useDispatch} from "react-redux"; //ใช้ use เพราะว่า เป็น Function components


function AddActivity() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    duration: "",
  });
const handleChange = (e) =>{
    e.persist();
    setData((prev)=>({...prev, [e.target.name]:e.target.value}))//แก้ไข และใช้...ในการใช้ค่าเดิมมาแก้เป็น e.target.name ค่าที่กรอกเข้ามา
}
    const addActivity = () =>{
      dispatch({
        type:"CREATE_ACTIVITY",
        payload:{
          name:data.name,
          duration:data.duration
        }
      })
    }

  return (
    <div className="add">
      <div className="input-section">
        <p>Activity name: </p>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="name"
          placeholder="Activity name ..."
        />
      </div>
      <div className="input-section">
        <p>Duration: </p>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="duration"
          placeholder="Duration ..."
        />
      </div>
      <button onClick={addActivity}> Add activity </button>
    </div>
  );
}

export default AddActivity;
