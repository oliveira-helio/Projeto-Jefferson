CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    details TEXT,
    brand VARCHAR(50) NOT NULL,
    color VARCHAR(50) DEFAULT 'default' NOT NULL,
    color_code VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    sub_category VARCHAR(50) NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    qt_sold NUMERIC DEFAULT 0 NOT NULL,
    is_recommended BOOLEAN NOT NULL,
    is_new_product BOOLEAN NOT NULL,
    bar_code NUMERIC NOT NULL,
    stock INTEGER DEFAULT 100 NOT NULL,
    rating DOUBLE PRECISION DEFAULT 3.5,
    rating_qty INTEGER DEFAULT 10,
    height INTEGER DEFAULT 7,
    width INTEGER DEFAULT 10,
    length INTEGER DEFAULT 15,
    weight DOUBLE PRECISION DEFAULT 0.3
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    is_generic BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE product_images (
    product_id INTEGER NOT NULL REFERENCES products(id),
    image_id INTEGER NOT NULL REFERENCES images(id),
    is_generic BOOLEAN DEFAULT TRUE NOT NULL,
    PRIMARY KEY (product_id, image_id)
);

alter table products rename column rating_qty to ratting_qty;

insert into products (name, description, details, brand, color, color_code, category, sub_category, product_type, price, qt_sold, is_recommended, is_new_product, bar_code, stock, ratting, ratting_qty, height, width, length, weight) values

