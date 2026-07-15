import { defineConfig } from "tinacms";

// GITHUB_BRANCH is exposed by Hostinger/GitHub actions
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get these from tina.io (configured in .env)
  // Fall back to null if TINA_LOCAL=true to compile locally without hitting Tina Cloud
  clientId: process.env.TINA_LOCAL === 'true' ? null : (process.env.TINA_PUBLIC_CLIENT_ID || null),
  token: process.env.TINA_LOCAL === 'true' ? null : (process.env.TINA_TOKEN || null),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "about",
        label: "Sobre Nosotros",
        path: "src/content/about",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title_es",
            label: "Título (Español)",
            required: true,
          },
          {
            type: "string",
            name: "title_en",
            label: "Título (Inglés)",
            required: true,
          },
          {
            type: "string",
            name: "purpose_es",
            label: "Propósito (Español)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "purpose_en",
            label: "Propósito (Inglés)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "mission_es",
            label: "Misión (Español)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "mission_en",
            label: "Misión (Inglés)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "vision_es",
            label: "Visión (Español)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "vision_en",
            label: "Visión (Inglés)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "object",
            name: "values",
            label: "Valores",
            list: true,
            fields: [
              {
                type: "string",
                name: "title_es",
                label: "Título del Valor (Español)",
              },
              {
                type: "string",
                name: "title_en",
                label: "Título del Valor (Inglés)",
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripción (Español)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripción (Inglés)",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "explore",
        label: "Explora Cusco",
        path: "src/content/explore",
        format: "json",
        fields: [
          {
            type: "object",
            name: "attractions",
            label: "Atracciones Turísticas",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name_es || item?.name_en || "Nueva Atracción" };
              },
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID Único / Slug (ej: machu-picchu)",
                required: true,
              },
              {
                type: "string",
                name: "name_es",
                label: "Nombre (Español)",
                required: true,
              },
              {
                type: "string",
                name: "name_en",
                label: "Nombre (Inglés)",
                required: true,
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripción (Español)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripción (Inglés)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "distance",
                label: "Distancia (ej: 112 km)",
                required: true,
              },
              {
                type: "string",
                name: "travelTime",
                label: "Tiempo de Viaje (ej: 4h by train)",
                required: true,
              },
              {
                type: "string",
                name: "category",
                label: "Categoría",
                required: true,
                options: [
                  { value: "historical", label: "Histórico" },
                  { value: "nature", label: "Naturaleza" },
                  { value: "cultural", label: "Cultural" },
                  { value: "adventure", label: "Aventura" },
                ],
              },
              {
                type: "string",
                name: "history_es",
                label: "Historia / Contexto (Español)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "history_en",
                label: "Historia / Contexto (Inglés)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "howToGet_es",
                label: "Cómo Llegar (Español)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "howToGet_en",
                label: "Cómo Llegar (Inglés)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "tips_es",
                label: "Consejos / Tips (Español)",
                list: true,
              },
              {
                type: "string",
                name: "tips_en",
                label: "Consejos / Tips (Inglés)",
                list: true,
              },
              {
                type: "string",
                name: "bestTime_es",
                label: "Mejor Época para Visitar (Español)",
              },
              {
                type: "string",
                name: "bestTime_en",
                label: "Mejor Época para Visitar (Inglés)",
              },
              {
                type: "image",
                name: "image",
                label: "Foto de la Atracción",
              },
            ],
          },
        ],
      },
      {
        name: "faq",
        label: "FAQ (Preguntas Frecuentes)",
        path: "src/content/faq",
        format: "json",
        fields: [
          {
            type: "object",
            name: "questions",
            label: "Preguntas y Respuestas",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.question_es || item?.question_en || "Nueva Pregunta" };
              },
            },
            fields: [
              {
                type: "string",
                name: "question_es",
                label: "Pregunta (Español)",
                required: true,
              },
              {
                type: "string",
                name: "question_en",
                label: "Pregunta (Inglés)",
                required: true,
              },
              {
                type: "string",
                name: "answer_es",
                label: "Respuesta (Español)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "answer_en",
                label: "Respuesta (Inglés)",
                ui: { component: "textarea" },
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "rooms",
        label: "Habitaciones",
        path: "src/content/rooms",
        format: "json",
        fields: [
          {
            type: "object",
            name: "rooms",
            label: "Habitaciones",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name_es || item?.name_en || "Nueva Habitación" };
              },
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID / Slug (ej: doble-superior)",
                required: true,
              },
              {
                type: "string",
                name: "slug",
                label: "URL Slug",
                required: true,
              },
              {
                type: "string",
                name: "name_es",
                label: "Nombre (Español)",
                required: true,
              },
              {
                type: "string",
                name: "name_en",
                label: "Nombre (Inglés)",
                required: true,
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripción (Español)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripción (Inglés)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "number",
                name: "maxGuests",
                label: "Huéspedes Máximos",
                required: true,
              },
              {
                type: "string",
                name: "beds",
                label: "Camas (ej: 2 double beds)",
                required: true,
              },
              {
                type: "number",
                name: "pricePerNight",
                label: "Precio por Noche (USD)",
                required: true,
              },
              {
                type: "string",
                name: "amenities",
                label: "Amenidades (IDs)",
                list: true,
              },
              {
                type: "image",
                name: "images",
                label: "Fotos de la Habitación (máx 4)",
                list: true,
              },
              {
                type: "string",
                name: "photoFolder",
                label: "Carpeta de Fotos (src/assets)",
              },
              {
                type: "boolean",
                name: "hasVideoTour",
                label: "¿Tiene Video Tour?",
              },
              {
                type: "object",
                name: "amenityLabels",
                label: "Etiquetas de Amenidades (bilingüe)",
                fields: [
                  {
                    type: "object",
                    name: "wifi",
                    label: "Wi-Fi",
                    fields: [
                      { type: "string", name: "es", label: "Español" },
                      { type: "string", name: "en", label: "Inglés" },
                    ],
                  },
                  {
                    type: "object",
                    name: "breakfast",
                    label: "Desayuno",
                    fields: [
                      { type: "string", name: "es", label: "Español" },
                      { type: "string", name: "en", label: "Inglés" },
                    ],
                  },
                  {
                    type: "object",
                    name: "hot_water",
                    label: "Agua Caliente",
                    fields: [
                      { type: "string", name: "es", label: "Español" },
                      { type: "string", name: "en", label: "Inglés" },
                    ],
                  },
                  {
                    type: "object",
                    name: "heating",
                    label: "Calefacción",
                    fields: [
                      { type: "string", name: "es", label: "Español" },
                      { type: "string", name: "en", label: "Inglés" },
                    ],
                  },
                  {
                    type: "object",
                    name: "tv",
                    label: "TV",
                    fields: [
                      { type: "string", name: "es", label: "Español" },
                      { type: "string", name: "en", label: "Inglés" },
                    ],
                  },
                  {
                    type: "object",
                    name: "laundry",
                    label: "Lavandería",
                    fields: [
                      { type: "string", name: "es", label: "Español" },
                      { type: "string", name: "en", label: "Inglés" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "services",
        label: "Servicios del Hotel",
        path: "src/content/services",
        format: "json",
        fields: [
          {
            type: "object",
            name: "services",
            label: "Servicios",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name_es || item?.name_en || "Nuevo Servicio" };
              },
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID Único (ej: wifi)",
                required: true,
              },
              {
                type: "string",
                name: "name_es",
                label: "Nombre (Español)",
                required: true,
              },
              {
                type: "string",
                name: "name_en",
                label: "Nombre (Inglés)",
                required: true,
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripción (Español)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripción (Inglés)",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "icon",
                label: "Icono (nombre del SVG)",
              },
            ],
          },
        ],
      },
      {
        name: "reviews",
        label: "Reseñas de Huéspedes",
        path: "src/content/reviews",
        format: "json",
        fields: [
          {
            type: "object",
            name: "reviews",
            label: "Reseñas",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name ? `${item.name} (${item.country})` : "Nueva Reseña" };
              },
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Nombre del Huésped",
                required: true,
              },
              {
                type: "string",
                name: "country",
                label: "País (emoji bandera, ej: 🇺🇸)",
                required: true,
              },
              {
                type: "number",
                name: "rating",
                label: "Calificación (1-5)",
                required: true,
              },
              {
                type: "string",
                name: "text_es",
                label: "Reseña (Español)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "text_en",
                label: "Reseña (Inglés)",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "date_es",
                label: "Fecha (Español, ej: Marzo 2025)",
                required: true,
              },
              {
                type: "string",
                name: "date_en",
                label: "Fecha (Inglés, ej: March 2025)",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "siteSettings",
        label: "Configuración del Hotel",
        path: "src/content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "hotelName",
            label: "Nombre del Hotel",
            required: true,
          },
          {
            type: "string",
            name: "phone",
            label: "Teléfono (formato display: +51 984 000 000)",
            required: true,
          },
          {
            type: "string",
            name: "phoneRaw",
            label: "Teléfono (sin espacios: 51984000000)",
            required: true,
          },
          {
            type: "string",
            name: "email",
            label: "Email de Contacto",
            required: true,
          },
          {
            type: "string",
            name: "whatsappNumber",
            label: "WhatsApp (sin +, ej: 51984000000)",
            required: true,
          },
          {
            type: "string",
            name: "streetAddress",
            label: "Dirección (calle)",
            required: true,
          },
          {
            type: "string",
            name: "city",
            label: "Ciudad",
            required: true,
          },
          {
            type: "string",
            name: "region",
            label: "Región/Estado",
          },
          {
            type: "string",
            name: "postalCode",
            label: "Código Postal",
          },
          {
            type: "string",
            name: "country",
            label: "País (código ISO, ej: PE)",
            required: true,
          },
          {
            type: "string",
            name: "address_es",
            label: "Dirección completa (Español)",
            required: true,
          },
          {
            type: "string",
            name: "address_en",
            label: "Dirección completa (Inglés)",
            required: true,
          },
          {
            type: "number",
            name: "latitude",
            label: "Latitud GPS",
            required: true,
          },
          {
            type: "number",
            name: "longitude",
            label: "Longitud GPS",
            required: true,
          },
          {
            type: "string",
            name: "checkinTime",
            label: "Hora de Check-in (ej: 12:00)",
            required: true,
          },
          {
            type: "string",
            name: "checkoutTime",
            label: "Hora de Check-out (ej: 10:30)",
            required: true,
          },
          {
            type: "number",
            name: "starRating",
            label: "Clasificación por Estrellas",
          },
          {
            type: "string",
            name: "priceRange",
            label: "Rango de Precios (ej: $$)",
          },
          {
            type: "string",
            name: "siteDescription_es",
            label: "Descripción del Sitio (Español)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            name: "siteDescription_en",
            label: "Descripción del Sitio (Inglés)",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Redes Sociales",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label || item?.platform || "Nueva Red Social" };
              },
            },
            fields: [
              {
                type: "string",
                name: "platform",
                label: "Plataforma (ej: instagram, facebook)",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "URL del perfil",
                required: true,
              },
              {
                type: "string",
                name: "label",
                label: "Nombre a mostrar",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
