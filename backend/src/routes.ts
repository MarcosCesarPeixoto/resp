import express, { response } from 'express';
import OrganizacoesController from './controllers/OrganizacoesController';
import TagsController from './controllers/TagsController';

const routes = express.Router();
const organizacoesController = new OrganizacoesController();
const tagsController = new TagsController();

routes.get('/', (req, res) => {
  return res.json({message: 'Rota Principal'});  
});

routes.get('/organizacoes', organizacoesController.index);
routes.post('/organizacoes', organizacoesController.create);
routes.put('/organizacoes/:id', organizacoesController.update);
routes.delete('/organizacoes/:id', organizacoesController.delete);

routes.post('/tag', tagsController.create);

export default routes;