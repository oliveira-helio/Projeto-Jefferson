const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { log } = require('console');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter produtos novos
app.get('/newproducts', async (req, res) => {
   try {
      const news = await pool.query('SELECT * FROM products WHERE is_new_product = true');
      res.json({ news: news.rows });
   } catch (err) {
      res.status(500).send('Erro ao buscar produtos');
   }
});

// Rota para obter produtos mais vendidos
app.get('/recommended', async (req, res) => {
   try {
      const recommended = await pool.query('SELECT * FROM products WHERE is_recommended = true');
      res.json({ recommended: recommended.rows });
   } catch (err) {
      res.status(500).send('Erro ao buscar produtos');
   }
});

// Rota para detalhes de um produto específico
app.get('/products/details/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) {
         return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(result.rows[0]);
      console.log(result);

   } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).send('Erro no servidor');
   }
});

// Rota para servir a aplicação como SPA
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
