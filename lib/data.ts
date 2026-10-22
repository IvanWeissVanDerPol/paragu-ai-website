// ── Clients ─────────────────────────────────────────────────────────────────
// Order: lower number = higher position on page.
// Sorted by: demo quality (review count) → paying clients last.
// Per-client detail pages live at /clientes/[slug] — linked from the
// portfolio landing at /. The portfolio itself (formerly /clientes)
// now lives at / .
// NOTE: client-order.json in /public overrides this order.
// Admin panel at /admin/clients can save new order → GitHub → redeploy.
export const CLIENTS = [
  // ── DEMO SITES (non-paying clients / prospects — live on .paragu-ai.com) ──
  {
    name: 'HidroBaby Spa',
    url: 'https://hidrobaby-spa.paragu-ai.com',
    rubro: 'Spa / Baby Spa',
    desc: 'Baby spa, pediátrico y prenatal — 3 sucursales en Paraguay',
    slug: 'hidrobaby-spa',
    order: 1,
  },
  {
    name: 'Cronos Academy',
    url: 'https://cronos-academy.paragu-ai.com',
    rubro: 'Gimnasio / Crossfit',
    desc: 'Academia crossfit y functional training en San Lorenzo',
    slug: 'cronos-academy',
    order: 2,
  },
  {
    name: 'Clau Bellino',
    url: 'https://clau-bellino.paragu-ai.com',
    rubro: 'Estética Facial',
    desc: 'Tratamientos faciales y depilación láser',
    slug: 'clau-bellino',
    order: 3,
  },
  {
    name: 'Barbye Nails',
    url: 'https://barbye-nails.paragu-ai.com',
    rubro: 'Uñas / Nail Art',
    desc: 'Nail art y manicuria en Fernando de la Mora',
    slug: 'barbye-nails',
    order: 4,
  },
  {
    name: 'Woman Cosméticos',
    url: 'https://woman-cosmeticos.paragu-ai.com',
    rubro: 'Cosméticos',
    desc: 'Cosméticos y cuidado personal',
    slug: 'woman-cosmeticos',
    order: 5,
  },
  {
    name: 'Scott Tatuajes',
    url: 'https://scott-tatuajes.paragu-ai.com',
    rubro: 'Tatuajes',
    desc: 'Estudio de tatuajes realista y cover-up',
    slug: 'scott-tatuajes',
    order: 6,
  },
  {
    name: 'Avani Belleza',
    url: 'https://avani-belleza.paragu-ai.com',
    rubro: 'Belleza Integral',
    desc: 'Salón de belleza, maquillaje y peinado',
    slug: 'avani-belleza',
    order: 7,
  },
  {
    name: 'Viviesteticpy',
    url: 'https://viviesteticpy.paragu-ai.com',
    rubro: 'Belleza / Microblading',
    desc: 'Microblading, pestañas y estética avanzada',
    slug: 'viviesteticpy',
    order: 8,
  },
  {
    name: 'Estudio Medieval',
    url: 'https://estudio-medieval.paragu-ai.com',
    rubro: 'Barbería',
    desc: 'Barbería vintage con 388+ reseñas Google',
    slug: 'estudio-medieval',
    order: 9,
  },
  {
    name: "Arno's Barber Shop",
    url: 'https://arnos-barber-shop.paragu-ai.com',
    rubro: 'Barbería',
    desc: 'Barbería moderna en Fernando de la Mora',
    slug: 'arnos-barber-shop',
    order: 10,
  },
  {
    name: 'Reinadecopas',
    url: 'https://reinadecopas.paragu-ai.com',
    rubro: 'Cerveza Artesanal',
    desc: 'Tienda online de cerveza artesanal paraguaya',
    slug: 'reinadecopas',
    order: 11,
  },
  {
    name: 'Fun4Me',
    url: 'https://fun4me.paragu-ai.com',
    rubro: 'Eventos / Kids',
    desc: 'Eventos infantiles y cumpleaños',
    slug: 'fun4me',
    order: 12,
  },
  {
    name: 'Leticia Carballo',
    url: 'https://leticia-carballo.paragu-ai.com',
    rubro: 'Hair & Makeup',
    desc: 'Estudio hair & makeup con 206 reseñas',
    slug: 'leticia-carballo',
    order: 13,
  },
  {
    name: 'Nutrifit Spa',
    url: 'https://nutrifit-spa.paragu-ai.com',
    rubro: 'Spa / Nutrición',
    desc: 'Spa y nutrición integral — 233 reseñas Google',
    slug: 'nutrifit-spa',
    order: 14,
  },
  {
    name: 'Lele Ferreira',
    url: 'https://lele-ferreira.paragu-ai.com',
    rubro: 'Maquillaje',
    desc: 'Maquillaje social y de novia',
    slug: 'lele-ferreira',
    order: 15,
  },
  {
    name: 'Magnolia Peluquería',
    url: 'https://magnolia-peluqueria.paragu-ai.com',
    rubro: 'Peluquería',
    desc: 'Peluquería integral en barrio Oporto',
    slug: 'magnolia-peluqueria',
    order: 16,
  },
  // ── SHOWCASE STANDARDS (high-quality reference demos) ──
  {
    name: 'Bichos Gym',
    url: 'https://bichosgym.paragu-ai.com',
    rubro: 'Gimnasio / Fitness',
    desc: 'Entrenamiento funcional y crossfit',
    slug: 'bichosgym',
    order: 17,
  },
  {
    name: 'Magnolia Flower',
    url: 'https://magnolia-flower.paragu-ai.com',
    rubro: 'Florería',
    desc: 'Flores y decoración de eventos',
    slug: 'magnolia-flower',
    order: 18,
  },
  {
    name: 'Mantra Spa',
    url: 'https://mantraspa.paragu-ai.com',
    rubro: 'Spa & Wellness',
    desc: 'Masajes, tratamientos faciales y bienestar',
    slug: 'mantraspa',
    order: 19,
  },
  {
    name: 'DepiFlash',
    url: 'https://depiflash.paragu-ai.com',
    rubro: 'Depilación',
    desc: 'Depilación láser IPL a domicilio',
    slug: 'depiflash',
    order: 20,
  },
  {
    name: 'Nexa Paraguay',
    url: 'https://nexa.paragu-ai.com',
    rubro: 'Reubicación',
    desc: 'Programa de reubicación para europeos (4 idiomas)',
    slug: 'nexa',
    order: 21,
  },
  {
    name: 'Superspuma',
    url: 'https://superspuma.paragu-ai.com',
    rubro: 'Indumentaria',
    desc: 'Ropa oversize y streetwear paraguayo',
    slug: 'superspuma',
    order: 22,
  },
  // ── PAYING CLIENTS (custom domains — revenue pipeline) ──
  {
    name: 'XXGym',
    url: 'https://xxgym.paragu-ai.com',
    rubro: 'Gimnasio',
    desc: 'Gimnasio en Fernando de la Mora — leads activos',
    slug: 'xxgym',
    order: 23,
  },
  {
    name: 'Portas Barber',
    url: 'https://portas-barber.paragu-ai.com',
    rubro: 'Barbería',
    desc: 'Barbería premium en Asunción — 162 reseñas Google',
    slug: 'portas-barber',
    order: 24,
  },
  {
    name: 'Nde Barba',
    url: 'https://nde-barba.paragu-ai.com',
    rubro: 'Barbería',
    desc: 'Barbería 4.8 estrellas — leads confirmados',
    slug: 'nde-barba',
    order: 25,
  },
  {
    name: 'Shine Nails',
    url: 'https://shine-nails.paragu-ai.com',
    rubro: 'Uñas / Nails',
    desc: 'Nails studio Celeste — 287 reseñas 4.9★ Google',
    slug: 'shine-nails',
    order: 26,
  },
  // ── EXPANDED PORTFOLIO (additional live sites) ──
  {
    name: 'Dayah LitWorks',
    url: 'https://dayah-litworks.paragu-ai.com',
    rubro: 'Diseño / Literatura',
    desc: 'Diseño de portadas, autora Amazon Prime Reading — 400+ portadas',
    slug: 'dayah',
    order: 27,
  },
  {
    name: 'Oz Montanía',
    url: 'https://ozmontania.paragu-ai.com',
    rubro: 'Arte / Muralismo',
    desc: 'Artista visual, muralista e ilustrador paraguayo',
    slug: 'ozz',
    order: 28,
  },
  {
    name: 'El Gato Siamés',
    url: 'https://elgatosiames.com',
    rubro: 'Comedia / Stand Up',
    desc: 'Camilo Acosta — stand up comedy, humor ácido y original desde Paraguay',
    slug: 'elgatosiames',
    order: 29,
  },
  {
    name: 'Club maškaráda',
    url: 'https://maskarada.paragu-ai.com',
    rubro: 'Eventos / Nightlife',
    desc: 'Club de eventos y experiencias culturales en Asunción',
    slug: 'maskarada',
    order: 30,
  },
  {
    name: 'Villamayor & Asociados',
    url: 'https://villamayor-asociados.paragu-ai.com',
    rubro: 'Legal / Abogados',
    desc: 'Estudio jurídico — derecho civil, comercial e inmobiliario',
    slug: 'villamayor-asociados',
    order: 31,
  },
  {
    name: 'Cerveza Trentina',
    url: 'https://treinta-cerveza.paragu-ai.com',
    rubro: 'Cerveza Artesanal',
    desc: 'Cerveza artesanal de Santa Rita, Alto Paraná — tradición y pasión',
    slug: 'treinta-cerveza',
    order: 32,
  },
  {
    name: 'Polki Squad',
    url: 'https://polki-squad.paragu-ai.com',
    rubro: 'ONG / Rescate Animal',
    desc: 'Rescate animal sin fines de lucro — +3.000 adopciones en 10 años',
    slug: 'polki-squad',
    order: 33,
  },
  {
    name: 'Nüdo',
    url: 'https://nudo.paragu-ai.com',
    rubro: 'Música / Band',
    desc: 'Hardcore Metal / Metalcore desde Capiatá, Paraguay',
    slug: 'nudo',
    order: 34,
  },
  {
    name: 'Jota Ink Tattoo',
    url: 'https://jota-ink-tattoo.paragu-ai.com',
    rubro: 'Tatuajes',
    desc: 'Tatuajes profesionales en Asunción',
    slug: 'jota-ink-tattoo',
    order: 35,
  },
  {
    name: 'Golden Visa Advisory',
    url: 'https://goldenvisa.paragu-ai.com',
    rubro: 'Inversiones / Visas',
    desc: 'Advisory para visas doradas e inversiones en Paraguay',
    slug: 'golden-visa',
    order: 36,
  },
  {
    name: 'Estudio Contable',
    url: 'https://contable.paragu-ai.com',
    rubro: 'Contabilidad / PYMES',
    desc: 'Contabilidad, IVA, IRE, IRP y sueldos para PYMES — consulta gratuita',
    slug: 'estudio-contable',
    order: 37,
  },
  {
    name: 'Granja Cabral',
    url: 'https://granjacabral.paragu-ai.com/admin/content',
    rubro: 'Agro / Huevos',
    desc: 'Huevos frescos en Coronel Oviedo — delivery del nido a tu mesa',
    slug: 'granja-cabral',
    order: 38,
  },
  {
    name: 'Stroopwafel Huis',
    url: 'https://stroopwafelhuis.paragu-ai.com',
    rubro: 'Cafetería / Holandesa',
    desc: 'Primera cafetería holandesa del Paraguay — stroopwafels & specialty coffee',
    slug: 'stroopwafel-huis',
    order: 39,
  },
] as const

