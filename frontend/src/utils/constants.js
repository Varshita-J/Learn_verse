import UserData from "../views/plugin/UserData";

export const API_BASE_URL = `http://127.0.0.1:8000/api/v1/`;
export const userId = UserData()?.user_id;
export const PAYPAL_CLIENT_ID = "AcnQgCjxK_tYfTJV_Ej6qn9M7u0Z7HzYwPrlVP_wUtG2NdRGqT5x00bY7xsUf7L28_ui4cFLm-B6dO9o";
export const teacherId = UserData()?.teacher_id; 