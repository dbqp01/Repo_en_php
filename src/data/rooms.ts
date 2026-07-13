export interface Room {
  id: string;
  slug: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  maxGuests: number;
  beds: string;
  pricePerNight: number;
  amenities: string[];
  photoCount: number;
  hasVideoTour: boolean;
  photoFolder: string;
}

export const rooms: Room[] = [
  {
    id: 'doble-superior',
    slug: 'doble-superior',
    name: { en: 'Double Superior Room', es: 'Habitación Doble Superior' },
    description: {
      en: 'Spacious room with two comfortable double beds with warm ambient lighting. Perfect for friends or colleagues traveling together.',
      es: 'Amplia habitación con dos cómodas camas dobles con cálida iluminación ambiental. Perfecta para amigos o colegas viajando juntos.'
    },
    maxGuests: 2,
    beds: '2 double beds',
    pricePerNight: 90,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 4,
    hasVideoTour: true,
    photoFolder: 'doble-superior',
  },
  {
    id: 'matrimonial',
    slug: 'matrimonial',
    name: { en: 'Superior Matrimonial Room', es: 'Habitación Matrimonial Superior' },
    description: {
      en: 'Romantic retreat featuring a king-size bed, artisan textiles, and a cozy atmosphere. Ideal for couples exploring the wonders of Cusco.',
      es: 'Refugio romántico con cama king-size, textiles artesanales y atmósfera acogedora. Ideal para parejas explorando las maravillas de Cusco.'
    },
    maxGuests: 2,
    beds: '1 king bed',
    pricePerNight: 90,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 4,
    hasVideoTour: true,
    photoFolder: 'matrimonial',
  },
  {
    id: 'familiar-superior',
    slug: 'familiar-superior',
    name: { en: 'Family Superior Room', es: 'Habitación Familiar Superior' },
    description: {
      en: 'Our most spacious room, designed for families or a group of friends. Features 3 double beds and one single bed, with room for everyone to relax after a day of adventures.',
      es: 'Nuestra habitación más amplia, diseñada para familias o grupo de amigos. Cuenta con 3 camas dobles y una individual, espacio para todos después de un día de aventuras.'
    },
    maxGuests: 7,
    beds: '3 double beds + 1 single bed',
    pricePerNight: 150,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv', 'laundry'],
    photoCount: 0,
    hasVideoTour: true,
    photoFolder: 'familiar-superior',
  },
  {
    id: 'triple-standar',
    slug: 'triple-standar',
    name: { en: 'Triple Standard Room', es: 'Habitación Triple Estándar' },
    description: {
      en: 'Comfortable and practical room with three single beds. Great value for small groups wanting to explore Cusco on a budget.',
      es: 'Habitación cómoda y práctica con tres camas individuales. Excelente valor para grupos pequeños que exploran Cusco.'
    },
    maxGuests: 3,
    beds: '3 single beds',
    pricePerNight: 120,
    amenities: ['wifi', 'breakfast', 'hot-water', 'heating', 'tv'],
    photoCount: 0,
    hasVideoTour: true,
    photoFolder: 'triple-standar',
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find(r => r.slug === slug);
}
