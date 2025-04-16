import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import profileReducer from "./profile/profileReducer";
import boardReducer from "./board/boardReducer";

// ✅ 모든 reducer 합침
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    board: boardReducer,
});


export default rootReducer;