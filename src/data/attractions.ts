export interface Attraction {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  distance: string;
  travelTime: string;
  category: 'historical' | 'nature' | 'cultural' | 'adventure';
  history: { en: string; es: string };
  howToGet: { en: string; es: string };
  tips: { en: string[]; es: string[] };
  bestTime: { en: string; es: string };
}

export const attractions: Attraction[] = [
  {
    id: 'machu-picchu',
    name: { en: 'Machu Picchu', es: 'Machu Picchu' },
    description: {
      en: 'The iconic Inca citadel and UNESCO World Heritage Site. One of the New Seven Wonders of the World.',
      es: 'La icónica ciudadela inca y Patrimonio de la Humanidad. Una de las Nuevas Siete Maravillas del Mundo.'
    },
    distance: '112 km',
    travelTime: '4h by train',
    category: 'historical',
    history: {
      en: 'Built in the 15th century by Inca Emperor Pachacuti, Machu Picchu was an elite mountain retreat. Abandoned during the Spanish conquest, it remained hidden from the outside world until Hiram Bingham publicised it in 1911.',
      es: 'Construida en el siglo XV por el emperador inca Pachacútec, Machu Picchu fue un santuario de montaña de la élite. Abandonada durante la conquista, permaneció oculta hasta que Hiram Bingham la dio a conocer al mundo en 1911.'
    },
    howToGet: {
      en: 'Take a train from Cusco or Ollantaytambo station to Aguas Calientes (Machu Picchu Pueblo), then ride the official Consettur bus up to the archaeological park entrance.',
      es: 'Toma un tren desde la estación de Cusco u Ollantaytambo hacia Aguas Calientes (Machu Picchu Pueblo), y luego aborda el bus oficial de Consettur hasta la entrada del parque arqueológico.'
    },
    tips: {
      en: [
        'Book your entrance tickets and train tickets at least 2-3 months in advance.',
        'Bring your original passport; you cannot enter without it.',
        'Hire a certified guide at the entrance to fully appreciate the rich history and architecture.'
      ],
      es: [
        'Reserva tus entradas y pasajes de tren con al menos 2 o 3 meses de anticipación.',
        'Lleva tu pasaporte o documento de identidad original; es obligatorio para ingresar.',
        'Contrata un guía certificado en la entrada para apreciar la rica historia y arquitectura.'
      ]
    },
    bestTime: {
      en: 'May to September (Dry season, clear skies)',
      es: 'Mayo a Septiembre (Temporada seca, cielos despejados)'
    }
  },
  {
    id: 'sacred-valley',
    name: { en: 'Sacred Valley', es: 'Valle Sagrado' },
    description: {
      en: 'Stunning valley with ancient Inca ruins, colorful markets, and breathtaking landscapes.',
      es: 'Impresionante valle con ruinas incas, mercados coloridos y paisajes espectaculares.'
    },
    distance: '30 km',
    travelTime: '1h by car',
    category: 'nature',
    history: {
      en: 'The Sacred Valley was the agricultural heartland of the Inca Empire due to its fertile soil and warm microclimate. It contains major archaeological sites like Pisac, Ollantaytambo, and Chinchero.',
      es: 'El Valle Sagrado fue el centro agrícola del Imperio Inca debido a sus tierras fértiles y microclima templado. Alberga grandes complejos arqueológicos como Písac, Ollantaytambo y Chinchero.'
    },
    howToGet: {
      en: 'Hire a private driver, join an organized day tour starting from Cusco, or take local colectivos heading to Urubamba or Pisac.',
      es: 'Contrata un conductor privado, únete a un tour organizado desde Cusco, o toma los colectivos locales que van hacia Urubamba o Písac.'
    },
    tips: {
      en: [
        'Buy the Cusco Tourist Ticket (Boleto Turístico) which includes admission to most sites.',
        'Visit the artisan market of Pisac on Sunday for the most authentic experience.',
        'Stay hydrated as the valley altitude is slightly lower than Cusco, making it great for acclimation.'
      ],
      es: [
        'Compra el Boleto Turístico de Cusco, que incluye el ingreso a la mayoría de los sitios del valle.',
        'Visita el mercado artesanal de Písac el domingo para disfrutar de la experiencia más auténtica.',
        'Mantente hidratado; la menor altitud del valle lo hace ideal para aclimatarse los primeros días.'
      ]
    },
    bestTime: {
      en: 'April to October',
      es: 'Abril a Octubre'
    }
  },
  {
    id: 'sacsayhuaman',
    name: { en: 'Sacsayhuamán', es: 'Sacsayhuamán' },
    description: {
      en: 'Massive Inca fortress with perfectly fitted stone walls, overlooking Cusco.',
      es: 'Fortaleza inca masiva con muros de piedra perfectamente ensamblados, con vista a Cusco.'
    },
    distance: '2 km',
    travelTime: '10min by car',
    category: 'historical',
    history: {
      en: 'Constructed during the reign of Pachacuti and completed in the early 16th century, Sacsayhuamán was a military stronghold and temple complex. Its massive zig-zag walls are made of megalithic stones weighing up to 125 tons.',
      es: 'Construido durante el reinado de Pachacútec y terminado a principios del siglo XVI, Sacsayhuamán fue una fortaleza militar y templo. Sus enormes muros en zig-zag tienen piedras megalíticas de hasta 125 toneladas.'
    },
    howToGet: {
      en: 'You can walk uphill from Plaza de Armas (~25-30 minutes, steep stairs) or take a quick taxi ride from the hotel lobby.',
      es: 'Puedes subir caminando desde la Plaza de Armas (~25-30 minutos por gradas empinadas) o tomar un taxi rápido desde el hotel.'
    },
    tips: {
      en: [
        'Visit early in the morning to beat the tourist crowds and capture beautiful soft light.',
        'Walk up slowly to avoid altitude sickness (soroche).',
        'Look out for llamas grazing freely inside the ruins area.'
      ],
      es: [
        'Visita temprano por la mañana para evitar multitudes y tomar fotos con luz suave.',
        'Sube caminando despacio para prevenir el mal de altura (soroche).',
        'Busca las llamas que pastan libremente dentro del complejo arqueológico.'
      ]
    },
    bestTime: {
      en: 'Year-round, mornings are preferred',
      es: 'Todo el año, preferiblemente por las mañanas'
    }
  },
  {
    id: 'rainbow-mountain',
    name: { en: 'Rainbow Mountain', es: 'Montaña de 7 Colores' },
    description: {
      en: 'Vinicunca, the stunning Rainbow Mountain with layers of colorful minerals at 5,200m altitude.',
      es: 'Vinicunca, la impresionante Montaña Arcoíris con capas de minerales coloridos a 5,200m de altitud.'
    },
    distance: '100 km',
    travelTime: '3h by car',
    category: 'adventure',
    history: {
      en: 'Known locally as Vinicunca, this geological marvel was uncovered in recent years due to climate changes melting the snow cover, revealing stunning turquoise, golden yellow, and deep red mineral stripes.',
      es: 'Conocida localmente como Vinicunca, esta maravilla geológica quedó expuesta en años recientes al derretirse la capa de nieve debido al cambio climático, revelando franjas minerales rojas, doradas y turquesas.'
    },
    howToGet: {
      en: 'Book a full-day guided excursion from Cusco. Tours depart very early (~4:00 AM) and include breakfast, transport, and a guide.',
      es: 'Reserva una excursión guiada de día completo desde Cusco. Los tours parten muy temprano (~4:00 AM) e incluyen transporte, guía y desayuno.'
    },
    tips: {
      en: [
        'Only attempt this after at least 2 days of acclimatization in Cusco.',
        'Dress in warm layers, as temperatures at 5,200m can drop below freezing.',
        'Horses are available to rent from local villagers if the steep trek becomes too demanding.'
      ],
      es: [
        'Intenta realizar esta caminata solo tras aclimatarte al menos 2 días en Cusco.',
        'Vístete con varias capas abrigadoras, ya que las temperaturas a 5,200m pueden ser gélidas.',
        'Es posible alquilar caballos a los comuneros locales si la caminata empinada se vuelve muy dura.'
      ]
    },
    bestTime: {
      en: 'May to September',
      es: 'Mayo a Septiembre'
    }
  },
  {
    id: 'san-pedro-market',
    name: { en: 'San Pedro Market', es: 'Mercado de San Pedro' },
    description: {
      en: 'The vibrant central market of Cusco — fresh juices, local food, textiles, and souvenirs.',
      es: 'El vibrante mercado central de Cusco — jugos frescos, comida local, textiles y souvenirs.'
    },
    distance: '0.5 km',
    travelTime: '5min walk',
    category: 'cultural',
    history: {
      en: 'Designed by Gustave Eiffel and opened in 1925, San Pedro Market is Cusco’s oldest and most active municipal market. It serves as a bustling hub where locals buy daily groceries and tourists shop for souvenirs.',
      es: 'Diseñado por Gustave Eiffel e inaugurado en 1925, el Mercado de San Pedro es el centro de abastos más antiguo y activo de Cusco. Es el punto de encuentro donde los locales compran y los turistas buscan artesanías.'
    },
    howToGet: {
      en: 'Located steps away from USGAR Hotels. Turn left out of the hotel main door and walk straight down San Pedro street.',
      es: 'Ubicado a unos pasos de USGAR Hotels. Gira a la izquierda al salir del hotel y camina en línea recta por la calle San Pedro.'
    },
    tips: {
      en: [
        'Try a freshly made fruit juice at the juice section; point to the ingredients you want.',
        'Be mindful of your personal belongings as the market gets very crowded.',
        'Sample Cusco traditional foods like "Lomo Saltado" or "caldo de gallina" in the dining section.'
      ],
      es: [
        'Prueba un jugo de frutas recién hecho en la sección de jugos; señala los ingredientes que te gusten.',
        'Ten cuidado con tus pertenencias personales ya que el mercado suele estar muy lleno.',
        'Prueba platos tradicionales cusqueños como Lomo Saltado o caldo de gallina en la sección de comidas.'
      ]
    },
    bestTime: {
      en: 'Mornings (8:00 AM to 12:00 PM)',
      es: 'Mañanas (8:00 AM a 12:00 PM)'
    }
  },
  {
    id: 'plaza-de-armas',
    name: { en: 'Plaza de Armas', es: 'Plaza de Armas' },
    description: {
      en: 'The historic main square of Cusco, surrounded by colonial architecture and the Cathedral.',
      es: 'La histórica plaza principal de Cusco, rodeada de arquitectura colonial y la Catedral.'
    },
    distance: '1 km',
    travelTime: '10min walk',
    category: 'cultural',
    history: {
      en: 'During the Inca Empire, this square was known as "Huacaypata" (the place of weeping/celebration) and was double its current size. It was the administrative and ceremonial center of Tahuantinsuyo.',
      es: 'Durante el incanato, esta plaza se llamaba "Huacaypata" (lugar de llanto o júbilo) y tenía el doble de su tamaño actual. Era el centro ceremonial y administrativo del Tahuantinsuyo.'
    },
    howToGet: {
      en: 'Walk straight up Calle Santa Clara from the hotel, continue past Plaza San Francisco and onto Calle Portal Nuevo.',
      es: 'Camina directo por la calle Santa Clara desde el hotel, pasa por la Plaza San Francisco y continúa por la calle Portal Nuevo.'
    },
    tips: {
      en: [
        'Visit at sunset to watch the plaza lights turn on against the dark blue sky.',
        'Beware of street vendors who can be quite persistent.',
        'Enjoy a cup of local coffee in one of the second-story balconies overlooking the square.'
      ],
      es: [
        'Visítala al atardecer para ver cómo se encienden las luces de la plaza contra el cielo nocturno.',
        'Ten paciencia con los vendedores ambulantes que pueden ser bastante persistentes.',
        'Disfruta de una taza de café cusqueño en uno de los balcones del segundo piso con vista a la plaza.'
      ]
    },
    bestTime: {
      en: 'Late afternoon and evening',
      es: 'Tarde y noche'
    }
  },
  {
    id: 'qorikancha',
    name: { en: 'Qorikancha (Temple of the Sun)', es: 'Qorikancha (Templo del Sol)' },
    description: {
      en: 'The most sacred temple of the Inca Empire, later topped by the Spanish Convent of Santo Domingo.',
      es: 'El templo más sagrado del Imperio Inca, sobre el cual se construyó el Convento de Santo Domingo.'
    },
    distance: '1.2 km',
    travelTime: '12min walk',
    category: 'historical',
    history: {
      en: 'Qorikancha (literally "Golden Courtyard") was the spiritual center of the Inca Empire, dedicated to Inti, the Sun God. Its walls were once covered in gold leaf. In the 16th century, Spanish conquerors erected the Santo Domingo Church on top of its foundations.',
      es: 'Qorikancha (que significa "Templo Dorado") fue el centro religioso del Imperio Inca, dedicado a Inti, el Dios Sol. Sus muros estuvieron cubiertos de oro. En el siglo XVI, los españoles edificaron el templo de Santo Domingo sobre sus cimientos.'
    },
    howToGet: {
      en: 'Walk from the hotel towards the Plaza de Armas, then walk down the historic Calle Loreto (famous for its perfect Inca stone walls) directly to Avenida El Sol.',
      es: 'Camina desde el hotel hacia la Plaza de Armas, luego desciende por la histórica calle Loreto (famosa por sus muros incas perfectos) directo hacia la Avenida El Sol.'
    },
    tips: {
      en: [
        'Look for the perfectly smoothed curved stone wall, which survived major earthquakes that collapsed the colonial church.',
        'Hire a guide to explain the sophisticated astronomical alignments of the temple windows.',
        'Visit the underground site museum located in the green esplanade in front of the temple.'
      ],
      es: [
        'Observa el muro curvo de piedra pulida, que sobrevivió a grandes terremotos que derribaron la iglesia colonial.',
        'Contrata un guía para entender las sofisticadas alineaciones astronómicas de las ventanas del templo.',
        'Visita el museo de sitio subterráneo ubicado en la explanada frente al templo.'
      ]
    },
    bestTime: {
      en: 'Afternoon (2:00 PM to 5:00 PM)',
      es: 'Tarde (2:00 PM a 5:00 PM)'
    }
  },
  {
    id: 'barrio-de-san-blas',
    name: { en: 'San Blas Neighborhood', es: 'Barrio de San Blas' },
    description: {
      en: 'The artistic quarter of Cusco, famous for its narrow cobblestone streets, artisan workshops, and viewpoints.',
      es: 'El barrio de los artesanos de Cusco, famoso por sus calles empedradas estrechas, talleres y mirador.'
    },
    distance: '1.5 km',
    travelTime: '15min walk',
    category: 'cultural',
    history: {
      en: 'San Blas was originally an Inca residential district called "T’oqokachi". After the conquest, it became home to prominent Spanish and indigenous artists, starting a long tradition of Cusco religious painting and sculpture.',
      es: 'San Blas fue originalmente un sector inca llamado "T’oqokachi". Después de la conquista, albergó a renombrados pintores y escultores mestizos, iniciando la gran tradición del arte cusqueño.'
    },
    howToGet: {
      en: 'Walk past the Cathedral at Plaza de Armas, continue up Calle Triunfo, then climb the steep, picturesque Calle Cuesta de San Blas.',
      es: 'Pasa por el costado de la Catedral en la Plaza de Armas, sube por la calle Triunfo y luego asciende por la empinada y pintoresca Cuesta de San Blas.'
    },
    tips: {
      en: [
        'Visit the workshops of the Mendívil family, famous for their religious sculptures with elongated necks.',
        'Walk up to the San Blas Viewpoint (Mirador) for a stunning panoramic view of Cusco at sunset.',
        'Explore the small bars and organic cafes tucked away in the narrow alleys.'
      ],
      es: [
        'Visita los talleres de la familia Mendívil, famosos por sus esculturas de cuellos largos.',
        'Sube hasta el mirador de San Blas para contemplar una vista panorámica espectacular de Cusco al atardecer.',
        'Explora los pequeños bares y cafeterías orgánicas escondidos en sus callejones estrechos.'
      ]
    },
    bestTime: {
      en: 'Late afternoon, followed by dinner',
      es: 'Tarde y noche, ideal para cenar'
    }
  },
  {
    id: 'maras-salineras',
    name: { en: 'Maras Salt Mines', es: 'Salineras de Maras' },
    description: {
      en: 'Thousands of ancient salt-evaporation pans fed by a warm, hypersaline subterranean spring.',
      es: 'Miles de pozas de evaporación de sal alimentadas por un manantial subterráneo cálido e hipersalino.'
    },
    distance: '50 km',
    travelTime: '1h 15min by car',
    category: 'nature',
    history: {
      en: 'Used since pre-Inca times (Chanapata culture) and expanded by the Incas, these salt mines have been continuously harvested for over a thousand years. Local families still manage the pans and package the pink mineral salt.',
      es: 'Utilizadas desde tiempos preincas (cultura Chanapata) y expandidas por los incas, estas salineras han sido cosechadas por más de mil años. Familias locales aún gestionan las pozas y empaquetan la sal rosada.'
    },
    howToGet: {
      en: 'Combine it with a Sacred Valley tour, either by private taxi, ATV adventure, or shared agency tours.',
      es: 'Combínalo con un tour por el Valle Sagrado, ya sea en taxi privado, en cuatrimoto (ATV) o en tours grupales de agencia.'
    },
    tips: {
      en: [
        'Walk to the designated viewpoints; visitors are no longer allowed to walk directly on the salt pans to avoid contamination.',
        'Buy some authentic Maras pink salt at the local shops at the entrance.',
        'Combine this visit with the nearby agricultural ruins of Moray.'
      ],
      es: [
        'Camina hacia los miradores autorizados; ya no se permite caminar entre las pozas para evitar la contaminación de la sal.',
        'Compra sal rosada de Maras en las tiendas locales de la entrada como souvenir.',
        'Combina esta visita con las terrazas agrícolas de Moray que están muy cerca.'
      ]
    },
    bestTime: {
      en: 'Dry season (May to October, when salt pans look white and full)',
      es: 'Temporada seca (Mayo a Octubre, cuando las pozas lucen blancas y llenas)'
    }
  },
  {
    id: 'moray',
    name: { en: 'Moray Agricultural Terraces', es: 'Terrazas Agrícolas de Moray' },
    description: {
      en: 'Circular, amphitheater-like agricultural ruins once used as an ecological laboratory by the Incas.',
      es: 'Terrazas agrícolas circulares tipo anfiteatro usadas como laboratorio ecológico por los incas.'
    },
    distance: '53 km',
    travelTime: '1h 20min by car',
    category: 'historical',
    history: {
      en: 'Moray consists of concentric circular terraces that resemble a Roman amphitheater. Due to their design and orientation, the temperature difference between the top and bottom circles can vary by up to 15°C (27°F), allowing Incas to domesticate crops from different climates.',
      es: 'Moray consiste en andenes circulares concéntricos que parecen un anfiteatro romano. Por su diseño y orientación, la diferencia de temperatura entre la parte superior e inferior varía hasta 15°C, permitiendo domesticar cultivos de diversos climas.'
    },
    howToGet: {
      en: 'Take a private taxi from Urubamba/Maras, or book a combined Maras/Moray tour from Cusco.',
      es: 'Toma un taxi privado desde Urubamba o Maras, o reserva un tour combinado Maras/Moray desde Cusco.'
    },
    tips: {
      en: [
        'Included in the Cusco Tourist Ticket (Boleto Turístico). Have it ready.',
        'Walk the path around the upper edge to appreciate the massive scale of the circles.',
        'Avoid visiting in heavy rain as the dirt paths can become extremely slippery.'
      ],
      es: [
        'Está incluido en el Boleto Turístico de Cusco. Tenlo a la mano.',
        'Camina por el sendero superior para apreciar la magnitud de los círculos concéntricos.',
        'Evita visitarlo en días de lluvia intensa ya que los senderos de tierra se vuelven muy resbaladizos.'
      ]
    },
    bestTime: {
      en: 'April to October',
      es: 'Abril a Octubre'
    }
  },
  {
    id: 'ollantaytambo',
    name: { en: 'Ollantaytambo Fortress', es: 'Fortaleza de Ollantaytambo' },
    description: {
      en: 'A massive Inca archaeological complex and town, featuring still-inhabited stone dwellings.',
      es: 'Un imponente complejo arqueológico inca y pueblo con viviendas de piedra aún habitadas.'
    },
    distance: '72 km',
    travelTime: '1h 45min by car',
    category: 'historical',
    history: {
      en: 'Ollantaytambo was Pachacuti’s royal estate and later the stronghold for Manco Inca during the Spanish conquest. It is famous for the Battle of Ollantaytambo (1537) where indigenous forces defeated the Spanish cavalry.',
      es: 'Ollantaytambo fue el palacio de Pachacútec y luego la fortaleza de resistencia de Manco Inca. Es célebre por la Batalla de Ollantaytambo (1537) donde las fuerzas incas derrotaron a la caballería española.'
    },
    howToGet: {
      en: 'Take a train directly from Cusco San Pedro station or take a bus/colectivo from Cusco to Ollantaytambo town.',
      es: 'Toma el tren directo desde la estación de San Pedro en Cusco o viaja en colectivo desde Cusco hasta el pueblo de Ollantaytambo.'
    },
    tips: {
      en: [
        'Explore the town alleys; it is the only remaining town in Peru that preserves original Inca urban planning.',
        'Climb the temple hill to view the Temple of the Sun made of pink granite blocks.',
        'Ollantaytambo is the main train station hub to Machu Picchu; plan to spend a few hours here before your train.'
      ],
      es: [
        'Explora las callejuelas del pueblo; es el único pueblo de Perú que conserva el diseño urbano inca original.',
        'Sube la colina del templo para ver el Templo del Sol hecho de bloques de granito rosa.',
        'Ollantaytambo es la estación de tren principal hacia Machu Picchu; planifica pasar unas horas aquí.'
      ]
    },
    bestTime: {
      en: 'Dry season, late mornings',
      es: 'Temporada seca, media mañana'
    }
  },
  {
    id: 'pisac',
    name: { en: 'Písac Archaeological Site', es: 'Complejo Arqueológico de Písac' },
    description: {
      en: 'Spectacular mountain-top ruins featuring agricultural terraces, royal palaces, and the largest Inca cemetery.',
      es: 'Espectaculares ruinas de montaña con terrazas agrícolas, palacios reales y el cementerio inca más grande.'
    },
    distance: '33 km',
    travelTime: '50min by car',
    category: 'historical',
    history: {
      en: 'Písac was a major Inca defensive outpost and imperial residence. Its spectacular terraces curve gracefully around the contours of the mountain, while the upper ruins contain defensive watchtowers and ceremonial centers.',
      es: 'Písac fue un puesto de defensa y residencia imperial. Sus espectaculares andenerías se curvan siguiendo el contorno de la montaña, y las ruinas superiores albergan centros ceremoniales y miradores militares.'
    },
    howToGet: {
      en: 'Hire a taxi from Cusco or take a local minivan (colectivo) to Pisac town, then hike up or take a local cab to the upper ruins entrance.',
      es: 'Contrata un taxi desde Cusco o toma un colectivo hasta el pueblo de Písac, y luego sube caminando o toma un taxi local a la entrada superior.'
    },
    tips: {
      en: [
        'The hike from the town up to the ruins is beautiful but very strenuous (approx. 2 hours uphill).',
        'Explore the Intihuatana sector to see the sacred solar clock anchor.',
        'Combine it with a visit to the Pisac craft market down in the valley.'
      ],
      es: [
        'La caminata desde el pueblo hasta las ruinas es hermosa pero muy exigente (aprox. 2 horas de subida).',
        'Explora el sector de Intihuatana para observar el reloj solar tallado en la roca.',
        'Combina la visita con el mercado de artesanías de Písac abajo en el pueblo.'
      ]
    },
    bestTime: {
      en: 'Morning (8:30 AM to 12:00 PM)',
      es: 'Mañanas (8:30 AM a 12:00 PM)'
    }
  },
  {
    id: 'humantay-lake',
    name: { en: 'Humantay Lake', es: 'Laguna Humantay' },
    description: {
      en: 'Breathtaking turquoise glacier lake located at the foot of Mount Humantay at 4,200m altitude.',
      es: 'Espectacular laguna glaciar de color turquesa ubicada al pie del nevado Humantay a 4,200m de altitud.'
    },
    distance: '120 km',
    travelTime: '3h 30min by car + 1.5h hike',
    category: 'adventure',
    history: {
      en: 'Considered sacred by the Incas and local Andean communities, Humantay Lake is fed by the melting glaciers of the Humantay and Salkantay peaks, creating its stunning turquoise color.',
      es: 'Considerada sagrada por los incas y las comunidades locales, la Laguna Humantay es alimentada por el deshielo de los glaciares de los nevados Humantay y Salkantay, creando su color turquesa.'
    },
    howToGet: {
      en: 'Book a guided day tour starting from Cusco (departing early at 4:30 AM). Transport drives to Soraypampa base camp, where the 1.5-hour steep hike starts.',
      es: 'Reserva un tour guiada de un día completo desde Cusco (salida a las 4:30 AM). El transporte va hasta el campamento base de Soraypampa, donde inicia la caminata empinada de 1.5 horas.'
    },
    tips: {
      en: [
        'Aclimate in Cusco for at least 2 days before attempting this high-altitude trek.',
        'Use trekking poles to protect your knees on the steep downhill return.',
        'Leave a small stone tribute (Apacheta) by the lakeside to thank the mountain spirits (Apus).'
      ],
      es: [
        'Aclímate en Cusco al menos 2 días antes de subir a esta laguna de alta montaña.',
        'Usa bastones de trekking para proteger tus rodillas en el descenso empinado de regreso.',
        'Deja un pequeño tributo de piedras (Apacheta) a orillas de la laguna para agradecer a los Apus.'
      ]
    },
    bestTime: {
      en: 'Dry season (May to October) for maximum blue-green color visibility',
      es: 'Temporada seca (Mayo a Octubre) para apreciar su color azul verdoso en todo su esplendor'
    }
  }
];
