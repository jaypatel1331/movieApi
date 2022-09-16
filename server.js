/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Jay Ashishbhai Patel 
* Student ID: 154925192
*  Date: 15 September 2022
* Cyclic Link: https://jittery-erin-dog.cyclic.app/api/movies/573a1391f29313caabcd956e
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




