// Ion react components
import {  
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  IonInput,
  IonProgressBar, 
  IonItem, 
  IonLabel, 
  IonCheckbox, 
  IonButton, 
  IonIcon,
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

// Used for the deletion and completion indexing
let current_depth:number;
let end_index:number;

// Used for creating sub-tasks
let new_depth:number;

const Home: React.FC = () => {

  // -------- Alerts --------
  const [inputValue, setInputValue] = useState("");
  const [addAlert] = useIonAlert();
  const [addSubAlert] = useIonAlert();
  const [editAlert] = useIonAlert();
  const [deleteAlert] = useIonAlert();

  // -------- Input --------
  const [newItem, setNewItem] = useState('');

  // ---- Progress Bar -----
  let [completion, setCompletion] = useState(0);

  // ------ Task Data ------
  let [task_array, set_tasks] = useState<task[]>([]);

  // Update the progress bar
  const updateBar = () => {

    let count = 0;
    const len = task_array.length
    for (let i = 0; i < task_array.length; i++) {
      if (task_array[i].isCompl){
        count++;
      }
    }
    setCompletion(count/len);
  }

  // Update text input value
  const handleInputChange = (event: any) => {
    setNewItem(event.target.value);
  };

  // Create the new base item
  const addBaseItem = () => {

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

  // Complete an item from the list
  const completeItem = (event: any, index: number) => {
    const checked  = event.detail.checked;
    
    if (checked){

      task_array[index].isCompl = true;
      current_depth = task_array[index].depth
      
      // Complete all sub-items
      for (let i = index+1; i < task_array.length; i++){

        if (task_array[i].depth > current_depth){
          task_array[i].isCompl = true;
          console.log(`${task_array[i].name} is ${checked ? 'complete' : 'not complete'}`);
        }
        else{
          break;
        }
      }

      // Complete respective parent items
      let flag = true;
      // Forward
      for (let i = index+1; i < task_array.length; i++) {
        if (task_array[i].depth === current_depth){
          if (!task_array[i].isCompl){
            flag = false;
            break;
          }
        }
        else{
          break;
        }
      }

      //Backward
      let prev_depth = current_depth;
      if (flag && current_depth > 0){
        for (let i = index-1; i >= 0; i--) {
          current_depth = task_array[i].depth;

          if (!task_array[i].isCompl && prev_depth === current_depth){
            flag = false;
            break;
          }
          else if (!task_array[i].isCompl && prev_depth > current_depth){
            task_array[i].isCompl = true;
          }

          prev_depth = current_depth;

          if (current_depth === 0){
            flag = false;
            break;
          }
        }
      }

      const new_tasks =  [...task_array];
      set_tasks(new_tasks);
    }
    else{
      task_array[index].isCompl = false;
    }
  }

  // Add a new item to the list
  const addSubItem = (index: number) => {
    console.log(`Add button clicked (index: ${index})`);

    addSubAlert({
      header: 'Enter the new sub-task name',
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

            // Add the new sub-task
            new_depth = task_array[index].depth + 1;
            const new_tasks =  [...task_array];
            new_tasks.splice(index+1, 0, { name: data.newData, depth: new_depth, isCompl: false });
            set_tasks(new_tasks);
          }
        }
      ],
      inputs: [
        {
          name: 'newData',
          type: 'text',
          placeholder: 'Sub-task name...'
        }
      ],
    })
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
            
            // Obtain the indexes for deletion to occur
            end_index = -1;
            current_depth = task_array[index].depth;
            
            for (let i = index+1; i < task_array.length; i++){
              if (task_array[i].depth <= current_depth){
                end_index = i;
                break;
              }
            }

            if (end_index === -1){
              end_index = task_array.length;
            }

            const new_tasks =  [...task_array];
            new_tasks.splice(index, end_index-index);
            set_tasks(new_tasks);

            console.log("Deletion confirmed");
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
          <IonButton onClick={addBaseItem}>Add item</IonButton>
          <IonButton color={'success'} onClick={updateBar}>Update Progress</IonButton>
        </IonItem>
        <IonProgressBar value={completion} color={`success`}/>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList lines='full'>

          {task_array.map((item, index) => (
            <IonItem key={index} style={{ paddingLeft: `${(item.depth)*30}px` }}>
              <IonCheckbox slot="start" checked={item.isCompl} onIonChange={(event) => completeItem(event, index)}/>
              <IonLabel>{item.name}</IonLabel>
              <IonButton color='primary' fill='clear' onClick={() => addSubItem(index)}>
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
