// ── Extended Admin Data ────────────────────────────────────────────────────────
// Enhanced client data with leads, screenshots, domains, repos, revenue

import type { Client, ClientStatus, ClientType } from './admin-data'

// Extend base Client type for full admin view
export interface ExtendedClient extends Client {
  contacts?: { name: string; phone: string; email?: string; role?: string }[]
  domain?: string
  domainExpiry?: string
  sslStatus?: 'valid' | 'expiring' | 'expired' | 'unknown'
  renewalCost?: number //Gs
  registrar?: string
  lastDeploy?: string
  deployBranch?: string
  lastCommit?: string
  commitHash?: string
  openIssues?: number
  screenshots?: string[]
  activityLog?: { date: string; action: string; user: string }[]
}

// ── Lead Data ─────────────────────────────────────────────────────────────────
export type LeadStatus = 'new' | 'contacted' | 'demo' | 'negotiating' | 'won' | 'lost'
export type LeadSource = 'google_maps' | 'whatsapp' | 'referral' | 'cold_outreach' | 'event' | 'infonegocios' | 'viralist'

export interface Lead {
  id: string
  name: string
  business: string
  owner: string
  whatsapp: string
  phone: string
  category: string
  source: LeadSource
  status: LeadStatus
  score: number // proximity + reviews + rating composite
  distanceKm: number
  reviews: number
  rating: number
  igHandle?: string
  hasWebsite: boolean
  notes: string[]
  createdAt: string
  assignedTo?: string
  lastContact?: string
  nextAction?: string
  // Geo
  lat: number
  lng: number
  address: string
  zona?: string
}

