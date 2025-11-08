// Importa o módulo express
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Define o caminho absoluto da pasta 'public'
const publicPath = path.join(__dirname, 'public');

// Faz o servidor disponibilizar todos os ficheiros dentro de /public
app.use(express.static(publicPath));

// Rota principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Rota para listar as imagens de um termo específico
app.get('/imagens/:termo', (req, res) => {
  const termo = req.params.termo.toUpperCase();
  const dirPath = path.join(publicPath, 'imagens', termo);

  // Usa o módulo fs para ler a pasta
  const fs = require('fs');
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.status(404).send(`<h3>❌ Nenhuma imagem encontrada para o termo: ${termo}</h3>`);
      return;
    }

    // Gera uma listagem simples de links (para o navegador e o script JS)
    let lista = `<h3>📁 Imagens para o termo: ${termo}</h3><ul>`;
    files.forEach(file => {
      lista += `<li><a href="${file}">${file}</a></li>`;
    });
    lista += '</ul>';

    res.send(lista);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
