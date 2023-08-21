import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/data/data";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    personalizeFeed: {
      business: false,
      entertainment: false,
      general: false,
      health: false,
      science: false,
      sports: false,
      technology: false,
    },
    favourite: {},
  },
  reducers: {
    feedChange: (state, action) => {
      state.personalizeFeed = action.payload;
    },
    favourite: (state, action) => {
      // console.log(action.payload);
      state.favourite = action.payload;
    },
  },
});

export const { feedChange, favourite } = newsSlice.actions;
export default newsSlice;

// const newsSlice = createSlice({
//   name: "news",
//   initialState: {
//     itemsList: [],
//     totalQuantity: 0,
//     totalAllQuatity: 0,
//     totalAllPrice: 0,
//     productList: data,
//     inputsearchData: "",
//   },
//   reducers: {},
// });
// reducers: {
//     addToCart(state, action) {
//       const newItem = action.payload;

//       //check item is already exits
//       const exitsItem = state.itemsList.find((item) => item.id === newItem.id);

//       if (exitsItem) {
//         exitsItem.quantity++;
//         exitsItem.totalPrice += newItem.price;
//       } else {
//         state.itemsList.push({
//           id: newItem.id,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: newItem.price,
//           name: newItem.name,
//           cover: newItem.cover,
//         });
//         state.totalQuantity++;
//       }
//     },
//     removeFromCart(state, action) {
//       const id = action.payload;
//       const exitstingItem = state.itemsList.find((item) => item.id === id);
//       if (exitstingItem.quantity === 1) {
//         state.itemsList = state.itemsList.filter((item) => item.id !== id);
//         state.totalQuantity--;
//       } else {
//         exitstingItem.quantity--;
//         exitstingItem.totalPrice -= exitstingItem.price;
//       }
//     },
//   }
// {
//   addTocart: (state, action) => {
//     // state.itemsList.push(action.payload);
//     // state.totalQuantity += 1;
//     let find = state.itemsList.findIndex(
//       (item) => item.id === action.payload.id
//     );
//     if (find >= 0) {
//       state.itemsList[find].quantity += 1;
//       // setCartData(state.itemsList);
//       // state.itemsList = getCartData();
//     } else {
//       state.itemsList.push(action.payload);
//       // setCartData(state.itemsList);
//       // state.itemsList = getCartData();
//     }
//     state.totalQuantity += 1;
//   },
//   removeFromCart: (state, action) => {
//     state.itemsList = state.itemsList.filter(
//       (item) => item.id !== action.payload.id
//     );
//     state.totalQuantity -= 1;
//     // setCartData(state.itemsList);
//     // state.itemsList = getCartData();
//   },
//   disableAddToCartBtn: (state, action) => {
//     let selectedIndex = state.productList.findIndex(
//       (data) => data.id === action.payload.id
//     );

//     let temp = state.productList;
//     temp[selectedIndex].btn_disable = true;

//     state.productList = temp;
//     // setProductData(state.productList);
//     // state.itemsList = getProductData();
//   },
//   enableAddToCartBtn: (state, action) => {
//     let selectedIndex = state.productList.findIndex(
//       (data) => data.id === action.payload.id
//     );

//     let temp = state.productList;
//     temp[selectedIndex].btn_disable = false;

//     state.productList = temp;
//     // setProductData(state.productList);
//     // state.itemsList = getProductData();
//   },
//   increaseItemQuantity: (state, action) => {
//     state.itemsList = state.itemsList.map((item) => {
//       if (item.id === action.payload.id) {
//         return { ...item, quantity: item.quantity + 1 };
//       }
//       return item;
//     });
//     state.totalQuantity += 1;
//     // setCartData(state.itemsList);
//     // state.itemsList = getCartData();
//   },
//   decreaseItemQuantity: (state, action) => {
//     state.itemsList = state.itemsList.map((item) => {
//       if (item.id === action.payload.id) {
//         return { ...item, quantity: item.quantity - 1 };
//       }
//       return item;
//     });
//     state.totalQuantity -= 1;
//     // setCartData(state.itemsList);
//     // state.itemsList = getCartData();
//   },
//   fullCartTotal: (state) => {
//     let { totalQuantity, totalPrice } = state.itemsList.reduce(
//       (cartTotal, cartItem) => {
//         const { mrp, quantity } = cartItem;

//         const itemTotal = mrp * quantity;
//         cartTotal.totalPrice += itemTotal;
//         cartTotal.totalQuantity += quantity;
//         return cartTotal;
//       },
//       {
//         totalPrice: 0,
//         totalQuantity: 0,
//       }
//     );
//     state.totalAllPrice = parseInt(totalPrice.toFixed(2));
//     state.totalAllQuatity = totalQuantity;
//   },
//   searchData: (state, action) => {
//     state.inputsearchData = action.payload;
//   },
// }
