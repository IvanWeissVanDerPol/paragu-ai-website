// ── Clients (real live sites, verified 2026-05-28) ──────────────────────
// Only LIVE sites (200) — no broken thumbnails on the homepage
// Best showcase clients listed first
// Homepage shows CLIENTS.slice(0, 9) — only live sites shown
export const CLIENTS = [
  {
    name: 'Superspuma',
    url: 'https://superspuma.paragu-ai.com',
    rubro: 'Indumentaria',
    desc: 'Ropa oversize y streetwear paraguayo',
    slug: 'superspuma',
  },
  {
    name: 'Mantra Spa',
    url: 'https://mantraspa.paragu-ai.com',
    rubro: 'Spa & Wellness',
    desc: 'Masajes, tratamientos faciales y bienestar',
    slug: 'mantraspa',
  },
  {
    name: 'Bichos Gym',
    url: 'https://bichosgym.paragu-ai.com',
    rubro: 'Gimnasio / Fitness',
    desc: 'Entrenamiento funcional y crossfit',
    slug: 'bichosgym',
  },
  {
    name: 'DepiFlash',
    url: 'https://depiflash.paragu-ai.com',
    rubro: 'Depilación',
    desc: 'Depilación láser IPL a domicilio',
    slug: 'depiflash',
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
] as const

// ── Templates for the portfolio strip ──────────────────────────────────
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
    demo: 'https://reina-de-copas.paragu-ai.com',
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
      'Tu primer sitio profesional con dominio propio. Los primeros 7 meses incluídos.',
    features: [
      { text: '7 meses con todas las features desbloqueadas', included: true },
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
      'Hola, me interesa el plan Presencia (Gs 650.000 + 100.000/mes).',
  },
  {
    id: 'crecimiento',
    name: 'Crecimiento',
    setup: 'Gs 1.200.000',
    monthly: 'Gs 150.000/mes',
    badge: 'Más recomendado',
    popular: true,
    description:
      'Reservas online, blog y catálogo de productos. Los primeros 8 meses incluídos.',
    features: [
      { text: '8 meses con todas las features desbloqueadas', included: true },
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
      'Hola, me interesa el plan Crecimiento (Gs 1.200.000 + 150.000/mes).',
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
    name: 'Claudia, Complejo Cocodrilo',
    business: 'Gimnasio con pileta climatizada',
    quote:
      'Antes tenía solo Instagram. Ahora mis clientes reservan pileta y clases desde el sitio. En temporada alta duplicamos las consultas.',
    rating: 5,
  },
  {
    name: 'Equipo Nexa Paraguay',
    business: 'Nexa · Reubicación Europa → PY',
    quote:
      'Necesitábamos un sitio serio en 4 idiomas (ES/EN/DE/NL) para clientes europeos. ParaguAI lo entregó sin que toquemos código.',
    rating: 5,
  },
  {
    name: 'Rocio, DepiFlash',
    business: 'Depilación láser IPL a domicilio',
    quote:
      'Mis clientas me encuentran en Google. Ya no dependo solo del boca a boca. Los primeros 15 días ya tenía 8 consultas nuevas.',
    rating: 5,
  },
] as const