// ── Templates for the portfolio strip ────────────────────────────────────────
export const TEMPLATES = [
  {
    id: 'indumentaria',
    name: 'Indumentaria',
    leads: 0,
    pct: 0,
    color: '#92400e',
    demo: 'https://superspuma.paragu-ai.com',
  },
  {
    id: 'spa',
    name: 'Spa & Wellness',
    leads: 927,
    pct: 76,
    color: '#7c9885',
    demo: 'https://mantraspa.paragu-ai.com',
  },
  {
    id: 'gimnasio',
    name: 'Gimnasio',
    leads: 1087,
    pct: 72,
    color: '#2d6a4f',
    demo: 'https://bichosgym.paragu-ai.com',
  },
  {
    id: 'depilacion',
    name: 'Depilación',
    leads: 0,
    pct: 0,
    color: '#be185d',
    demo: 'https://depiflash.paragu-ai.com',
  },
  {
    id: 'relocation',
    name: 'Reubicación',
    leads: 0,
    pct: 0,
    color: '#1e3a5f',
    demo: 'https://nexa.paragu-ai.com',
  },
  {
    id: 'belleza',
    name: 'Belleza',
    leads: 2393,
    pct: 81,
    color: '#b76e79',
    demo: 'https://mantraspa.paragu-ai.com',
  },
] as const

