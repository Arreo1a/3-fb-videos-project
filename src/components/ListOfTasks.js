import React from "react";

import { firebaseApp } from "../fb";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const ListOfTasks = ({ userEmail, arrayTasks, setArrayTasks }) => {
  async function deleteTask(idTaskToDelete) {
    console.log("deleted task");

    // create new array of tasks
    const newArrayOfTasks = arrayTasks.filter(
      (objectTask) => objectTask.id !== idTaskToDelete
    );
    // update database
    const documentRef = doc(firestore, `users/${userEmail}`);
    updateDoc(documentRef, { tasks: [...newArrayOfTasks] });
    // update state
    setArrayTasks(newArrayOfTasks);
  }

  return (
    <div>
      <div>
        {arrayTasks.map((objectTask) => {
          return (
            <>
              <div>
                <div>{objectTask.description}</div>
                <div>
                  <a href={objectTask.url}>
                    <button>See File</button>
                  </a>
                </div>
                <div>
                  <button onClick={() => deleteTask(objectTask.id)}>
                    Delete
                  </button>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListOfTasks;
