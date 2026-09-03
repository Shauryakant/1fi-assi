# 1Fi SDE1 Assignment - Dynamic Product & EMI Plans Web App

A full-stack Next.js web application built with **MongoDB Atlas**, **React**, and **Tailwind CSS** that dynamically displays product variants and mutual fund backed EMI plans based on the 1Fi reference design.

![1Fi EMI Design](https://raw.githubusercontent.com/placeholder/1fi-demo.png)

---

## 🚀 Features

- **Dynamic Product Pages**: Unique URLs for products (e.g. `/products/iphone-17-pro`, `/products/samsung-s24-ultra`, `/products/macbook-pro-m3`).
- **Interactive Variant Selection**: Live finish color swatches and storage capacity toggles (e.g., 256GB / 512GB).
- **Mutual Fund Backed EMI Plans**: Dynamic calculation of monthly installments, interest rates (0% or 10.5%), and cashback callouts.
- **Instant Pre-Approval Modal**: Interactive checkout flow allowing users to select an EMI plan and complete instant verification.
- **MongoDB Atlas Integration**: Fully connected to MongoDB with Mongoose schema, automatic fallback mock data layer, and live seed scripts (`npm run seed` or `/api/seed`).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons
- **Backend**: Next.js API Route Handlers (Node.js)
- **Database**: MongoDB Atlas / Mongoose ORM
- **Seeder**: TSX script + API endpoint

---

## 📁 Database Schemas

### Product Schema (`Product`)

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
Retrieves all products from the MongoDB database.

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
Retrieves full details for a specific product by slug (e.g. `iphone-17-pro`).

#### Example Response:
```json
{
  "success": true,
  "source": "MongoDB Atlas",
  "data": {
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "tag": "NEW",
    "variants": [...],
    "emiPlans": [...]
  }
}
```

---

### 3. `POST /api/seed`
Reseeds the MongoDB database with default products and EMI plans.

#### Example Response:
```json
{
  "success": true,
  "message": "Successfully seeded MongoDB database with sample products and EMI plans!",
  "count": 3
}
```

---

## ⚙️ Setup & Run Instructions

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd 1fi-sde1-assignment
npm install
```

### 2. Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://udemy:udemy123@cluster0.ywipqhb.mongodb.net/1fi
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

## 🧪 Verification & Build

To test building for production:

```bash
npm run build
npm run start
```
