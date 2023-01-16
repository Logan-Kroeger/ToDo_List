import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonInput, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/react';
import { home, add, trash } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      
      <IonItem>
        <IonLabel>Checkbox</IonLabel>
        <IonButton slot="end">
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonButton>
        <IonButton slot="end">
          <IonIcon slot="icon-only" icon={add}></IonIcon>
        </IonButton>
        <IonCheckbox slot="end"></IonCheckbox>
      </IonItem>

      <IonItem>
        <IonCheckbox slot="start"/>
        <IonLabel>Task Name</IonLabel>
        <IonButton slot="end">
          <IonIcon slot="icon-only" icon={add}></IonIcon>
        </IonButton>
        <IonButton slot="end" color='danger'>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonButton>
      </IonItem>

      </IonContent>
    </IonPage>
  );
};

export default Home;
