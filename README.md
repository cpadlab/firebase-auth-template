# Firebase Authentication Template in Vite + React

## 🚀 Introduction
Authentication is a fundamental part of any modern web application. Implementing it from scratch can be complex, but thanks to Firebase and React, it is now easier than ever.

This free template provides a ready-to-use authentication system using Firebase Authentication, along with Firestore for user data storage. Built with Vite, React, and TailwindCSS, it ensures a fast, lightweight, and highly customizable structure.

## 📌 Key Features
- ✅ User registration and login with Firebase Authentication
- ✅ Authentication via Google and GitHub
- ✅ Modern and responsive interface with TailwindCSS
- ✅ User data storage in Firestore
- ✅ Easy integration with other Firebase services

## 🛠 Installation and Setup
To start using this template, follow these steps:

### 1️⃣ Clone the repository
```bash
git clone http://github.com/cpadlab/firebase-auth-template
cd firebase-auth-template
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure Firebase
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Obtain the necessary credentials and add them to a `.env` file at the root of the project:
```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

## 📂 Project Structure
```
📦 firebase-auth-template
├── 📂 src
│   ├── 📂 components
│   │   ├── 📂 Auth
│   │   │   ├── 📂 buttons
│   │   │   │   ├── GithubButton.jsx
│   │   │   │   ├── GoogleButton.jsx
│   │   │   ├── 📂 forms
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   ├── 📂 config
│   │   ├── firebase.js
│   ├── 📂 hooks
│   │   ├── useAuthPreferences.jsx
│   ├── 📂 pages
│   │   ├── 📂 Auth
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   ├── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
└── styles.css
```

## 🔑 Authentication System

### Firebase Configuration
Firebase is initialized in `config/firebase.js` using environment variables.

### Routing
The application uses `react-router-dom` for navigation:
```jsx
<Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth/register" element={<RegisterPage />} />
    <Route path="/auth/login" element={<LoginPage />} />
</Routes>
```

### User Registration
User registration is handled in `RegisterForm.jsx`:
```jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setEmailError("Required field"); return; }
    if (!password) { setPasswordError("Required field"); return; }
    setLoading(true);
    
    const response = await HandleRegister({ email, password, navigate });
    if (response) navigate("/auth/login");
    else setLoading(false);
};
```

### Firebase Registration Function
The `HandleRegister` function in `HandleRegister.js` communicates with Firebase:
```javascript
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const HandleRegister = async ({ email, password }) => {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        
        await setDoc(doc(db, "users", uid), {
            email,
            role: "user",
            created: new Date(),
            activeAccount: true
        });
        return true;
    } catch (error) {
        console.error("Registration error", error);
        return false;
    }
};
```

### Social Authentication
Authentication via Google and GitHub is handled with `signInWithPopup()`:
```javascript
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

export const HandleGoogleRegister = async ({ navigate }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        navigate("/");
    } catch (error) {
        console.error("Google registration error", error);
    }
};

export const HandleGitHubRegister = async ({ navigate }) => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        navigate("/");
    } catch (error) {
        console.error("GitHub registration error", error);
    }
};
```

## 🎨 Customization

### Changing Styles
TailwindCSS is used for styling. Modify button styles easily in `RegisterForm.jsx`:
```jsx
<button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Sign Up
</button>
```

### Adding New Authentication Providers
To support Twitter authentication, modify `HandleRegister.js`:
```javascript
import { TwitterAuthProvider } from "firebase/auth";

const twitterProvider = new TwitterAuthProvider();
export const HandleTwitterRegister = async () => {
    const auth = getAuth();
    try {
        await signInWithPopup(auth, twitterProvider);
    } catch (error) {
        console.error(error);
    }
};
```

## 🔮 Future Updates
- 🌙 Dark mode for better user experience in low-light environments.

## 📌 Get Started Now!
Download the template and start building your authentication-powered application in minutes! 🚀

