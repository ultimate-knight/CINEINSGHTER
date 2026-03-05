
import Groq from "groq-sdk";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const groq=new Groq({apiKey:process.env.GROK_KEY})
    const imdbId = searchParams.get("imdbId");

    if (!imdbId) {
      return new Response(JSON.stringify({ error: "IMDb ID is required" }), { status: 400 });
    }

    const tmdbApiKey = process.env.TMDB_TOKEN;
    console.log("TMDb Key:", tmdbApiKey);

    // --- Step 3a: Fetch movie details using TMDb ---
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbApiKey}&language=en-US&external_source=imdb_id`
    );
    const movieData = await movieRes.json();

    console.log("movieData:", JSON.stringify(movieData));

    if (!movieData.movie_results || movieData.movie_results.length === 0) {
      return new Response(JSON.stringify({ error: "Movie not found" }), { status: 404 });
    }

    const movie = movieData.movie_results[0];
    console.log("movie id:", movie.id);

    // --- Step 3b: Fetch movie cast ---
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${tmdbApiKey}&language=en-US`
    );
    const creditsData = await creditsRes.json();
    console.log("credits done"); 
   const cast = creditsData.cast.slice(0, 5).map(c => ({
  name: c.name,
  character: c.character,
  image: c.profile_path 
    ? `https://image.tmdb.org/t/p/w200${c.profile_path}` 
    : null
}));

    // --- Step 3c: Fetch audience reviews/comments ---
    const reviewsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${tmdbApiKey}&language=en-US`
    );
    const reviewsData = await reviewsRes.json();
    
    const reviews = reviewsData.results
  .slice(0, 5)
  .map(r => ({
    author: r.author,
    content: r.content.slice(0, 300),
    rating: r.author_details?.rating || null,
    date: new Date(r.created_at).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }));
  const reviewText=reviews.map(r => r.content).join("\n\n");
let sentimentSummary = "";
if (reviews.length > 0) {
  const aiResponse = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Summarize these audience reviews for the movie "${movie.title}" and classify the overall sentiment as positive, mixed, or negative.

Reviews:
${reviewText}

Respond ONLY in this JSON format, no extra text:
{
 "summary": "2-3 sentence overall summary",
  "sentiment": "positive",
  "score": 85,
  "highlights": [
    "Key point 1",
    "Key point 2",
    "Key point 3",
    "Key point 4"
  ]
    
}`
      }
    ]
  });

  sentimentSummary = aiResponse.choices[0].message.content;
  let parsedsummary;
  try {
    parsedsummary=JSON.parse(sentimentSummary)
  } catch (error) {
    parsedsummary= { summary: sentimentSummary, sentiment: "unknown", score: 0, highlights: [] };
  }
  sentimentSummary=parsedsummary
} else {
  sentimentSummary = "No reviews available for sentiment analysis.";
}




    // --- Step 3e: Return full response ---
    return new Response(
      JSON.stringify({
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_year: movie.release_date?.split("-")[0],
        rating: movie.vote_average,
        plot: movie.overview,
        cast,
        reviews,
        sentimentSummary
      }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}