// ── Clients (real live sites) — worst-first per SCATH principle ──────────
// El Viajero dropped us; removed from portfolio. Their site stays at tiendaelviajero.com.py
// Homepage shows CLIENTS.slice(0, 9) — best showcase clients come first
export const CLIENTS = [
  {
    name: 'Trentina',
    url: 'https://trentina.paragu-ai.com',
    rubro: 'Cervecería',
    desc: 'Cerveza artesanal paraguaya en Santa Rita, Alto Paraná',
    slug: 'trentina',
  },
  {
    name: 'Nexa Paraguay',
    url: 'https://nexa.paragu-ai.com',
    rubro: 'Reubicación',
    desc: 'Programa de reubicación para europeos (4 idiomas)',
    slug: 'nexa',
  },
  {
    name: 'Reina de Copas',
    url: 'https://reina-de-copas.paragu-ai.com',
    rubro: 'Salud',
    desc: 'Copas y discos menstruales ecológicos. Envíos a todo Paraguay',
    slug: 'reina-de-copas',
  },
  {
    name: 'El Gato Siamés',
    url: 'https://elgatosiames.paragu-ai.com',
    rubro: 'Entretenimiento',
    desc: 'Stand up paraguayo · Humor negro · One-liners',
    slug: 'elgatosiames',
  },
  {
    name: 'DepiFlash',
    url: 'https://depiflash.paragu-ai.com',
    rubro: 'Depilación',
    desc: 'Depilación láser IPL a domicilio',
    slug: 'depiflash',
  },
  {
    name: 'Mantra Spa',
    url: 'https://mantraspa.paragu-ai.com',
    rubro: 'Spa & Wellness',
    desc: 'Masajes, tratamientos faciales y bienestar',
    slug: 'mantraspa',
  },
  {
    name: 'Dayah Litworks',
    url: 'https://dayah.paragu-ai.com',
    rubro: 'Diseño Gráfico',
    desc: 'Diseño de tapas de libros y portafolio',
    slug: 'dayah',
  },
  {
    name: 'Bichos Gym',
    url: 'https://bichosgym.paragu-ai.com',
    rubro: 'Gimnasio / Fitness',
    desc: 'Entrenamiento funcional y crossfit',
    slug: 'bichosgym',
  },
  {
    name: 'Jota Ink Tattoo',
    url: 'https://jotaink.paragu-ai.com',
    rubro: 'Tatuajes & Piercing',
    desc: 'Tatuajes personalizados y piercing',
    slug: 'jotaink',
  },
  {
    name: 'Magnolia Peluquería',
    url: 'https://magnolia-peluqueria.paragu-ai.com',
    rubro: 'Peluquería',
    desc: 'Cortes, coloración y tratamientos capilares en Asunción',
    slug: 'magnolia-peluqueria',
  },
  {
    name: 'Complejo Cocodrilo',
    url: 'https://cocodrilofitness.paragu-ai.com',
    rubro: 'Gimnasio / Fitness',
    desc: 'Gimnasio con pileta climatizada, sauna y clases en Asunción',
    slug: 'cocodrilofitness',
  },
] as const

// ── Templates for the portfolio strip ──────────────────────────────────
export const TEMPLATES = [
  {
    id: 'peluqueria',
    name: 'Peluquería',
    leads: 2393,
    pct: 81,
    color: '#b76e79',
    demo: 'https://magnolia-peluqueria.paragu-ai.com',
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
    id: 'spa',
    name: 'Spa & Wellness',
    leads: 927,
    pct: 76,
    color: '#7c9885',
    demo: 'https://mantraspa.paragu-ai.com',
  },
  {
    id: 'tatuajes',
    name: 'Tatuajes',
    leads: 272,
    pct: 70,
    color: '#1a1a2e',
    demo: 'https://jotaink.paragu-ai.com',
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
    id: 'cerveceria',
    name: 'Cervecería',
    leads: 0,
    pct: 0,
    color: '#92400e',
    demo: 'https://trentina.paragu-ai.com',
  },
] as const

// ── Steps ────────────────────────────────────────────────────────────────
export const STEPS = [
  {
    num: '01',
    title: 'Contanos por WhatsApp',
    desc: 'Nos mandás el nombre del negocio, servicios, precios y fotos. Sin formularios complicados.',
  },
  {
    num: '02',
    title: 'Armamos tu demo',
    desc: 'En 24 horas te mandamos un link con tu sitio listo. Lo revisás, pedís ajustes, y recién después pagás.',
  },
  {
    num: '03',
    title: 'Lanzamos y mantenemos',
    desc: 'Publicamos en tu dominio .com.py con SSL, SEO y analytics. Cambios mensuales incluidos por WhatsApp.',
  },
] as const