// ── Steps ────────────────────────────────────────────────────────────────────
export const STEPS = [
  {
    num: '01',
    title: 'Mandanos tu negocio por WhatsApp',
    desc: 'Nombre, dirección, fotos y qué ofrecés. Como mandar un audio a un amigo. Sin formularios.',
  },
  {
    num: '02',
    title: 'En 48 horas ves tu sitio listo',
    desc: 'Te mandamos el link para revisar. Pedís los cambios que quieras. Recién después de que confirmes que está bien, pagás.',
  },
  {
    num: '03',
    title: 'Salís en Google y te llegan consultas',
    desc: 'Dominio propio, SEO listo, WhatsApp conectado. Empezás a recibir los clientes que antes iban a la competencia.',
  },
] as const

// ── Pain points (Section 2 of home) ─────────────────────────────────────────
export const PAIN_POINTS = [
  {
    title: 'Si no aparecés en Google, no existís',
    body: 'El 80% de tus clientes busca en el celu antes de salir. Si tu negocio no aparece cuando buscan "peluquería cerca de mí", van a tu competencia — no a vos.',
  },
  {
    title: 'Tu Instagram no es tu tienda',
    body: 'Un día te bloquean la cuenta, Meta te cambia las reglas, y perdés todo. Un sitio web es tuyo, te lo llevás donde quieras, nadie te lo puede sacar.',
  },
  {
    title: 'Ya tenés clientes. Necesitás MÁS',
    body: 'Los que ya te conocen te van a encontrar igual. El sitio te trae los que todavía no te conocen — los que están buscando tu servicio ahora mismo y no te encuentran.',
  },
] as const

