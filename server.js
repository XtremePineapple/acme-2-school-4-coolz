console.log("server.js")

const express = require('express')
const app = express();
const path = require('path');
const db = require('./db');

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/students', (req, res, next)=> {
  db.readStudents()
    .then( student => res.send(student))
    .catch(next);
});
app.get('/api/schools', (req, res, next)=> {
  db.readSchools()
    .then( school => res.send(school))
    .catch(next);
});

app.post('/api/students', (req, res, next) => {
  db.createStudent(req.body)
    .then( thing => res.send(thing))
    .catch(next)
});
app.post('/api/schools', (req, res, next) => {
  db.createSchool(req.body)
    .then( () => res.sendStatus(204))
    .catch( next )
});

app.delete('/api/students/:id', (req, res, next) => {
  db.destroySchool(req.params.id)
    .then( () => res.sendStatus(204))
    .catch( next )
});
app.delete('/api/schools/:id', (req, res, next) => {
  db.destroySchool(req.params.id)
    .then( () => res.sendStatus(204))
    .catch( next )
});


app.use((req, res, next)=> {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  })
});
app.use((err, req, res, next)=> {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});

const port = process.env.PORT || 3001;

db.sink()
  .then(()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`)
    });
  });