import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Categorías",
      version: "1.0.0",
      description: "CRUD de categorías documentado con OpenAPI 3",
    },
    servers: [{ url: "http://localhost:" + (process.env.PORT || 3000) }],
    components: {
      schemas: {
        Categoria: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Backend" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string", example: "Mensaje de error" },
          },
        },
      },
      requestBodies: {
        CategoriaCreate: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nombre"],
                properties: {
                  nombre: { type: "string", example: "Frontend" },
                },
              },
            },
          },
        },
        CategoriaUpdate: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nombre"],
                properties: {
                  nombre: { type: "string", example: "DevOps" },
                },
              },
            },
          },
        },
      },
    },
  },
  // Ajusta la ruta según dónde tengas tus rutas
  apis: ["./src/routers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
