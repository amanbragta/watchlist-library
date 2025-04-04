import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import '../css/Home.css'
import { getPopularMovies,searchMovies } from "../services/api"

function Home(){
    const [searchQuery,setSearchQuery] = useState('')
    const [movies,setMovies] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const loadPopularMovies = async ()=>{
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err){
                console.log(err)
                setError(err)
            } finally{
                setLoading(false)
            }
        }
        loadPopularMovies()

    },[])

    const handleForm = async (e)=>{
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err){
            console.log(err)
            setError(err)
        } finally{
            setLoading(false)
        }
    }
    return(
    <div className="home">
        <form onSubmit={handleForm} className="search-form">
            <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
            <button className="search-button" type="submit">Search</button>
        </form>
        {error && (<div className="error-message">{error}</div>)}
        <h1 className="main-heading">Popular movies</h1>
        {loading ? (<div className="loading">Loading...</div>):
         <div className="movies-grid">
         {movies.map(movie=><MovieCard key={movie.id} movie={movie}/>)}
        </div>
        }
    </div>
    )
}

export default Home