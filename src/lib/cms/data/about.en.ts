import type { AboutPage } from "../types";
import { members } from "./members";

export const aboutEn: AboutPage = {
  intro: {
    heading: "About Us",
    missionHeading: "Our mission",
    missionText: "To unite organizations, governments, and communities across Africa to safeguard children in the digital age by promoting digital literacy, advocating for protective policies, fostering collaboration, and developing innovative solutions to address online risks and opportunities.",
    visionHeading: "Our vision",
    visionText: "To create an Africa where every child can explore and thrive in the digital world safely, confidently, and without fear of harm, fostering a generation empowered by technology and shielded from its risks.",
    image: {
      url: "https://theacosa.com/wp-content/uploads/2025/01/IMG-20241124-WA0020-1024x768.jpg",
      alt: "ACOSA members at a summit session",
    },
  },
  story: {
    heading: "Our Story",
    subheading: "Protecting African children online",
    body: "The African Child Online Safety Alliance (ACOSA) was born out of a collective vision to create a safer digital environment for children across Africa. As internet access expands across the continent, African children are increasingly engaging with digital spaces, bringing both opportunities for growth and exposure to significant online risks. Our journey began at the Africa Child Online Protection Summit, organized by the Watoto Watch Network in November 2024 in Addis Ababa, Ethiopia. This landmark event brought together stakeholders from across Africa (governments, civil society organizations, educators, policymakers, and technology experts) to assess the state of child online protection and explore collaborative solutions tailored to the continent's diverse contexts. The summit examined child protection initiatives in Kenya, Namibia, Tanzania, Cameroon, Mauritius, South Africa, Ghana, and Nigeria, revealing that coordinated regional action was needed to address cyberbullying, sextortion, and exploitation.",
    memberCountries: ["Kenya", "Namibia", "Tanzania", "Cameroon", "Mauritius", "Ghana", "South Africa", "Senegal", "Ethiopia", "Nigeria"],
    members,
    pillars: [
      { icon: "partnership", title: "Strength in Partnership", text: "Strengthening regional collaboration to combat online risks and promote digital literacy." },
      { icon: "advocacy", title: "Advocating", text: "Advocating for robust child online protection policies across Africa." },
      { icon: "empowering", title: "Empowering Safe Digital", text: "Empowering parents, educators, and children with tools and knowledge to navigate the digital world safely." },
      { icon: "innovation", title: "Innovative Safety", text: "Innovating solutions to emerging online safety challenges while respecting Africa's cultural diversity." },
    ],
    cta: { label: "Get involved", href: "/contact" },
  },
  whoWeAre: {
    heading: "Champions of Child Safety",
    body: "ACOSA was established in November 2024 under the auspices of the Africa Child Online Protection Summit held in Addis Ababa, Ethiopia. ACOSA functions as a coalition of organizations committed to protecting and empowering African children in the digital age, uniting civil society, governments, educators, and technology experts to foster collaboration, amplify advocacy efforts, and deliver innovative solutions tailored to Africa's unique challenges.",
    image: {
      url: "https://theacosa.com/wp-content/uploads/2025/01/A01A1395-scaled.jpg",
      alt: "ACOSA team",
    },
    pillars: [
      { icon: "collaboration", title: "Collaboration", text: "ACOSA connects organizations across Africa to share expertise, resources, and best practices to combat online risks." },
      { icon: "advocacy", title: "Advocacy", text: "We work to influence policies and practices that prioritize child online safety and align with the African Union's vision for child protection." },
      { icon: "education", title: "Education", text: "By providing training, resources, and awareness campaigns, we empower parents, educators, and children to navigate the digital world securely." },
      { icon: "research", title: "Research & Innovation", text: "ACOSA conducts research to address emerging challenges and develops tools to create safer digital environments for children." },
    ],
    whyBody: "With over 60% of Africa's population under 25 years old, the digital space is increasingly shaping the lives of children and young people. However, gaps in digital literacy, limited protective policies, and lack of awareness leave many children vulnerable to online harm. ACOSA was founded to bridge these gaps and create a unified platform for tackling online risks, ensuring a secure digital future for all African children.",
  },
  coreValues: {
    heading: "Vision, Mission & Core Values",
    values: [
      { title: "Child-centered empowerment", text: "Every decision we make starts with what's best for the child." },
      { title: "Collaborative action", text: "We achieve more together than any single organization can achieve alone." },
      { title: "Innovation", text: "We invest in new tools and approaches to meet emerging digital risks." },
      { title: "Integrity and inclusivity", text: "We act transparently and ensure every voice across Africa's diverse communities is heard." },
    ],
    image: {
      url: "https://theacosa.com/wp-content/uploads/2025/01/front-view-father-kids-home-1024x683.jpg",
      alt: "A father with his children at home",
    },
  },
};
