import React, { useEffect, useState } from "react";

import { firebaseApp } from "../fb";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// import AddTasks from "../components/AddTasks";
// import ListOfTasks from "../components/ListOfTasks";
import ProductoForm from "./ProductosForm";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ userEmail }) => {
  // const [arrayTasks, setArrayTasks] = useState(null);
  const [archivoUrl, setArchivoUrl] = useState(null);
  const [productos, setProductos] = useState(null);
  const [currentId, setCurrentId] = useState("");

  const addOrEditPrducto = async (linkObject) => {
    try {
      if (currentId === "") {
        await firebaseApp.firestore().collection("productos").doc().set({
          linkObject,
        });
        setArchivoUrl("");
        console.log("fdsfasd", productos);
      } else {
        firebaseApp.firestore().collection("productos").doc(currentId).update({
          linkObject,
        });
        setCurrentId("");
        setArchivoUrl("");
        console.log("fdsfasd", productos);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteProducto = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await firebaseApp.firestore().collection("productos").doc(id).delete();
      // toast("link removed successfuly", {
      //   type: "error",
      //   outClose: 2000,
      // });
    }
  };

  const getLinks = async () => {
    firebaseApp
      .firestore()
      .collection("productos")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setProductos(docs);
      });
  };

  useEffect(() => {
    getLinks();
  }, []);

  // const fakeData = [
  //   { id: 1, description: "false task 1", url: "https//picsum.photos/420" },
  //   { id: 2, description: "false task 2", url: "https//picsum.photos/420" },
  //   { id: 3, description: "false task 3", url: "https//picsum.photos/420" },
  // ];

  // async function findDocumentOrCreateDocument(idDocument) {
  //   // create reference to document
  //   const documentRef = doc(firestore, `users/${idDocument}`);
  //   // search for document
  //   const consulting = await getDoc(documentRef);
  //   // check if exists
  //   if (consulting.exists()) {
  //     console.log("they had a document");

  //     const infoDoc = consulting.data();
  //     return infoDoc.tasks;
  //   } else {
  //     console.log("there was not a document");

  //     await setDoc(documentRef, { tasks: [...fakeData] });
  //     const consulting = await getDoc(documentRef);
  //     const infoDoc = consulting.data();
  //     return infoDoc.tasks;
  //   }
  // }

  // useEffect(() => {
  //   async function fetchTasks() {
  //     const fetchedTasks = await findDocumentOrCreateDocument(userEmail);
  //     setArrayTasks(fetchedTasks);
  //   }
  //   fetchTasks();
  // }, []);

  return (
    <div>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <hr />
      <div className="col-md-4 p-2">
        <ProductoForm
          {...{
            addOrEditPrducto,
            currentId,

            setArchivoUrl,
            archivoUrl,
          }}
        />
      </div>
      <div className="lala">
        {productos ? (
          <div className="kbjbkbkj">
            {productos.map((producto) => (
              <div>{producto.name}</div>
            ))}
          </div>
        ) : (
          <div>hola</div>
        )}
      </div>

      {/* <AddTasks
        arrayTasks={arrayTasks}
        setArrayTasks={setArrayTasks}
        userEmail={userEmail}
      />
      {arrayTasks ? (
        <ListOfTasks
          arrayTasks={arrayTasks}
          setArrayTasks={setArrayTasks}
          userEmail={userEmail}
        />
      ) : null} */}
    </div>
  );
};

export default Home;
