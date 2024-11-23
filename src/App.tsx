import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Topicos from "./pages/Topicos";
import Chat from "./pages/Chat";

import { firebaseApp } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp); // Initialize Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);  // User is logged in
      } else {
        setIsLoggedIn(false);  // User is not logged in
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
<IonApp>
  <IonReactRouter>
    <IonSplitPane contentId="main">
      <IonRouterOutlet id="main">
        <Switch>
          <Route path="/" exact>
            <Redirect to={isLoggedIn ? "/topicos" : "/folder/Login"} />
          </Route>
          <Route path="/folder/Login" exact>
            <Login />
          </Route>
          <Route path="/topicos" exact>
            <Topicos />
          </Route>
          <Route path="/chat/:topicId" component={Chat} />
        </Switch>
      </IonRouterOutlet>
    </IonSplitPane>
  </IonReactRouter>
</IonApp>
  );
};

export default App;