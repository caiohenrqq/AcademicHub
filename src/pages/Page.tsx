import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonImg,
  IonContent,
  IonPage,
  IonTitle,
} from "@ionic/react";
import usericon from "/usericon.svg";
import passwordicon from "/passwordicon.svg";
import loginicon from "/login.svg";
import cadastraricon from "/cadastrar.svg"
import "./Page.css";

const Page: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="login-section">
          <IonImg
            src="/favicon.png"
            alt="AcademicHub, sua comunidade universitária :)"
          />

          <IonTitle>
            Academic<span className="hub-letras">Hub</span>
          </IonTitle>

          <div className="login-inputs">
            <IonItem>
              <IonIcon slot="start" icon={usericon} aria-hidden="true" />
              <IonInput placeholder="Escreva seu e-mail"></IonInput>
            </IonItem>

            <IonItem>
              <IonIcon slot="start" icon={passwordicon} aria-hidden="true" />
              <IonInput
                placeholder="Escreva sua senha"
                type="password"
              ></IonInput>
            </IonItem>

            <a className="esqueceu-senha" href="#">Esqueceu sua senha?</a>
            
            <IonButton shape="round">
              Entrar
              <IonIcon slot="icon-only" icon={loginicon}></IonIcon>
            </IonButton>
            <IonButton shape="round">
              Cadastrar
              <IonIcon slot="icon-only" icon={cadastraricon}></IonIcon>
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Page;
