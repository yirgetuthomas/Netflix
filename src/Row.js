import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const base_url = 'https://image.tmdb.org/t/p/original';

function Row({title, fetchUrl, isLargeRow}) {
const [movies, setMovies] = useState([]);
const [trailerurl, setTrailerurl] = useState('')
useEffect(() => {
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        // console.log(request);
        setMovies(request.data.results);
        return request;
    }
    fetchData();
    
}, [fetchUrl]);
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1
  }
}
const handleMovietrailer = (movie) => {
       if (trailerurl) {
        setTrailerurl('')
       } else {
        movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerurl(urlParams.get('v'))
        })
        .catch((error) => console.log(error))
       }
}

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img onClick={() => handleMovietrailer(movie)} className={`row__poster ${isLargeRow && 'row__posterLarge'}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
        ))}
        
      </div>
      {trailerurl && <YouTube videoId={trailerurl} opts={opts}/>}
    </div>
  )
}

export default Row
