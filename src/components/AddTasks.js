import React from "react";

import { firebaseApp } from "../fb";

import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AddTasks = ({ userEmail, arrayTasks, setArrayTasks }) => {
  let downloadUrl;

  async function uploadTask(e) {
    e.preventDefault();
    const description = e.target.formDescription.value;
    if (!description) {
      alert("place a description");
      return;
    }

    const theFormImage = e.target.formImage.value;
    if (!theFormImage) {
      alert("place a image");
      return;
    }
    // create new array of tasks
    const newArrayOfTasks = [
      ...arrayTasks,
      {
        id: +new Date(),
        description: description,
        url: downloadUrl,
      },
    ];
    // update database
    const documentRef = doc(firestore, `users/${userEmail}`);
    updateDoc(documentRef, { tasks: [...newArrayOfTasks] });
    // update state
    setArrayTasks(newArrayOfTasks);
    // Clean form
    e.target.formDescription.value = "";
  }

  async function fileHandler(e) {
    // detect file
    const localFile = e.target.files[0];
    // load it to firebase storage
    const fileRef = ref(storage, `documents/${localFile.name}`);
    await uploadBytes(fileRef, localFile);
    // obtain download url
    downloadUrl = await getDownloadURL(fileRef);
  }

  return (
    <div>
      <form onSubmit={uploadTask}>
        <div>
          <input type="text" placeholder="Description" id="formDescription" />
        </div>
        <div>
          <input
            type="file"
            placeholder="Upload File"
            id="formImage"
            onChange={fileHandler}
          />
        </div>
        <button type="submit">Upload Task</button>
      </form>
      <hr />
    </div>
  );
};

export default AddTasks;
