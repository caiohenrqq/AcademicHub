import React from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Certifique-se de importar corretamente

import Login from "./pages/Login";
import Topicos from "./pages/Topicos";
import ChatView from "./pages/ChatView";

/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

// Importando o hook useNavigate corretamente (para React Router v6)
import { useNavigate } from "react-router-dom";

setupIonicReact();

const App: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate(); // Usando useNavigate para navegação

  // Função de login com Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate("/topicos"); // Redireciona após o login com useNavigate
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              {user ? <Redirect to="/topicos" /> : <Redirect to="/folder/Login" />}
            </Route>
            <Route path="/folder/Login" exact={true}>
              <Login signInWithGoogle={signInWithGoogle} />
            </Route>
            <Route path="/topicos" exact={true}>
              <Topicos />
            </Route>
            <Route path="/topicos/:topicName" exact={true}>
              <ChatView />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
