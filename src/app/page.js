"use client"
import React from "react"
import { useState} from "react";
import { BotMessageSquare,CalendarIcon,StarIcon,SearchIcon } from 'lucide-react';

export default function Home() {
  const [imdb,setImdb]=useState("")
  const [movie,setMovie]=useState(null)
  
  

  const handleSubmit=async (e)=>{
     try {
      // Fetch movie details from API
    const res = await fetch(`/api/movie?imdbId=${imdb}`)
    const data = await res.json()

    if (data.error) {
      console.error("API Error:", data.error)
      setMovie(null)
      return
    }

    setMovie(data)
    setImdb("")
  } catch (error) {
    console.error("Fetch failed:", error)
  }
  }
  return (
    <div className="flex flex-col font-poppins tracking-wide min-h-screen p-5 mt-10 overflow-x-hidden  items-center text-white   justify-center font-serif">
      
      <div className="flex flex-row gap-3">
      <img src="/video-player.png" className="w-8 h-8"/>
          <p className="bg-gradient-to-t from-yellow-300 to-yellow-700 bg-clip-text text-transparent text-3xl font-md">CINEINSIGHT</p>
          </div>
          <div className="mt-5 text-center ">
          <p className="text-6xl font-bold">Discover Movie</p>
          <p className="text-6xl bg-gradient-to-t from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">Insights</p>
          </div>
          <p className="text-[1.5rem] text-gray-700 text-center mt-5 min-w-[90vw]">Enter an IMDb ID to explore cast, ratings, and AI-powered audience sentiment analysis.</p>
          
          <div className="flex  relative flex-row w-full  items-center  justify-center mt-7 gap-3">
            
                <input value={imdb} onChange={(e)=>setImdb(e.target.value)} className="py-5 pl-15 max-[500px]:text-lg max-[500px]:pl-10   min-w-0 overflow-x-hidden  flex-1 text-2xl bg-gray-600 rounded-lg text-gray-300" placeholder="tt0133093"/>
                <SearchIcon className="absolute text-gray-400 left-3 max-[500px]:w-6 w-8 h-auto"/>
                <button onClick={handleSubmit} className="py-6 w-33 max-md:px-2 text-center    text-black text-center font-bold bg-gradient-to-r from-yellow-300 to-yellow-600 cursor-pointer rounded-md ">Analyze</button>
                
          </div>
          
          <p className="text-[1.2rem] mt-4 text-gray-700 text-center min-w-[70vw]">Try: tt0133093 (The Matrix) · tt0468569 (The Dark Knight) · tt1375666 (Inception)</p>
          {
            movie && (
              <>
              <div className="flex flex-col items-center   mt-10 justify-center w-full h-full">
                <div className="flex flex-row gap-6 max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center">
                  <img src={movie.poster} className="h-auto w-full  max-[900px]:max-w-[33vw] max-w-[17vw]"/>
                  <div className="flex flex-1 flex-col gap-3 h-full max-[900px]:min-w-full">
                    <p className="text-5xl max-md:text-4xl">{movie.title}</p>
                    <div className="flex flex-row w-full gap-6 text-[1.2rem] mt-3">
                        <p className="flex flex-row gap-2 items-center"><CalendarIcon/>{movie.release_year}</p>
                        <p className="flex flex-row gap-2 items-center text-yellow-600"><StarIcon/>{Number(movie.rating).toFixed(1)}/10</p>
                    </div>
                    <p className="text-[1.3rem]">{movie.plot}</p>
                    </div>
                    </div>
                    <div className="mt-10 flex flex-col items-start p-5 gap-5 bggap-4 border-1 border-green-400 w-full h-full">
                        <p className="text-[1.6rem]">AI Sentiment Analysis</p>
                       {movie.sentimentSummary ? (
    <>
    <div className="flex flex-row w-full justify-between">
     <p className="flex flex-row items-center gap-2 border-1 border-green-600 bg-white/15 text-[1.2rem] rounded-full px-5 py-3 font-bold text-green-600"><BotMessageSquare/>{movie.sentimentSummary.sentiment}</p>
      <span className="text-green-600 font-bold">{movie.sentimentSummary.score}%</span>
      </div>
      <p className="text-[1.2rem]">{movie.sentimentSummary.summary}</p>
      
      <div className="mt-2">
      {movie.sentimentSummary.highlights.map((point, i) => (
        <ul key={i} className="flex flex-col list-disc list-inside">
        <li key={i} className="text-green-400 text-[1.2rem]  marker:text-green-400"> <span className="text-gray-500">{point}</span></li>
        </ul>
      ))}
      </div>
    </>
  ) : (
    <p>Loading sentiment...</p>
  )}
                    </div>
                    
              </div>
              
              </>
            )
          }
         

          {movie && (
  <>
    {/* all your movie display code here */}
    
    <div className="flex flex-col items-start w-full shrink-0  mt-5 gap-4">
      <p className="font-bold text-2xl">Cast</p>
      <div className="grid grid-cols-5 max-md:grid gap-y-3 max-md:grid-cols-2 max-lg:grid-cols-4 max-md:flex-1 w-full flex-wrap gap-x-2">
        {movie.cast && movie.cast.map((member, i) => (
          <div key={i} className="flex max-md:max-w-[70vw] flex-col items-center gap-2 border border-gray-500 p-5 rounded-lg w-full max-w-[34vw]  h-auto">
            {/* Display fallback avatar if cast image is missing */}
            {member.image ? (
              <img src={member.image} className="w-full max-w-[14vw] max-md:min-w-[25vw] max-[500px]:min-w-[63vw] aspect-square h-auto rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                <p className="text-white">{member.name[0]}</p>
              </div>
            )}
            <p className="text-white text-lg text-center font-bold">{member.name}</p>
            <p className="text-gray-400 text-2xs text-center">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  </>
)}
{
  movie && (

<div className="flex flex-col  gap-6 items-start mt-10 w-full">
<p className="font-bold text-2xl">Audience Reviews</p>

{movie.reviews && movie.reviews.map((member,i)=>(
<div key={i} className="flex flex-col gap-5 justify-start  w-full p-5 max-[500px]:p-7  h-full border-1 border-gray-500">
      <div className="flex flex-row justify-between">
        <div className="flex w-full items-center justify-start">
          <img src="/user.jpeg" className="h-15 min-w-20 max-md:h-12 max-md:min-w-17 aspect-square"/>
          <div className="flex flex-col gap-1">
            <p className="font-bold">{member.author}</p>
            <p>{member.date}</p>
            </div>
          
            </div>
            
            <p className="flex flex-row gap-2 items-center text-yellow-600"><StarIcon/>{Number(member.rating).toFixed(1)}/10</p>
      </div>
      <p className="p-4 text-lg wrap-break-word">{member.content}</p>

</div>
))

}
</div>
)}
    </div>
  );
}