// Leads from LEADS_RANKING.csv and top18_fp_politecnica.csv
export const LEADS: Lead[] = [
  {
    id: 'estudio-medieval',
    name: 'Santiago Bentancor',
    business: 'Estudio Medieval',
    owner: 'Santiago Bentancor',
    whatsapp: 'wa.me/595981519040',
    phone: '0981 519 040',
    category: 'Tatuajes/Piercing',
    source: 'viralist',
    status: 'contacted',
    score: 133.2,
    distanceKm: 0.6,
    reviews: 1315,
    rating: 4.9,
    igHandle: '@estudiomedievalsrl (58K) + 3 sub-brands',
    hasWebsite: false,
    notes: ['58K IG, 1315 reviews, 3 sub-brands: @studsuppliestattoo @showroommedieval @estudiomedievalstetic. Multi-service ecosystem. Born 2014. Leo Feltes founder. Media coverage. Best lead available.'],
    createdAt: '2026-04-01',
    assignedTo: 'Kiki',
    lastContact: '2026-05-20',
    nextAction: 'Send proposal',
    lat: -25.3018012,
    lng: -57.5300592,
    address: 'Coronel Feliciano Duarte 315 esquina, San Lorenzo 2160',
    zona: 'San Lorenzo',
  },
  {
    id: 'shine-nails',
    name: 'Celeste Villalba',
    business: 'SHINE Nails by Celeste Villalba',
    owner: 'Celeste Villalba',
    whatsapp: 'wa.me/595986693259',
    phone: '0986 693 259',
    category: 'Uñas/Nails',
    source: 'google_maps',
    status: 'won',
    score: 130.7,
    distanceKm: 1.6,
    reviews: 287,
    rating: 4.9,
    igHandle: 'IG not confirmed yet',
    hasWebsite: true,
    notes: ['287 Google reviews, multi-category (beauty+health+hair), celular premium 0986. Paying client. Live at shinenails.com.py'],
    createdAt: '2026-03-15',
    assignedTo: 'Kiki',
    lastContact: '2026-04-10',
    nextAction: 'Active client',
    lat: -25.300706,
    lng: -57.53267109999999,
    address: 'Luis Morinigo, San Lorenzo 111402',
    zona: 'San Lorenzo',
  },
  {
    id: 'leticia-carballo',
    name: 'Leticia Carballo',
    business: 'Leticia Carballo Makeup & Hair Color',
    owner: 'Leticia Carballo',
    whatsapp: 'unknown',
    phone: '0984 904 215',
    category: 'Maquillaje',
    source: 'viralist',
    status: 'demo',
    score: 85.5,
    distanceKm: 2.1,
    reviews: 206,
    rating: 4.6,
    igHandle: '@lcmakeuphaircolor (~52K)',
    hasWebsite: false,
    notes: ['4.6⭐/206 reviews, hair+makeup+nails combo. 52K IG. Viralist + Infonegocios coverage. Demo sent.'],
    createdAt: '2026-04-10',
    assignedTo: 'Kiki',
    lastContact: '2026-05-25',
    nextAction: 'Follow up demo',
    lat: -25.3146305,
    lng: -57.529184,
    address: 'Don Bosco &, Del Carmen, Fernando de la Mora 110310',
    zona: 'Fernando Norte',
  },
  {
    id: 'nutrifit-spa',
    name: 'AudaRiveros',
    business: 'Nutrifit Spa Y Belleza',
    owner: 'AudaRiveros',
    whatsapp: 'unknown',
    phone: '0981 953 000',
    category: 'Spa/Wellness',
    source: 'infonegocios',
    status: 'contacted',
    score: 82.5,
    distanceKm: 2.2,
    reviews: 233,
    rating: 4.6,
    igHandle: '@nutrifit.spa_belleza',
    hasWebsite: false,
    notes: ['233 Google reviews, 10+ years in business. Featured Infonegocios article. Nutrition + beauty combo. Multi-location. Demo sent but no response.'],
    createdAt: '2026-04-12',
    assignedTo: 'Kiki',
    lastContact: '2026-05-18',
    nextAction: 'Send WhatsApp follow-up',
    lat: -25.315578,
    lng: -57.5310569,
    address: 'Don Bosco 2221, Fernando de la Mora 110310',
    zona: 'Fernando Norte',
  },
  {
    id: 'viviesteticpy',
    name: 'Viviana Ocampo',
    business: 'Viviesteticpy',
    owner: 'Viviana Ocampo',
    whatsapp: 'wa.me/595976668289',
    phone: '0976 668 289',
    category: 'Salon de Belleza',
    source: 'viralist',
    status: 'contacted',
    score: 82.1,
    distanceKm: 1.6,
    reviews: 61,
    rating: 4.7,
    igHandle: '@viviestetic_py',
    hasWebsite: false,
    notes: ['IG confirmed @viviestetic_py via Viralist. Viviana Ocampo + Spa de cejas y pestañas = microblading niche. Portfolio + reserva online opportunity.'],
    createdAt: '2026-04-15',
    assignedTo: 'Kiki',
    lastContact: '2026-05-22',
    nextAction: 'Send demo link',
    lat: -25.308847,
    lng: -57.5154328,
    address: 'San Lorenzo 111405',
    zona: 'San Lorenzo',
  },
  {
    id: 'hidrobaby-spa',
    name: 'Fabio Castillo & Fatima Flecha',
    business: 'HidroBaby Spa Pinedo',
    owner: 'Fabio Castillo',
    whatsapp: 'unknown',
    phone: 'unknown',
    category: 'Spa/Wellness',
    source: 'infonegocios',
    status: 'demo',
    score: 68.4,
    distanceKm: 2.2,
    reviews: 47,
    rating: 5.0,
    igHandle: '@hidrobabyspapinedo',
    hasWebsite: false,
    notes: ['5.0⭐ perfect rating, 3 branches (Luque/Villa Morra/San Lorenzo), FOCO article media coverage, Unique baby spa concept with growing demand, 3 branches = multi-location web. Demo sent.'],
    createdAt: '2026-04-20',
    assignedTo: 'Kiki',
    lastContact: '2026-05-26',
    nextAction: 'Follow up after demo',
    lat: -25.3235601,
    lng: -57.5188072,
    address: 'Av. Mariscal López y, San Lorenzo 111420',
    zona: 'San Lorenzo',
  },
  {
    id: 'xxgym',
    name: 'unknown',
    business: 'XXGym',
    owner: 'unknown',
    whatsapp: 'unknown',
    phone: '(021) 678 171',
    category: 'Gimnasio/Fitness',
    source: 'google_maps',
    status: 'won',
    score: 92.4,
    distanceKm: 2.3,
    reviews: 119,
    rating: 4.7,
    igHandle: 'unknown',
    hasWebsite: true,
    notes: ['119 Google reviews, gym category. Paying client. Live at xxgym.com.py'],
    createdAt: '2026-03-01',
    assignedTo: 'Ivan',
    lastContact: '2026-03-20',
    nextAction: 'Active client',
    lat: -25.3079257,
    lng: -57.5338267,
    address: 'MFR8+RFF, Fernando de la Mora 110303',
    zona: 'Fernando Norte',
  },
  {
    id: 'nde-barba',
    name: 'unknown',
    business: 'Nde Barba Barbería',
    owner: 'unknown',
    whatsapp: 'wa.me/595991444268',
    phone: '0991 444 268',
    category: 'Peluqueria',
    source: 'google_maps',
    status: 'won',
    score: 92.6,
    distanceKm: 1.7,
    reviews: 118,
    rating: 4.8,
    igHandle: 'unknown',
    hasWebsite: true,
    notes: ['118 reviews, 4.8⭐. Paying client. Live at ndebarba.com.py'],
    createdAt: '2026-02-15',
    assignedTo: 'Kiki',
    lastContact: '2026-03-10',
    nextAction: 'Active client',
    lat: -25.3104714,
    lng: -57.53023349999999,
    address: 'entre Libertad, Nicasio Villalba y, Fernando de la Mora 110311',
    zona: 'Fernando Norte',
  },
  {
    id: 'portas-barber',
    name: 'unknown',
    business: 'Portas Barber Shop',
    owner: 'unknown',
    whatsapp: 'wa.me/595994215627',
    phone: '0994 215 627',
    category: 'Barberia',
    source: 'google_maps',
    status: 'won',
    score: 85.6,
    distanceKm: 2.1,
    reviews: 162,
    rating: 4.9,
    igHandle: 'unknown',
    hasWebsite: true,
    notes: ['162 reviews, 4.9⭐ = LÍDER de barberías por reviews. Paying client. Live at portasbarber.com.py'],
    createdAt: '2026-02-20',
    assignedTo: 'Kiki',
    lastContact: '2026-03-05',
    nextAction: 'Active client',
    lat: -25.298647,
    lng: -57.5449081,
    address: 'Av. Santa Teresa, Fernando de la Mora 110301',
    zona: 'Fernando Norte',
  },
  {
    id: 'arnos-barber-shop',
    name: 'Arno',
    business: "Arno's Barber Shop",
    owner: 'Arno',
    whatsapp: 'wa.me/595983996086',
    phone: '0983 996 086',
    category: 'Barberia',
    source: 'google_maps',
    status: 'new',
    score: 88.0,
    distanceKm: 1.8,
    reviews: 24,
    rating: 5.0,
    igHandle: 'IG not confirmed',
    hasWebsite: false,
    notes: ['5.0⭐ perfect rating pero solo 24 reviews = operación pequeña. Jacarandá San Lorenzo = zona premium. Demo site live.'],
    createdAt: '2026-05-01',
    assignedTo: 'Kiki',
    lastContact: '2026-05-28',
    nextAction: 'Send demo link',
    lat: -25.3116452,
    lng: -57.51708559999999,
    address: 'Jacarandá, San Lorenzo 111403',
    zona: 'San Lorenzo',
  },
  {
    id: 'cronos-academy',
    name: 'Natalia Benza / Nahuel',
    business: 'CRONOS ACADEMY',
    owner: 'Natalia Benza / Nahuel',
    whatsapp: 'unknown',
    phone: '0976 934 789',
    category: 'Gimnasio/Fitness',
    source: 'google_maps',
    status: 'contacted',
    score: 87.0,
    distanceKm: 1.8,
    reviews: 50,
    rating: 4.5,
    igHandle: '@cronosacademy.py',
    hasWebsite: false,
    notes: ['50 Google reviews. Unique selling point: presencial + online training. Fit academy model = premium + recurrente. Demo sent.'],
    createdAt: '2026-04-25',
    assignedTo: 'Kiki',
    lastContact: '2026-05-20',
    nextAction: 'Follow up demo',
    lat: -25.3073998,
    lng: -57.53383909999999,
    address: 'MFV8+2FV, Mariscal José Félix Estigarribia, Fernando de la Mora 110303',
    zona: 'Fernando Norte',
  },
  {
    id: 'barbye-nails',
    name: 'unknown',
    business: 'Barbye Nails',
    owner: 'unknown',
    whatsapp: 'unknown',
    phone: '0961 336 346',
    category: 'Uñas/Nails',
    source: 'google_maps',
    status: 'new',
    score: 107.2,
    distanceKm: 1.0,
    reviews: 12,
    rating: 5.0,
    igHandle: 'unknown',
    hasWebsite: false,
    notes: ['5.0⭐ perfect rating, only small reviews base. Address cercano a FP. Muy poca info pública. Demo site live.'],
    createdAt: '2026-05-10',
    assignedTo: 'Kiki',
    lastContact: '2026-05-28',
    nextAction: 'Contact via phone',
    lat: -25.3040811,
    lng: -57.52878430000001,
    address: 'Clemente Romero 302 San Lorenzo, San Lorenzo 2605',
    zona: 'San Lorenzo',
  },
  {
    id: 'lele-ferreira',
    name: 'Lele Ferreira',
    business: 'Lele Ferreira Makeup Studio',
    owner: 'Lele Ferreira',
    whatsapp: 'wa.me/595985598630',
    phone: '0985 598 630',
    category: 'Maquillaje',
    source: 'google_maps',
    status: 'contacted',
    score: 81.2,
    distanceKm: 1.9,
    reviews: 82,
    rating: 4.8,
    igHandle: 'unknown',
    hasWebsite: false,
    notes: ['4.8⭐ = MEJOR rating en category make-up. 82 reviews. WhatsApp directo. Demo sent.'],
    createdAt: '2026-04-18',
    assignedTo: 'Kiki',
    lastContact: '2026-05-24',
    nextAction: 'Follow up demo',
    lat: -25.3136006,
    lng: -57.5238355,
    address: 'Coronel Luis Irrazabal casi, Fernando de la Mora 110311',
    zona: 'Fernando Norte',
  },
  {
    id: 'avani-belleza',
    name: 'unknown',
    business: 'AVANI cuidado de la belleza',
    owner: 'unknown',
    whatsapp: 'wa.me/595994202928',
    phone: '0994 202 928',
    category: 'Salon de Belleza',
    source: 'event',
    status: 'new',
    score: 69.7,
    distanceKm: 1.5,
    reviews: 25,
    rating: 4.7,
    igHandle: 'IG not confirmed (BSCAR)',
    hasWebsite: false,
    notes: ['4.7⭐/25 reviews. Glow Privé event coverage Infonegocios (Julio 2025). Posible multi-location. Event experiencial ya existe. Demo sent.'],
    createdAt: '2026-05-15',
    assignedTo: 'Kiki',
    lastContact: '2026-05-27',
    nextAction: 'Follow up event contact',
    lat: -25.3100798,
    lng: -57.5268531,
    address: 'Del Carmen &, MFQF+X76, Benza Carrera, Fernando de la Mora 110311',
    zona: 'Fernando Norte',
  },
  {
    id: 'peluqueria-barbershop',
    name: 'unknown',
    business: 'Peluquería Barbershop',
    owner: 'unknown',
    whatsapp: 'wa.me/595982992766',
    phone: '0982 992 766',
    category: 'Peluqueria',
    source: 'google_maps',
    status: 'new',
    score: 70.7,
    distanceKm: 2.0,
    reviews: 66,
    rating: 4.6,
    igHandle: 'unknown',
    hasWebsite: false,
    notes: ['66 reviews = least established de barber group. Peluquería vs Barbershop = puede ofrecer servicios para mujeres.'],
    createdAt: '2026-05-20',
    assignedTo: 'Kiki',
    lastContact: '2026-05-28',
    nextAction: 'Send demo link',
    lat: -25.3144301,
    lng: -57.52927800000001,
    address: 'MFPC+67H, Fernando de la Mora 110310',
    zona: 'Fernando Norte',
  },
  {
    id: 'woman-cosmeticos',
    name: 'unknown',
    business: 'Woman Cosmeticos',
    owner: 'unknown',
    whatsapp: 'wa.me/595985695929',
    phone: '0985 695 929',
    category: 'Estetica/Facial',
    source: 'google_maps',
    status: 'new',
    score: 54.3,
    distanceKm: 1.6,
    reviews: 9,
    rating: 4.8,
    igHandle: 'unknown',
    hasWebsite: false,
    notes: ['Solo 9 reviews = negociación muy pequeña. 4.8⭐ rating pero sin volume. Maybe retail POS más que servicios.'],
    createdAt: '2026-05-22',
    assignedTo: 'Kiki',
    lastContact: '2026-05-28',
    nextAction: 'Send demo link',
    lat: -25.3085541,
    lng: -57.5323939,
    address: 'Mariscal Lopez 2783, Fernando de la Mora 110303',
    zona: 'Fernando Norte',
  },
  {
    id: 'clau-bellino',
    name: 'Clau Bellino',
    business: 'Clau Bellino Estética Facial',
    owner: 'Clau Bellino',
    whatsapp: 'wa.me/595981924858',
    phone: '0981 924 858',
    category: 'Estetica/Facial',
    source: 'google_maps',
    status: 'new',
    score: 31.5,
    distanceKm: 3.5,
    reviews: 21,
    rating: 5.0,
    igHandle: 'unknown',
    hasWebsite: false,
    notes: ['5.0⭐ perfect rating but only 21 reviews = tiny operation studio. 3.5km from FP = furthest location. Specialization facial = nicho premium. Lead de segunda ola.'],
    createdAt: '2026-05-25',
    assignedTo: 'Kiki',
    lastContact: '2026-05-28',
    nextAction: 'Send demo link',
    lat: -25.3240236,
    lng: -57.5403141,
    address: 'Mompox 1739, Fernando de la Mora 110312',
    zona: 'Fernando Norte',
  },
  {
    id: 'scott-tatuajes',
    name: 'Scott',
    business: 'Scott Tatuajes',
    owner: 'Scott',
    whatsapp: 'unknown',
    phone: '0981 575 176',
    category: 'Tatuajes/Piercing',
    source: 'google_maps',
    status: 'new',
    score: 75.5,
    distanceKm: 2.0,
    reviews: 82,
    rating: 4.6,
    igHandle: 'unknown',
    hasWebsite: false,
    notes: ['4.6⭐/82 reviews. No address confirmed. tattoo category pero Estudio Medieval es mejor lead. Scott could be backup tattoo lead if EM fails.'],
    createdAt: '2026-05-26',
    assignedTo: 'Kiki',
    lastContact: '2026-05-28',
    nextAction: 'Send demo link',
    lat: -25.297579,
    lng: -57.5433778,
    address: 'Eugenio A Garay Fdo de la mora zona norte, Fernando de la Mora 1234',
    zona: 'Fernando Norte',
  },
]

