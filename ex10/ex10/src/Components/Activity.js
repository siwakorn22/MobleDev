import React from "react";
import { useDispatch } from "react-redux";
const Activity = ({ id, name, duration }) => {
  const dispatch = useDispatch();
  const deleteActivity = () => {
    dispatch({
      type: "DELETE_ACTIVITY",
      payload: {
        id: id,
      },
    });
  };

  return (
    <div className="section">
      <p>
        <b>Activity:</b> {name}, <b>Duration:</b> {duration}
        <button onClick={deleteActivity}>Delete</button>
      </p>
    </div>
  );
};
export default Activity;
