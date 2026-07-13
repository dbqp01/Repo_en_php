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
      mediaRoot: "images",
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
    ],
  },
});
