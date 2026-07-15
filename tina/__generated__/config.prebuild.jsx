// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get these from tina.io (configured in .env)
  // Fall back to null if TINA_LOCAL=true to compile locally without hitting Tina Cloud
  clientId: process.env.TINA_LOCAL === "true" ? null : process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_LOCAL === "true" ? null : process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
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
            label: "T\xEDtulo (Espa\xF1ol)",
            required: true
          },
          {
            type: "string",
            name: "title_en",
            label: "T\xEDtulo (Ingl\xE9s)",
            required: true
          },
          {
            type: "string",
            name: "purpose_es",
            label: "Prop\xF3sito (Espa\xF1ol)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "purpose_en",
            label: "Prop\xF3sito (Ingl\xE9s)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "mission_es",
            label: "Misi\xF3n (Espa\xF1ol)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "mission_en",
            label: "Misi\xF3n (Ingl\xE9s)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "vision_es",
            label: "Visi\xF3n (Espa\xF1ol)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "vision_en",
            label: "Visi\xF3n (Ingl\xE9s)",
            ui: { component: "textarea" },
            required: true
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
                label: "T\xEDtulo del Valor (Espa\xF1ol)"
              },
              {
                type: "string",
                name: "title_en",
                label: "T\xEDtulo del Valor (Ingl\xE9s)"
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripci\xF3n (Espa\xF1ol)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripci\xF3n (Ingl\xE9s)",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
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
            label: "Atracciones Tur\xEDsticas",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name_es || item?.name_en || "Nueva Atracci\xF3n" };
              }
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID \xDAnico / Slug (ej: machu-picchu)",
                required: true
              },
              {
                type: "string",
                name: "name_es",
                label: "Nombre (Espa\xF1ol)",
                required: true
              },
              {
                type: "string",
                name: "name_en",
                label: "Nombre (Ingl\xE9s)",
                required: true
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripci\xF3n (Espa\xF1ol)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripci\xF3n (Ingl\xE9s)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "distance",
                label: "Distancia (ej: 112 km)",
                required: true
              },
              {
                type: "string",
                name: "travelTime",
                label: "Tiempo de Viaje (ej: 4h by train)",
                required: true
              },
              {
                type: "string",
                name: "category",
                label: "Categor\xEDa",
                required: true,
                options: [
                  { value: "historical", label: "Hist\xF3rico" },
                  { value: "nature", label: "Naturaleza" },
                  { value: "cultural", label: "Cultural" },
                  { value: "adventure", label: "Aventura" }
                ]
              },
              {
                type: "string",
                name: "history_es",
                label: "Historia / Contexto (Espa\xF1ol)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "history_en",
                label: "Historia / Contexto (Ingl\xE9s)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "howToGet_es",
                label: "C\xF3mo Llegar (Espa\xF1ol)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "howToGet_en",
                label: "C\xF3mo Llegar (Ingl\xE9s)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "tips_es",
                label: "Consejos / Tips (Espa\xF1ol)",
                list: true
              },
              {
                type: "string",
                name: "tips_en",
                label: "Consejos / Tips (Ingl\xE9s)",
                list: true
              },
              {
                type: "string",
                name: "bestTime_es",
                label: "Mejor \xC9poca para Visitar (Espa\xF1ol)"
              },
              {
                type: "string",
                name: "bestTime_en",
                label: "Mejor \xC9poca para Visitar (Ingl\xE9s)"
              },
              {
                type: "image",
                name: "image",
                label: "Foto de la Atracci\xF3n"
              }
            ]
          }
        ]
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
              }
            },
            fields: [
              {
                type: "string",
                name: "question_es",
                label: "Pregunta (Espa\xF1ol)",
                required: true
              },
              {
                type: "string",
                name: "question_en",
                label: "Pregunta (Ingl\xE9s)",
                required: true
              },
              {
                type: "string",
                name: "answer_es",
                label: "Respuesta (Espa\xF1ol)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "answer_en",
                label: "Respuesta (Ingl\xE9s)",
                ui: { component: "textarea" },
                required: true
              }
            ]
          }
        ]
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
                return { label: item?.name_es || item?.name_en || "Nueva Habitaci\xF3n" };
              }
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID / Slug (ej: doble-superior)",
                required: true
              },
              {
                type: "string",
                name: "slug",
                label: "URL Slug",
                required: true
              },
              {
                type: "string",
                name: "name_es",
                label: "Nombre (Espa\xF1ol)",
                required: true
              },
              {
                type: "string",
                name: "name_en",
                label: "Nombre (Ingl\xE9s)",
                required: true
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripci\xF3n (Espa\xF1ol)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripci\xF3n (Ingl\xE9s)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "number",
                name: "maxGuests",
                label: "Hu\xE9spedes M\xE1ximos",
                required: true
              },
              {
                type: "string",
                name: "beds",
                label: "Camas (ej: 2 double beds)",
                required: true
              },
              {
                type: "number",
                name: "pricePerNight",
                label: "Precio por Noche (USD)",
                required: true
              },
              {
                type: "string",
                name: "amenities",
                label: "Amenidades (IDs)",
                list: true
              },
              {
                type: "image",
                name: "images",
                label: "Fotos de la Habitaci\xF3n (m\xE1x 4)",
                list: true
              },
              {
                type: "string",
                name: "photoFolder",
                label: "Carpeta de Fotos (src/assets)"
              },
              {
                type: "boolean",
                name: "hasVideoTour",
                label: "\xBFTiene Video Tour?"
              },
              {
                type: "object",
                name: "amenityLabels",
                label: "Etiquetas de Amenidades (biling\xFCe)",
                fields: [
                  {
                    type: "object",
                    name: "wifi",
                    label: "Wi-Fi",
                    fields: [
                      { type: "string", name: "es", label: "Espa\xF1ol" },
                      { type: "string", name: "en", label: "Ingl\xE9s" }
                    ]
                  },
                  {
                    type: "object",
                    name: "breakfast",
                    label: "Desayuno",
                    fields: [
                      { type: "string", name: "es", label: "Espa\xF1ol" },
                      { type: "string", name: "en", label: "Ingl\xE9s" }
                    ]
                  },
                  {
                    type: "object",
                    name: "hot_water",
                    label: "Agua Caliente",
                    fields: [
                      { type: "string", name: "es", label: "Espa\xF1ol" },
                      { type: "string", name: "en", label: "Ingl\xE9s" }
                    ]
                  },
                  {
                    type: "object",
                    name: "heating",
                    label: "Calefacci\xF3n",
                    fields: [
                      { type: "string", name: "es", label: "Espa\xF1ol" },
                      { type: "string", name: "en", label: "Ingl\xE9s" }
                    ]
                  },
                  {
                    type: "object",
                    name: "tv",
                    label: "TV",
                    fields: [
                      { type: "string", name: "es", label: "Espa\xF1ol" },
                      { type: "string", name: "en", label: "Ingl\xE9s" }
                    ]
                  },
                  {
                    type: "object",
                    name: "laundry",
                    label: "Lavander\xEDa",
                    fields: [
                      { type: "string", name: "es", label: "Espa\xF1ol" },
                      { type: "string", name: "en", label: "Ingl\xE9s" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
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
              }
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID \xDAnico (ej: wifi)",
                required: true
              },
              {
                type: "string",
                name: "name_es",
                label: "Nombre (Espa\xF1ol)",
                required: true
              },
              {
                type: "string",
                name: "name_en",
                label: "Nombre (Ingl\xE9s)",
                required: true
              },
              {
                type: "string",
                name: "description_es",
                label: "Descripci\xF3n (Espa\xF1ol)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "description_en",
                label: "Descripci\xF3n (Ingl\xE9s)",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "icon",
                label: "Icono (nombre del SVG)"
              }
            ]
          }
        ]
      },
      {
        name: "reviews",
        label: "Rese\xF1as de Hu\xE9spedes",
        path: "src/content/reviews",
        format: "json",
        fields: [
          {
            type: "object",
            name: "reviews",
            label: "Rese\xF1as",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name ? `${item.name} (${item.country})` : "Nueva Rese\xF1a" };
              }
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Nombre del Hu\xE9sped",
                required: true
              },
              {
                type: "string",
                name: "country",
                label: "Pa\xEDs (emoji bandera, ej: \u{1F1FA}\u{1F1F8})",
                required: true
              },
              {
                type: "number",
                name: "rating",
                label: "Calificaci\xF3n (1-5)",
                required: true
              },
              {
                type: "string",
                name: "text_es",
                label: "Rese\xF1a (Espa\xF1ol)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "text_en",
                label: "Rese\xF1a (Ingl\xE9s)",
                ui: { component: "textarea" },
                required: true
              },
              {
                type: "string",
                name: "date_es",
                label: "Fecha (Espa\xF1ol, ej: Marzo 2025)",
                required: true
              },
              {
                type: "string",
                name: "date_en",
                label: "Fecha (Ingl\xE9s, ej: March 2025)",
                required: true
              }
            ]
          }
        ]
      },
      {
        name: "siteSettings",
        label: "Configuraci\xF3n del Hotel",
        path: "src/content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "string",
            name: "hotelName",
            label: "Nombre del Hotel",
            required: true
          },
          {
            type: "string",
            name: "phone",
            label: "Tel\xE9fono (formato display: +51 984 000 000)",
            required: true
          },
          {
            type: "string",
            name: "phoneRaw",
            label: "Tel\xE9fono (sin espacios: 51984000000)",
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Email de Contacto",
            required: true
          },
          {
            type: "string",
            name: "whatsappNumber",
            label: "WhatsApp (sin +, ej: 51984000000)",
            required: true
          },
          {
            type: "string",
            name: "streetAddress",
            label: "Direcci\xF3n (calle)",
            required: true
          },
          {
            type: "string",
            name: "city",
            label: "Ciudad",
            required: true
          },
          {
            type: "string",
            name: "region",
            label: "Regi\xF3n/Estado"
          },
          {
            type: "string",
            name: "postalCode",
            label: "C\xF3digo Postal"
          },
          {
            type: "string",
            name: "country",
            label: "Pa\xEDs (c\xF3digo ISO, ej: PE)",
            required: true
          },
          {
            type: "string",
            name: "address_es",
            label: "Direcci\xF3n completa (Espa\xF1ol)",
            required: true
          },
          {
            type: "string",
            name: "address_en",
            label: "Direcci\xF3n completa (Ingl\xE9s)",
            required: true
          },
          {
            type: "number",
            name: "latitude",
            label: "Latitud GPS",
            required: true
          },
          {
            type: "number",
            name: "longitude",
            label: "Longitud GPS",
            required: true
          },
          {
            type: "string",
            name: "checkinTime",
            label: "Hora de Check-in (ej: 12:00)",
            required: true
          },
          {
            type: "string",
            name: "checkoutTime",
            label: "Hora de Check-out (ej: 10:30)",
            required: true
          },
          {
            type: "number",
            name: "starRating",
            label: "Clasificaci\xF3n por Estrellas"
          },
          {
            type: "string",
            name: "priceRange",
            label: "Rango de Precios (ej: $$)"
          },
          {
            type: "string",
            name: "siteDescription_es",
            label: "Descripci\xF3n del Sitio (Espa\xF1ol)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "siteDescription_en",
            label: "Descripci\xF3n del Sitio (Ingl\xE9s)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Redes Sociales",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label || item?.platform || "Nueva Red Social" };
              }
            },
            fields: [
              {
                type: "string",
                name: "platform",
                label: "Plataforma (ej: instagram, facebook)",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "URL del perfil",
                required: true
              },
              {
                type: "string",
                name: "label",
                label: "Nombre a mostrar",
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
