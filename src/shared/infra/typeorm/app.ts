import express from 'express';
const app = express();

app.get('/', (request, response) => {
    return response.status(200).json({ message: 'Hello Tester!' });
});

export default app;
