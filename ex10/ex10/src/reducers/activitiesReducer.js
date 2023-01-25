import { v4 as uuidv4 } from "uuid";
const initalState = [
  {
    id: 1,
    name: "running",
    duration: "1 hour",
  },
];

const activitiesReducer = (state = initalState, action) => {
  //state ปุจจุบัน กับ action
  const { type, payload } = action;
  switch (type) {
    case "CREATE_ACTIVITY":
      return [
        ...state,
        {
          id: uuidv4(),
          name: payload.name,
          duration: payload.duration,
        },
      ];
    case "DELETE_ACTIVITY":
      const copyState = [...state];
      const i = copyState.findIndex((x) => x.id === payload.id);
      copyState.splice(i, 1);
      
      return copyState.filter((activity) => activity.id !== payload.id);
    default:
      return state;
  }
};

export default activitiesReducer;
