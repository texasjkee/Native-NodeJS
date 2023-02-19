import express from 'express';

const app = express();
const PORT = 3033;

app.get('/', (req, res) => {
  res.send('texasjkee')
})

app.get('/users', (req, res) => {
  res.send('hello friends')
})

app.post('/users', (req, res) => {
  res.send('Goodbye friends')
})

app.listen(PORT, () => {
  console.log(`Starting app at port ${PORT} `)
})