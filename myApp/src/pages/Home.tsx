import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonProgressBar, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/react';
import { home, add, trash } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ToDo List</IonTitle>
          <IonProgressBar type="indeterminate"></IonProgressBar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
    


      <IonItem>
        <IonCheckbox slot="start"/>
        <IonLabel>Task Name</IonLabel>
        <IonButton slot="end" color='secondary'>
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
