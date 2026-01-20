// src/services/authService.ts
import apiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Define the shape of the data being sent to the API
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  roles: string[];
}

// 2. Define the shape of the response from your server
export interface RegisterResponse {
  statusCode: number;
  message: any;
  error: any;
  body: {
    token: string;
    [key: string]: any;
  };
}

// 3. Define the service methods with Types
const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>('api/user', data);
  console.log('coming', response.data)

  if (response.data?.body?.token) {
    await AsyncStorage.setItem('accessToken', response.data.body.token);
  }

  return response.data;
};

export interface LoginRequest {
  emailPhone: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // This allows any other fields (age, address, profilePic, etc.)
  // without needing to define them all right now
  [key: string]: any;
}

export interface LoginResponse {
  body: {
    token: string;
    user: User; // Reference the User interface above
  };
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('api/user/login', data);

  if (response.data?.body.token) {
    await AsyncStorage.setItem('accessToken', response.data.body.token);
  }
  return response.data;
};

////Add pet
export interface petRequest {
  petName: string;
  dob: string;
  category: number;
  size?: number;
  ownerId: string;
  profileImg?: string;
  otherPetName?: string;
  uploads?: string[];
  gender: number;
  weight: number;
  dailyFeedCount: number;
}

// Define the shape of the response from your server
export interface petResponse {
  body: any;
}

//  Define the service methods with Types
const addPet = async (data: petRequest): Promise<petResponse> => {
  const response = await apiClient.post<petResponse>('api/pet-profile', data);

  return response.data;
};

///Pet Category
export interface PetCategory {
  id: string;
  name: string;
  // add other fields like image, slug, etc.
}

export interface PetCategoryResponse {
  status: boolean;
  message: string;
  body: PetCategory[]; // Assuming it returns an array of categories
}

const getPetCategories = async (): Promise<PetCategoryResponse> => {
  // We removed the headers/token logic here
  const response = await apiClient.get<PetCategoryResponse>('api/pet-category');
  return response.data;
};

//Pet size
export interface PetSizeResponse {
  status: boolean;
  message: string;
  body: any[]; // Assuming it returns an array of sizes
}

const getPetSizes = async (): Promise<PetSizeResponse> => {
  // We removed the headers/token logic here
  const response = await apiClient.get<PetSizeResponse>('api/pet-size');
  return response.data;
};

//Pet Gender
export interface PetGenderResponse {
  status: boolean;
  message: string;
  body: any[]; // Assuming it returns an array of genders
}

const getPetGenders = async (): Promise<PetGenderResponse> => {
  // We removed the headers/token logic here
  const response = await apiClient.get<PetGenderResponse>('api/gender');
  return response.data;
};


export default { register, login, addPet, getPetCategories, getPetSizes, getPetGenders };
