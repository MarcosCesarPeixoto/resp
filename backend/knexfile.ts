import path from'path';

module.exports = {
  cliente: 'sqlite3',

  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'resp.sqlite3')
  },

  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  
  useNullAsDefault: true,
};

