import express from 'express';

const app = express();
const PORT = 3033;

const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware);

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
 
  let foundTests = db.tests;

  if(req.query.title) {
     foundTests = foundTests.filter(t => t.title.indexOf(req.query.title as string) > -1);
  }

  res.json(foundTests)
})
app.post('/users', (req, res) => {

 if(!req.body.title) {
  res.sendStatus(400);
  return
 }

  const createdTest = {
    id: +(new Date()),
    title: req.body.title
  }

  db.tests.push(createdTest)
  console.log(db.tests)
  res
    .sendStatus(201)
    .json(createdTest)
})
app.delete('/test/:id', (req, res) => {
  const deleteTest = db.tests = db.tests.filter(el => el.id !== +req.params.id);

  res
    .sendStatus(204)
    .json(deleteTest);
})
app.listen(PORT, () => {
  console.log(`Starting app at port ${PORT} `)
})