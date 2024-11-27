import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../src/firebase";
import { Browser } from "@capacitor/browser";

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
      setUser(currentUser);
      setLoading(false);
    });

    // Obter o resultado do redirect
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result:", result.user);
          setUser(result.user);
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
      setLoading(false);
    };
  
    fetchRedirectResult();
  }, [auth]);

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider); // Use signInWithPopup
    setUser(result.user); // Atualiza o usuário no contexto
    console.log("Usuário logado com sucesso:", result.user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro no login com Google:", error.message);
      alert("Falha no login: " + error.message); // Alerta ao usuário
    } else {
      console.error("Erro desconhecido:", error);
      alert("Falha no login: erro desconhecido.");
    }
  }
};

  const logout = () => {
    auth.signOut()
      .then(() => setUser(null))
      .catch((error) => console.error("Error during logout:", error));
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
