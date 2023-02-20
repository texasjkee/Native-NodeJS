"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3033;
const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    tests: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'devops' },
        { id: 3, title: 'back-end' },
        { id: 4, title: 'testing' },
        { id: 5, title: 'gaming' },
    ]
};
app.get('/', (req, res) => {
    res.send('texasjkee');
});
app.get('/test/:id', (req, res) => {
    const foundTest = db.tests.find(el => el.id === +req.params.id);
    if (!foundTest) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res
        .sendStatus(HTTP_STATUS.OK_200)
        .json(foundTest);
});
app.get('/tests', (req, res) => {
    let foundTests = db.tests;
    if (req.query.title) {
        foundTests = foundTests.filter(t => t.title.indexOf(req.query.title) > -1);
    }
    res
        .sendStatus(HTTP_STATUS.OK_200)
        .json(foundTests);
});
app.post('/user', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const createdTest = {
        id: +(new Date()),
        title: req.body.title
    };
    db.tests.push(createdTest);
    res
        .sendStatus(HTTP_STATUS.CREATED_201)
        .json(createdTest);
});
app.delete('/test/:id', (req, res) => {
    const deleteTest = db.tests = db.tests.filter(el => el.id !== +req.params.id);
    res
        .sendStatus(HTTP_STATUS.NO_CONTENT_204)
        .json(deleteTest);
});
app.put('/test/:id', (req, res) => {
    const foundTest = db.tests.find(el => el.id === +req.params.id);
    if (!foundTest) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundTest.title = req.body.title;
    res
        .sendStatus(HTTP_STATUS.NO_CONTENT_204)
        .json(foundTest);
});
app.listen(PORT, () => {
    console.log(`Starting app at port ${PORT} `);
});
