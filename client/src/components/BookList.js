import React from 'react';

import {
    useQuery,
    gql
} from "@apollo/client";

const GET_BOOKS_QUERY = gql`
  {
      books
      {
          name
          id
      }
  }`


const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
    return data.books.map(({ name, id }) => (
        <div>
            <ul>
                <li key={id}>{name} </li>
            </ul>
        </div>
    ));
};

export default BookList;
