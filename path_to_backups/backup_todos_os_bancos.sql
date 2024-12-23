--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:UHOmvVkXZoEoeFY88jb9TA==$LxIfk7xsvGh6BYZ8ARg2b7fw9fBNX7duB2UJnyoVKno=:ZQoJWvsSnzvL+UQvdj8hg09wP68iLmy46eWN+ifs2uc=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    product_id integer NOT NULL,
    image_url text NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    is_recommended boolean NOT NULL,
    is_new_product boolean NOT NULL,
    qt_sold integer DEFAULT 0,
    rating numeric DEFAULT 0,
    category character varying(50) DEFAULT ''::character varying,
    sub_category character varying(50) DEFAULT ''::character varying,
    stock numeric DEFAULT 0,
    color character varying(50) DEFAULT ''::character varying,
    height integer DEFAULT 7,
    width integer DEFAULT 10,
    length integer DEFAULT 15,
    weight double precision DEFAULT 0.3
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, product_id, image_url) FROM stdin;
1	1	/assets/numeros/01.png
2	1	/assets/numeros/02.png
3	1	/assets/numeros/03.png
4	2	/assets/numeros/01.png
5	2	/assets/numeros/02.png
6	2	/assets/numeros/03.png
7	3	/assets/numeros/01.png
8	3	/assets/numeros/02.png
9	3	/assets/numeros/03.png
10	4	/assets/numeros/01.png
11	4	/assets/numeros/02.png
12	4	/assets/numeros/03.png
13	5	/assets/numeros/01.png
14	5	/assets/numeros/02.png
15	5	/assets/numeros/03.png
16	6	/assets/numeros/01.png
17	6	/assets/numeros/02.png
18	6	/assets/numeros/03.png
19	7	/assets/numeros/01.png
20	7	/assets/numeros/02.png
21	7	/assets/numeros/03.png
22	8	/assets/numeros/01.png
23	8	/assets/numeros/02.png
24	8	/assets/numeros/03.png
25	9	/assets/numeros/01.png
26	9	/assets/numeros/02.png
27	9	/assets/numeros/03.png
28	10	/assets/numeros/01.png
29	10	/assets/numeros/02.png
30	10	/assets/numeros/03.png
31	11	/assets/numeros/01.png
32	11	/assets/numeros/02.png
33	11	/assets/numeros/03.png
34	12	/assets/numeros/01.png
35	12	/assets/numeros/02.png
36	12	/assets/numeros/03.png
37	13	/assets/numeros/01.png
38	13	/assets/numeros/02.png
39	13	/assets/numeros/03.png
40	14	/assets/numeros/01.png
41	14	/assets/numeros/02.png
42	14	/assets/numeros/03.png
43	15	/assets/numeros/01.png
44	15	/assets/numeros/02.png
45	15	/assets/numeros/03.png
46	16	/assets/numeros/01.png
47	16	/assets/numeros/02.png
48	16	/assets/numeros/03.png
49	17	/assets/numeros/01.png
50	17	/assets/numeros/02.png
51	17	/assets/numeros/03.png
52	18	/assets/numeros/01.png
53	18	/assets/numeros/02.png
54	18	/assets/numeros/03.png
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, is_recommended, is_new_product, qt_sold, rating, category, sub_category, stock, color, height, width, length, weight) FROM stdin;
9	batom teste 09	este é um produto de teste usado para popular o DB	45.00	f	t	4	3.5	batom	batom cremoso	5	red	7	10	15	0.3
8	batom teste 08	este é um produto de teste usado para popular o DB	40.00	t	f	12	3.5	batom	batom cremoso	5	red	7	10	15	0.3
7	batom teste 07	este é um produto de teste usado para popular o DB	35.00	t	t	7	3.5	batom	batom cremoso	5	red	7	10	15	0.3
6	batom teste 06	este é um produto de teste usado para popular o DB	30.00	f	t	5	3.5	batom	batom cremoso	5	red	7	10	15	0.3
5	batom teste 05	este é um produto de teste usado para popular o DB	25.00	t	f	9	3.5	batom	batom cremoso	5	red	7	10	15	0.3
4	batom teste 04	este é um produto de teste usado para popular o DB	20.00	t	t	8	3.5	batom	batom cremoso	5	red	7	10	15	0.3
3	batom teste 03	este é um produto de teste usado para popular o DB	15.00	f	t	1	3.5	batom	batom cremoso	5	red	7	10	15	0.3
1	batom teste 01	este é um produto de teste usado para popular o DB	5.00	t	t	1	3.5	batom	batom cremoso	5	red	7	10	15	0.3
2	batom teste 02	este é um produto de teste usado para popular o DB	10.00	t	f	2	3.5	batom	batom cremoso	5	red	7	10	15	0.3
18	batom teste 18	este é um produto de teste usado para popular o DB	90.00	f	t	0	3.5	batom	batom cremoso	5	red	7	10	15	0.3
17	batom teste 17	este é um produto de teste usado para popular o DB	85.00	t	f	0	3.5	batom	batom cremoso	5	red	7	10	15	0.3
16	batom teste 16	este é um produto de teste usado para popular o DB	80.00	t	t	1	3.5	batom	batom cremoso	5	red	7	10	15	0.3
15	batom teste 15	este é um produto de teste usado para popular o DB	75.00	f	t	1	3.5	batom	batom cremoso	5	red	7	10	15	0.3
14	batom teste 14	este é um produto de teste usado para popular o DB	70.00	t	f	10	3.5	batom	batom cremoso	5	red	7	10	15	0.3
13	batom teste 13	este é um produto de teste usado para popular o DB	65.00	t	t	21	3.5	batom	batom cremoso	5	red	7	10	15	0.3
12	batom teste 12	este é um produto de teste usado para popular o DB	60.00	f	t	14	3.5	batom	batom cremoso	5	red	7	10	15	0.3
11	batom teste 11	este é um produto de teste usado para popular o DB	55.00	t	f	21	3.5	batom	batom cremoso	5	red	7	10	15	0.3
10	batom teste 10	este é um produto de teste usado para popular o DB	50.00	t	t	8	3.5	batom	batom cremoso	5	red	7	10	15	0.3
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 54, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 18, true);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: images images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres2" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';