// ── Domain Data ────────────────────────────────────────────────────────────────
export interface DomainInfo {
  clientId: string
  domain: string
  registrar: string
  expiryDate: string
  renewalCostGs: number
  sslStatus: 'valid' | 'expiring' | 'expired'
  dnsConfigured: boolean
}

export const DOMAINS: DomainInfo[] = [
  { clientId: 'shine-nails', domain: 'shinenails.com.py', registrar: 'Namecheap', expiryDate: '2026-08-15', renewalCostGs: 450000, sslStatus: 'valid', dnsConfigured: true },
  { clientId: 'nde-barba', domain: 'ndebarba.com.py', registrar: 'Namecheap', expiryDate: '2026-09-01', renewalCostGs: 380000, sslStatus: 'valid', dnsConfigured: true },
  { clientId: 'portas-barber', domain: 'portasbarber.com.py', registrar: 'Namecheap', expiryDate: '2026-07-20', renewalCostGs: 420000, sslStatus: 'valid', dnsConfigured: true },
  { clientId: 'xxgym', domain: 'xxgym.com.py', registrar: 'DNByte', expiryDate: '2026-10-05', renewalCostGs: 350000, sslStatus: 'valid', dnsConfigured: true },
]

// ── Revenue Data ──────────────────────────────────────────────────────────────
export interface RevenueClient {
  clientId: string
  name: string
  plan: string
  setupGs: number
  monthlyGs: number
  startDate: string
  nextRenewal: string
  status: 'active' | 'paused' | 'cancelled'
}