// ── Features ─────────────────────────────────────────────────────────────
export const FEATURES = [
  {
    title: 'Todo incluido',
    desc: 'Diseño, textos, fotos, dominio, hosting, SEO y soporte. Vos no tocás nada.',
  },
  {
    title: 'WhatsApp directo',
    desc: 'Botón flotante que lleva directo a tu WhatsApp Business. Tus clientes te escriben con un clic.',
  },
  {
    title: 'Dominio propio',
    desc: 'Tu URL profesional .com.py con SSL y emails incluidos el primer año.',
  },
  {
    title: 'SEO integrado',
    desc: 'Meta tags, Schema.org y contenido optimizado para aparecer en Google desde el día uno.',
  },
  {
    title: '100% responsive',
    desc: 'Se ve perfecto en móvil, tablet y desktop. Optimizado para cómo miran tus clientes hoy.',
  },
  {
    title: 'Plantillas por rubro',
    desc: 'Diseños especializados pensados para tu tipo de negocio. Arrancás con la base correcta y ajustamos a tu marca.',
  },
] as const

// ── Guarantees ──────────────────────────────────────────────────────────
export const GUARANTEES = [
  { title: 'Demo antes de pagar', desc: 'Ves tu sitio primero, pagás después.' },
  { title: '30 días de garantía', desc: 'Si no te convence, te devolvemos el setup.' },
  { title: 'Uptime 99.9%', desc: 'Infraestructura en Cloudflare + Supabase.' },
  { title: 'Sin permanencia', desc: 'Cancelás cuando quieras, te llevás tu dominio.' },
] as const

// ── Plans ───────────────────────────────────────────────────────────────
export const PLANS = [
  {
    id: 'prueba',
    name: 'Prueba',
    setup: 'Gratis',
    monthly: null,
    badge: null,
    popular: false,
    description:
      'Probá todo lo que ofrecemos antes de pagar nada. Sin tarjeta, sin compromiso.',
    features: [
      { text: 'Tu sitio en subdominio .paragu-ai.com', included: true },
      { text: 'WhatsApp + Google Maps + SSL', included: true },
      { text: 'Soporte por WhatsApp', included: true },
      { text: 'Demo lista en 48h', included: true },
      { text: 'Después: seguís online (marca ParaguAI) o pasás a plan pago', included: true },
      { text: 'Dominio propio (.com.py)', included: false },
      { text: 'Sin marca ParaguAI', included: false },
    ],
    cta: 'Pedir demo gratis',
    waMsg:
      'Hola, quiero una demo gratis de mi sitio web con ParaguAI.',
  },
  {
    id: 'presencia',
    name: 'Presencia',
    setup: 'Gs 650.000',
    monthly: 'Gs 100.000/mes',
    badge: null,
    popular: false,
    description:
      'Tu primer sitio profesional. 7 meses con todo desbloqueado — después seguis con las features de tu plan.',
    features: [
      { text: '7 meses con experiencia Profesional completa', included: true },
      { text: 'Hasta 5 páginas', included: true },
      { text: 'Dominio propio .com.py incluido 1 año', included: true },
      { text: 'Hasta 15 fotos optimizadas', included: true },
      { text: 'Formulario + WhatsApp Business', included: true },
      { text: 'SEO básico + Google Maps', included: true },
      { text: '2 cambios de contenido al mes', included: true },
      { text: 'Soporte dedicado por WhatsApp', included: true },
    ],
    cta: 'Comenzar Presencia',
    waMsg:
      'Hola, me interesa el plan Presencia (Gs 650.000 + 100.000/mes, con 7 meses Profesional incluidos).',
  },
  {
    id: 'crecimiento',
    name: 'Crecimiento',
    setup: 'Gs 1.200.000',
    monthly: 'Gs 150.000/mes',
    badge: 'Más recomendado',
    popular: true,
    description:
      'Reservas, blog y catálogo de productos. 8 meses con todo desbloqueado.',
    features: [
      { text: '8 meses con experiencia Profesional completa', included: true },
      { text: 'Todo lo de Presencia + páginas ilimitadas', included: true },
      { text: 'Sistema de reservas online', included: true },
      { text: 'Catálogo con hasta 20 productos', included: true },
      { text: 'Blog + analytics avanzado', included: true },
      { text: 'SEO avanzado + Schema.org', included: true },
      { text: '5 cambios al mes + soporte prioritario', included: true },
      { text: 'Emails profesionales', included: true },
    ],
    cta: 'Comenzar Crecimiento',
    waMsg:
      'Hola, me interesa el plan Crecimiento (Gs 1.200.000 + 150.000/mes, con 8 meses Profesional incluidos).',
  },
  {
    id: 'profesional',
    name: 'Profesional',
    setup: 'Gs 2.200.000',
    monthly: 'Gs 300.000/mes',
    badge: null,
    popular: false,
    description:
      'Cadenas, franquicias y multi-sucursal. Experiencia Profesional completa, siempre.',
    features: [
      { text: 'Experiencia Profesional completa, siempre', included: true },
      { text: 'Todo lo de Crecimiento sin límite de tiempo', included: true },
      { text: 'Hasta 5 sucursales / locales', included: true },
      { text: 'Sitio multi-idioma (es/en/pt)', included: true },
      { text: 'Integraciones personalizadas', included: true },
      { text: 'Account manager dedicado', included: true },
      { text: 'SLA 99.9% uptime', included: true },
      { text: '10 horas de desarrollo al mes', included: true },
    ],
    cta: 'Hablar con ventas',
    waMsg:
      'Hola, me interesa el plan Profesional (Gs 2.200.000 + 300.000/mes). Quiero hablar con ventas.',
  },
] as const

