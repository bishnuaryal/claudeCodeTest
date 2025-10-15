/* tslint:disable */
/* eslint-disable */
export * from './runtime';
export * from './apis/index';
export * from './models/index';
// 生成物例: client/index.ts など（実際のパスは生成物に依存）
import { Configuration, DefaultApi } from './client';

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:3000' }));
api.listTodos().then(res => console.log(res));
