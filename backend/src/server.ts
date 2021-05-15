import express, { response } from 'express';
import routes from './routes';

const app = express();
app.use(express.json()); // recebe o body no estilo json
app.use(routes);
 
let port = 3000; 
console.log(`Servidor rodando na porta ` + port);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status + 500);
  res.json({ error: error.message });
});

app.listen(port);