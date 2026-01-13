# API Documentation

## API Endpoints

Base path: `/api`  
Auth: All non-auth endpoints require an authenticated user and active organization (see `src/middleware/auth.ts`).

### Auth

- GET `/auth/get-session` — Get current session
- Other auth routes are provided by Better Auth under `/auth/*`

### System

- GET `/health` — Health check
- GET `/api-docs` — Swagger UI

### Analytics

- GET `/analytics/summary?period=daily|weekly|monthly` — Summary metrics
- GET `/analytics/top-products?from&to&locationId&customerId&limit=5` — Top products
- GET `/analytics/location-performance?from&to&limit=10` — Performance by location
- GET `/analytics/customer-performance?from&to&limit=10` — Performance by customer

### Products

- GET `/products` — List products
- POST `/products` — Create product
- GET `/products/low-stock?limit=10` — Low stock products
- GET `/products/:id` — Get product by ID
- PUT `/products/:id` — Update product
- DELETE `/products/:id` — Delete product

### Sales

- GET `/sales` — List sales (supports filters in body/query as implemented)
- GET `/sales/:id` — Get sale by ID
- POST `/sales` — Create sale
- GET `/sales/summary` — Sales summary
- GET `/sales/recent?limit=10` — Recent sales

### Expenses

- GET `/expenses?from&to` — List expenses
- POST `/expenses` — Create expense

### Customers

- GET `/customers` — List customers
- GET `/customers/:id` — Get customer by ID
- POST `/customers` — Create customer

### Locations

- GET `/locations` — List locations
- POST `/locations` — Create location

### FX Rates

- GET `/fx` — Latest stored FX rates
- POST `/fx/refresh` — Fetch and store latest FX rates

### Notifications

- GET `/notifications` — List notifications
- POST `/notifications/:id/read` — Mark notification as read

### Reports

- GET `/reports/sales.csv?period=weekly|monthly|quarterly|yearly` — Sales CSV export
- GET `/reports/sales.pdf?period=weekly|monthly|quarterly|yearly` — Sales PDF export

### Tax

- GET `/tax?jurisdiction=...` — List tax rules
- POST `/tax` — Create tax rule
- PUT `/tax/:id` — Update tax rule
- DELETE `/tax/:id` — Delete tax rule
- POST `/tax/seed-default` — Seed default VAT rule

Notes:

- Check `src/routes/*` for route wiring and `src/controller/*` for handlers.
- Swagger docs at `/api-docs` reflect request/response schemas where provided.
