import { START, SUCCESS, ERROR } from './product.const';

const initialState = {
    loading: false,
    data: null,
    sucess: false,
    error: false,
    errorMessage: ''
}

const productReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case START:
            return {
                ...prevState,
                loading: true,
            }
        case SUCCESS:
            return {
                ...prevState,
                error: false,
                data: action.payload,
                success: true,
                loading: false,
            }
        case ERROR:
            return {
                ...prevState,
                error: true,
                loading: false,
                sucess: false,
                errorMessage: action.payload
            }
        default:
            return prevState;
    }
}
export default productReducer;
