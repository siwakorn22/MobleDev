import { combineReducers } from "redux";
import activityReducer from "./activitiesReducer";

const rootReducer = combineReducers({
    activities:activityReducer
})

export default rootReducer;