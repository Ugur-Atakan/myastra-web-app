import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { Tokens, User, UserInterface } from '../../types/user';

interface UserState {
  isLoggedIn: boolean;
  userData: User;
  tokens:Tokens
}

const initialState: UserState = {
  isLoggedIn: false,
  userData: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: null,
    profileImage: null,
    gender:null ,
    birthDay: null,
    birthMonth: null,
    birthYear: null,
    birthHour: null,
    birthMinute: null,
    city: null,
    timeZone: '',
    latitude: null,
    longitude: null,
    notifications: false,
    emailConfirmed: false,
    telephoneConfirmed: false,
    roles: [],
    createdAt: '',
  },
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInterface>) => {
      state.userData = action.payload.user;
      state.isLoggedIn = true;
    },
    logOut: state => {
      state.userData = initialState.userData;
      state.isLoggedIn = false;
    },
    updateUser: (state, action: PayloadAction<UserInterface>) => {
      state.userData = action.payload.user;
    },
  },
});
export const {login, logOut, updateUser} = userSlice.actions;
export const userActions = userSlice.actions;
export default userSlice.reducer;