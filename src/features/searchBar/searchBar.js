import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { 
    addSearchTerm,
    addSearchResults, 
    logSearchSlice,
    selectTerm
} from "./searchSlice";
import { 
    useDispatch, 
    useSelector,
} from "react-redux";


export default function SearchBar() {

    // Set the searchTerm from the redux State
    const searchTerm = useSelector(selectTerm);
    
    // Set the router History
    const history = useHistory();

    // set the searchInput Reference from the imput field ** inputfield needs a ref={searchInputRef}
    const searchInputRef = useRef();
    
    // Set the Dispatch command
    const dispatch = useDispatch();

    const onSearchHandler = (e) => {
        e.preventDefault();

        // console.log(searchInputRef.current.value);
        dispatch(addSearchTerm(searchInputRef.current.value));

        
        // dispatch(addSearchResults(searchThunk(searchTerm)));
        history.push('/searchResults')
    };

    const searchThunk = (term) => {
        console.log(term);
        return fetch(`https://reddit.com/search.json?q=${term}`)
    }

    return (
        <div title="searchBar" className="searchBar">
            <form onSubmit={onSearchHandler} className='search-form' >
                <input
                    id="searchTerm"
                    type='text'
                    placeholder='Search'
                    ref={searchInputRef}

                />
                <button>Search</button>
            </form>
        </div>
    );
};