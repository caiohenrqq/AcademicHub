# AcademicHub

**AcademicHub** is a web application built using Ionic, React with TypeScript and Firebase, designed to facilitate academic collaboration. The app enables users to create topics and engage in real-time chat discussions, making it ideal for study groups and academic communities.

## Features

- **Real-Time Chat:** Users can create topics and exchange messages in real-time.
- **Easy Authentication:** Users can easily login/register by using Google Authenticator, with security.

## Technologies Used

- **Frontend Framework:** React with TypeScript
- **Mobile Framework:** Ionic with Capacitor
- **Database and Authentication**: Firebase and Google API

## Setup

**To access with your browser, mobile or desktop:**
[academichub-eight.vercel.app](https://academichub-eight.vercel.app)

1. Clone the repository:
   ```bash
   git clone https://github.com/caiohenrqq/AcademicHub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ionic serve
   ```
   
## Notes

- Ensure the required environment variables for Firebase configuration are set. For example, create a ```.env``` file with the necessary variables from Vite.
  ```
  VITE_FIREBASE_API_KEY=...
  VITE_FIREBASE_AUTH_DOMAIN=...
  VITE_FIREBASE_PROJECT_ID=...
  VITE_FIREBASE_STORAGE_BUCKET=...
  VITE_FIREBASE_MESSAGING_SENDER_ID=...
  ```
  
## License

This project is licensed under the MIT License.
