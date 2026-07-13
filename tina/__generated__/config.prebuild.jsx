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
      mediaRoot: "images",
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
      }
    ]
  }
});
export {
  config_default as default
};
