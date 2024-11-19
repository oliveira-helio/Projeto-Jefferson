CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  is_recommended BOOLEAN NOT NULL,
  is_new_product BOOLEAN NOT NULL
);

INSERT INTO products (
  name,
  description,
  price,
  image_url,
  is_recommended,
  is_new_product)
  VALUES 
  ('batom teste 00', 'este é um produto de teste usado para popular o DB', 10.00, './assets/numeros/0', true, true),
  ('batom teste 01', 'este é um produto de teste usado para popular o DB', 15.00, './assets/numeros/1', true, true),
  ('batom teste 02', 'este é um produto de teste usado para popular o DB', 20.00, './assets/numeros/2', true, true),
  ('batom teste 03', 'este é um produto de teste usado para popular o DB', 25.00, './assets/numeros/3', true, true),
  ('batom teste 04', 'este é um produto de teste usado para popular o DB', 30.00, './assets/numeros/4', true, true),
  ('batom teste 05', 'este é um produto de teste usado para popular o DB', 35.00, './assets/numeros/5', true, true),
  ('batom teste 06', 'este é um produto de teste usado para popular o DB', 40.00, './assets/numeros/6', true, true),
  ('batom teste 07', 'este é um produto de teste usado para popular o DB', 45.00, './assets/numeros/7', true, true),
  ('batom teste 08', 'este é um produto de teste usado para popular o DB', 50.00, './assets/numeros/8', true, true),
  ('batom teste 09', 'este é um produto de teste usado para popular o DB', 55.00, './assets/numeros/9', true, true)
