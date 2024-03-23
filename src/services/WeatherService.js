import { createAsyncThunk } from "@reduxjs/toolkit";

import {WeatherMS} from "../index";
import { APIKey } from "../config";

// Lookup
export const GetCoordinatesByLocationName = createAsyncThunk(
  "weather/getWeatherList", 
  async (_, {rejectWithValue}) => {
    const params = {
      q: 0,
      appid: APIKey
    };
    try {
      const response = await WeatherMS.get("geo/1.0/direct", {params});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Weather
export const GetCurrentWeatherData = createAsyncThunk(
  "weather/getCurrentWeatherData", 
  async (_, {rejectWithValue}) => {
    const params = {
      lat: 0,
      lon: 0,
      appid: APIKey
    };
    try {
      const response = await WeatherMS.get("/data/2.5/weather", {params});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);