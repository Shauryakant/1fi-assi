# 1Fi SDE1 Assignment - Dynamic Product & EMI Plans Web App

A full-stack Next.js web application built with **React**, **Next.js 14 (App Router)**, **Tailwind CSS**, and **MongoDB Atlas** that dynamically displays product information, color/storage variants, and mutual-fund backed EMI plans based on the 1Fi reference design specification.

---

## 🔗 Submission Links

- **GitHub Repository**: [https://github.com/Shauryakant/1fi-assi.git](https://github.com/Shauryakant/1fi-assi.git)
- **Deployed Demo Link**: `https://1fi-assi.vercel.app/` 
- **Demo Video Recording (2-5 mins)**: `https://youtu.be/EAFL3t3NrDo`

---

## ✨ Features & Core Functionality

- **Dynamic Product Pages**: Unique URLs for each product (e.g. `/products/iphone-17-pro`, `/products/samsung-s24-ultra`, `/products/macbook-pro-m3`).
- **Interactive Variant Selection**: Live finish color swatches (Cosmic Orange, Natural Titanium, Deep Navy) and storage capacity toggles (256GB, 512GB) that dynamically update product images and pricing.
- **Mutual Fund Backed EMI Plans**: Dynamic calculation of monthly installments across 3, 6, 12, 24, 36, 48, and 60-month tenures with interest rates (0% or 10.5%) and green cashback badges (`Additional cashback of ₹7,500`).
- **Pre-Approval Checkout Modal**: Interactive checkout drawer displaying the financial breakdown, loan terms, and instant pre-approval application form.
- **Active Navigation Focus**: Top navbar dynamically highlights the current active page route based on `usePathname()`.
- **Database & API Integration**: Data served from MongoDB via backend API route handlers with automatic dynamic fallback and live seeder scripts (`npm run seed` or `/api/seed`).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 14 (App Router), Tailwind CSS, Lucide Icons, TypeScript
- **Backend**: Next.js API Route Handlers (Node.js)
- **Database**: MongoDB Atlas / Mongoose ORM
- **Seeder**: TSX CLI script (`npm run seed`) & REST API (`POST /api/seed`)

---

## 📁 Database Schema

Defined in [`src/models/Product.ts`](file:///d:/tb/1fi/src/models/Product.ts) and [`database/schema.json`](file:///d:/tb/1fi/database/schema.json):

```ts
interface IVariant {
  id: string;
  color: string;
  colorCode: string;
  storage: string;
  mrp: number;
  price: number;
  image: string;
}

interface IEMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  cashbackDescription: string;
  isPopular?: boolean;
}

interface IProduct {
  name: string;
  slug: string;
  tag?: string;
  brand: string;
  category: string;
  description: string;
  variants: IVariant[];
  emiPlans: IEMIPlan[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🌐 API Endpoints & Example Responses

### 1. `GET /api/products`
Retrieves all products from the database.

#### Example Response:
```json
{
  "success": true,
  "source": "MongoDB Atlas",
  "count": 3,
  "data": [
    {
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "tag": "NEW",
      "brand": "Apple",
      "category": "Smartphones",
      "variants": [
        {
          "id": "iph17p-256-orange",
          "color": "Cosmic Orange",
          "colorCode": "#e87a3e",
          "storage": "256GB",
          "mrp": 134900,
          "price": 127400,
          "image": "https://images.unsplash.com/photo-1695048133142-1a20484d2569..."
        }
      ],
      "emiPlans": [
        {
          "id": "emi-3m",
          "tenureMonths": 3,
          "monthlyAmount": 44967,
          "interestRate": 0,
          "cashbackAmount": 7500,
          "cashbackDescription": "Additional cashback of ₹7,500"
        }
      ]
    }
  ]
}
```

---

### 2. `GET /api/products/[slug]`
Retrieves product details and available EMI plans for a specific product by slug (e.g. `iphone-17-pro`).

#### Example Response:
```json
{
  "success": true,
  "source": "MongoDB Atlas",
  "data": {
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "tag": "NEW",
    "brand": "Apple",
    "variants": [...],
    "emiPlans": [...]
  }
}
```

---

### 3. `POST /api/seed`
Reseeds the MongoDB database with default sample products and EMI plans.

#### Example Response:
```json
{
  "success": true,
  "message": "Successfully seeded MongoDB database with sample products and EMI plans!",
  "count": 3
}
```

---

## ⚙️ Setup & Installation Instructions

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Shauryakant/1fi-assi.git
cd 1fi-assi
npm install
```

### 2. Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection String Example
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/1fi?retryWrites=true&w=majority
```

### 3. Seed Database

Run the seeder script to populate your MongoDB Atlas database:

```bash
npm run seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Production Build Verification

To verify building for production:

```bash
npm run build
npm run start
```
