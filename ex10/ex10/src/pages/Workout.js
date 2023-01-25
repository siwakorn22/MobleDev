import React, { useState } from "react";
import AddActivity from "../Components/AddActivity";
import { useSelector } from "react-redux"; //=Subcriber
import Activity from "../Components/Activity";

export const Workout = () => {
  const [add, setAdd] = useState(false);
  const allActivities = useSelector((state) => state.activities); //Selector = ซัพสไค  activities ตรงกับหน้า store

  const handleClick = () => {
    //กำหนดฟังชั่น ตัวคลิก และบรรทัด 12 ให้กดแล้วแสดงคำว่า addactivity
    setAdd(!add);
  };
  return (
    <div className="workouts-wrapper">
      <h2>My Workouts</h2>
      <button onClick={handleClick}>Add activity</button>
      {add && <AddActivity />}
      {allActivities.map((activity) => {
        return (
          <Activity
            key={activity.id}
            id={activity.id}
            name={activity.name}
            duration={activity.duration}
          />
        );
      })}
    </div>
  );
};

export default Workout;
