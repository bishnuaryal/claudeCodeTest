import { Configuration, DefaultApi } from './client';

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:3000' }));

api
  .listTodos()
  .then((res) => console.warn('Todos:', res))
  .catch((err) => console.error(err));
