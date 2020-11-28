import React, { Fragment } from "react";
import SubHeader from "./SubHeader";
import NavBar from "./NavBar";
import Input from "./InputText";

function EditWarehouse(props) {
  return (
    <div className="edit-warehouse-1">
      <NavBar />
      <div className="edit-warehouse">
        <SubHeader title="Edit Warehouse" />
        <div className="edit-warehouse__container">
          <h2 className="edit-warehouse__title">Warehouse Details</h2>
          <p className="edit-warehouse__subtitle">Warehouse Name</p>
          <Input placeholder="King West" className="edit-warehouse__input" />
          <p className="edit-warehouse__subtitle">Street Address</p>
          <Input
            placeholder="469 King Street West"
            className="edit-warehouse__input"
          />
          <p className="edit-warehouse__subtitle">City</p>
          <Input placeholder="Toronto" className="edit-warehouse__input" />
          <p className="edit-warehouse__subtitle">Country</p>
          <Input placeholder="CAN" className="edit-warehouse__input" />
        </div>
        <div className="edit-warehouse__container">
          <h2 className="edit-warehouse__title">Contact Details</h2>
          <p className="edit-warehouse__subtitle">Contact Name</p>
          <Input placeholder="Graene Lyon" className="edit-warehouse__input" />
          <p className="edit-warehouse__subtitle">Position</p>
          <Input
            placeholder="Warehouse Manager"
            className="edit-warehouse__input"
          />
          <p className="edit-warehouse__subtitle">Phone Number</p>
          <Input
            placeholder="+1 (647)504-0911"
            className="edit-warehouse__input"
          />
          <p className="edit-warehouse__subtitle">Email</p>
          <Input
            placeholder="example@gmail.com"
            className="edit-warehouse__input"
          />
        </div>
        <div className="edit-warehouse__btn-container">
          <button className="edit-warehouse__btn edit-warehouse__btn--cancel">
            Cancel
          </button>
          <button className="edit-warehouse__btn edit-warehouse__btn--save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditWarehouse;
