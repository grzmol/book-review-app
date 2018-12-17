import axios from 'axios';



export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
) {
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data]
            } else {
                return response.data;
            }

        });



    return {
        type: 'GET_BOOKS',
        payload: request
    }

}

export function getBookWithReviewer(id) {
    const request = axios.get(`/api/getBook?id=${id}`)


    return (dispatch) => {

        request.then(({ data }) => {
            let book = data;
            console.log(book)

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({ data }) => {

                    let response = {
                        book,
                        reviewer: data
                    }

                    dispatch({
                        type: 'GET_BOOKS_WITH_REVIEWER',
                        payload: response
                    })
                })
        })
    }
}

export function clearBookWithReviewer(){
    return{
        type: 'CLEAR_BOOKS_WITH_REVIEWER',
        payload:{
            book:{},
            reviewer: {}
        }
    }
}