# HappyMinds

## 🌟 Overview
**HappyMinds** is an all-in-one platform designed to help users enhance their physical and mental well-being. It offers a variety of exercise videos, allowing users to improve their fitness conveniently. Additional features include:

Blogs: A space for users and experts to share health-improving tips.
Calorie Database: Information on food calories to help users create personalized meal plans.
Progress Tracking: Tools to monitor personal health and fitness transformations over time.
HappyMinds makes staying healthy engaging and accessible!

---

## 🚀 Key Features
- **Read Blogs**: Explore high-quality articles on various topics.
- **Blog Management**: Create, edit, and manage your content seamlessly.
- **Google OAuth Integration**: Secure and quick login via Google accounts.
- **Image Processing**: Store and optimize images with Cloudinary.

---

## System Requirements
Before you begin, make sure you have the following tools installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or higher)

---

## 🛠️ Getting Started

### 1. Clone the Repository
git clone https://github.com/NhatNguyen1502/HappyMinds.git
cd HappyMinds-project

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following:

CLOUDINARY_KEY=<Your Cloudinary API Key>
CLOUDINARY_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_SECRET=<Your Cloudinary API Secret>
GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Your Google OAuth Client Secret>
MONGO_URL=<Your MongoDB Connection String>
PORT=<Application Port, default is 3000>
BASE_URL=http://localhost:3000
GOOGLE_CALLBACK_URL=<Google OAuth Callback URL>

### 4. Start the Application
For Development:
npm run start

For Production:
npm start

By default, the app will run at: http://localhost:3000.

🌐 Live Demo
Experience the live application: [HappyMinds](https://happyminds.onrender.com)

🧰 Built With
Node.js: Server-side JavaScript runtime.
Express: Web framework for building APIs.
MongoDB: NoSQL database for scalable data storage.
Cloudinary: Image storage and optimization.
Google OAuth: Secure authentication system.
Handlebars (HBS): Dynamic HTML rendering.