// ── FAQs ────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: '¿Cuánto tiempo tarda en estar listo mi sitio?',
    a: 'Entre 24 y 48 horas desde que recibimos tus datos. Nuestro motor genera el sitio base en minutos y uneditor humano lo revisa, ajusta textos y optimiza imágenes antes de publicarlo.',
  },
  {
    q: '¿Necesito conocimientos técnicos?',
    a: 'Ninguno. Nosotros hacemos todo: diseño, textos, fotos, SEO, dominio y publicación. Vos nos mandás la info de tu negocio por WhatsApp y recibís el sitio listo.',
  },
  {
    q: '¿Puedo probar antes de pagar?',
    a: 'Sí. Todos los planes incluyen una demo gratuita de tu sitio antes de pagar. Además tenés 3 meses con experiencia Profesional completa sin costo. Después podés seguir gratis (con marca ParaguAI) o pasar a un plan pago.',
  },
  {
    q: '¿Cómo funciona el pago?',
    a: 'Setup único al inicio (una sola vez) + cuota mensual para hosting, dominio y soporte. Aceptamos Mercado Pago y transferencia bancaria. Sin contratos de permanencia.',
  },
  {
    q: '¿Qué incluye el dominio propio?',
    a: 'Los planes pagos incluyen un dominio .com.py gratis el primer año, configuración DNS, certificado SSL automático y emails profesionales (tunombre@tunegocio.com.py).',
  },
  {
    q: '¿Puedo usar mi dominio existente?',
    a: 'Sí, conectamos cualquier dominio que ya tengas sin costo extra. También te ayudamos a migrar desde Wix, WordPress o tu web actual.',
  },
  {
    q: '¿Qué pasa si no me gusta?',
    a: 'Tenés 30 días de garantía. Si el sitio no te convence, te devolvemos el setup completo. Sin preguntas.',
  },
] as const

// ── Testimonials ────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Equipo Nexa Paraguay',
    business: 'Nexa Paraguay · Reubicación Europa → PY',
    quote:
      'Necesitábamos un sitio serio en 4 idiomas (ES/EN/DE/NL) para clientes europeos. ParaguAI lo entregó sin que toquemos código.',
    rating: 5,
  },
  {
    name: 'Dayah',
    business: 'Dayah Litworks · Diseño de tapas de libros',
    quote:
      'Mi portafolio antes estaba en Instagram. Ahora los autores que me contratan me ven con un sitio profesional. Cerré 3 comisiones en el primer mes.',
    rating: 5,
  },
  {
    name: 'Laura',
    business: 'Belleza Total · Salón de belleza',
    quote:
      'En una semana ya tenía consultas por WhatsApp todos los días. Mis clientas me encuentran en Google, no solo en Instagram.',
    rating: 5,
  },
] as const
