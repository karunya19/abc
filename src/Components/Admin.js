import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AddPhotoDetails from "./AddPhotoDetails";
import axios from "axios";
import UpdateCarDetails from "./UpdatePhotoDetails";

function Admin() {
  const [PhotoDetails, setPhotoDetails] = useState([]);
  const [showAddModel, setshowAddModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});
  const [showEditModel, setshowEditModel] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);
  let fetchProducts = async () => {
    let jwtToken = localStorage.getItem("jwtToken");
    let token = `Bearer ${jwtToken}`;

    let res = await axios.get("http://localhost:8080/admindashboard", {
      headers: { Authorization: token },
    });

    console.log(res.data.carDetails);
    if (res.data.error) {
      alert(res.data.message);
    } else {
      let fetchProducts = res.data.carDetails;
      setCarDetails(fetchProducts);
    }
  };

  let hideAddModel = () => {
    setshowAddModel(false);
  };

  let updateProduct = (car) => {
    setshowEditModel(true);
    setselectedProduct(car);
  };
  let hideEditModel = () => {
    setshowEditModel(false);
  };

  let deleteProduct = async (carId) => {
    try {
      let jwtToken = localStorage.getItem("jwtToken");
      let token = `Bearer ${jwtToken}`;
      let res = await axios.delete(
        `http://localhost:8080/admindashboard/${photoId}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(res.data.carDetails);
      if (res.data.error) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
        fetchProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "110px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>photo id</th>
            <th>photo Name</th>
            <th>photo theme</th>
            <th>photo link</th>
            <th>photo Caption</th>
            {/* <th>Break System</th>
            <th>milage</th>
            <th>showroom price </th>
            <th>onroad price</th>
            <th>seating Capacity</th>
            <th>engine capacity</th>
            <th>gear Type</th> */}

            {/* <th>
              <button
                className="btn btn-warning"
                onClick={() => {
                  setshowAddModel(true);
                }}
              >
                ADD
              </button>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {PhotoDetails.map((photo) => {
            return (
              <tr key={photo.photoId}>
                <td>
                  <img
                    width={"300px"}
                    height="250px"
                    src={car.imageURL}
                    alt={car.carName}
                  ></img>
                </td>
                <td>{photo.photoId}</td>
                <td>{photo.photoName}</td>
                <td>{photo.photoTheme}</td>
                <td>{photo.photoLink}</td>
                <td>{photo.photoCaption}</td>
                {/* <td>{car.breakSystem}</td>
                <td>{car.mileage}</td>
                <td>{car.showroomPrice}</td>
                <td>{car.onroadPrice}</td>
                <td>{car.seatingCapacity}</td>
                <td>{car.engineCapacity}</td>
                <td>{car.gearType}</td> */}

                <td>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                      editProduct(photo);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteProduct(photo.photoId);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddCarDetails
        showAddModel={showAddModel}
        hideAddModel={hideAddModel}
        fetchProducts={fetchProducts}
      />
      <UpdateCarDetails
        selectedProduct={selectedProduct}
        showEditModel={showEditModel}
        hideEditModel={hideEditModel}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default Admin;
