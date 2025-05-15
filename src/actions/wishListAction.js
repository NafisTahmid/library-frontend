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
 import axios from 'axios';

 export const createWishList = (wishList) => async (dispatch, getState) => {
    try {
        dispatch({
            type: WISHLIST_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-type': "application/json",
                'Authorization': `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.post('/api/wishlist/create/', wishList, config);
        dispatch({
            type: WISHLIST_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: WISHLIST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    };
};

export const getWishListAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: WISHLIST_GET_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/wishlist/get/', config);
        
        dispatch({
            type: WISHLIST_GET_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: WISHLIST_GET_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
};

export const deleteWishAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: WISHLIST_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/wishlist/delete/${id}/`, config);
        dispatch({
            type: WISHLIST_DELETE_SUCCESS,
            payload:data
        })

    } catch(error) {
        dispatch({
            type: WISHLIST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
};