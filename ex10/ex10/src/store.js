import { configureStore } from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension";
import activitiesReducer from "./reducers/activitiesReducer";
const store = configureStore({
    reducer:{
        activities: activitiesReducer  //นำชื่อข้างหน้าไปเรียกใช้ในหน้า Workout.js line 7
    }
}, composeWithDevTools);

export default store;