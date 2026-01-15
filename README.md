# Inventory Management SPA

Single Page Application to manage manufacturing product inventory for a Pune unit.

The app allows you to:

- List products with category, total material cost and number of raw materials.
- Add new products with full details and dynamic raw material cost calculations.
- Edit existing products and their materials.

Live Project Link - https://dev-vishwajeet-jadhav.github.io/vibeosys-inventory-app-assignment-/

## Technology Stack

- React
- Redux Toolkit + React Redux
- React Router

No backend server is required. All data is stored in browser storage and managed in-memory.

---

## How to Run the Application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open the app in your browser:

   - URL: http://localhost:3000/

---

## Features vs Assignment Requirements

### Product

Each product stores:

- Name of product
- Unit of measure (ml / ltr / gm / kg / mtr / mm / box / units)
- Category (Finished / Semi finished / Subsidiary)
- Expiry date (must be a future date)
- Total cost of product (sum of raw material total amounts)
- List of raw materials

### Raw Material

For each raw material the app tracks:

- Material ID
- Name of material
- Unit of measure (same options as product)
- Quantity
- Unit price
- Total price (Quantity × Unit price)
- Tax amount (10% of total price)
- Total amount (total price + tax amount)

### Pages

1. **Product List Page**

   - Shows all products in a table with:
     - Name (clickable link to edit page)
     - Category of product
     - Total cost of product (total material cost)
     - Number of raw materials
     - Separate **Edit** button

2. **Add Product Page**

   - Form to enter all product fields.
   - Section to add one or more raw materials.
   - Quantity and price updates automatically recalculate:
     - Total price
     - Tax amount @ 10%
     - Total amount
   - Displays product subtotal (sum of all raw material total amounts).
   - On save, product is added to the list.

3. **Edit Product Page**

   - Loads an existing product by ID.
   - Pre-fills product and raw material fields.
   - Allows full editing with the same calculations and validations as the Add page.

---

## Data Persistence

- Product data is stored in Redux state.
- State is automatically saved to `localStorage` so that products remain after a page refresh.

---

## Build for Production

To create an optimized production build:

```bash
npm run build
```

This generates a static build in the `build` folder which can be hosted on any static file server.

