--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    description text NOT NULL,
    height integer,
    width integer,
    kit boolean NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: kit_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kit_items (
    id integer NOT NULL,
    quantity integer NOT NULL,
    item_id integer NOT NULL,
    kit_id integer NOT NULL
);


ALTER TABLE public.kit_items OWNER TO postgres;

--
-- Name: kit_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kit_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kit_items_id_seq OWNER TO postgres;

--
-- Name: kit_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kit_items_id_seq OWNED BY public.kit_items.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    quantity integer NOT NULL,
    item_id integer NOT NULL,
    order_id integer NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    finish_date timestamp without time zone,
    client_id integer NOT NULL,
    status text
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: pack_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pack_items (
    id integer NOT NULL,
    quantity integer NOT NULL,
    item_id integer NOT NULL,
    pack_id integer NOT NULL
);


ALTER TABLE public.pack_items OWNER TO postgres;

--
-- Name: packs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packs (
    id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    finish_date timestamp without time zone,
    description text NOT NULL,
    status text
);


ALTER TABLE public.packs OWNER TO postgres;

--
-- Name: production_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.production_id_seq OWNER TO postgres;

--
-- Name: production_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_id_seq OWNED BY public.packs.id;


--
-- Name: production_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.production_items_id_seq OWNER TO postgres;

--
-- Name: production_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_items_id_seq OWNED BY public.pack_items.id;


--
-- Name: stock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock (
    id integer NOT NULL,
    quantity integer NOT NULL,
    item_id integer NOT NULL
);


