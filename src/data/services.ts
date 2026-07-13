export interface Service {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
}

export const services: Service[] = [
  {
    id: 'wifi',
    name: { en: 'Free Wi-Fi', es: 'Wi-Fi Gratuito' },
    description: { en: 'High-speed internet throughout the hotel', es: 'Internet de alta velocidad en todo el hotel' },
    icon: 'wifi',
  },
  {
    id: 'breakfast',
    name: { en: 'Breakfast Buffet', es: 'Desayuno Buffet' },
    description: { en: 'Andean and international breakfast daily (6:00 am - 9:00 am)', es: 'Desayuno andino e internacional diario (6:00 am - 9:00 am)' },
    icon: 'breakfast',
  },
  {
    id: 'hot-water',
    name: { en: 'Hot Water 24h', es: 'Agua Caliente 24h' },
    description: { en: 'Hot water available around the clock', es: 'Agua caliente disponible las 24 horas' },
    icon: 'hot-water',
  },
  {
    id: 'heating',
    name: { en: 'Heating', es: 'Calefacción' },
    description: { en: 'Central heating for cold Andean nights', es: 'Calefacción para las frías noches andinas' },
    icon: 'heating',
  },
  {
    id: 'tv',
    name: { en: 'Cable TV', es: 'TV Cable' },
    description: { en: 'Flat-screen TV with cable channels in room', es: 'TV pantalla plana con canales por cable en habitación' },
    icon: 'tv',
  },
  {
    id: 'laundry',
    name: { en: 'Laundry Service', es: 'Servicio de Lavandería' },
    description: { en: 'Same-day laundry and dry cleaning (additional cost)', es: 'Lavandería y limpieza en seco el mismo día (costo adicional)' },
    icon: 'laundry',
  },
  {
    id: 'transfer',
    name: { en: 'Airport Transfer', es: 'Servicio de Traslado' },
    description: { en: 'Comfortable pickup from airport or train station (additional cost)', es: 'Recogida cómoda desde aeropuerto o estación (costo adicional)' },
    icon: 'transfer',
  },
  {
    id: 'tours',
    name: { en: 'Tours & Excursions', es: 'Tours y Excursiones' },
    description: { en: 'Guided tours to Machu Picchu, Sacred Valley, and Cusco city', es: 'Tours guiados a Machu Picchu, Valle Sagrado y Cusco' },
    icon: 'tours',
  },
  {
    id: 'restaurant',
    name: { en: 'Cafetería & Restaurant', es: 'Cafetería y Restaurante' },
    description: { en: 'Delicious local dining and hot beverages (open until 22:00 hrs)', es: 'Deliciosa comida local y bebidas calientes (abierto hasta las 22:00 hrs)' },
    icon: 'restaurant',
  },
  {
    id: 'spa',
    name: { en: 'Spa & Massages', es: 'Spa y Masajes' },
    description: { en: 'Relax with traditional Andean massage therapies', es: 'Relájate con terapias de masaje andino tradicional' },
    icon: 'spa',
  },
  {
    id: 'parking',
    name: { en: 'Parking', es: 'Estacionamiento' },
    description: { en: 'Free private parking on premises', es: 'Estacionamiento privado gratuito en el establecimiento' },
    icon: 'parking',
  },
  {
    id: 'oxigeno',
    name: { en: 'Complimentary Oxygen', es: 'Oxígeno de Cortesía' },
    description: { en: 'Oxygen cylinders available for altitude sickness acclimatization', es: 'Tanques de oxígeno disponibles para aclimatación al mal de altura' },
    icon: 'oxigeno',
  },
  {
    id: 'bebidas-calientes',
    name: { en: 'Hot Drinks Station', es: 'Estación de Bebidas Calientes' },
    description: { en: 'Complimentary traditional mates, coca tea, and coffee in lobby', es: 'Mates tradicionales, té de coca y café de cortesía en la recepción' },
    icon: 'bebidas-calientes',
  },
  {
    id: 'souvenirs',
    name: { en: 'Souvenir Shop', es: 'Tienda de Souvenirs' },
    description: { en: 'Local crafts and hand-made Andean gifts on site', es: 'Artesanías locales y regalos andinos hechos a mano en el hotel' },
    icon: 'souvenirs',
  },
  {
    id: 'no-fumadores',
    name: { en: 'Non-Smoking Rooms', es: 'Habitaciones No Fumadores' },
    description: { en: '100% smoke-free environments for healthy breathing', es: 'Ambientes 100% libres de humo para una respiración saludable' },
    icon: 'no-fumadores',
  },
  {
    id: 'custodia-maletas',
    name: { en: 'Luggage Storage', es: 'Custodia de Maletas' },
    description: { en: 'Free safe storage for your bags while you visit ruins', es: 'Custodia segura y gratuita de equipaje mientras visitas las ruinas' },
    icon: 'custodia-maletas',
  },
  {
    id: 'recepcion-24h',
    name: { en: '24h Reception', es: 'Recepción 24 Horas' },
    description: { en: 'Always available to assist with your needs and check-in', es: 'Siempre disponibles para asistirte con tus necesidades e ingresos' },
    icon: 'recepcion-24h',
  },
  {
    id: 'bilingue',
    name: { en: 'Bilingual Staff', es: 'Personal Bilingüe' },
    description: { en: 'Warm hospitality from our English and Spanish speaking team', es: 'Cálida hospitalidad de nuestro equipo que habla inglés y español' },
    icon: 'bilingue',
  },
  {
    id: 'info-turistica',
    name: { en: 'Tourist Information', es: 'Información Turística' },
    description: { en: 'Maps, advice, and tips to explore Cusco like a local', es: 'Mapas, consejos y recomendaciones para explorar Cusco' },
    icon: 'info-turistica',
  },
  {
    id: 'limpieza',
    name: { en: 'Daily Cleaning', es: 'Servicio de Limpieza Diario' },
    description: { en: 'Attentive daily housekeeping in all rooms', es: 'Servicio de limpieza diario y atento en todas las habitaciones' },
    icon: 'limpieza',
  },
  {
    id: 'cambio-moneda',
    name: { en: 'Currency Exchange', es: 'Cambio de Moneda' },
    description: { en: 'Exchange dollars and soles easily at the reception', es: 'Cambia dólares y soles de forma fácil en recepción' },
    icon: 'cambio-moneda',
  }
];
