import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonFooter,
  IonImg,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonButton,
  IonIcon,
  IonHeader,
  IonPopover,
} from "@ionic/react";
import { search } from "ionicons/icons";
import favicon from "/favicon.png";
import {
  personCircle,
  ellipsisHorizontal,
  ellipsisVertical,
} from "ionicons/icons";

const PesquisaPage = () => {
  return (
    <>
      {/* menu */}
      <IonPopover trigger="click-trigger" triggerAction="click">
        <IonContent class="ion-padding">Hello World!</IonContent>
      </IonPopover>

      {/* pagina principal */}
      <IonPage id="main-content">
        <IonContent fullscreen>
          <section className="topicos-section">
            <div className="pesquisar">
              <div className="icone">
                <IonImg
                  src="/favicon.png"
                  alt="AcademicHub, sua comunidade universitária :)"
                />
              </div>

              <div className="container-pesquisar">
                <IonSearchbar
                  className="rounded-searchbar"
                  placeholder="Escolha seu tópico"
                />

                {/* botao menu */}
                <IonButtons className="menuicon" slot="start">
                  <IonMenuButton
                    id="click-trigger"
                    menu="main-menu"
                    autoHide={false}
                  />
                </IonButtons>
              </div>
            </div>
          </section>
        </IonContent>

        {/* footer */}
        <IonFooter translucent={true}>
          <IonToolbar className="footer">
            <div className="footer-content">
              <IonImg
                className="icon-footer"
                src="/favicon.png"
                alt="AcademicHub, sua comunidade universitária :)"
              />
              <IonTitle className="titulo-footer">
                um app para universitários.
              </IonTitle>
            </div>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default PesquisaPage;
