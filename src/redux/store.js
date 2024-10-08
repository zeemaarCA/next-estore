import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'
import checkoutReducer from './checkout/checkoutSlice'
import promoReducer from './promo/promoSlice'
// import customerReducer from './customer/customerSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  promo: promoReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)