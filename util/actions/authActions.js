import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  authenticate,
  logout,
  updateLoggedInUserData,
} from "../../store/authSlice";
import BASE_URL from "../../constants/base_url";

let timer;

export const signUp = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      // 1. 회원가입
      const response = await axios.post(`${BASE_URL}/register`, {
        email,
        password,
        name,
      });

      dispatch(
        authenticate({
          userData: {
            user_id: response.data.user_id,
            email,
            password,
            name,
          },
        })
      );

      // 2. 회원가입 성공 후 바로 로그인
      dispatch(signIn({ email, password }));
    } catch (error) {
      const message =
        error.response?.data?.detail || "회원가입 실패. 다시 시도하세요.";
      throw new Error(message);
    }
  };
};

export const signIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      dispatch(
        authenticate({
          userData: {
            user_id: response.data.user_id,
            name: response.data.name,
            email,
            password,
          },
        })
      );

      saveDataToStorage(email);
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadUserProfile = (email, { age, gender, weight, height }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile`, {
        email,
        age: parseInt(age, 10),
        gender,
        weight: parseInt(weight, 10),
        height: parseInt(height, 10),
      });

      dispatch(
        updateLoggedInUserData({
          age,
          gender,
          weight,
          height,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};

const saveDataToStorage = (email) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      email,
    })
  );
};