export const REVENUE: RevenueClient[] = [
  { clientId: 'shine-nails', name: 'Shine Nails', plan: 'Profesional', setupGs: 2200000, monthlyGs: 300000, startDate: '2026-03-01', nextRenewal: '2026-07-01', status: 'active' },
  { clientId: 'nde-barba', name: 'Nde Barba', plan: 'Crecimiento', setupGs: 1200000, monthlyGs: 150000, startDate: '2026-03-15', nextRenewal: '2026-07-15', status: 'active' },
  { clientId: 'portas-barber', name: 'Portas Barber', plan: 'Crecimiento', setupGs: 1200000, monthlyGs: 150000, startDate: '2026-04-01', nextRenewal: '2026-08-01', status: 'active' },
  { clientId: 'xxgym', name: 'XXGym', plan: 'Profesional', setupGs: 2200000, monthlyGs: 300000, startDate: '2026-02-15', nextRenewal: '2026-06-15', status: 'active' },
]

// ── GitHub Repo Data ──────────────────────────────────────────────────────────
export interface RepoInfo {
  clientId: string
  owner: string
  name: string
  fullName: string
  language: string
  lastCommit: string
  commitHash: string
  branch: string
  openIssues: number
  stars: number
}

export const REPOS: RepoInfo[] = [
  { clientId: 'shine-nails', owner: 'Ai-Whisperers', name: 'shine-nails', fullName: 'Ai-Whisperers/shine-nails', language: 'TypeScript', lastCommit: '2026-05-25', commitHash: 'a3f2c1d', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'nde-barba', owner: 'Ai-Whisperers', name: 'nde-barba', fullName: 'Ai-Whisperers/nde-barba', language: 'TypeScript', lastCommit: '2026-05-22', commitHash: 'b7e4d2f', branch: 'main', openIssues: 1, stars: 0 },
  { clientId: 'portas-barber', owner: 'Ai-Whisperers', name: 'portas-barber', fullName: 'Ai-Whisperers/portas-barber', language: 'TypeScript', lastCommit: '2026-05-20', commitHash: 'c9f1a3b', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'xxgym', owner: 'Ai-Whisperers', name: 'xxgym', fullName: 'Ai-Whisperers/xxgym', language: 'TypeScript', lastCommit: '2026-05-18', commitHash: 'd2e5c8f', branch: 'main', openIssues: 2, stars: 0 },
  { clientId: 'mantraspa', owner: 'Ai-Whisperers', name: 'mantra-spa', fullName: 'Ai-Whisperers/mantra-spa', language: 'TypeScript', lastCommit: '2026-05-27', commitHash: 'e8h3j1k', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'bichosgym', owner: 'Ai-Whisperers', name: 'bichosgym', fullName: 'Ai-Whisperers/bichosgym', language: 'TypeScript', lastCommit: '2026-05-24', commitHash: 'f9i4k2l', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'estudio-medieval', owner: 'Ai-Whisperers', name: 'estudio-medieval', fullName: 'Ai-Whisperers/estudio-medieval', language: 'TypeScript', lastCommit: '2026-05-26', commitHash: 'g0j5l3m', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'nexa', owner: 'Ai-Whisperers', name: 'nexa-paraguay', fullName: 'Ai-Whisperers/nexa-paraguay', language: 'TypeScript', lastCommit: '2026-05-21', commitHash: 'h1k6m4n', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'cronos-academy', owner: 'Ai-Whisperers', name: 'cronos-academy', fullName: 'Ai-Whisperers/cronos-academy', language: 'TypeScript', lastCommit: '2026-05-23', commitHash: 'i2l7n5o', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'hidrobaby-spa', owner: 'Ai-Whisperers', name: 'hidrobaby-spa', fullName: 'Ai-Whisperers/hidrobaby-spa', language: 'TypeScript', lastCommit: '2026-05-19', commitHash: 'j3m8o6p', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'leticia-carballo', owner: 'Ai-Whisperers', name: 'leticia-carballo', fullName: 'Ai-Whisperers/leticia-carballo', language: 'TypeScript', lastCommit: '2026-05-17', commitHash: 'k4n9p7q', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'nutrifit-spa', owner: 'Ai-Whisperers', name: 'nutrifit-spa', fullName: 'Ai-Whisperers/nutrifit-spa', language: 'TypeScript', lastCommit: '2026-05-16', commitHash: 'l5o0q8r', branch: 'main', openIssues: 1, stars: 0 },
  { clientId: 'superspuma', owner: 'Ai-Whisperers', name: 'superspuma', fullName: 'Ai-Whisperers/superspuma', language: 'TypeScript', lastCommit: '2026-05-15', commitHash: 'm6p1r9s', branch: 'main', openIssues: 0, stars: 0 },
  { clientId: 'magnolia-peluqueria', owner: 'Ai-Whisperers', name: 'magnolia-peluqueria', fullName: 'Ai-Whisperers/magnolia-peluqueria', language: 'TypeScript', lastCommit: '2026-05-28', commitHash: 'n7q2s0t', branch: 'main', openIssues: 0, stars: 0 },
]