// ── Category social proof (Section 5 of home) ───────────────────────────────
export const CATEGORY_PROOF = [
  { cat: 'Peluquería',   client: 'Magnolia Peluquería', accent: 'rose' },
  { cat: 'Barbería',     client: 'Portas Barber',       accent: 'amber' },
  { cat: 'Gimnasio',     client: 'Cronos Academy',      accent: 'emerald' },
  { cat: 'Spa',          client: 'Hidrobaby Spa',       accent: 'teal' },
  { cat: 'Tatuajes',     client: 'Scott Tatuajes',      accent: 'fuchsia' },
  { cat: 'Cervecería',   client: 'Trentina',            accent: 'orange' },
  { cat: 'Restaurant',   client: 'Tsuki',               accent: 'orange' },
  { cat: 'Eventos',      client: 'Maskarada',           accent: 'violet' },
  { cat: 'Indumentaria', client: 'Superspuma',          accent: 'indigo' },
] as const

// ── Features (kept but reframed as benefits in their voice) ──────────────────
export const FEATURES = [
  {
    title: 'Todo incluido',
    desc: 'Diseño, textos, fotos, dominio, hosting, SEO y soporte. Vos no tocás nada — solo nos mandás la info de tu negocio.',
  },
  {
    title: 'WhatsApp directo',
    desc: 'Un botón que abre tu WhatsApp. El cliente te escribe y vos le contestás como siempre. Sin formularios que nadie llena.',
  },
  {
    title: 'Dominio propio',
    desc: 'Tu URL con tu nombre — tupeluqueria.com.py. Con candado SSL y emails profesionales incluidos el primer año.',
  },
  {
    title: 'Salís en Google',
    desc: 'SEO listo desde el día uno. Cuando alguien busque tu servicio en Asunción, tu negocio aparece arriba.',
  },
  {
    title: 'Se ve perfecto en el celu',
    desc: 'El 70% de tus clientes te va a buscar desde el teléfono. Tu sitio se abre rápido y se ve bien, sin zoom ni scroll horizontal.',
  },
  {
    title: 'Te lo mantenemos nosotros',
    desc: 'Cambias el precio del corte, sumás un servicio nuevo, querés fotos distintas. Mandás un audio por WhatsApp y lo hacemos nosotros.',
  },
] as const

