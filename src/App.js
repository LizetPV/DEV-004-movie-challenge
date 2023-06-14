import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './App.css';

function App() {
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = '4d60a3fee74285fec3fb0fe2535260cd'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

  // crear variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // Esta función es para realizar la petición GET a la API
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover"
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    setMovies(results)
    setMovie(results[0])
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <div>
      {/* Esto es JSX (contenedor que va a mostrar posters de las películas actuales) */}
      <div className='container mt-3'>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className='col-md-4 mb-3'>
              <img src={`${URL_IMAGE + movie.poster_path}`} alt='' height={600} width="100%" />
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
