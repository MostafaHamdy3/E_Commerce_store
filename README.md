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

### Tech Stack

- React Native
- TypeScript
- React Navigation
- React Query
- MMKV
- Redux Toolkit
- NativeWind (Tailwind CSS for RN)

## Super-admin User Chosen

- **Username**: `noahh`
- **Password**: `noahhpass`

## Setup Steps and How to Run

### Prerequisites

- Node.js (v18+)
- Yarn or npm as package manager

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MostafaHamdy3/E_Commerce_store
   cd store_payIn
   ```

2. **Install Dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **iOS Setup (if targeting iOS):**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Environment Configuration:**
   - Ensure device supports biometrics (tested on iOS/Android emulators with fallback)

### Running the App
   ```bash
   npm run android
   # or
   npm run ios
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
  - Implement shopping cart with persistent storage



## Author 👨‍💻

<div align="center">

**Mostafa Hamdy**  
React Native | EXPO Developer - Software Engineering

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mostafa7amdy.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/🔗_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mostafa-7amdy/)
[![Email](https://img.shields.io/badge/📧_Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mostafa44hamdy@gmail.com)

</div>
