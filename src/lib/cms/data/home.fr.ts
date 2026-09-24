import type { HomePage } from "../types";
import { members } from "./members";

export const homeFr: HomePage = {
  hero: {
    slides: [
      {
        heading: "3ᵉ Sommet africain sur la sécurité des enfants en ligne",
        headingHighlight: "2027",
        subheading: "",
        tagline: "L'IA, les enfants et l'avenir de la participation numérique",
        dateLabel: "17 – 18 février 2027",
        locationLabel: "Dakar, Sénégal",
        body: "La principale plateforme continentale d'Afrique réunissant gouvernements, entreprises technologiques, société civile, chercheurs et jeunes pour bâtir un avenir numérique plus sûr, plus inclusif et plus respectueux des droits des enfants.",
        image: {
          url: "/images/hero/girl-laptop-hero.jpg",
          alt: "Une jeune fille africaine souriante utilisant un ordinateur portable, avec le graphique en forme d'Afrique « African Solutions for Africa's Children » de l'ACOSA",
        },
        cta: { label: "Devenir partenaire", href: "#" },
        ctaStatic: true,
        ctaEmail: "partnership@theacosa.com",
        organizedBy: {
          label: "Organisé par :",
          logo: {
            url: "https://theacosa.com/wp-content/uploads/2025/01/ACOSA-logo-1-4-1.png",
            alt: "Logo ACOSA",
          },
        },
        hostedBy: {
          label: "Hébergé par :",
          logo: { url: "/images/brand/polaris-logo.png", alt: "Logo Polaris Asso" },
        },
      },
      {
        heading: "Champions de la sécurité des enfants",
        subheading: "Une coalition bâtie à travers l'Afrique",
        body: "Fondée en novembre 2024, l'ACOSA réunit la société civile, les gouvernements, les éducateurs et les experts technologiques pour protéger et autonomiser les enfants africains à l'ère numérique.",
        image: {
          url: "https://theacosa.com/wp-content/uploads/2025/01/A01A1395-scaled.jpg",
          alt: "Membres de l'ACOSA lors du sommet fondateur",
        },
        secondaryCta: { label: "Notre histoire", href: "/about-us" },
      },
      {
        heading: "2ᵉ Sommet africain sur la sécurité des enfants en ligne",
        subheading: "",
        body: "",
        image: {
          url: "https://theacosa.com/wp-content/uploads/2025/08/AdobeStock_613510779-1024x682.jpeg",
          alt: "Délégués lors d'un précédent sommet de l'ACOSA",
        },
        imageOnly: true,
      },
    ],
  },
  execSecretary: {
    heading: "Message de la Secrétaire Exécutive",
    body: "Au nom de l'Alliance Africaine pour la Sécurité des Enfants en Ligne (ACOSA), je suis heureuse de vous accueillir sur notre plateforme, un pôle de collaboration, de plaidoyer et d'innovation dédié à la protection du bien-être numérique des enfants à travers l'Afrique. Dans un monde numérique en constante évolution, les enfants naviguent aujourd'hui entre opportunités et risques comme jamais auparavant. À l'ACOSA, nous croyons que chaque enfant africain mérite de pouvoir explorer l'espace numérique en toute sécurité et en toute confiance. Cette mission nous unit en tant que collectif d'organisations partageant les mêmes valeurs à travers le continent, œuvrant ensemble pour doter les enfants, les familles et les communautés des outils, des connaissances et des protections nécessaires pour s'épanouir en ligne.",
    establishedLabel: "Fondée en novembre 2024",
    images: [
      {
        url: "https://theacosa.com/wp-content/uploads/2025/01/IMG-20250129-WA0054-1-1024x1018.jpg",
        alt: "Secrétaire Exécutive de l'ACOSA",
      },
      {
        url: "https://theacosa.com/wp-content/uploads/2025/01/A01A1395-scaled.jpg",
        alt: "L'équipe ACOSA lors du sommet fondateur",
      },
    ],
  },
  whoWeAre: {
    heading: "Champions de la sécurité des enfants",
    body: "L'Alliance Africaine pour la Sécurité des Enfants en Ligne (ACOSA) a été fondée en novembre 2024 sous l'égide du Sommet africain sur la protection des enfants en ligne tenu à Addis-Abeba, en Éthiopie. L'ACOSA est une coalition d'organisations engagées à protéger et à autonomiser les enfants africains à l'ère numérique, réunissant la société civile, les gouvernements, les éducateurs et les experts technologiques.",
    cta: { label: "Lire la suite", href: "/about-us" },
    pillars: [
      { icon: "collaboration", title: "Collaboration", text: "L'ACOSA met en relation des organisations à travers l'Afrique pour partager expertise, ressources et bonnes pratiques afin de lutter contre les risques en ligne." },
      { icon: "advocacy", title: "Plaidoyer", text: "Nous œuvrons à influencer les politiques et pratiques qui privilégient la sécurité des enfants en ligne, en accord avec la vision de l'Union africaine." },
      { icon: "education", title: "Éducation", text: "Grâce à des formations, des ressources et des campagnes de sensibilisation, nous aidons parents, éducateurs et enfants à naviguer en toute sécurité dans le monde numérique." },
      { icon: "research", title: "Recherche & Innovation", text: "L'ACOSA mène des recherches pour répondre aux défis émergents et développe des outils pour des environnements numériques plus sûrs pour les enfants." },
    ],
    members,
  },
  whyAcosa: {
    body: "Avec plus de 60 % de la population africaine âgée de moins de 25 ans, l'espace numérique façonne de plus en plus la vie des enfants et des jeunes. Or, les lacunes en matière de littératie numérique, de politiques de protection et de sensibilisation exposent de nombreux enfants aux risques en ligne. L'ACOSA a été fondée pour combler ces lacunes et créer une plateforme unifiée pour un avenir numérique sûr pour tous les enfants africains.",
    ctaText: "Rejoignez-nous dans notre mission de protéger l'avenir numérique de l'Afrique, un enfant à la fois.",
  },
  aboutTeaser: {
    heading: "À propos de l'ACOSA",
    visionHeading: "Notre vision",
    visionText: "Créer une Afrique où chaque enfant peut explorer et s'épanouir dans le monde numérique en toute sécurité, en toute confiance et sans crainte de préjudice, à l'ère d'une génération autonomisée par la technologie et protégée de ses risques.",
    missionHeading: "Notre mission",
    missionText: "Unir organisations, gouvernements et communautés à travers l'Afrique pour protéger les enfants à l'ère numérique, en promouvant la littératie numérique, en plaidant pour des politiques de protection, et en développant des solutions innovantes.",
    cta: { label: "Lire la suite", href: "/about-us" },
    image: {
      url: "https://theacosa.com/wp-content/uploads/2025/01/aaaaa-1536x1536-1-1.png",
      alt: "Illustration de la mission de l'ACOSA",
    },
  },
  storyTeaser: {
    heading: "Notre histoire",
    subheading: "Protéger les enfants africains en ligne",
    body: "L'ACOSA est née d'une vision collective visant à créer un environnement numérique plus sûr pour les enfants à travers l'Afrique. Notre parcours a débuté lors du Sommet africain sur la protection des enfants en ligne, organisé par le Watoto Watch Network en novembre 2024 à Addis-Abeba, réunissant gouvernements, société civile, éducateurs, décideurs et experts technologiques.",
    cta: { label: "Lire la suite", href: "/about-us" },
  },
  futureCards: {
    heading: "Protéger l'avenir numérique de l'Afrique",
    cards: [
      { icon: "partnership", title: "La force du partenariat", text: "Renforcer la collaboration régionale pour lutter contre les risques en ligne et promouvoir la littératie numérique." },
      { icon: "advocacy", title: "Plaidoyer", text: "Plaider pour des politiques solides de protection des enfants en ligne à travers l'Afrique." },
      { icon: "empowering", title: "Un numérique sûr et autonomisant", text: "Doter parents, éducateurs et enfants des outils et connaissances nécessaires pour naviguer en toute sécurité." },
      { icon: "innovation", title: "Sécurité innovante", text: "Innover face aux défis émergents de la sécurité en ligne, dans le respect de la diversité culturelle de l'Afrique." },
    ],
  },
  testimonials: {
    heading: "Ce que l'on dit de notre travail",
    items: [
      { quote: "L'ACOSA a véritablement changé la vie des enfants et des familles. Leur engagement pour des espaces numériques plus sûrs se reflète dans l'impact de leurs programmes et de leur plaidoyer.", name: "Grace Mensah", role: "Enseignante, Ghana" },
      { quote: "L'ACOSA comble le fossé entre technologie et protection de l'enfance en Afrique. Leur approche des risques émergents et de la collaboration est inspirante.", name: "David Mwangi", role: "Expert en cybersécurité, Kenya" },
      { quote: "Grâce aux formations et ressources de l'ACOSA, je me sens désormais outillée pour accompagner mes enfants dans le monde numérique en toute confiance.", name: "Thandiwe Dlamini", role: "Parent, Nigeria" },
    ],
  },
  blog: {
    heading: "Derniers articles",
    posts: [
      {
        title: "Autonomiser la communauté SEND du Ghana grâce à l'éducation à la sécurité numérique",
        excerpt: "Digital Aid International a organisé sa première formation à la sécurité numérique pour la communauté SEND (besoins éducatifs particuliers) du Ghana.",
        href: "https://theacosa.com/2025/07/10/empowering-ghanas-send-community-through-digital-safety-education/",
        date: "2025-07-10",
        image: { url: "https://theacosa.com/wp-content/uploads/2025/07/college-students-different-ethnicities-cramming_11zon-scaled.jpg", alt: "Étudiants en salle de classe" },
      },
      {
        title: "Pénétration d'Internet au Ghana : où en sommes-nous et quelle suite ?",
        excerpt: "Au cours de la dernière décennie, le Ghana a réalisé des progrès considérables en matière de connectivité Internet.",
        href: "https://theacosa.com/2025/07/10/internet-penetration-in-ghana-where-we-are-and-what-comes-next/",
        date: "2025-07-10",
        image: { url: "https://theacosa.com/wp-content/uploads/2025/07/group-young-african-friends-with-facemasks-using-their-phones-park_11zon-scaled.jpg", alt: "Jeunes amis utilisant leurs téléphones dans un parc" },
      },
      {
        title: "Protéger les enfants d'Afrique en ligne : un focus sur le défi croissant du Ghana",
        excerpt: "À mesure que l'Afrique se connecte davantage, les enfants du continent accèdent aux espaces numériques plus rapidement que jamais.",
        href: "https://theacosa.com/2025/07/10/protecting-africas-children-online-a-spotlight-on-ghanas-growing-challenge/",
        date: "2025-07-10",
        image: { url: "https://theacosa.com/wp-content/uploads/2025/07/full-shot-african-kids-with-laptop_11zon-scaled.jpg", alt: "Enfants africains utilisant un ordinateur portable ensemble" },
      },
    ],
  },
  contactCta: {
    heading: "Contactez-nous",
    subheading: "Envoyer un message",
    tagline: "La meilleure façon de changer la vie des autres",
    cta: { label: "Contactez-nous", href: "/contact" },
  },
};
