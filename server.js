// server.js
// This is a change on the MAIN branch
const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const app = express();
app.use(express.json());

// OpenAPI 読み込み & Swagger UI
const apiSpecPath = './openapi.yaml';
const apiSpec = YAML.load(apiSpecPath);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

// ★ OpenAPI バリデータ（middleware 方式 / v5）
app.use(
    OpenApiValidator.middleware({
        apiSpec: apiSpecPath,      // パスを渡すのが確実
        validateRequests: true,    // リクエスト検証
        validateResponses: true,   // レスポンス検証
    })
);

// ---- ここから API 実装 ----
let seq = 2;
const todos = [
    { id: 1, title: 'Buy milk', done: false },
    { id: 2, title: 'Write code', done: false },
];

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
    const todo = { id: ++seq, title: req.body.title, done: false };
    todos.push(todo);
    res.status(201).json(todo);
});

app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const t = todos.find(x => x.id === id);
    if (!t) return res.status(404).end();
    res.json(t);
});

app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const t = todos.find(x => x.id === id);
    if (!t) return res.status(404).end();
    if (typeof req.body.title === 'string') t.title = req.body.title;
    if (typeof req.body.done === 'boolean') t.done = req.body.done;
    res.json(t);
});

app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = todos.findIndex(x => x.id === id);
    if (idx !== -1) todos.splice(idx, 1);
    res.status(204).end();
});

// 共通エラーハンドラ（必須）
app.use((err, req, res, next) => {
    console.error(err); // ← 起動時/実行時の原因が分かる
    res.status(err.status || 500).json({ message: err.message, errors: err.errors });
});

// 起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Todo API running: http://localhost:${PORT}  (Docs: /docs)`);
});