ALTER TABLE public.stock OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_id_seq OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: kit_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kit_items ALTER COLUMN id SET DEFAULT nextval('public.kit_items_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: pack_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pack_items ALTER COLUMN id SET DEFAULT nextval('public.production_items_id_seq'::regclass);


--
-- Name: packs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packs ALTER COLUMN id SET DEFAULT nextval('public.production_id_seq'::regclass);


--
-- Name: stock id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, name) FROM stdin;
4	Cliente principal
5	Outro cliente
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, description, height, width, kit) FROM stdin;
308	Cartela Português - ING	0	0	f
309	Alumínio - ING	0	0	f
310	Refletivo Laranja Grande - ING	0	0	f
311	Adesivo Curso Máximo - ING	0	0	f
312	Adesivo Instrução - ING	0	0	f
318	Cartela Espanhol - ING	0	0	f
319	Refletivo Laranja Pequeno - ING	0	0	f
320	Logo 530x175mm Português Preto - ING	0	0	f
321	Logo 410x130mm Português Preto - ING	0	0	f
322	Logo 350x115mm Português Preto - ING	0	0	f
323	Logo 260x90mm Português Preto - ING	0	0	f
324	Logo 530x175mm Português Branco - ING	0	0	f
325	Logo 410x130mm Português Branco - ING	0	0	f
326	Logo 350x115mm Português Branco - ING	0	0	f
327	Logo 260x90mm Português Branco - ING	0	0	f
328	Logo 530x175mm Espanhol Branco - ING	0	0	f
329	Logo 410x130mm Espanhol Branco - ING	0	0	f
330	Logo 350x115mm Espanhol Branco - ING	0	0	f
331	Logo 260x90mm Espanhol Branco - ING	0	0	f
332	Logo 530x175mm Espanhol Preto - ING	0	0	f
333	Logo 410x130mm Espanhol Preto - ING	0	0	f
335	Logo 260x90mm Espanhol Preto - ING	0	0	f
334	Logo 350x115mm Espanhol Preto - ING	0	0	f
336	"ING" 530x175mm Normal Preto - ING	0	0	f
337	"ING" 530x175mm Normal Branco - ING	0	0	f
338	"ING" 410x130mm Normal Preto - ING	0	0	f
339	"ING" 410x130mm Normal Branco - ING	0	0	f
340	"ING" 350x115mm Normal Preto - ING	0	0	f
341	"ING" 350x115mm Normal Branco - ING	0	0	f
342	"ING" 260x90mm Normal Preto - ING	0	0	f
343	"ING" 260x90mm Normal Branco - ING	0	0	f
344	"ING" 530x175mm Hidráulica Móvil Preto - ING	0	0	f
345	"ING" 530x175mm Hidráulica Móvil Branco - ING	0	0	f
346	"ING" 410x130mm Hidráulica Móvil Preto - ING	0	0	f
347	"ING" 410x130mm Hidráulica Móvil Branco - ING	0	0	f
348	"ING" 350x115mm Hidráulica Móvil Preto - ING	0	0	f
349	"ING" 350x115mm Hidráulica Móvil Branco - ING	0	0	f
350	"ING" 260x90mm Hidráulica Móvil Preto - ING	0	0	f
351	"ING" 260x90mm Hidráulica Móvil Branco - ING	0	0	f
352	Modelo ING4500 Preto - ING	0	0	f
353	Modelo ING4500 Branco - ING	0	0	f
354	Modelo ING5500 Preto - ING	0	0	f
355	Modelo ING5500 Branco - ING	0	0	f
356	Modelo ING5.500C Preto - ING	0	0	f
357	Modelo ING5.500C Branco - ING	0	0	f
358	Modelo ING6500C Preto - ING	0	0	f
359	Modelo ING6500C Branco - ING	0	0	f
360	Modelo ING8500 Preto - ING	0	0	f
361	Modelo ING8500 Branco - ING	0	0	f
362	Modelo ING9500C Preto - ING	0	0	f
363	Modelo ING9500C Branco - ING	0	0	f
364	Modelo ING10500C Preto - ING	0	0	f
365	Modelo ING10500C Branco - ING	0	0	f
366	Modelo ING12.500 Preto - ING	0	0	f
367	Modelo ING12.500 Branco - ING	0	0	f
368	Modelo ING12.500C Preto - ING	0	0	f
369	Modelo ING12.500C Branco - ING	0	0	f
370	Modelo ING16.500A Preto - ING	0	0	f
371	Modelo ING16.500A Branco - ING	0	0	f
372	Modelo ING16.500C Preto - ING	0	0	f
373	Modelo ING16.500C Branco - ING	0	0	f
374	Modelo ING20.500 Preto - ING	0	0	f
375	Modelo ING20.500 Branco - ING	0	0	f
376	Modelo ING23.500C Preto - ING	0	0	f
377	Modelo ING23.500C Branco - ING	0	0	f
378	Modelo ING25.500 Preto - ING	0	0	f
379	Modelo ING25.500 Branco - ING	0	0	f
380	Modelo ING25.500C Preto - ING	0	0	f
381	Modelo ING25.500C Branco - ING	0	0	f
382	Modelo ING26500 Preto - ING	0	0	f
383	Modelo ING26500 Branco - ING	0	0	f
384	Modelo ING26.500C Preto - ING	0	0	f
385	Modelo ING26.500C Branco - ING	0	0	f
386	Modelo ING30.500 Preto - ING	0	0	f
387	Modelo ING30.500 Branco - ING	0	0	f
388	Modelo ING30.500A Preto - ING	0	0	f
389	Modelo ING30.500A Branco - ING	0	0	f
390	Modelo ING35.500 Preto - ING	0	0	f
391	Modelo ING35.500 Branco - ING	0	0	f
392	Modelo ING43.500 Preto - ING	0	0	f
393	Modelo ING43.500 Branco - ING	0	0	f
394	Modelo ING45.500 Preto - ING	0	0	f
395	Modelo ING45.500 Branco - ING	0	0	f
396	Modelo ING50.500 Preto - ING	0	0	f
397	Modelo ING50.500 Branco - ING	0	0	f
398	Modelo ING52.500 Preto - ING	0	0	f
399	Modelo ING52.500 Branco - ING	0	0	f
400	Modelo ING60.500 Preto - ING	0	0	f
401	Modelo ING60.500 Branco - ING	0	0	f
402	Modelo ING70.500 Preto - ING	0	0	f
403	Modelo ING70.500 Branco - ING	0	0	f
404	GRÁFICO 4.500 2H2M ESPANHOL - ING	0	0	f
405	GRÁFICO 5.000C 2H2M ESPANHOL - ING	0	0	f
406	GRÁFICO 6.500C 2H2M ESPANHOL - ING	0	0	f
407	GRAFICO 8.500 2H2M ESPANHOL  - ING	0	0	f
408	GRÁFICO 10.500C  ESPANHOL - ING	0	0	f
409	GRÁFICO 12.500 3H3M ESPANHOL - ING	0	0	f
410	GRÁFICO 12.500C 3H2M ESPANHOL - ING	0	0	f
411	GRÁFICO 16.500 4H2M ESPANHOL - ING	0	0	f
412	GRÁFICO 16.500C 4H2M ESPANHOL - ING	0	0	f
413	GRÁFICO 23.500C 5H2M ESPANHOL - ING	0	0	f
414	GRÁFICO 26.500C ESPANHOL - ING	0	0	f
415	GRÁFICO 52.500 6H3M ESPANHOL - ING	0	0	f
416	GRÁFICO 60.500 6H3M ESPANHOL - ING	0	0	f
417	GRÁFICO 4.500 2H2M PORT - ING	0	0	f
418	GRÁFICO 5.000C 2H2M PORT - ING	0	0	f
419	GRÁFICO 6.500C 2H2M PORT - ING	0	0	f
420	GRÁFICO 8.500 2H2M PORT - ING	0	0	f
421	GRÁFICO 9.500C 3H2M PORT - ING	0	0	f
422	GRÁFICO 10.500C  PORT - ING	0	0	f
423	GRÁFICO 12.500 3H2M CONFIGURAÇÃO ESPECIAL PORT - ING	0	0	f
424	GRÁFICO 12.500 3H3M PORT - ING	0	0	f
425	GRÁFICO 12.500 4H2M PORT - ING	0	0	f
426	GRÁFICO 12.500C 3H2M PORT - ING	0	0	f
427	GRÁFICO 16.500A 3H PORT - ING	0	0	f
428	GRÁFICO 16.500A 4H2M PORT - ING	0	0	f
429	GRÁFICO 16.500C 4H2M PORT - ING	0	0	f
430	GRÁFICO 16.500C 5H1M PORT - ING	0	0	f
431	GRÁFICO 20.500 4H3M PORT - ING	0	0	f
432	GRÁFICO 23.500C 5H2M PORT - ING	0	0	f
433	GRÁFICO 25.500 4H3M PORT - ING	0	0	f
434	GRÁFICO 25.500C 5H2M PORT - ING	0	0	f
435	GRAFICO 26.500 4H PORT - ING	0	0	f
436	GRAFICO 26.500C  5H2M PORT - ING	0	0	f
437	GRAFICO 26.500C 4H PORT - ING	0	0	f
438	GRÁFICO 30.500 3H2M PORT - ING	0	0	f
439	GRÁFICO 30.500 5H3M PORT - ING	0	0	f
440	GRÁFICO 30.500A PORT - ING	0	0	f
441	GRÁFICO 35.500 5H3M PORT - ING	0	0	f
442	GRÁFICO 45.500 5H3M PORT - ING	0	0	f
443	GRÁFICO 45.500 6H2M PORT - ING	0	0	f
444	GRÁFICO 50.500 5H3M PORT - ING	0	0	f
445	GRÁFICO 52.500 + LANÇA SUPLEMENTAR PORT - ING	0	0	f
446	GRÁFICO 52.500 6H3M PORT - ING	0	0	f
447	GRÁFICO 60.500 6H3M PORT - ING	0	0	f
448	GRAFICO 60.500 7H3M PORT - ING	0	0	f
449	GRAFICO 70.500 6H + FLYJIB 5H + CESTO AÉREO - ING	0	0	f
450	GRAFICO 70.500 6H + JIB 4H 1M PORT - ING	0	0	f
451	GRAFICO 70.500 6H + JIB 5H 1M PORT - ING	0	0	f
452	GRÁFICO 70.500 6H3M PORT - ING	0	0	f
453	GRÁFICO 70.500 6H3M PORT ALT - ING	0	0	f
454	GRÁFICO 70.500 7H + JIB 5H 1M PORT - ING	0	0	f
455	GRÁFICO 70.500 7H + JIB 5H 1M PORT - ULTIMO ENVIADO PORT - ING	0	0	f
456	GRAFICO 70.500 7H0M PORT - ING	0	0	f
457	GRAFICO 70.500 7H3M PORT - ING	0	0	f
458	GRÁFICO FLY JIB NOVO NOVO 60.500 PORT - ING	0	0	f
459	GRÁFICO FLYJIB 60.500 6H3M PORT - ING	0	0	f
460	GRÁFICO FLYJIB 60.500 NOVO PORT - ING	0	0	f
461	GRÁFICO FLYJIB 70.500 NOVO PORT - ING	0	0	f
462	GRÁFICO FLYJIB 70.500 PORT - ING	0	0	f
463	GRÁFICO TL 11.500 PORT - ING	0	0	f
464	ING 45.500 5H3M Português Preto	\N	\N	t
465	ING 45.500 6H2M Português Preto	\N	\N	t
466	ING 70.500 7H3M Português Preto	\N	\N	t
467	ING 4.500 2H2M Espanhol Branco	\N	\N	t
\.


