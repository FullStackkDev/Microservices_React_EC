import { ActionTypes } from "../Constants/action-type"
export const setProduct = (products) =>{
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload : products
    }
}

export const selectedProducts = (product) =>{
    return {
        type: ActionTypes.SELECTED_PRODUCTS,
        payload : product
    }
}