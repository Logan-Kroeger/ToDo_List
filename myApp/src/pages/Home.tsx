// Ion react components
import {  
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  IonInput,
  //IonProgressBar, 
  IonItem, 
  IonLabel, 
  IonCheckbox, 
  IonButton, 
  IonIcon,
  IonAlert
} from '@ionic/react';

// Ion icon imports
import { 
  add, 
  trash,  
  pencil
} from 'ionicons/icons';

// Other imports
import { useState } from 'react';
import { useIonAlert } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  // -------- Alerts --------
  const [showAlert, setShowAlert] = useState(false);
  const [presentAlert] = useIonAlert();

  // -------- List items --------
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  interface MyObject {
    name: string;
    depth: number;
    isValid: boolean;
    parent?: MyObject;
  }
  
  const myArray: MyObject[] = [];

  myArray.push({ name: "Object 1", depth: 1, isValid: true });
  myArray.push({ name: "Object 2", depth: 2, isValid: false });
  myArray.push({ name: "Object 3", depth: 3, isValid: true });

  myArray[1].parent = myArray[0]

  // Update text input value
  const handleInputChange = (event: any) => {
    setNewItem(event.target.value);
  };

  // Create the new item
  const handleButtonClick = () => {
    if (newItem === ''){
      presentAlert({
        header: 'Warning',
        message: 'Please enter a valid task name!',
        buttons: ['OK'],
      })
    }
    else{
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  // Complete the item from the list
  const completeItem = () => {
    console.log("Checkbox clicked");
  }

  // Add a new item to the list
  const addItem = () => {
    console.log("Add button clicked");
  }

  // Edit the name of the item on the list
  const editItem = () => {
    console.log("Edit button clicked");
  }

  // Alert for deleting item on the list
  const deleteItem = () => {
    console.log("Delete button clicked");
    setShowAlert(true);
  }

  // Cancel the delete
  const handleCancel = () => {
    setShowAlert(false);
  };

  // Confirm the delete
  const handleConfirm = () => {
    console.log('Confirmed!');
    setShowAlert(false);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='custom_title'>TODO List</IonTitle>
        </IonToolbar>
        <IonItem>
          <IonInput value={newItem} onIonChange={handleInputChange} placeholder="Task name"></IonInput>
          <IonButton onClick={handleButtonClick}>Add item</IonButton>
        </IonItem>
      </IonHeader>
      <IonContent className="ion-padding">
    

      <IonList>
        {myArray.map((item, index) => (
          <IonItem key={index}>
            <IonCheckbox slot="start" onClick={() => completeItem()}/>
            <IonLabel>{item.name}</IonLabel>
            <IonButton color='primary' fill='clear' onClick={() => addItem()}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
            <IonButton color='secondary' fill='clear' onClick={() => editItem()}>
              <IonIcon slot="icon-only" icon={pencil}></IonIcon>
            </IonButton>
            <IonButton color='danger' fill='clear' onClick={() => deleteItem()}>
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonButton>
          </IonItem>
        ))}
      </IonList>


      <IonAlert
        isOpen={showAlert}
        onDidDismiss={handleCancel}
        header={'Confirm Action'}
        message={'Are you sure you want to delete this item?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: handleCancel,
          },
          {
            text: 'Confirm',
            handler: handleConfirm
          }
        ]}
      />

      </IonContent>
    </IonPage>
  );
};

export default Home;
