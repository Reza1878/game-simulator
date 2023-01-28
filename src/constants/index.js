import {
  ROUTE_DISCLAIMER,
  ROUTE_EULA,
  ROUTE_PRIVACY,
  ROUTE_REFUND_POLICY,
  ROUTE_TERMS_AND_SERVICE,
} from "@/config/routes";
import {
  people01,
  people02,
  people03,
  facebook,
  send,
  shield,
  star,
  text,
  client1,
  sltool,
  pencil,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    href: "/",
  },
  {
    id: "pricing",
    title: "Pricings",
    href: "/pricing",
  },
];

export const features = [
  // {
  //   id: "feature-1",
  //   icon: star,
  //   title: "Heatmap",
  //   content:
  //     "Upgrading yourself by watching how a good player move in game and how you move in game",
  // },
  {
    id: "feature-1",
    icon: sltool,
    title: "Still Developing",
    content:
      "We are only in the soft launch phase! if this is useful for you after using multiple times, do help to support our service by donating!",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Draft Simulator",
    content:
      "Not sure about how the opponent might likely draft ? Use this feature and get into some scenarios with your teammates!",
  },
  {
    id: "feature-3",
    icon: pencil,
    title: "Map Drawing",
    content:
      "Have to discuss but due to language barrier or online environment unable to ? Use this feature and get into understanding with your team!",
  },
];

export const TestimonialsData = [
  {
    image: people01,
    comment: "Sentence 1 that needs to be long long hehe",
    name: "Pro Player 1 from Team XXX",
  },
  {
    image: people02,
    comment: "Sentence 2",
    name: "Pro Player 2 from Team XXX",
  },
  {
    image: people03,
    comment: "Sentence 3",
    name: "Pro Player 3 from Team XXX",
  },
  {
    image: people01,
    comment: "Sentence 4 that needs to be long long long",
    name: "Pro Player 4 from Team XXX",
  },
  {
    image: people02,
    comment: "Sentence 5",
    name: "Pro Player 5 from Team XXX",
  },
  {
    image: people03,
    comment: "Sentence 6",
    name: "Pro Player 6 from Team XXX",
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Create by gamer",
    value: "✔",
  },
  {
    id: "stats-2",
    title: "Use by gamer",
    value: "✔",
  },
  {
    id: "stats-3",
    title: "Think for gamer",
    value: "✔",
  },
];

export const footerLinks = [
  {
    title: "Community",
    links: [
      {
        name: "Be our partner",
        link: "https://www.effeg.com/be-our-partner/",
      },
      {
        name: "Facebook",
        link: "https://www.facebook.com/effeg.gg",
      },
      {
        name: "Suggestions",
        link: "https://www.effeg.com/suggestions/",
      },
    ],
  },
  {
    title: "Useful Links",
    links: [
      {
        name: "EULA",
        link: "https://www.effeg.com/EULA/",
        route: ROUTE_EULA,
      },
      {
        name: "Refund Policy",
        link: "https://www.effeg.com/refundpolicy/",
        route: ROUTE_REFUND_POLICY,
      },
      {
        name: "Terms & Services",
        link: "https://www.effeg.com/terms-and-services/",
        route: ROUTE_TERMS_AND_SERVICE,
      },
    ],
  },
  {
    title: "More Useful Links",
    links: [
      {
        name: "Privacy",
        link: "https://www.effeg.com/privacy/",
        route: ROUTE_PRIVACY,
      },
      {
        name: "Disclaimer",
        link: "https://www.effeg.gg/disclaimer/",
        route: ROUTE_DISCLAIMER,
      },
    ],
  },
];

export const socialMedia = [
  // {
  //   id: "social-media-1",
  //   icon: instagram,
  //   link: "https://www.instagram.com/",
  // },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/effeg.gg",
  },
  // {
  //   id: "social-media-3",
  //   icon: twitter,
  //   link: "https://www.twitter.com/",
  // },
];

export const clients = [
  {
    id: "client-1",
    logo: client1,
  },
  {
    id: "client-2",
    logo: text,
  },
  {
    id: "client-3",
    logo: text,
  },
  {
    id: "client-4",
    logo: text,
  },
];
