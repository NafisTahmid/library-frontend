import { 
    WISHLIST_CREATE_REQUEST,
    WISHLIST_CREATE_SUCCESS,
    WISHLIST_CREATE_FAIL,
    WISHLIST_CREATE_RESET,

    WISHLIST_GET_REQUEST,
    WISHLIST_GET_SUCCESS,
    WISHLIST_GET_FAIL,

    WISHLIST_DELETE_REQUEST,
    WISHLIST_DELETE_SUCCESS,
    WISHLIST_DELETE_FAIL
 } from '../constants/wishlistConstants';

 export const wishListCreateReducer = (state={ }, action) => {
     switch(action.type) {
         case WISHLIST_CREATE_REQUEST:
             return { loading:true };
 
         case WISHLIST_CREATE_SUCCESS:
             return { loading:false, success:true,  wishList:action.payload };
         
         case WISHLIST_CREATE_FAIL:
             return { loading:false, success:false, error:action.payload };
 
         case WISHLIST_CREATE_RESET:
             return { };
 
        default:
         return state;
     };
 };

 export const getWishListReducer = (state = {wishList: []}, action) => {
     switch (action.type) {
         case WISHLIST_GET_REQUEST:
             return {loading: true, products:[] }
         case WISHLIST_GET_SUCCESS:
             return { loading: false, wishList:action.payload }
         case WISHLIST_GET_FAIL:
             return { loading: false, error: action.payload }
         default:
             return state
     }
 }

 export const wishDeleteReducer = (state={}, action) => {
     switch(action.type) {
         case WISHLIST_DELETE_REQUEST:
             return { loading:true };
         case WISHLIST_DELETE_SUCCESS:
             return { loading:false, success:true };
         case WISHLIST_DELETE_FAIL:
             return { loading:false, success:false };
         default:
             return state;
     };
 };