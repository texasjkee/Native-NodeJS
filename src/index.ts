import express, {Request, Response} from 'express';

export const app = express();
const PORT = 3033;

export const HTTP_STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware);

type UsersType = {
  id: number
  title: string
}

const db: {users: UsersType []} = {
 users: [
    {id: 1, title: 'example#1'},
    {id: 2, title: 'example#2'},
    {id: 3, title: 'example#3'},
    {id: 4, title: 'example#4'},
    {id: 5, title: 'example#6'},
  ] 
}

app.get('/', (req, res) => {
  res.sendStatus(HTTP_STATUS.OK_200)
})

app.get('/users', (req: Request<{},{},{},{title: string}>, res: Response<UsersType[]>) => {
  let foundUsers = db.users;
  if(req.query.title) {
     foundUsers = foundUsers.filter(t => t.title.indexOf(req.query.title) > -1);
  }
  res.json(foundUsers)
})

app.get('/user/:id', (req: Request<{id: string}>, res) => {
  const foundUser = db.users.find(el => el.id === +req.params.id)
  if(!foundUser) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }
  res.json(foundUser)
})

app.post('/user', (req: Request<{},{},{title: string}>, res: Response<UsersType>) => {
   if(!req.body.title) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    return
   }
  const createdUser = {
    id: +(new Date()),
    title: req.body.title
  }
  db.users.push(createdUser)
  res
    .sendStatus(HTTP_STATUS.CREATED_201)
    .json(createdUser)
})

app.delete('/user/:id', (req: Request<{id: string}>, res) => {
  const deleteUser = db.users = db.users.filter(el => el.id !== +req.params.id);
  res
    .sendStatus(HTTP_STATUS.NO_CONTENT_204)
    .json(deleteUser);
})

app.put('/user/:id', (req: Request<{id: string},{},{title: string}>, res) => {
  const foundUser = db.users.find(el => el.id === +req.params.id)
  if(!foundUser) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }
  foundUser.title = req.body.title; 
  res
    .sendStatus(HTTP_STATUS.NO_CONTENT_204)
    .json(foundUser)
})

app.delete('/__test__/data', (req,res) => {
  db.users = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
})

app.listen(PORT, () => {
  console.log(`Starting app at port ${PORT} `)
})