// ── Deployment / Docker Swarm Data ───────────────────────────────────────────
export interface Deployment {
  clientId: string
  stackName: string
  service: string
  replicas: number
  status: 'running' | 'degraded' | 'down'
  cpuPercent: number
  memUsedMb: number
  memLimitMb: number
  uptime: string
  lastRedeploy: string
}

export const DEPLOYMENTS: Deployment[] = [
  { clientId: 'shine-nails', stackName: 'shine-nails', service: 'shine-nails-web', replicas: 2, status: 'running', cpuPercent: 12, memUsedMb: 312, memLimitMb: 512, uptime: '14d 7h', lastRedeploy: '2026-05-25' },
  { clientId: 'nde-barba', stackName: 'nde-barba', service: 'nde-barba-web', replicas: 2, status: 'running', cpuPercent: 8, memUsedMb: 287, memLimitMb: 512, uptime: '12d 3h', lastRedeploy: '2026-05-22' },
  { clientId: 'portas-barber', stackName: 'portas-barber', service: 'portas-barber-web', replicas: 2, status: 'running', cpuPercent: 15, memUsedMb: 341, memLimitMb: 512, uptime: '10d 5h', lastRedeploy: '2026-05-20' },
  { clientId: 'xxgym', stackName: 'xxgym', service: 'xxgym-web', replicas: 2, status: 'running', cpuPercent: 18, memUsedMb: 398, memLimitMb: 512, uptime: '8d 11h', lastRedeploy: '2026-05-18' },
  { clientId: 'mantraspa', stackName: 'mantra-spa', service: 'mantra-spa-web', replicas: 2, status: 'running', cpuPercent: 22, memUsedMb: 412, memLimitMb: 512, uptime: '21d 4h', lastRedeploy: '2026-05-27' },
  { clientId: 'bichosgym', stackName: 'bichosgym', service: 'bichosgym-web', replicas: 2, status: 'running', cpuPercent: 11, memUsedMb: 298, memLimitMb: 512, uptime: '19d 6h', lastRedeploy: '2026-05-24' },
  { clientId: 'estudio-medieval', stackName: 'estudio-medieval', service: 'estudio-medieval-web', replicas: 2, status: 'running', cpuPercent: 14, memUsedMb: 334, memLimitMb: 512, uptime: '17d 2h', lastRedeploy: '2026-05-26' },
  { clientId: 'nexa', stackName: 'nexa-paraguay', service: 'nexa-web', replicas: 2, status: 'running', cpuPercent: 9, memUsedMb: 267, memLimitMb: 512, uptime: '15d 8h', lastRedeploy: '2026-05-21' },
  { clientId: 'cronos-academy', stackName: 'cronos-academy', service: 'cronos-academy-web', replicas: 2, status: 'running', cpuPercent: 10, memUsedMb: 289, memLimitMb: 512, uptime: '13d 9h', lastRedeploy: '2026-05-23' },
  { clientId: 'hidrobaby-spa', stackName: 'hidrobaby-spa', service: 'hidrobaby-spa-web', replicas: 2, status: 'running', cpuPercent: 7, memUsedMb: 245, memLimitMb: 512, uptime: '11d 12h', lastRedeploy: '2026-05-19' },
  { clientId: 'leticia-carballo', stackName: 'leticia-carballo', service: 'leticia-carballo-web', replicas: 2, status: 'running', cpuPercent: 13, memUsedMb: 308, memLimitMb: 512, uptime: '9d 7h', lastRedeploy: '2026-05-17' },
  { clientId: 'nutrifit-spa', stackName: 'nutrifit-spa', service: 'nutrifit-spa-web', replicas: 2, status: 'running', cpuPercent: 16, memUsedMb: 356, memLimitMb: 512, uptime: '7d 3h', lastRedeploy: '2026-05-16' },
  { clientId: 'magnolia-peluqueria', stackName: 'magnolia-peluqueria', service: 'magnolia-peluqueria-web', replicas: 2, status: 'running', cpuPercent: 6, memUsedMb: 223, memLimitMb: 512, uptime: '2d 1h', lastRedeploy: '2026-05-28' },
]

