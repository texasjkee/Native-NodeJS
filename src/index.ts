import express from 'express';

const app = express();
const PORT = 3033;

const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

const db = {
 tests: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'devops'},
    {id: 3, title: 'back-end'},
    {id: 4, title: 'testing'},
    {id: 5, title: 'gaming'},
  ] 
}

app.get('/', (req, res) => {
  res.send('texasjkee')
})
app.get('/test/:id', (req, res) => {

  const foundTest = db.tests.find(el => el.id === +req.params.id)
 
  if(!foundTest) {
    res.sendStatus(404);
    return;
  }

  res.json(foundTest)
})
app.get('/tests', (req, res) => {
 
  let foundTest = db.tests;

  if(req.query.title) {
     foundTest = foundTest.filter(t => t.title.indexOf(req.query.title as string) > -1);
  }

  res.json(foundTest)
})
app.post('/users', (req, res) => {

  const createdTest = {
    id: +(new Date()),
    title: req.body.title
  }

  db.tests.push(createdTest)

  console.log(db.tests)  
  res.json(createdTest)
})

app.listen(PORT, () => {
  console.log(`Starting app at port ${PORT} `)
})