--
-- Data for Name: kit_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kit_items (id, quantity, item_id, kit_id) FROM stdin;
56	1	311	464
57	2	312	464
58	1	309	464
59	1	308	464
60	4	310	464
62	4	320	464
63	2	394	464
64	2	442	464
65	4	336	465
66	1	311	465
67	2	312	465
68	1	309	465
69	1	308	465
70	4	310	465
71	4	320	465
72	2	394	465
73	2	443	465
74	4	336	466
75	1	311	466
76	2	312	466
77	1	309	466
78	1	308	466
79	4	310	466
80	2	457	466
81	2	402	466
82	4	320	466
83	4	343	467
84	1	311	467
85	2	312	467
86	1	309	467
87	1	318	467
88	2	404	467
89	4	331	467
90	2	353	467
91	2	319	467
61	4	336	464
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, quantity, item_id, order_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, start_date, finish_date, client_id, status) FROM stdin;
22	2020-12-14 00:50:33	\N	4	Criado
23	2020-12-14 00:50:42	\N	5	Criado
\.


--
-- Data for Name: pack_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pack_items (id, quantity, item_id, pack_id) FROM stdin;
173	40	309	95
190	80	309	113
191	35	309	114
192	50	309	115
193	10	309	116
194	15	311	118
154	20	308	79
155	50	310	79
156	29	312	79
157	11	320	79
158	44	336	79
159	40	402	79
160	40	457	79
\.


