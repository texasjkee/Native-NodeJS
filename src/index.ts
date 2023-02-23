import express, { Request, Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from './types'
import { CreateUserModel } from './models/CreateUserModel'
import { UpdateUserModel } from './models/UpdateUserModel';
import { QueryUsersModel } from './models/QueryUsersModel';
import { UserViewModel } from './models/UserViewModel';
import { URIParamsUserIdModel } from './models/URIParamsUserIdModel';


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
  usersCount: number
}

const db: {users: UsersType []} = {
 users: [
    {id: 1, title: 'example#1-end', usersCount: 8},
    {id: 2, title: 'example#2', usersCount: 8},
    {id: 3, title: 'example#3', usersCount: 8},
    {id: 4, title: 'example#4-end', usersCount: 8},
    {id: 5, title: 'example#6', usersCount: 8},
  ] 
}

app.get('/', (req, res) => {
  res.sendStatus(HTTP_STATUS.OK_200)
})

app.get('/users', (req: RequestWithQuery<CreateUserModel>, res: Response<UserViewModel[]>) => {
  let foundUsers = db.users;
  if(req.query.title) {
     foundUsers = foundUsers.filter(u => u.title.indexOf(req.query.title) > -1);
  }
  res.json(foundUsers.map(dbUser => {
    return {
      id: dbUser.id,
      title: dbUser.title
    }
  }))
})

app.get('/user/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response<UserViewModel>) => {
  const foundUser = db.users.find(el => el.id === +req.params.id)
  if(!foundUser) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    return;
  }
  res.json({
    id: foundUser.id,
    title: foundUser.title
  })
})

app.post('/user', (req: RequestWithBody<CreateUserModel>, res: Response<UsersType>) => {
   if(!req.body.title) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    return
   }
  const createdUser: UsersType = {
    id: +(new Date()),
    title: req.body.title,
    usersCount: 1 
  }
  db.users.push(createdUser)
  res
    .sendStatus(HTTP_STATUS.CREATED_201)
    .json(createdUser)
})

app.delete('/user/:id', (req: RequestWithParams<URIParamsUserIdModel>, res) => {
  const deleteUser = db.users = db.users.filter(el => el.id !== +req.params.id);
  res
    .sendStatus(HTTP_STATUS.NO_CONTENT_204)
    .json(deleteUser);
})

app.put('/user/:id', (req: RequestWithParamsAndBody<URIParamsUserIdModel,UpdateUserModel>, res) => {
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