('Base Líquida Matte', 'Base líquida com acabamento matte.', 'Alta cobertura e longa duração.', 'Marca A', 'Neutro', '#FAFA37', 'Face', 'Base', 'Líquida', 59.90, 300, true, true, 123456789001, 100, 3.5, 10, 7, 10, 15, 0.3),
('Base Cremosa', 'Base cremosa para pele seca.', 'Acabamento luminoso.', 'Marca B', 'Bege Claro', '#F5D7A4', 'Face', 'Base', 'Cremosa', 65.90, 150, false, true, 123456789002, 100, 3.5, 10, 7, 10, 15, 0.3),
('BB Cream', 'BB Cream com proteção solar.', 'Ideal para uso diário.', 'Marca C', 'Neutro', '#FAFA37', 'Face', 'Base', 'BB Cream', 45.90, 200, true, false, 123456789003, 100, 3.5, 10, 7, 10, 15, 0.3),
('Blush Compacto', 'Blush de alta pigmentação.', 'Acabamento natural.', 'Marca D', 'Rosa Suave', '#FFC0CB', 'Face', 'Blush', 'Compacto', 32.90, 120, false, true, 123456789004, 100, 3.5, 10, 7, 10, 15, 0.3),
('Blush Líquido', 'Blush com textura líquida.', 'Ideal para pele sensível.', 'Marca E', 'Bege Claro', '#F5D7A4', 'Face', 'Blush', 'Líquido', 29.90, 90, true, false, 123456789005, 100, 3.5, 10, 7, 10, 15, 0.3),
('Máscara de Cílios Volume', 'Máscara de cílios para volume.', 'Efeito volumoso e duradouro.', 'Marca A', 'Roxo', '#993399', 'Olhos', 'Máscara', 'Volume', 39.90, 250, true, true, 123456789006, 100, 3.5, 10, 7, 10, 15, 0.3),
('Máscara de Cílios Curvadora', 'Máscara para cílios curvados.', 'Aumenta a curvatura.', 'Marca B', 'Vermelho Vivo', '#FF0000', 'Olhos', 'Máscara', 'Curvadora', 37.90, 180, false, false, 123456789007, 100, 3.5, 10, 7, 10, 15, 0.3),
('Delineador Líquido Preto', 'Delineador líquido de alta precisão.', 'Secagem rápida.', 'Marca C', 'Prata', '#C0C0C0', 'Olhos', 'Delineador', 'Líquido', 22.90, 190, true, false, 123456789008, 100, 3.5, 10, 7, 10, 15, 0.3),
('Delineador em Gel', 'Delineador em gel de longa duração.', 'Resistente à água.', 'Marca D', 'Roxo', '#993399', 'Olhos', 'Delineador', 'Gel', 26.90, 140, true, true, 123456789009, 100, 3.5, 10, 7, 10, 15, 0.3),
('Batom Matte', 'Batom com acabamento matte.', 'Alta pigmentação.', 'Marca A', 'Vermelho Vivo', '#FF0000', 'Lábios', 'Batom', 'Matte', 19.90, 300, false, false, 123456789010, 100, 3.5, 10, 7, 10, 15, 0.3),
('Batom Cremoso', 'Batom com textura cremosa.', 'Hidratação prolongada.', 'Marca B', 'Rosa Suave', '#FFC0CB', 'Lábios', 'Batom', 'Cremoso', 21.90, 100, false, false, 123456789011, 100, 3.5, 10, 7, 10, 15, 0.3),
('Gloss Transparente', 'Gloss com brilho intenso.', 'Ideal para brilho natural.', 'Marca C', 'Rosa Suave', '#FFC0CB', 'Lábios', 'Gloss', 'Transparente', 16.90, 250, true, true, 123456789012, 100, 3.5, 10, 7, 10, 15, 0.3),
('Gloss Nude', 'Gloss nude com efeito hidratante.', 'Acabamento natural.', 'Marca D', 'Vermelho Vivo', '#FF0000', 'Lábios', 'Gloss', 'Hidratante', 18.50, 150, false, false, 123456789013, 100, 3.5, 10, 7, 10, 15, 0.3),
('Esmalte Cremoso Vermelho', 'Esmalte cremoso para unhas.', 'Durabilidade de até 7 dias.', 'Marca E', 'Roxo', '#993399', 'Unhas', 'Esmalte', 'Cremoso', 7.90, 500, true, false, 123456789014, 100, 3.5, 10, 7, 10, 15, 0.3),
('Esmalte Metálico Prata', 'Esmalte metálico para brilho intenso.', 'Acabamento metálico.', 'Marca C', 'Prata', '#C0C0C0', 'Unhas', 'Esmalte', 'Metálico', 8.90, 300, false, true, 123456789015, 100, 3.5, 10, 7, 10, 15, 0.3),
('Loção Hidratante Neutro', 'Loção hidratante para pele seca.', 'Absorção rápida.', 'Marca A', 'Transparente', '#FFFFFF', 'Corpo', 'Hidratante', 'Neutro', 25.90, 220, true, false, 123456789016, 100, 3.5, 10, 7, 10, 15, 0.3),
('Óleo Corporal', 'Óleo corporal para hidratação profunda.', 'Ideal para pele seca.', 'Marca E', 'Neutro', '#FAFA37', 'Corpo', 'Óleo', 'Hidratação', 29.90, 150, false, true, 123456789017, 100, 3.5, 10, 7, 10, 15, 0.3),
('Base Líquida Matte', 'Base líquida com acabamento matte.', 'Alta cobertura e longa duração.', 'Marca A', 'Bege Claro', '#F5D7A4', 'Face', 'Base', 'Líquida', 59.90, 300, true, true, 123456789001, 100, 3.5, 10, 7, 10, 15, 0.3),
('Base Líquida Matte', 'Base líquida com acabamento matte.', 'Alta cobertura e longa duração.', 'Marca A', 'Rosa Suave', '#FFC0CB', 'Face', 'Base', 'Líquida', 59.90, 300, true, true, 123456789020, 100, 3.5, 10, 7, 10, 15, 0.3),
('Base Líquida Matte', 'Base líquida com acabamento matte.', 'Alta cobertura e longa duração.', 'Marca A', 'Vermelho Vivo', '#FF0000', 'Face', 'Base', 'Líquida', 59.90, 300, true, true, 123456789021, 100, 3.5, 10, 7, 10, 15, 0.3);

insert into  images (id, image_url, is_generic) values
(1, '/assets/numeros/01.png', true),
(2, '/assets/numeros/02.png', false),
(3, '/assets/numeros/03.png', false),
(4, '/assets/numeros/04.png', false);


insert into product_images (product_id, image_id, is_generic) values
(1, 1, true),
(1, 2, false),
(2, 1, true),
(2, 3, false),
(3, 1, true),
(3, 4, false),
(4, 1, true),
(4, 2, false),
(5, 1, true),
(5, 3, false),
(6, 1, true),
(6, 4, false),
(7, 1, true),
(7, 2, false),
(8, 1, true),
(8, 3, false),
(9, 1, true),
(9, 4, false),
(10, 1, true),
(10, 2, false),
(11, 1, true),
(11, 3, false),
(12, 1, true),
(12, 4, false),
(13, 1, true),
(13, 2, false),
(14, 1, true),
(14, 3, false),
(15, 1, true),
(15, 4, false),
(16, 1, true),
(16, 2, false),
(17, 1, true),
(17, 3, false),
(18, 1, true),
(18, 3, false),
(19, 1, true),
(19, 4, false),
(20, 1, true),
(20, 2, false);
