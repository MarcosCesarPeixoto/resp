import express, { response } from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
 
let port = 3000; 

console.log(`Servidor rodando na porta ` + port);

app.listen(port);



