import { Connection, createConnection } from 'typeorm';
createConnection()
    .then(() => {
        console.log('database connected 🍏');
    })
    .catch(error => {
        console.log('database desconected 🔴', error);
    });

export default async (): Promise<Connection> => {
    const connectionAgo = await createConnection();
    return connectionAgo;
};
