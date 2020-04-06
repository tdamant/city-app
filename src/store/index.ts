import { combineReducers } from "redux"
import {cityReducer} from "./cities/reducers";

export const rootReducer = combineReducers({cities: cityReducer}
);

export type RootState = ReturnType<typeof rootReducer>