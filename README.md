# AcademicHub

**AcademicHub** is a web application built using Ionic, React with TypeScript and Firebase, designed to facilitate academic collaboration. The app enables users to create topics and engage in real-time chat discussions, making it ideal for study groups and academic communities.

## Features

- **Real-Time Chat:** Users can create topics and exchange messages in real-time.
- **Easy Authentication:** Users can easily login/register by using Google Authenticator, with security.

## Technologies Used

- **Frontend Framework:** React with TypeScript
- **Mobile Framework:** Ionic with Capacitor
- **Database and Authentication**: Firebase and Google API
- **Ensuring Secure of API keys**: Environment variable management with Vite

## Preview

https://github.com/user-attachments/assets/cb298ee1-34bf-4e14-805b-ca3f6147464b https://github.com/user-attachments/assets/d96ad859-4bc1-47f2-bfdf-4c1f3cd27812



## Setup

**To access with your browser, on your mobile or desktop:**
[academichub-eight.vercel.app](https://academichub-eight.vercel.app)

To run the project locally:

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
