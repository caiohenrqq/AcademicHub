import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import { SpeedInsights } from "@vercel/speed-insights/next"

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

import Login from "./pages/Login";
import Topicos from "./pages/Topicos";
import Chat from "./pages/Chat";
import { UserProvider, useUser } from "../src/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import "./pages/Style.css"; 

const AuthRedirect: React.FC = () => {
  const { user } = useUser();
  return <Redirect to={user ? "/topicos" : "/folder/Login"} />;
};

const App: React.FC = () => {
  return (
    <div className="mobile-wrapper">
      <IonApp>
        <UserProvider>
        <SpeedInsights/>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <IonRouterOutlet id="main">
                <Switch>
                  <Route path="/" exact>
                    <AuthRedirect />
                  </Route>
                  <Route path="/folder/Login" exact>
                    <Login />
                  </Route>
                  <ProtectedRoute
                    path="/topicos"
                    exact
                    render={(props) => <Topicos {...props} />}
                  />
                  <Route path="/chat/:topicId" component={Chat} />
                </Switch>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </UserProvider>
      </IonApp>
    </div>
  );
};

export default App;
