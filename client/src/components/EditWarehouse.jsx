import React from "react";
import SubHeader from "./SubHeader";
import NavBar from "./NavBar";
import axios from "axios";

class EditWarehouse extends React.Component {
  state = {
    name: "",
    address: "",
    city: "",
    country: "",
    contact: {
      contactName: "",
      position: "",
      phone: "",
      email: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // handleContactNameChange = (e) => {
  //   this.setState({
  //     [this.state.contact.name]: e.target.value,
  //   });
  // };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      !this.state.name ||
      !this.state.address ||
      !this.state.city ||
      !this.state.country ||
      !this.state.contactName ||
      !this.state.position ||
      !this.state.phone ||
      !this.state.email
    ) {
      alert("All fields must be filled");
    } else {
      this.submitEditedWarehouse();
    }
  };

  submitEditedWarehouse = () => {
    axios.post("http://localhost:5000", {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      contact: {
        name: this.state.contactName,
        position: this.state.position,
        phone: this.state.phone,
        email: this.state.email,
      },
    });
  };

  render(props) {
    return (
      <div className="edit-warehouse">
        <NavBar />
        <section className="edit-warehouse__container">
          <form className="edit-warehouse__form">
            <SubHeader
              title="Edit Warehouse"
              className="edit-warehouse__subheader"
            />
            <h2 className="edit-warehouse__title">Warehouse Details</h2>
            <h3 className="edit-warehouse__subtitle"> Warehouse Name</h3>
            <input
              name="name"
              type="text"
              className="edit-warehouse__input"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <h3 className="edit-warehouse__subtitle">Street Address</h3>
            <input
              name="address"
              type="text"
              className="edit-warehouse__input"
              value={this.state.address}
              onChange={this.handleChange}
            />
            <h3 className="edit-warehouse__subtitle"> City</h3>
            <input
              name="city"
              type="text"
              className="edit-warehouse__input"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <h3 className="edit-warehouse__subtitle"> Country</h3>
            <input
              name="country"
              type="text"
              className="edit-warehouse__input"
              value={this.state.country}
              onChange={this.handleChange}
            />
            <h2 className="edit-warehouse__title">Contact Details</h2>
            <h3 className="edit-warehouse__subtitle">Contact Name</h3>
            <input
              name="contactName"
              type="text"
              className="edit-warehouse__input"
              value={this.state.contactName}
              onChange={this.handleChange}
            />
            <h3 className="edit-warehouse__subtitle">Position</h3>
            <input
              name="position"
              type="text"
              className="edit-warehouse__input"
              value={this.state.position}
              onChange={this.handleChange}
            />
            <h3 className="edit-warehouse__subtitle">Phone Number</h3>
            <input
              name="phone"
              type="number"
              className="edit-warehouse__input"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <h3 className="edit-warehouse__subtitle">Email</h3>
            <input
              name="email"
              type="email"
              className="edit-warehouse__input"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div className="edit-warehouse__btn-container">
              <button className="edit-warehouse__btn edit-warehouse__btn--cancel">
                Cancel
              </button>
              <button
                type="submit"
                className="edit-warehouse__btn edit-warehouse__btn--save"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </section>
        <div className="edit-warehouse__copyright-section">
          <p className="edit-warehouse__copyright">
            © InStock Inc. All Rights Reserved
          </p>
        </div>
      </div>
    );
  }
}
export default EditWarehouse;