ALTER DATABASE postgres2 OWNER TO postgres;

\connect postgres2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    image_url text NOT NULL,
    is_generic boolean DEFAULT true NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_id_seq OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    product_id integer NOT NULL,
    image_id integer NOT NULL,
    is_generic boolean DEFAULT true NOT NULL
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    details text,
    brand character varying(50) NOT NULL,
    color character varying(50) DEFAULT 'default'::character varying NOT NULL,
    color_code character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    sub_category character varying(50) NOT NULL,
    product_type character varying(50) NOT NULL,
    price numeric(10,2) NOT NULL,
    qt_sold numeric DEFAULT 0 NOT NULL,
    is_recommended boolean NOT NULL,
    is_new_product boolean NOT NULL,
    bar_code numeric NOT NULL,
    stock integer DEFAULT 100 NOT NULL,
    ratting double precision DEFAULT 3.5,
    ratting_qt integer DEFAULT 10,
    height integer DEFAULT 7,
    width integer DEFAULT 10,
    length integer DEFAULT 15,
    weight double precision DEFAULT 0.3
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, image_url, is_generic) FROM stdin;
1	/assets/numeros/01.png	t
2	/assets/numeros/02.png	f
3	/assets/numeros/03.png	f
4	/assets/numeros/04.png	f
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (product_id, image_id, is_generic) FROM stdin;
1	1	t
1	2	f
2	1	t
2	3	f
3	1	t
3	4	f
4	1	t
4	2	f
5	1	t
5	3	f
6	1	t
6	4	f
7	1	t
7	2	f
8	1	t
8	3	f
9	1	t
9	4	f
10	1	t
10	2	f
11	1	t
11	3	f
12	1	t
12	4	f
13	1	t
13	2	f
14	1	t
14	3	f
15	1	t
15	4	f
16	1	t
16	2	f
17	1	t
17	3	f
18	1	t
18	3	f
19	1	t
19	4	f
20	1	t
20	2	f
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, details, brand, color, color_code, category, sub_category, product_type, price, qt_sold, is_recommended, is_new_product, bar_code, stock, ratting, ratting_qt, height, width, length, weight) FROM stdin;
2	Base Cremosa	Base cremosa para pele seca.	Acabamento luminoso.	Marca B	Bege Claro	#F5D7A4	Face	Base	Cremosa	65.90	150	f	t	123456789002	100	3.5	10	7	10	15	0.3
4	Blush Compacto	Blush de alta pigmentação.	Acabamento natural.	Marca D	Rosa Suave	#FFC0CB	Face	Blush	Compacto	32.90	120	f	t	123456789004	100	3.5	10	7	10	15	0.3
5	Blush Líquido	Blush com textura líquida.	Ideal para pele sensível.	Marca E	Bege Claro	#F5D7A4	Face	Blush	Líquido	29.90	90	t	f	123456789005	100	3.5	10	7	10	15	0.3
6	Máscara de Cílios Volume	Máscara de cílios para volume.	Efeito volumoso e duradouro.	Marca A	Roxo	#993399	Olhos	Máscara	Volume	39.90	250	t	t	123456789006	100	3.5	10	7	10	15	0.3
7	Máscara de Cílios Curvadora	Máscara para cílios curvados.	Aumenta a curvatura.	Marca B	Vermelho Vivo	#FF0000	Olhos	Máscara	Curvadora	37.90	180	f	f	123456789007	100	3.5	10	7	10	15	0.3
8	Delineador Líquido Preto	Delineador líquido de alta precisão.	Secagem rápida.	Marca C	Prata	#C0C0C0	Olhos	Delineador	Líquido	22.90	190	t	f	123456789008	100	3.5	10	7	10	15	0.3
9	Delineador em Gel	Delineador em gel de longa duração.	Resistente à água.	Marca D	Roxo	#993399	Olhos	Delineador	Gel	26.90	140	t	t	123456789009	100	3.5	10	7	10	15	0.3
10	Batom Matte	Batom com acabamento matte.	Alta pigmentação.	Marca A	Vermelho Vivo	#FF0000	Lábios	Batom	Matte	19.90	300	f	f	123456789010	100	3.5	10	7	10	15	0.3
11	Batom Cremoso	Batom com textura cremosa.	Hidratação prolongada.	Marca B	Rosa Suave	#FFC0CB	Lábios	Batom	Cremoso	21.90	100	f	f	123456789011	100	3.5	10	7	10	15	0.3
12	Gloss Transparente	Gloss com brilho intenso.	Ideal para brilho natural.	Marca C	Rosa Suave	#FFC0CB	Lábios	Gloss	Transparente	16.90	250	t	t	123456789012	100	3.5	10	7	10	15	0.3
13	Gloss Nude	Gloss nude com efeito hidratante.	Acabamento natural.	Marca D	Vermelho Vivo	#FF0000	Lábios	Gloss	Hidratante	18.50	150	f	f	123456789013	100	3.5	10	7	10	15	0.3
14	Esmalte Cremoso Vermelho	Esmalte cremoso para unhas.	Durabilidade de até 7 dias.	Marca E	Roxo	#993399	Unhas	Esmalte	Cremoso	7.90	500	t	f	123456789014	100	3.5	10	7	10	15	0.3
15	Esmalte Metálico Prata	Esmalte metálico para brilho intenso.	Acabamento metálico.	Marca C	Prata	#C0C0C0	Unhas	Esmalte	Metálico	8.90	300	f	t	123456789015	100	3.5	10	7	10	15	0.3
16	Loção Hidratante Neutro	Loção hidratante para pele seca.	Absorção rápida.	Marca A	Transparente	#FFFFFF	Corpo	Hidratante	Neutro	25.90	220	t	f	123456789016	100	3.5	10	7	10	15	0.3
18	Base Líquida Matte	Base líquida com acabamento matte.	Alta cobertura e longa duração.	Marca A	Bege Claro	#F5D7A4	Face	Base	Líquida	59.90	300	t	t	123456789001	100	3.5	10	7	10	15	0.3
19	Base Líquida Matte	Base líquida com acabamento matte.	Alta cobertura e longa duração.	Marca A	Rosa Suave	#FFC0CB	Face	Base	Líquida	59.90	300	t	t	123456789020	100	3.5	10	7	10	15	0.3
20	Base Líquida Matte	Base líquida com acabamento matte.	Alta cobertura e longa duração.	Marca A	Vermelho Vivo	#FF0000	Face	Base	Líquida	59.90	300	t	t	123456789021	100	3.5	10	7	10	15	0.3
1	Base Líquida Matte	Base líquida com acabamento matte.	Alta cobertura e longa duração.	Marca A	Neutro	#FAFA37	Face	Base	Líquida	59.90	300	t	t	123456789001	100	3.5	10	7	10	15	0.3
3	BB Cream	BB Cream com proteção solar.	Ideal para uso diário.	Marca C	Neutro	#FAFA37	Face	Base	BB Cream	45.90	200	t	f	123456789003	100	3.5	10	7	10	15	0.3
17	Óleo Corporal	Óleo corporal para hidratação profunda.	Ideal para pele seca.	Marca E	Neutro	#FAFA37	Corpo	Óleo	Hidratação	29.90	150	f	t	123456789017	100	3.5	10	7	10	15	0.3
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 20, true);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (product_id, image_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE CASCADE;


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

