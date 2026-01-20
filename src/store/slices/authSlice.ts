import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService, {
  LoginRequest,
  LoginResponse,
  PetCategoryResponse,
  PetGenderResponse,
  petRequest,
  petResponse,
  PetSizeResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '../../services/authService';

// Define the state interface for extra type safety
interface AuthState {
  user: User | null;
  categories: any[]; // To store the pet categories
  pets: petResponse[];
  sizes: any[]; // To store the pet sizes
  genders: any[]; // To store the pet genders
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  categories: [],
  pets: [],
  sizes: [],
  genders: [],
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // userData now contains all the fields (firstName, lat, lng, etc.)
      return await authService.register(userData);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration failed',
      );
    }
  },
);

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      return await authService.login(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  },
);

export const addPetSlice = createAsyncThunk<petResponse, petRequest>(
  'auth/addPet',
  async (data, { rejectWithValue }) => {
    console.log('calling data', data);
    try {
      return await authService.addPet(data);
    } catch (err: any) {
      console.log('error data =>', err.response);
      return rejectWithValue(err.response?.data?.message || 'Add Pet failed');
    }
  },
);

export const fetchPetCategories = createAsyncThunk<PetCategoryResponse, void>(
  'pets/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Calling the simplified service
      return await authService.getPetCategories();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories',
      );
    }
  },
);

export const fetchPetSizes = createAsyncThunk<PetSizeResponse, void>(
  'pets/fetchSizes',
  async (_, { rejectWithValue }) => {
    try {
      // Calling the simplified service
      return await authService.getPetSizes();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories',
      );
    }
  },
);

export const fetchPetGenders = createAsyncThunk<PetGenderResponse, void>(
  'pets/fetchGenders',
  async (_, { rejectWithValue }) => {
    try {
      // Calling the simplified service
      return await authService.getPetGenders();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch genders',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.loading = false;
          state.user = action.payload.body;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- LOGIN CASES (Add these now) ---
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.body.user; // Updates global state with logged-in user
          state.error = null;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //add pet cases
    builder
      .addCase(addPetSlice.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addPetSlice.fulfilled,
        (state, action: PayloadAction<petResponse>) => {
          state.loading = false;
          if (action.payload.body) {
            state.pets.push(action.payload.body);
          }
          state.error = null;
        },
      )
      .addCase(addPetSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //fetch pet categories cases
    builder
      .addCase(fetchPetCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetCategories.fulfilled, (state, action) => {
        state.loading = false;
        // Map the data from your API response body to the state
        state.categories = action.payload.body;
      })
      .addCase(fetchPetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //fetch pet sizes cases
    builder
      .addCase(fetchPetSizes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetSizes.fulfilled, (state, action) => {
        state.loading = false;
        // Map the data from your API response body to the state
        state.sizes = action.payload.body;
        // You can store sizes in the state if needed
      })
      .addCase(fetchPetSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //fetch pet genders cases
    builder
      .addCase(fetchPetGenders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetGenders.fulfilled, (state, action) => {
        state.loading = false;
        // Map the data from your API response body to the state
        state.genders = action.payload.body;
      })
      .addCase(fetchPetGenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
