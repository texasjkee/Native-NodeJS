"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const PORT = 3033;
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const db = {
    users: [
        { id: 1, title: 'example#1' },
        { id: 2, title: 'example#2' },
        { id: 3, title: 'example#3' },
        { id: 4, title: 'example#4' },
        { id: 5, title: 'example#6' },
    ]
};
exports.app.get('/', (req, res) => {
    res.sendStatus(exports.HTTP_STATUS.OK_200);
});
exports.app.get('/users', (req, res) => {
    let foundUsers = db.users;
    if (req.query.title) {
        foundUsers = foundUsers.filter(t => t.title.indexOf(req.query.title) > -1);
    }
    res.json(foundUsers);
});
exports.app.get('/user/:id', (req, res) => {
    const foundUser = db.users.find(el => el.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(foundUser);
});
exports.app.post('/user', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const createdUser = {
        id: +(new Date()),
        title: req.body.title
    };
    db.users.push(createdUser);
    res
        .sendStatus(exports.HTTP_STATUS.CREATED_201)
        .json(createdUser);
});
exports.app.delete('/user/:id', (req, res) => {
    const deleteUser = db.users = db.users.filter(el => el.id !== +req.params.id);
    res
        .sendStatus(exports.HTTP_STATUS.NO_CONTENT_204)
        .json(deleteUser);
});
exports.app.put('/user/:id', (req, res) => {
    const foundUser = db.users.find(el => el.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundUser.title = req.body.title;
    res
        .sendStatus(exports.HTTP_STATUS.NO_CONTENT_204)
        .json(foundUser);
});
exports.app.delete('/__test__/data', (req, res) => {
    db.users = [];
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.listen(PORT, () => {
    console.log(`Starting app at port ${PORT} `);
});
