import { createConnection } from 'typeorm';
createConnection()
    .then(() => {
        console.log('database connected 🍏');
    })
    .catch(error => {
        console.log('database desconected 🔴', error);
    });
