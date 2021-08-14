import express from 'express';
import AgendamentosController from './controllers/AgendamentosController';
import AtendimentosController from './controllers/AtendimentosController';
import ColaboradoresController from './controllers/ColaboradoresController';
import FavoritosController from './controllers/FavoritosController';
import LoginController from './controllers/LoginController';
import OrganizacoesController from './controllers/OrganizacoesController';
import TagsController from './controllers/TagsController';
import UserController from './controllers/UserController';

const routes = express.Router();
const agendamentosController = new AgendamentosController();
const atendimentosController = new AtendimentosController();
const colaboradoresController = new ColaboradoresController();
const favoritosController = new FavoritosController();
const loginController = new LoginController();
const organizacoesController = new OrganizacoesController();
const tagsController = new TagsController();
const userController = new UserController();

var path = require('path');

routes.get('/', (req, res) => {
  return res.json({message: 'Rota Principal'});  
});

// ********* Recursos ************
routes.get('/public/imagens', (req, res)  => {
  res.sendFile(path.join(__dirname + '/public/imagens'));
});

routes.get('/web/src/assets/images/lixo', (req, res) => {
  res.sendFile(path.join(__dirname + '/web/src/assets/images/lixo'));
});

routes.post('/agendamentos', agendamentosController.create);
routes.get('/agendamentos', agendamentosController.index);
routes.put('/agendamentos/:id_agend', agendamentosController.update);
routes.delete('/agendamentos/:id_agend', agendamentosController.delete);

routes.post('/atendimentos', atendimentosController.create);
routes.get('/atendimentos', atendimentosController.index);
routes.put('/atendimentos/:id_atd', atendimentosController.update);
routes.delete('/atendimentos/:id_atd', atendimentosController.delete);

routes.post('/colaboradores', colaboradoresController.create);
routes.get('/colaboradores', colaboradoresController.index);
routes.put('/colaboradores/:id_colab', colaboradoresController.update);
routes.delete('/colaboradores/:id_colab', colaboradoresController.delete);

routes.post('/favoritos', favoritosController.create);
routes.put('/favoritos/:usuario_fav/organizacao/:organizacao_fav', favoritosController.update);
routes.delete('/favoritos/:usuario_fav/organizacao/:organizacao_fav', favoritosController.delete);

routes.get('/login', loginController.index);

routes.get('/organizacoes', organizacoesController.index);
routes.post('/organizacoes', organizacoesController.create);
routes.put('/organizacoes/:id', organizacoesController.update);
routes.delete('/organizacoes/:id', organizacoesController.delete);

routes.post('/tag', tagsController.create);

routes.post('/usuarios', userController.create);
routes.get('/usuarios', userController.index);
routes.put('/usuarios/:id_usu', userController.update);
routes.delete('/usuarios/:id_usu', userController.delete);

export default routes;