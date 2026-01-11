import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inzaca Business Analytics API",
      version: "1.0.0",
      description:
        "API for sales tracking, profit analysis, tax calculation, and business reporting for Nigerian SMEs.",
    },
    components: {
      schemas: {
        Sale: {
          type: "object",
          properties: {
            id: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            customerId: { type: "string", nullable: true },
            locationId: { type: "string", nullable: true },
            totalAmount: { type: "number" },
            grossAmount: { type: "number" },
            taxableAmount: { type: "number" },
            vatRate: { type: "number" },
            taxAmount: { type: "number" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            sku: { type: "string" },
            price: { type: "number" },
            costPrice: { type: "number" },
            stock: { type: "integer" },
            taxExempt: { type: "boolean" },
          },
        },
        TaxRule: {
          type: "object",
          properties: {
            id: { type: "string" },
            organizationId: { type: "string" },
            jurisdiction: { type: "string" },
            type: { type: "string" },
            rate: { type: "number" },
            effectiveFrom: { type: "string", format: "date-time" },
            effectiveTo: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
        },
        Expense: {
          type: "object",
          properties: {
            id: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            amount: { type: "number" },
            currency: { type: "string" },
            occurredOn: { type: "string", format: "date-time" },
          },
        },
        Notification: {
          type: "object",
          properties: {
            id: { type: "string" },
            type: { type: "string" },
            payload: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
            readAt: { type: "string", format: "date-time", nullable: true },
          },
        },
        Customer: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            lga: { type: "string" },
            country: { type: "string" },
          },
        },
        CreateCustomerRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            lga: { type: "string" },
            country: { type: "string" },
          },
          required: ["name"],
        },
        Location: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            address: { type: "string" },
            state: { type: "string" },
            lga: { type: "string" },
          },
        },
        FxRate: {
          type: "object",
          properties: {
            id: { type: "string" },
            base: { type: "string" },
            quote: { type: "string" },
            rate: { type: "number" },
            fetchedAt: { type: "string", format: "date-time" },
          },
        },
        AnalyticsSummary: {
          type: "object",
          properties: {
            period: { type: "string" },
            totalSales: { type: "integer" },
            totalRevenue: { type: "number" },
            grossProfit: { type: "number" },
            taxTotal: { type: "number" },
            profitBeforeTax: { type: "number" },
            estimatedIncomeTax: { type: "number" },
            profitAfterTax: { type: "number" },
            expensesTotal: { type: "number" },
            lowStockCount: { type: "integer" },
          },
        },
        TopProductEntry: {
          type: "object",
          properties: {
            productId: { type: "string" },
            name: { type: "string" },
            sku: { type: "string", nullable: true },
            qty: { type: "integer" },
            revenue: { type: "number" },
          },
        },
        LocationPerformanceEntry: {
          type: "object",
          properties: {
            locationId: { type: "string", nullable: true },
            locationName: { type: "string" },
            revenue: { type: "number" },
            salesCount: { type: "integer" },
            cogs: { type: "number" },
            grossProfit: { type: "number" },
          },
        },
        CustomerPerformanceEntry: {
          type: "object",
          properties: {
            customerId: { type: "string", nullable: true },
            customerName: { type: "string" },
            city: { type: "string", nullable: true },
            state: { type: "string", nullable: true },
            lga: { type: "string", nullable: true },
            country: { type: "string", nullable: true },
            revenue: { type: "number" },
            salesCount: { type: "integer" },
            cogs: { type: "number" },
            grossProfit: { type: "number" },
          },
        },
        LowStockProduct: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            stock: { type: "integer" },
            minStock: { type: "integer" },
          },
        },
        CreateSaleRequest: {
          type: "object",
          properties: {
            locationId: { type: "string" },
            customerId: { type: "string", nullable: true },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  quantity: { type: "integer" },
                  price: { type: "number" },
                  costPrice: { type: "number" },
                },
                required: ["productId", "quantity", "price"],
              },
            },
          },
          required: ["locationId", "items"],
        },
        CreateProductRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            sku: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            costPrice: { type: "number" },
            stock: { type: "integer" },
            minStock: { type: "integer" },
            taxExempt: { type: "boolean" },
          },
          required: ["name", "sku", "price", "costPrice"],
        },
        UpdateProductRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            sku: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            costPrice: { type: "number" },
            stock: { type: "integer" },
            minStock: { type: "integer" },
            taxExempt: { type: "boolean" },
          },
        },
        CreateExpenseRequest: {
          type: "object",
          properties: {
            description: { type: "string" },
            category: { type: "string" },
            amount: { type: "number" },
            currency: { type: "string" },
            occurredOn: { type: "string", format: "date-time" },
          },
          required: ["description", "category", "amount", "occurredOn"],
        },
        CreateLocationRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            address: { type: "string" },
            lat: { type: "number" },
            lng: { type: "number" },
            state: { type: "string" },
            lga: { type: "string" },
          },
          required: ["name"],
        },
        CreateTaxRuleRequest: {
          type: "object",
          properties: {
            jurisdiction: { type: "string" },
            type: { type: "string" },
            rate: { type: "number" },
            effectiveFrom: { type: "string", format: "date-time" },
            effectiveTo: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
          required: ["jurisdiction", "type", "rate", "effectiveFrom"],
        },
        UpdateTaxRuleRequest: {
          type: "object",
          properties: {
            jurisdiction: { type: "string" },
            type: { type: "string" },
            rate: { type: "number" },
            effectiveFrom: { type: "string", format: "date-time" },
            effectiveTo: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
