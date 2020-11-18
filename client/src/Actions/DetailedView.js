import { CLEAR_SELECTED_POST_LIST } from "../ActionTypes/ActionTypes"

const clearListAction =()=> ({
    type:CLEAR_SELECTED_POST_LIST,
} )

export const ClearList  = ()=> dispatch=>{
    console.log("Clear List")
    dispatch(clearListAction());
}