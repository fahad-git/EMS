export const initialState = null;

export const reducer = (state, action) => {
    if(action.type == "ATTEND-EVENT"){
        return action.params;
    }
    return state;
}