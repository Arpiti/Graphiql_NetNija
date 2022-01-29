import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS_QUERY = gql`
{
    authors
    {
        name
        id
    }
}`;



const displayAuthors = (fetchResults) => {
    if (fetchResults.loading) {
        return <option disabled>Loading Authors... </option>
    }
    else if (fetchResults.data) {
        console.log(fetchResults.data);
        return (fetchResults.data.authors.map(({ name, id }) => {
            //console.log(name);
            <option key={id} value={name}>{name}</option>
        }));
    }

}


  

const AddBook = () => {

   
    const {loading, error, data} = useQuery(GET_AUTHORS_QUERY);

    const getAuthors = () => {
        if (loading) return <option>Loading Authors.</option>;
        else if (error) return <option>Error Loading Authors :(</option>;
        else{
            //console.log(data);
            let res = [
                <option value="">Select Author</option>,
                ...data.authors.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))
              ];
      
            //  console.log(res);
              return res;
        }
        
      };

    
    const [authorName, setAuthorName] = useState("Select Author");

    return (
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select value={authorName} onChange={(e)=> setAuthorName(e.target.value)}>{getAuthors()}</select>

            </div>

            <button>Add More</button>

        </form>
    );

};

export default AddBook;