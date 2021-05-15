import express, { response } from 'express';
import OrganizacoesController from './controllers/OrganizacoesController';
import ColaboradoresController from './controllers/ColaboradoresController';
import TagsController from './controllers/TagsController';

const routes = express.Router();
const organizacoesController = new OrganizacoesController();
const tagsController = new TagsController();
const colaboradoresController = new ColaboradoresController();

routes.get('/', (req, res) => {
  return res.json({message: 'Rota Principal'});  
});

routes.get('/organizacoes', organizacoesController.index);
routes.post('/organizacoes', organizacoesController.create);
routes.put('/organizacoes/:id', organizacoesController.update);
routes.delete('/organizacoes/:id', organizacoesController.delete);

routes.post('/tag', tagsController.create);

routes.post('/colaboradores', colaboradoresController.create);
routes.get('/colaboradores', colaboradoresController.index);
routes.put('/colaboradores/:id_colab', colaboradoresController.update);
routes.delete('/colaboradores/:id_colab', colaboradoresController.delete);

export default routes;