--
-- Data for Name: packs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packs (id, start_date, finish_date, description, status) FROM stdin;
79	2020-12-10 22:15:53	2020-12-10 23:03:18	Pacote do pedido n° 13	Pronto
114	2020-12-10 23:52:14	2020-12-10 23:52:40	Pacote do pedido n° 19	Pronto
113	2020-12-10 23:51:05	2020-12-10 23:53:11	Pacote do pedido n° 18	Pronto
95	2020-12-10 23:22:03	2020-12-10 23:53:14	Pacote do pedido n° 16	Pronto
115	2020-12-10 23:55:35	2020-12-10 23:55:49	Alumínios ING	Pronto
116	2020-12-10 23:56:03	2020-12-10 23:56:06	Pacote do pedido n° 20	Pronto
118	2020-12-11 21:57:30	\N	Exemplo de pacote	Em produção
\.


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock (id, quantity, item_id) FROM stdin;
147	100	343
146	43	342
145	1	341
144	76	340
143	39	339
142	12	338
141	16	337
152	28	348
150	46	346
148	43	344
123	36	319
129	5	325
122	14	318
114	0	309
149	2	345
139	20	335
138	10	334
137	14	333
136	11	332
131	48	327
127	19	323
126	8	322
125	18	321
128	11	324
116	141	311
113	20	308
115	60	310
117	30	312
124	60	320
140	60	336
206	40	402
130	0	326
132	0	328
133	0	329
134	0	330
135	0	331
151	0	347
153	0	349
154	0	350
155	0	351
156	0	352
157	0	353
158	0	354
159	0	355
160	0	356
161	0	357
162	0	358
163	0	359
164	0	360
165	0	361
166	0	362
167	0	363
168	0	364
169	0	365
170	0	366
171	0	367
172	0	368
173	0	369
174	0	370
175	0	371
176	0	372
177	0	373
178	0	374
179	0	375
180	0	376
181	0	377
182	0	378
183	0	379
184	0	380
185	0	381
186	0	382
187	0	383
188	0	384
189	0	385
190	0	386
191	0	387
192	0	388
193	0	389
194	0	390
195	0	391
196	0	392
197	0	393
198	0	394
199	0	395
200	0	396
201	0	397
202	0	398
203	0	399
204	0	400
205	0	401
207	0	403
208	0	404
209	0	405
210	0	406
211	0	407
212	0	408
213	0	409
214	0	410
215	0	411
216	0	412
217	0	413
218	0	414
219	0	415
220	0	416
221	0	417
222	0	418
223	0	419
224	0	420
225	0	421
226	0	422
227	0	423
228	0	424
229	0	425
230	0	426
231	0	427
232	0	428
233	0	429
234	0	430
235	0	431
236	0	432
237	0	433
238	0	434
239	0	435
240	0	436
241	0	437
242	0	438
243	0	439
244	0	440
245	0	441
246	0	442
247	0	443
248	0	444
249	0	445
250	0	446
251	0	447
252	0	448
253	0	449
254	0	450
255	0	451
256	0	452
257	0	453
258	0	454
259	0	455
260	0	456
262	0	458
263	0	459
264	0	460
265	0	461
266	0	462
267	0	463
261	40	457
\.


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 5, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 467, true);


--
-- Name: kit_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kit_items_id_seq', 91, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 25, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 23, true);


--
-- Name: production_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_id_seq', 118, true);


--
-- Name: production_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_items_id_seq', 194, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_id_seq', 267, true);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: kit_items kit_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kit_items
    ADD CONSTRAINT kit_items_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pack_items production_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pack_items
    ADD CONSTRAINT production_items_pkey PRIMARY KEY (id);


--
-- Name: packs production_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packs
    ADD CONSTRAINT production_pkey PRIMARY KEY (id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