// ── Guarantees (reframed) ────────────────────────────────────────────────────
export const GUARANTEES = [
  { title: 'Ves antes de pagar',     desc: 'Demo gratis. Si no te gusta, no perdés nada.' },
  { title: '30 días para arrepentirte', desc: 'Te devolvemos el setup completo, sin preguntas.' },
  { title: 'Tu sitio es tuyo',       desc: 'Dominio a tu nombre. Te lo llevás si te vas.' },
  { title: 'Soporte por WhatsApp',   desc: 'Sin tickets, sin formularios. Como hablar con un amigo.' },
] as const

// ── Plans ─────────────────────────────────────────────────────────────────────
// Pricing model: monthly hosting is the recurring cost; the setup fee
// covers the first 3 months of features up-front (effectively the
// "annual payment" option — pay once and you're covered for 3 months
// before monthly starts).
//
// Feature matrix: FEATURES is the master list. Each plan's `features`
// is a map of `featureKey: included` (boolean) or `{ included, note? }`
// for plan-specific notes (e.g. "7 meses" vs "8 meses" included time).
// This makes cross-plan comparison renderable as a table.
export const PLAN_FEATURES = [
  { key: 'sitio',            label: 'Sitio completo' },
  { key: 'dominio',          label: 'Dominio propio .com.py' },
  { key: 'paginas',          label: 'Páginas',                 note: 'cantidad incluida' },
  { key: 'fotos',            label: 'Fotos optimizadas',       note: 'cantidad incluida' },
  { key: 'whatsapp',         label: 'WhatsApp Business' },
  { key: 'seo',              label: 'SEO + Google Maps' },
  { key: 'reservas',         label: 'Reservas online' },
  { key: 'catalogo',         label: 'Catálogo de productos',   note: 'productos incluidos' },
  { key: 'blog',             label: 'Blog + analytics' },
  { key: 'emails',           label: 'Emails profesionales' },
  { key: 'cambios',          label: 'Cambios de contenido',    note: 'por mes' },
  { key: 'soporte',          label: 'Soporte por WhatsApp' },
  { key: 'ssl',              label: 'SSL (candadito verde)' },
  { key: 'multi_idioma',     label: 'Sitio multi-idioma' },
] as const

type FeatureKey = (typeof PLAN_FEATURES)[number]['key']

