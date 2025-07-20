import {Product} from '../domain/models/Product';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    price: 24990,
    images: [
      require('../dls/assets/headphone.jpg'),
      require('../dls/assets/headphone2.jpg'),
    ],
    tags: ['Selling Fast'],
    category: 'Electronics',
    description:
      'Industry-leading noise cancellation headphones with immersive sound.',
    isPopular: true,
  },
  {
    id: 'p2',
    name: 'boAt Rockerz 255 Pro+ Neckband',
    price: 1499,
    images: [
      require('../dls/assets/boat_neckband.jpg'),
      require('../dls/assets/boat_neckband2.jpg'),
    ],
    tags: [],
    category: 'Electronics',
    description:
      'Upto 40 hours of battery life, ASAP charging and sweat resistance.',
  },
  {
    id: 'p3',
    name: 'Philips Air Fryer HD9252/90',
    price: 7990,
    images: [
      require('../dls/assets/airFry.jpg'),
      require('../dls/assets/airFry2.jpg'),
    ],
    tags: ['Crazy Deal'],
    category: 'Appliances',
    description:
      'Rapid air technology air fryer with touch panel and 1400W power.',
    isPopular: true,
  },
  {
    id: 'p4',
    name: 'Prestige Electric Kettle 1.5L',
    price: 1399,
    images: [
      require('../dls/assets/prestige_kettle.jpg'),
      require('../dls/assets/prestige_kettle2.jpg'),
    ],
    tags: [],
    category: 'Appliances',
    description:
      'Durable stainless steel kettle with auto shut-off and water level indicator.',
  },
  {
    id: 'p5',
    name: 'Haldiram’s Bhujia Sev',
    price: 80,
    images: [
      require('../dls/assets/bhujia.jpg'),
      require('../dls/assets/bhujia2.jpg'),
    ],
    tags: [],
    category: 'Food',
    description: 'Crispy and spicy snack perfect for tea time or quick munch.',
    isPopular: true,
  },
  {
    id: 'p6',
    name: 'Kellogg’s Corn Flakes Original',
    price: 165,
    images: [
      require('../dls/assets/cornFlakes.jpg'),
      require('../dls/assets/corn_flakes2.jpg'),
    ],
    tags: ['Only 2 Left'],
    category: 'Food',
    description: 'High-quality breakfast cereal made from golden corn.',
    isPopular: true,
  },
];
