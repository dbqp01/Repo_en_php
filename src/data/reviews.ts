import type { Locale } from '../i18n/utils';

export interface Review {
  id: number;
  name: string;
  country: string;
  rating: number;
  text: { en: string; es: string };
  date: { en: string; es: string };
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    country: '🇺🇸',
    rating: 5,
    text: {
      en: 'Absolutely magical! The murals and Andean decor made us feel immersed in local culture. Breakfast was incredible and the staff went above and beyond.',
      es: '¡Absolutamente mágico! Los murales y la decoración andina nos hicieron sentir sumergidos en la cultura local. El desayuno fue increíble y el personal fue excepcional.',
    },
    date: { en: 'March 2025', es: 'Marzo 2025' },
  },
  {
    id: 2,
    name: 'Thomas K.',
    country: '🇩🇪',
    rating: 5,
    text: {
      en: 'Perfect location near San Pedro Market. The rooms are warm and cozy — essential for cold Cusco nights. Will definitely return!',
      es: 'Ubicación perfecta cerca del Mercado de San Pedro. Las habitaciones son cálidas y acogedoras, algo esencial para las frías noches de Cusco. ¡Definitivamente volveré!',
    },
    date: { en: 'February 2025', es: 'Febrero 2025' },
  },
  {
    id: 3,
    name: 'Ana L.',
    country: '🇧🇷',
    rating: 5,
    text: {
      en: 'The airport transfer service was a lifesaver. Hotel is charming, clean, and the staff speaks English fluently. Great value for money.',
      es: 'El servicio de traslado al aeropuerto fue un salvavidas. El hotel es encantador, limpio y el personal habla inglés con fluidez. Gran relación calidad-precio.',
    },
    date: { en: 'January 2025', es: 'Enero 2025' },
  },
  {
    id: 4,
    name: 'James P.',
    country: '🇬🇧',
    rating: 4,
    text: {
      en: 'Lovely boutique hotel with character. The spa massage after a long day of hiking was exactly what we needed. Highly recommended!',
      es: 'Hermoso hotel boutique con carácter. El masaje de spa después de un largo día de caminata fue exactamente lo que necesitábamos. ¡Altamente recomendado!',
    },
    date: { en: 'December 2024', es: 'Diciembre 2024' },
  },
  {
    id: 5,
    name: 'Yuki T.',
    country: '🇯🇵',
    rating: 5,
    text: {
      en: 'Beautiful hotel with authentic Cusco charm. They helped us arrange our Machu Picchu tour and it was seamless. The breakfast is fresh and delicious.',
      es: 'Hermoso hotel con encanto auténtico de Cusco. Nos ayudaron a organizar nuestro tour a Machu Picchu y todo fue perfecto. El desayuno es fresco y delicioso.',
    },
    date: { en: 'November 2024', es: 'Noviembre 2024' },
  },
  {
    id: 6,
    name: 'Elena R.',
    country: '🇪🇸',
    rating: 5,
    text: {
      en: 'A beautiful hidden gem in Cusco. Excellent service, hot water 24h, and heaters that work perfectly. Super close to the historic market.',
      es: 'Una hermosa joya escondida en Cusco. Excelente servicio, agua caliente las 24 horas y calefacción que funciona a la perfección. Muy cerca del mercado histórico.',
    },
    date: { en: 'October 2024', es: 'Octubre 2024' },
  },
  {
    id: 7,
    name: 'Mark B.',
    country: '🇨🇦',
    rating: 5,
    text: {
      en: 'Very clean rooms, comfortable beds, and a delicious breakfast buffet. The staff helped us book a safe taxi from the airport. Highly recommended!',
      es: 'Habitaciones muy limpias, camas cómodas y un delicioso desayuno buffet. El personal nos ayudó a reservar un taxi seguro desde el aeropuerto. ¡Muy recomendado!',
    },
    date: { en: 'September 2024', es: 'Septiembre 2024' },
  },
  {
    id: 8,
    name: 'Sophie D.',
    country: '🇫🇷',
    rating: 5,
    text: {
      en: 'Outstanding boutique hotel! Hand-painted murals in the room are stunning. Having heaters was amazing for cold nights. 10/10 experience!',
      es: '¡Destacado hotel boutique! Los murales pintados a mano en la habitación son impresionantes. Tener calefacción fue increíble para las noches frías. ¡Experiencia 10/10!',
    },
    date: { en: 'August 2024', es: 'Agosto 2024' },
  },
];
