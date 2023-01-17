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

// Task object
interface task {
  name: string;
  depth: number;
  isValid: boolean;
  parent?: task;
}

// Array of all tasks
let task_array: task[] = [];

const Home: React.FC = () => {

  // -------- Alerts --------
  const [showAlert, setShowAlert] = useState(false);
  const [presentAlert] = useIonAlert();

  // -------- List items --------
  //const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  // Update text input value
  const handleInputChange = (event: any) => {
    setNewItem(event.target.value);
  };

  // Create the new item
  const handleButtonClick = () => {
    
    // Invalid input handler
    if (newItem === ''){
      presentAlert({
        header: 'Warning',
        message: 'Please enter a valid task name!',
        buttons: ['OK'],
      })
      console.log(`Invalid task name`);
    }
    // Append the new task to the list
    else{
      console.log(`Item has been added`);
      task_array.push({ name: newItem, depth: 0, isValid: false });
      console.log(task_array[task_array.length-1]);
      setNewItem('');
    }
  };

  // Complete the item from the list
  const completeItem = (event: any, index: number) => {
    const checked  = event.detail.checked;
    console.log(`Checkbox ${index} is ${checked ? 'checked' : 'not checked'}`);
  }

  // Add a new item to the list
  const addItem = (index: number) => {
    console.log(`Add button clicked (index: ${index})`);
  }

  // Edit the name of the item on the list
  const editItem = (index: number) => {
    console.log(`Edit button clicked (index: ${index})`);
  }

  // Alert for deleting item on the list
  const deleteItem = (index: number) => {
    console.log(`Delete button clicked (index: ${index})`);
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
        {task_array.map((item, index) => (
          <IonItem key={index} style={{ paddingLeft: `${(item.depth)*20}px` }}>
            <IonCheckbox slot="start" onIonChange={(event) => completeItem(event, index)}/>
            <IonLabel>{item.name}</IonLabel>
            <IonButton color='primary' fill='clear' onClick={() => addItem(index)}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
            <IonButton color='secondary' fill='clear' onClick={() => editItem(index)}>
              <IonIcon slot="icon-only" icon={pencil}></IonIcon>
            </IonButton>
            <IonButton color='danger' fill='clear' onClick={() => deleteItem(index)}>
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
