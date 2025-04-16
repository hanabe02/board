import { takeLatest, call } from "redux-saga/effects";
import { EDIT_PROFILE_REQUEST } from "./profileActions";
import axios from "axios";

const profile = async (name, id, email, password) => {
    console.log("디버깅 포인트 : saga");
    const params = {
        name: name,
        id: id,
        email: email,
        password: password,
    }
    try {
        await axios.post("http://localhost:8888/api/profileEdit", params)
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
}

function* handProfile(action) {
    try {
        yield call(profile, action.payload.name, action.payload.id, action.payload.email, action.payload.password);
    } catch (error) {

    }
}


export default function* profileSaga() {
    yield takeLatest(EDIT_PROFILE_REQUEST, handProfile);
}