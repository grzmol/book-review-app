export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return { ...state, list: action.payload }
        case 'GET_BOOKS_WITH_REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'CLEAR_BOOKS_WITH_REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        default:
            return state;


    }
}