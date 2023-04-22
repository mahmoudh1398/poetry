import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { ReduxStoreModel } from "models/redux-store-model";
import { persistReducer, persistStore } from "redux-persist";
import { reducer as FavoritePoemsReducer } from "./favorite-poems/reducer";
import { AnyAction, Reducer, ReducersMapObject, combineReducers } from "redux";

const reducers: ReducersMapObject<ReduxStoreModel, AnyAction> = {
  favoritePoems: FavoritePoemsReducer as Reducer<
    ReduxStoreModel["favoritePoems"],
    AnyAction
  >,
};

const combinedReducers = combineReducers(reducers);

const persistConfig = {
  key: "root",
  storage,
};

const persistedCombinedReducers = persistReducer(
  persistConfig,
  combinedReducers
);

export const store = configureStore({
  reducer: persistedCombinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export const persistedStore = persistStore(store);
