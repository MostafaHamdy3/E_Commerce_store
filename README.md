# Pages Store - React Native App

## Overview

This is a minimal React Native application.
The app demonstrates a simple e-commerce store with authentication, product listing, and offline persistence.
It uses DummyJSON as the backend API for authentication and product data.

### Key Features

- **Authentication**: Login via DummyJSON API with token storage and session validation
- **Auto-lock**: Locks after 10 seconds of inactivity or when the app goes to the background. Unlocks via biometrics (with password fallback)
- **Product Screens**: Displays all products and a filtered list for a specific category (Laptop)
- **Offline Support**: Persists React Query cache using MMKV for offline visibility on relaunch
- **Theme**: Light/dark theme depend on device theme

## Super-admin User Chosen

- **Username**: `noahh`
- **Password**: `noahhpass`

## Setup Steps and How to Run

### Prerequisites

- Node.js (v18+)
- Yarn or npm as package manager

### Installation

You can download the APK from here [Download APK](https://drive.google.com/file/d/1VvjnOm8_Iuut9ugQ6CINAT7GxR3rroHP/view?usp=sharing)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MostafaHamdy3/E_Commerce_store
   cd E_Commerce_store
   ```

2. **Install Dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Configuration:**
   - Ensure device supports biometrics (tested on iOS/Android emulators with fallback)

### Running the App
   ```bash
   npx expo prebuild

   npm run android
   # or
   npm run ios
   ```

## 📱 Screenshots

<div align="center">

### App Interface - White
<img src="src/assets/screenshots/login_white.jpg" width="250" alt="Login white Screen"/>
<img src="src/assets/screenshots/allProducts_white.jpg" width="250" alt="All Product white Screen"/>
<img src="src/assets/screenshots/laptop_white.jpg" width="250" alt="Laptop white Screen"/>

</div>

<div align="center">

### App Interface - Dark
<img src="src/assets/screenshots/login_dark.jpg" width="250" alt="Login dark Screen"/>
<img src="src/assets/screenshots/allProducts_dark.jpg" width="250" alt="All Product dark Screen"/>
<img src="src/assets/screenshots/laptop_dark.jpg" width="250" alt="Laptop dark Screen"/>

</div>

## 📁 Project Structure

```
store_payIn/
├── assets/                   # Static assets
│   ├── bootsplash/           # Boot splash configurations
│   └── screenshots/          # App screenshots for README
├── src/
│   ├── assets/                     # App assets
│   ├── components/           # Reusable UI components
│   ├── hooks/                   # Custom React hooks
│   ├── navigation/              # Navigation configuration
│   ├── provider/                # Context providers
│   ├── screens/                 # Screen components
│   ├── services/                # API services and configurations
│   ├── store/                   # Redux store configuration
│   ├── theme/                   # Theme configuration
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── App.tsx                         # Main app component
├── index.ts                        # Entry point
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                    # Project documentation
```

## Trade-offs and Future Improvements

### If I Had More Time

- **Migrate from DummyJSON to Firebase Authentication**
  - Implement sign-up screen.
  - Implement proper OAuth providers (Google, Apple, Facebook).
  - Add email verification and password reset functionality.

- **Complete Category System**
  - Add dynamic category navigation or filtration with all available categories.
  - Add more details in product card.
  - Add detailed product page to show all product detail.

- **Shopping Cart & Checkout**
  - Implement shopping cart with persistent storage.
  - Using FlashList instead of FlatList.



## Tech Stack 🛠️

<div align="center">

| Category          | Technologies                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **Frontend**      | ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Backend**       | ![DummyJSON](https://img.shields.io/badge/DummyJSON-FF6B6B?style=for-the-badge&logo=json&logoColor=white) |
| **Navigation**    | ![React Navigation](https://img.shields.io/badge/React_Navigation-6F52FF?style=for-the-badge) |
| **Data Fetching** | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) |
| **Storage**       | ![MMKV](https://img.shields.io/badge/MMKV-4CAF50?style=for-the-badge) |
| **State Management** | ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) |
| **Validation**    | ![Yup](https://img.shields.io/badge/Yup-FFA500?style=for-the-badge) |
| **Styling**       | ![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) |

</div>

## Author 👨‍💻

<div align="center">

**Mostafa Hamdy**  
React Native | EXPO Developer - Software Engineering

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mostafa7amdy.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/🔗_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mostafa-7amdy/)
[![Email](https://img.shields.io/badge/📧_Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mostafa44hamdy@gmail.com)

</div>
