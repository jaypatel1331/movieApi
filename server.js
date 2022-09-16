/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: ______________________ Student ID: ______________ Date: ________________
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/

const express = require('express');
const cors = require('cors');
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
require('dotenv').config();

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json())


// add new movie 
  app.post('/api/movies', async (req, res) => {
    try{
    const data = await db.addNewMovie(req.body); 
    res.json(data);
    }catch(err){
        res.status(204).json({message: err});
      };
  });

// get all movies based on page, perPage and title

  app.get('/api/movies',async (req, res) => {
    try{
       const data = await db.getAllMovies(req.query.page, req.query.perPage, req.query.title);
        res.json(data);
    }
    catch(err){
        res.status(204).json({message: err});
    }
  });


  // get movie based on id

  app.get('/api/movies/:id', async (req, res) => {
    try{
        const data = await db.getMovieById(req.params.id); 
        res.json(data);
      }catch(err){
        res.status(204).json({message: err});
      }  });

// update movie using id

  app.put('/api/movies/:id',async (req, res) => {
    try{
        await db.updateMovieById(req.body, req.params.id);
        res.json({message: "Movie updated, please watch again !!!!!"});
      }catch(err){
        res.status(204).json({message: err});
      }
  });


  // delete movie using id

  app.delete('/api/movies/:id', async (req, res) => {
    try{
        await db.deleteMovieById(req.params.id)
        res.json({message: "Movie deleted, Sorry to see you go ...."});
      }catch(err){
        res.status(404).json({message: err});
      }
  });


db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
 app.listen(HTTP_PORT, ()=>{
 console.log(`server listening on: ${HTTP_PORT}`);
 });
}).catch((err)=>{
 console.log(err);
});




{
  "awards": {
    "wins": 1,
    "nominations": 1,
    "text": "1 win & 1 nomination."
  },
  "imdb": {
    "rating": 8,
    "votes": 63557,
    "id": 13442
  },
  "tomatoes": {
    "viewer": {
      "rating": 4,
      "numReviews": 46806,
      "meter": 87
    },
    "dvd": "1997-10-22T00:00:00.000Z",
    "lastUpdated": "2015-08-20T19:15:25.000Z"
  },
  "_id": "573a1391f29313caabcd956e",
  "plot": "Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter's wife. Silent classic based on the story \"Dracula.\"",
  "genres": [
    "Horror"
  ],
  "runtime": 81,
  "cast": [
    "Max Schreck",
    "Gustav von Wangenheim",
    "Greta Schrèder",
    "Georg H. Schnell"
  ],
  "num_mflix_comments": 1,
  "poster": "https://m.media-amazon.com/images/M/MV5BMTAxYjEyMTctZTg3Ni00MGZmLWIxMmMtOGM2NTFiY2U3MmExXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
  "title": "Nosferatu",
  "fullplot": "Wisbourg, Germany based estate agent Knock dispatches his associate, Hutter, to Count Orlok's castle in Transylvania as the Count wants to purchase an isolated house in Wisbourg. They plan on selling him the one across the way from Hutter's own home. Hutter leaves his innocent wife, Ellen, with some friends while he is away. Hutter's trek is an unusual one, with many locals not wanting to take him near the castle where strange events have been occurring. Once at the castle, Hutter does manage to sell the Count the house, but he also notices and feels unusual occurrences, primarily feeling like there is a dark shadow hanging over him, even in the daytime when the Count is unusually asleep. Hutter eventually sees the Count's sleeping chamber in a crypt, and based on a book he has recently read, believes the Count is really a vampire or Nosferatu. While Hutter is trapped in the castle, the Count, hiding in a shipment of coffins, makes his way to Wisbourg, causing death along his way, which most attribute to the plague. Hutter himself tries to rush home to save his town and most importantly save Ellen from Nosferatu's imminent arrival. In Wisbourg, Ellen can feel the impending darkness as Nosferatu gets closer. But she learns that a sinless woman can sacrifice herself to kill the vampire. Will Hutter be able to save Ellen either from Nosferatu and/or her self-sacrifice?",
  "languages": [
    "German"
  ],
  "released": "1929-06-03T00:00:00.000Z",
  "directors": [
    "F.W. Murnau"
  ],
  "rated": "UNRATED",
  "lastupdated": "2015-09-07T11:20:20.853Z",
  "year": 1922,
  "countries": [
    "Germany"
  ],
  "type": "movie",
  "__v": 0
}