import React, { useState, useEffect } from "react";
import { firebaseApp } from "../fb";

const ProductoForm = (props) => {
  const initialStateValues = {
    name: "",
    description: "",
    // archivo: "",
    precio: "",
    cantidad: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const handleSumbit = (e) => {
    e.preventDefault();

    props.addOrEditPrducto(values);
    setValues({ ...initialStateValues });
    // props.setProductoUrl([]);
  };

  const handleInputChance = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getProductoById = async (id) => {
    const docu = await firebaseApp
      .firestore()
      .collection("productos")
      .doc(id)
      .get();
    setValues({ ...docu.data() });
    props.setProductoUrl({ ...docu.archivo() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getProductoById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form className="card card-body" onSubmit={handleSumbit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del Producto"
          name="name"
          onChange={handleInputChance}
          value={values.name}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-ligh">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="precio"
          placeholder="Precio"
          onChange={handleInputChance}
          value={values.precio}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-ligh">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="cantidad"
          placeholder="cantidad"
          onChange={handleInputChance}
          value={values.cantidad}
        />
      </div>
      <img src={props.archivoUrl}></img>
      {/* <input type="file" onChange={archivoHandler} /> */}
      <div style={{ height: "15px" }}></div>
      <div className="form-group">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="write a description"
          onChange={handleInputChance}
          value={values.description}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "save" : "Update"}
      </button>
    </form>
  );
};
export default ProductoForm;