export const PLANS = [
  {
    id: 'prueba',
    name: 'Prueba',
    monthly: 'Gratis',
    monthlyNote: 'para empezar',
    setup: null,
    badge: null,
    popular: false,
    description:
      'Probá todo lo que ofrecemos antes de pagar nada. Sin tarjeta, sin compromiso.',
    cta: 'Pedir demo gratis',
    waMsg:
      'Hola, quiero una demo gratis de mi sitio web con ParaguAI.',
    features: {
      sitio:        { included: true,  note: 'en subdominio paragu-ai.com' },
      dominio:      { included: false },
      paginas:      { included: false },
      fotos:        { included: false },
      whatsapp:     { included: true },
      seo:          { included: true },
      reservas:     { included: false },
      catalogo:     { included: false },
      blog:         { included: false },
      emails:       { included: false },
      cambios:      { included: false },
      soporte:      { included: true },
      ssl:          { included: true },
      multi_idioma: { included: false },
    },
  },
  {
    id: 'presencia',
    name: 'Presencia',
    monthly: 'Gs 300.000',
    monthlyNote: 'por mes (anual Gs 3.000.000)',
    setup: null,
    badge: null,
    popular: false,
    description:
      'Tu primer sitio profesional con dominio propio.',
    cta: 'Comenzar Presencia',
    waMsg:
      'Hola, me interesa el plan Presencia (Gs 300.000/mes o Gs 3.000.000 anual).',
    features: {
      sitio:        { included: true },
      dominio:      { included: true },
      paginas:      { included: true,  note: 'hasta 5' },
      fotos:        { included: true,  note: 'hasta 15' },
      whatsapp:     { included: true },
      seo:          { included: true,  note: 'básico' },
      reservas:     { included: false },
      catalogo:     { included: false },
      blog:         { included: false },
      emails:       { included: true },
      cambios:      { included: true,  note: '2 por mes' },
      soporte:      { included: true,  note: 'dedicado' },
      ssl:          { included: true },
      multi_idioma: { included: false },
    },
  },
  {
    id: 'crecimiento',
    name: 'Crecimiento',
    monthly: 'Gs 450.000',
    monthlyNote: 'por mes (anual Gs 4.500.000)',
    setup: null,
    badge: 'Más recomendado',
    popular: true,
    description:
      'Reservas online, blog y catálogo de productos.',
    cta: 'Comenzar Crecimiento',
    waMsg:
      'Hola, me interesa el plan Crecimiento (Gs 450.000/mes o Gs 4.500.000 anual).',
    features: {
      sitio:        { included: true },
      dominio:      { included: true },
      paginas:      { included: true,  note: 'ilimitadas' },
      fotos:        { included: true,  note: 'ilimitadas' },
      whatsapp:     { included: true },
      seo:          { included: true,  note: 'avanzado + Schema.org' },
      reservas:     { included: true },
      catalogo:     { included: true,  note: 'hasta 20 productos' },
      blog:         { included: true,  note: 'analytics avanzado' },
      emails:       { included: true },
      cambios:      { included: true,  note: '5 por mes, prioritario' },
      soporte:      { included: true,  note: 'dedicado prioritario' },
      ssl:          { included: true },
      multi_idioma: { included: false },
    },
  },
  {
    id: 'profesional',
    name: 'Profesional',
    monthly: 'Gs 900.000',
    monthlyNote: 'por mes (anual Gs 9.000.000)',
    setup: null,
    badge: null,
    popular: false,
    description:
      'Cadenas, franquicias y multi-sucursal.',
    cta: 'Hablar con ventas',
    waMsg:
      'Hola, me interesa el plan Profesional (Gs 900.000/mes o Gs 9.000.000 anual). Quiero hablar con ventas.',
    features: {
      sitio:        { included: true },
      dominio:      { included: true },
      paginas:      { included: true,  note: 'ilimitadas' },
      fotos:        { included: true,  note: 'ilimitadas' },
      whatsapp:     { included: true },
      seo:          { included: true,  note: 'avanzado + Schema.org' },
      reservas:     { included: true },
      catalogo:     { included: true,  note: 'sin límite' },
      blog:         { included: true,  note: 'analytics avanzado' },
      emails:       { included: true },
      cambios:      { included: true,  note: 'prioritario' },
      soporte:      { included: true,  note: 'account manager dedicado' },
      ssl:          { included: true },
      multi_idioma: { included: true,  note: 'es/en/pt' },
    },
  },
] as const

// ── FAQs (questions a peluquería owner would actually ask) ─────────────────
export const FAQS = [
  {
    q: '¿Cuánto me sale en realidad?',
    a: 'Arrancás con demo gratis (sin tarjeta). Después podés ir desde Gs 300.000 al mes (o Gs 3.000.000 anual). Sin sorpresas en la factura.',
  },
  {
    q: '¿Tengo que saber de tecnología?',
    a: 'No. Hablamos por WhatsApp como con cualquier proveedor. Vos mandás la info de tu negocio — nombre, fotos, servicios, precios — y nosotros hacemos todo lo técnico.',
  },
  {
    q: '¿Qué pasa si no me gusta el sitio?',
    a: 'No pagás hasta que confirmes que te gusta. Y si después te arrepentís, tenés 30 días de garantía — te devolvemos el setup completo.',
  },
  {
    q: '¿El sitio es mío de verdad?',
    a: 'Sí. El dominio queda a tu nombre. Si un día querés irte con otra agencia, te llevás todo: dominio, contenido, fotos. Sin ataduras.',
  },
  {
    q: '¿Y si después quiero cambiar cosas?',
    a: 'Mandás un audio por WhatsApp diciendo qué querés cambiar — un precio, una foto, un horario. Lo hacemos nosotros, sin límite de cambios por mes.',
  },
  {
    q: '¿Puedo usar mi dominio que ya tengo?',
    a: 'Sí. Si ya compraste tupeluqueria.com.py en otra parte, lo conectamos sin costo. Si no tenés, te regalamos uno el primer año.',
  },
] as const

// ── Testimonials — REAL quotes only. Empty until we collect them. ─────────────
// NOTE: do NOT fabricate. If you don't have a real screenshot of a WhatsApp
// message from the client, leave this empty. Better no testimonial than a fake.
export const TESTIMONIALS: Array<{
  name: string; business: string; quote: string; rating: number
}> = [] as const