import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "../src/firebase";

interface UserContextProps {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      console.log("Attempting Google sign-in...");
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result.user);
      setUser(result.user); // Make sure to update user context
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during Google login:", error.message);
        alert("Login failed: " + error.message); // Notify the user about the failure
      } else {
        console.error("Unknown error during Google login:", error);
        alert("Login failed: Unknown error occurred.");
      }
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <UserContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};