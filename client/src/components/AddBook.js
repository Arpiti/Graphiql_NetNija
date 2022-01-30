import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS_QUERY } from '../queries/queries';
import { ADD_BOOK } from '../queries/mutations';


const AddBook = () => {

    const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);

    const [addBook, mutationResult] = useMutation(ADD_BOOK);
    const [bookDetails, setBookDetails] = useState({ name: "", genre: "", authorId: "" });

    console.log(ADD_BOOK);
    if (mutationResult.loading) return 'Submitting...';
    if (mutationResult.error) return `Submission error! ${mutationResult.error.message}`;

    const getAuthors = () => {
        if (loading) return <option>Loading Authors.</option>;
        else if (error) return <option>Error Loading Authors :(</option>;
        else {
            //console.log(data);
            let res = [
                <option value="">Select Author</option>,
                ...data.authors.map(({ id, name }) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))
            ];

            //  console.log(res);
            return res;
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bookDetails);
        console.log(addBook({ variables: { name: bookDetails.name, genre: bookDetails.genre, authorId: bookDetails.authorId } }));
    }

    return (
        <form id="add-book" onSubmit={e => handleSubmit(e)}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" value={bookDetails.name} onChange={e => setBookDetails({ ...bookDetails, name: e.target.value })} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" value={bookDetails.genre} onChange={e => setBookDetails({ ...bookDetails, genre: e.target.value })} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select value={bookDetails.authorId} onChange={(e) => setBookDetails({ ...bookDetails, authorId: e.target.value })}>{getAuthors()}</select>
            </div>

            <button>Add More</button>
        </form>
    );

};

export default AddBook;