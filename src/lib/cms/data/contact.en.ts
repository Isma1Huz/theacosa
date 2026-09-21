import type { ContactPage } from "../types";

export const contactEn: ContactPage = {
  heading: "Contact",
  subheading: "Get in touch",
  intro: "We'd love to hear from you! Whether you have questions, feedback, or simply want to connect, our team is here to assist you. Feel free to reach out through any of the following channels:",
  methods: {
    callLabel: "Call us",
    phone: "+254 701 077955",
    emailLabel: "Email us",
    email: "info@theacosa.com",
    addressLabel: "Visit us",
    address: "The ACOSA Secretariat, Ngong Hills Business Center, P.O Box 535-00517, Nairobi, Kenya",
  },
  map: {
    // Approximate coordinates for Ngong Road / Nairobi — swap for the exact
    // Ngong Hills Business Center pin once the client confirms it.
    lat: -1.3011,
    lng: 36.7789,
    zoom: 14,
    label: "ACOSA Secretariat, Nairobi",
  },
  formHeading: "Send message",
};
