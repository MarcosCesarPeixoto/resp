import express, { response } from 'express';
import OrganizacoesController from './controllers/OrganizacoesController';
import ColaboradoresController from './controllers/ColaboradoresController';
import TagsController from './controllers/TagsController';
import AtendimentosController from './controllers/AtendimentosController';
import UserController from './controllers/UserController';
import FavoritosController from './controllers/FavoritosController';
import AgendamentosController from './controllers/AgendamentosController';

const routes = express.Router();
const organizacoesController = new OrganizacoesController();
const tagsController = new TagsController();
const colaboradoresController = new ColaboradoresController();
const atendimentosController = new AtendimentosController();
const userController = new UserController();
const favoritosController = new FavoritosController();
const agendamentosController = new AgendamentosController();

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

routes.post('/usuarios', userController.create);
routes.get('/usuarios', userController.index);
routes.put('/usuarios/:id_usu', userController.update);
routes.delete('/usuarios/:id_usu', userController.delete);

routes.post('/favoritos', favoritosController.create);
routes.put('/favoritos/:usuario_fav/organizacao/:organizacao_fav', favoritosController.update);
routes.delete('/favoritos/:usuario_fav/organizacao/:organizacao_fav', favoritosController.delete);

routes.post('/agendamentos', agendamentosController.create);
routes.get('/agendamentos', agendamentosController.index);
routes.put('/agendamentos/:id_agend', agendamentosController.update);
routes.delete('/agendamentos/:id_agend', agendamentosController.delete);

// /users/:userId/books/:bookId

export default routes;