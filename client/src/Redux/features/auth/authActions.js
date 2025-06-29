import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Services/API";
import toast from "react-hot-toast";


export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);

        if (data.user.role === "donar") {
          window.location.replace("/donar");
        } else if (data.user.role === "admin") {
          window.location.replace("/admin");
        } else if (data.user.role === "hospital") {
          window.location.replace("/hospital");
        } else if (data.user.role === "organisation") {
          window.location.replace("/organization");
        }
      }

      return data;
    } catch (error) {
      if (error.response) {
        // Handle 403 error specifically
        if (error.response.status === 403) {
          toast.error(error.response.data.message || "Role doesn't match");
          return rejectWithValue(error.response.data.message);
        }
        // Handle other errors
        toast.error(error.response.data.message || "Something went wrong");
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message || "An error occurred");
        return rejectWithValue(error.message);
      }
    }
  }
);


// Register thunk
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      bloodGroup,
      organisationName,
      address,
      hospitalName,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        bloodGroup,
        organisationName,
        address,
        hospitalName,
      });

      if (data?.success) {
        toast.success("User Registered Successfully");
        window.location.replace("/login"); // Redirect to login after successful registration
        return data;
      } else {
        toast.error("Something went wrong");
        return rejectWithValue("Registration failed");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Get current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