// ── Activity Log ─────────────────────────────────────────────────────────────
export interface ActivityEntry {
  id: string
  date: string
  user: string
  action: string
  target: string
  targetId: string
}

export const ACTIVITY_LOG: ActivityEntry[] = [
  { id: 'act-001', date: '2026-05-29 10:23', user: 'Erebus', action: 'Reordered clients', target: 'Client list', targetId: 'clients' },
  { id: 'act-002', date: '2026-05-28 16:45', user: 'Kiki', action: 'Contacted lead', target: 'Arno\'s Barber Shop', targetId: 'arnos-barber-shop' },
  { id: 'act-003', date: '2026-05-28 14:30', user: 'Kiki', action: 'Sent demo', target: 'Barbye Nails', targetId: 'barbye-nails' },
  { id: 'act-004', date: '2026-05-28 09:15', user: 'Erebus', action: 'Deployed site', target: 'Magnolia Peluquería', targetId: 'magnolia-peluqueria' },
  { id: 'act-005', date: '2026-05-27 11:00', user: 'Kiki', action: 'Contacted lead', target: 'Avani Belleza', targetId: 'avani-belleza' },
  { id: 'act-006', date: '2026-05-26 15:20', user: 'Erebus', action: 'Updated client notes', target: 'HidroBaby Spa', targetId: 'hidrobaby-spa' },
  { id: 'act-007', date: '2026-05-25 10:00', user: 'Ivan', action: 'Redeploy triggered', target: 'Shine Nails', targetId: 'shine-nails' },
  { id: 'act-008', date: '2026-05-24 14:00', user: 'Kiki', action: 'Contacted lead', target: 'Cronos Academy', targetId: 'cronos-academy' },
  { id: 'act-009', date: '2026-05-23 09:30', user: 'Kiki', action: 'Sent demo', target: 'Viviesteticpy', targetId: 'viviesteticpy' },
  { id: 'act-010', date: '2026-05-22 16:00', user: 'Erebus', action: 'Redeploy triggered', target: 'Nde Barba', targetId: 'nde-barba' },
]