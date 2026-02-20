export interface IndustryStat {
  value: string
  label: string
}

export interface IndustryFeatureCard {
  title: string
  description: string
  icon: 'zap' | 'users' | 'award'
}

export interface IndustryCopy {
  key: string
  singularLabel: string
  pluralLabel: string
  hero: {
    badge: string
    titleLead: string
    titleAccent: string
    description: string
  }
  services: {
    badge: string
    titleLead: string
    titleAccent: string
    description: string
  }
  servicesLanding: {
    title: string
    description: string
  }
  about: {
    badge: string
    titleLead: string
    titleAccent: string
    description: string
    cards: IndustryFeatureCard[]
    visionTitle: string
    visionText: string
    stats: IndustryStat[]
  }
  contact: {
    intro: string
    messagePlaceholder: string
    reasonsTitle: string
    reasons: string[]
    responsePromise: string
  }
  footer: {
    description: string
    ctaTitle: string
    ctaText: string
  }
  seo: {
    titleSuffix: string
    description: string
    keywords: string[]
  }
}

export const industryCopy = {
  "key": "bygg-snickeri",
  "singularLabel": "bygg- och snickeriföretag",
  "pluralLabel": "bygg- och snickeritjänster",
  "hero": {
    "badge": "BYGG- OCH SNICKERIFÖRETAG I GÖTEBORG",
    "titleLead": "Vi levererar",
    "titleAccent": "byggprojekt med kvalitet",
    "description": "Som ditt lokala byggföretag i Göteborg erbjuder vi kompletta byggtjänster med fokus på hållbarhet, transparens och trygghet."
  },
  "services": {
    "badge": "VÅRA TJÄNSTER",
    "titleLead": "Bygg- och snickeritjänster med",
    "titleAccent": "precision och trygghet",
    "description": "Från mindre snickeriarbeten till omfattande byggprojekt – vi har expertisen som krävs för ett perfekt resultat."
  },
  "servicesLanding": {
    "title": "Bygg- och snickeritjänster för privatpersoner och företag",
    "description": "Välj en tjänst nedan för att läsa mer och komma vidare till rätt sida."
  },
  "about": {
    "badge": "VÅRT UPPDRAG",
    "titleLead": "Byggtjänster med",
    "titleAccent": "fokus på kvalitet",
    "description": "Vi är ett dedikerat team av hantverkare som brinner för att förverkliga våra kunders byggdrömmar, alltid med högsta yrkesstolthet.",
    "cards": [
      {
        "title": "Expertis",
        "description": "Våra snickare och byggledare har lång erfarenhet av både moderna och klassiska byggtekniker.",
        "icon": "zap"
      },
      {
        "title": "Kundfokus",
        "description": "Vi håller dig uppdaterad genom hela byggprocessen så att du alltid vet nästa steg.",
        "icon": "users"
      },
      {
        "title": "Kvalitet",
        "description": "Vi lämnar branschstandardiserade garantier på alla utförda renoveringar och byggprojekt.",
        "icon": "award"
      }
    ],
    "visionTitle": "Vår vision",
    "visionText": "Att vara Göteborgs mest pålitliga och rekommenderade byggföretag genom att alltid överträffa kundens förväntningar.",
    "stats": [
      {
        "value": "10+",
        "label": "års erfarenhet"
      },
      {
        "value": "500+",
        "label": "genomförda uppdrag"
      },
      {
        "value": "100%",
        "label": "nöjda kunder"
      }
    ]
  },
  "contact": {
    "intro": "Berätta kort om ditt behov så återkommer vi snabbt med en offert.",
    "messagePlaceholder": "Beskriv ditt behov inom tillbyggnad, nybyggnad, kök eller badrum...",
    "reasonsTitle": "Varför välja oss?",
    "reasons": [
      "Fast pris och tydlig tidsplan",
      "Erfarna specialister inom bygg och snickeri",
      "Trygg kommunikation under hela uppdraget",
      "Nöjd-kund-garanti"
    ],
    "responsePromise": "Vi svarar normalt inom 24 timmar."
  },
  "footer": {
    "description": "Svensk Bygg & Snickeri är din pålitliga partner för alla typer av byggprojekt och renoveringar i Göteborg med omnejd.",
    "ctaTitle": "Behöver du hjälp med bygget?",
    "ctaText": "Skicka en offertförfrågan så hör vi av oss med ett prisförslag inom 24 timmar."
  },
  "seo": {
    "titleSuffix": "Byggföretag i Göteborg",
    "description": "Vi hjälper privatpersoner och företag med bygg- och snickeritjänster i Göteborg. Fast pris, tydlig leverans och hög kvalitet.",
    "keywords": [
      "byggföretag göteborg",
      "snickare göteborg",
      "byggprojekt",
      "renovering",
      "bygg- och snickeriföretag pris"
    ]
  }
} satisfies IndustryCopy
