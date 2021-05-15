import express, { response } from 'express';
import OrganizacoesController from './controllers/OrganizacoesController';
import ColaboradoresController from './controllers/ColaboradoresController';
import TagsController from './controllers/TagsController';
import AtendimentosController from './controllers/AtendimentosController';

const routes = express.Router();
const organizacoesController = new OrganizacoesController();
const tagsController = new TagsController();
const colaboradoresController = new ColaboradoresController();
const atendimentosController = new AtendimentosController();

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

routes.post('/atendimentos', atendimentosController.create);
routes.get('/atendimentos', atendimentosController.index);
routes.put('/atendimentos/:id_atd', atendimentosController.update);
routes.delete('/atendimentos/:id_atd', atendimentosController.delete);

export default routes;