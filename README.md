# 1Fi Marketplace

A responsive **1Fi Marketplace** experience built as part of the 1Fi SDE Intern Assignment.

The project extends the Shop experience with a dedicated Marketplace where users can browse products, select variants, compare EMI plans, enter customer details, and submit an EMI purchase request.

🔗 **Live Demo:** https://1fi-marketplace-ruddy.vercel.app/
🔗 **GitHub link:** https://github.com/Harshitx3/1Fi-Sde-Assignment-


---

## ✨ Features

### 🛍️ Shop

* 1Fi-inspired Shop interface
* Top Brands section
* Nearby Stores section
* 1Fi Marketplace section
* Responsive layout for mobile and desktop

### 🛒 Marketplace

* Product listing with reusable product cards
* Product images
* Product name and pricing
* Product search
* Product details page
* Product variants
* Variant-specific product images
* Dynamic pricing based on selected variant
* Relevant product specifications

### 💳 EMI Experience

* Multiple EMI plans for products
* EMI plan selection
* Selected EMI state
* Clear EMI amount and tenure information
* Purchase CTA
* Customer information form
* Mobile number validation
* Order/request summary
* Request submission flow

After submitting an EMI purchase request, the user receives a clear **"Request Submitted"** success state.

> Note: This is a frontend assignment project. No real payment, banking, loan approval, or financial transaction is performed.

### 🌓 Theme

* Light mode
* Dark mode
* Theme toggle
* UI remains consistent across both themes

### 📱 Responsive Design

The application is designed for:

* Mobile
* Tablet
* Desktop
* Large desktop screens

The desktop layout uses the available viewport width while preserving the mobile experience.

---

# 🏗️ System Design

The application follows a simple component-based architecture that keeps the UI, data, state, and future API integration separated.

```text
                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Shop Screen   │
                         └────────┬────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │  1Fi Marketplace    │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │  Product Listing    │
                       │  Search / Filter     │
                       └──────────┬──────────┘
                                  │
                           Select Product
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │  Product Details    │
                       └──────────┬──────────┘
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
        ┌─────────────────┐              ┌─────────────────┐
        │ Variant State   │              │   EMI State     │
        │ Image / Price   │              │ Selected Plan   │
        └────────┬────────┘              └────────┬────────┘
                 │                                │
                 └───────────────┬────────────────┘
                                 ▼
                       ┌─────────────────────┐
                       │ Customer Details    │
                       │ Name / Mobile       │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │   Request Summary   │
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │  Request Submitted  │
                       └─────────────────────┘
```

### Data Flow

The current project uses structured mock data instead of hardcoding product information directly inside UI components.

```text
Product / EMI Data
        │
        ▼
   Data Layer
        │
        ▼
Reusable React Components
        │
        ▼
       UI
```

This makes the application easier to maintain and allows the mock data layer to be replaced by a backend API in the future.

### Future API Architecture

The application can be extended without significantly changing the UI architecture:

```text
Frontend
   │
   ▼
API Service Layer
   │
   ▼
Backend API
   │
   ├── Products
   ├── Product Variants
   ├── EMI Plans
   └── Purchase Requests
```

---

# 🧩 Component Architecture

The application is built using reusable React components rather than putting all functionality into a single page.

Example structure:

```text
src/
│
├── components/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── MarketplaceSearch
│   ├── EMIPlan
│   └── ...
│
├── data/
│   └── products.js
│
├── pages/
│   ├── Shop
│   ├── Marketplace
│   ├── ProductDetails
│   └── ...
│
├── assets/
│
├── App.jsx
└── ...
```

Reusable components make it easier to introduce additional products, EMI plans, and UI changes without duplicating logic.

---

# 🔄 Application Flow

```text
Shop
  ↓
1Fi Marketplace
  ↓
Browse Products
  ↓
Search Product
  ↓
Product Details
  ↓
Select Variant
  ↓
Select EMI Plan
  ↓
Enter Customer Details
  ↓
Review Request
  ↓
Submit Request
  ↓
Request Submitted
```

---

# 🧠 State Management

The application manages important user interactions through React state.

Examples include:

* Selected product
* Selected product variant
* Selected EMI plan
* Customer name
* Customer mobile number
* Theme preference
* Purchase/request status

This keeps the UI synchronized with the user's current selections.

For example:

```text
Variant Selection
      ↓
Selected Variant State
      ↓
Product Image + Price Update
```

and:

```text
EMI Selection
      ↓
Selected EMI State
      ↓
Request Summary
      ↓
Submit Request
```

---

# 🎨 UI / UX

The UI was designed to remain consistent with the existing 1Fi visual language while extending the Shop experience with Marketplace functionality.

Focus areas include:

* Clean financial-product UI
* Clear hierarchy
* Simple navigation
* Responsive layouts
* Clear EMI information
* Obvious selection states
* Accessible form feedback
* Light/Dark theme support
* Minimal unnecessary animations

---

# ⚙️ Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Vercel** for deployment

---

# 🚀 Running Locally

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd <PROJECT_FOLDER>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

# 🌐 Deployment

The application is deployed on Vercel.

**Live Application:**

https://1fi-marketplace-ruddy.vercel.app/

---

# 📌 Engineering Considerations

The project focuses on:

* Reusable components
* Structured product and EMI data
* Separation of UI and data
* State-driven interactions
* Responsive design
* Loading and empty states
* Form validation
* Error handling
* Maintainable component structure
* Future API integration readiness

The current purchase flow is intentionally a frontend simulation. In a production implementation, the request submission would connect to a backend service responsible for authentication, order/request processing, EMI eligibility, and transaction handling.

---

# 👨‍💻 Assignment

Built as part of the **1Fi SDE Intern Assignment**.

**Live Demo:**
https://1fi-marketplace-ruddy.vercel.app/
