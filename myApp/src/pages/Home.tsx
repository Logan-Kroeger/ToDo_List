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
  isCompl: boolean;
  parent?: task;
}

// Array of all tasks
let task_array: task[] = [];

const Home: React.FC = () => {

  // -------- Alerts --------
  const [inputValue, setInputValue] = useState("");
  const [addAlert] = useIonAlert();
  const [editAlert] = useIonAlert();
  const [deleteAlert] = useIonAlert();

  // -------- Input --------
  const [newItem, setNewItem] = useState('');

  // Update text input value
  const handleInputChange = (event: any) => {
    setNewItem(event.target.value);
  };

  // Create the new item
  const handleButtonClick = () => {

    // Invalid input handler
    if (newItem === ''){
      addAlert({
        header: 'Warning',
        message: 'Enter a valid task name!',
        buttons: ['OK'],
      })
      console.log(`Invalid task name`);
    }
    // Append the new task to the list
    else{
      console.log(`Item has been added`);
      task_array.push({ name: newItem, depth: 0, isCompl: false });
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

    // Obtain new name from user to update using an alert
    editAlert({
      header: 'Enter the updated task name',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: (data) => {
            setInputValue(data.newData);
            // Update the name to the new input value
            task_array[index].name = data.newData;
            console.log("New input value:", task_array[index].name);
          }
        }
      ],
      inputs: [
        {
          name: 'newData',
          type: 'text',
          value: task_array[index].name,
          placeholder: 'Enter new data'
        }
      ],
    })
  }

  // Alert for deleting item on the list
  const deleteItem = (index: number) => {
    console.log(`Delete button clicked (index: ${index})`);

    // Delete confirmation alert
    deleteAlert({
      header: 'Delete Task',
      message: 'Are you sure you want to perform this action?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log("Action confirmed");
            // Perform the action
          }
        }
      ]
    });
  }

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
      </IonContent>
    </IonPage>
  );
};

export default Home;
