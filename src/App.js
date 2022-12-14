import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// API key 6b65933e
// const API_URL = 'http://www.omdbapi.com/?apikey=6b65933e';
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=6b65933e';
//http://www.omdbapi.com/?apikey=6b65933eimage.png



const App = () =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        //Calls API?
        const response = await fetch(`${API_URL}&S=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    //Fetch movie data as soon as app loads
    useEffect(() => {
        searchMovies('');
    }, []);

    return(
        <div className ='app'>
            <h1>MovieLand</h1>
            {/*Search container */}
            <div className='search'>
                <input
                    placeholder = 'Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={(e) => searchMovies(searchTerm)}
                    
                />
                <img
                 src={SearchIcon}
                 alt='search'
                 onClick={() =>searchMovies(searchTerm)}
                />
            </div>
            {/*Dynamic movie container, renders content if it exists*/}
            {
                movies ?.length > 0 ? 
                (
                 <div className ='container'>
                  {movies.map((movie) => 
                    <MovieCard movie ={movie}/>
                  )}
                 </div>
                ) : 
                (
                 <div className='empty'>
                  <h2>No movies found</h2>
                 </div>
                )
            }
        </div>
    );
}

export default App; 