import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {Button} from "./styles/Button";

const Wrapper = styled.section`
  padding: 4rem 0;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;


const Box = styled.div`
  width: 45%;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
`;

const Heading = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 10px;
`;

const styles = {
  listItem: {
    border: '2px solid #ddd',
    backgroundColor: '#f5f5f5',
    margin: '5px',
    padding: '10px',
  },
};

const ConButton = styled.button`
  text-decoration: none;
  max-width: auto;
  background-color: rgb(98 84 243);
  color: rgb(255 255 255);
  padding: 1.3rem 2.3rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  margin-top: 15px;

  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }

  &.consumer-button {
   
  }

  a {
    text-decoration: none;
    color: rgb(255 255 255);
    font-size: 1.8rem;
  }
`;


const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.white};
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   font-size: 1rem;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primaryDark};
//   }
// `;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

`;

// const ModalContent = styled.div`
//   background-color: ${({ theme }) => theme.colors.lightGray};
// //   padding: 2rem;
//   border-radius: 8px;
//   width: 100%;
// //   max-width: 800px;
// `;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 0.8rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: white;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  width: 55rem;

  input,
  textarea,
  select {
    padding: 1.2rem 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.darkGray};
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
  }

  input[type="submit"] {
    padding: 1.2rem 2.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
      padding: 20px;
      margin: 10px;
    }
  }
`;

 const defaultConsumers = [
  { name: 'Abhishek', battery: '35', location: 'Location A' },
  { name: 'Jatin',  battery: '42',  location: 'Location B' }
];

const defaultSuppliers = [
  { name: 'Supplier 1', email: 'supplier1@example.com', location: 'Location X', chargingRate: 0.15 }, // Example charging rate
  { name: 'Supplier 2', email: 'supplier2@example.com', location: 'Location Y', chargingRate: 0.12 }
];

const Connect = () => {
  const [buyers, setBuyers] = useState(defaultConsumers);
  const [sellers, setSellers] = useState([]);
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const modalRef = useRef(null);


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

    // Function to get the user's current location (latitude and longitude)
    const getUserLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLatitude(latitude);
              setLongitude(longitude);
            //   setUserAddress("Helllo")
              setUserAddress(`Latitude: ${latitude} | Longitude: ${longitude}`)
            //   getAddressFromCoordinates(latitude, longitude);
            },
            (error) => {
              console.error('Error getting user location:', error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
    
      // Function to get the complete address from latitude and longitude using reverse geocoding
      const getAddressFromCoordinates = async (lat, lng) => {
        try {
          const response = await fetch(
            // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
            `http://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const formattedAddress = data.results[0].formatted_address;
            setUserAddress(formattedAddress);
          } else {
            setUserAddress('Address not found');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setUserAddress('Error fetching address');
        }
      };

      const handleBuyerSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBuyer = {
      name: formData.get('name'),
      email: formData.get('email'),
      battery: userAddress, // Assuming userAddress is the location (battery) data
      chargingRequestInitiation: formData.get('chargingRequestInitiation'),
      energyRequirement: formData.get('energyRequirement'),
      chargingRate: formData.get('chargingRate'),
      batteryStateOfCharge: formData.get('batteryStateOfCharge')
    };
    setBuyers([...buyers, newBuyer]);
    setShowBuyerForm(false);
  };

  const handleCloseBuyerForm = () => {
    setShowBuyerForm(false);
  };

  const handleCloseSellerForm = () => {
    setShowSellerForm(false);
  };

  const handleAddBuyer = () => {
    setShowBuyerForm(true);
  };

  const handleAddSeller = () => {
    setShowSellerForm(true);
  };

  const handleSellerSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const sellerDetails = Object.fromEntries(formData.entries());
    setSellers([...sellers, sellerDetails]);
    setShowSellerForm(false);
    event.target.reset();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowBuyerForm(false);
        setShowSellerForm(false);
      }
      getUserLocation()
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



const calculateEstimatedMoney = (buyerLocation, supplierLocation) => {
  const supplier = defaultSuppliers.find(s => s.location === supplierLocation);
  const chargingRate = supplier ? supplier.chargingRate : 0;
  // Assuming some logic to calculate estimated money based on charging rate and distance
  return chargingRate * 100; // Simple example calculation
};

  return (
    <Wrapper>
      <h2 className="common-heading">Electric Vehicle Energy Management</h2>

      <Container>
        {/* Box for Buyers (Request Charging) */}
        <Box>
          <Heading>People Requesting Charging</Heading>

        <List style={{ border: '1px solid lightGray', backgroundColor: 'lightGray', padding: '10px', borderRadius: '5px' }}>
        {buyers.map((buyer, index) => (
          <ListItem key={index} style={{ marginBottom: '10px', padding: '15px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>Name:</strong> {buyer.name}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Battery Percentage:</strong> {buyer.battery}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '20px' }}>
                <strong>Charging Rate (kWh):</strong> {defaultSuppliers[0].chargingRate.toFixed(2)} kWh
              </div>
              <div>
                <strong>Estimated Money:</strong> ${calculateEstimatedMoney(buyer.location, defaultSuppliers[0].location).toFixed(2)}
              </div>
            </div>
          </ListItem>
        ))}
      </List>

          <ConButton  onClick={handleAddBuyer}>Add Consumer</ConButton>
          {showBuyerForm && (
            <ModalWrapper>
              {/* <ModalContent> */}
              <CloseButton onClick={handleCloseBuyerForm}>X</CloseButton>
                <Form onSubmit={handleBuyerSubmit}>
                  <Heading>Add Consumer Details</Heading>
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="text" disabled={true} onChange={()=>{}} value={userAddress===null ?"" : userAddress} name="location" placeholder="Location" required />
                  <input
                    type="datetime-local"
                    name="chargingRequestInitiation"
                    placeholder="Charging Request Initiation"
                    required
                  />
                  {/* <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    required
                  /> */}
                  <input
                    type="number"
                    name="energyRequirement"
                    placeholder="Energy Requirement (kWh)"
                    required
                  />
                  <input
                    type="number"
                    name="chargingRate"
                    placeholder="Charging Rate (kW)"
                    required
                  />
                  <input
                    type="number"
                    name="batteryStateOfCharge"
                    placeholder="Battery State of Charge (%)"
                    required
                  />
                  <input type="submit" value="Submit" />
                </Form>
              {/* </ModalContent> */}
            </ModalWrapper>
          )}
        </Box>

        {/* Box for Sellers (Offer Discharging) */}
        <Box>
          <Heading>People Offering Discharging</Heading>
          <List>
            {sellers.map((seller, index) => (
              <ListItem key={index}>{seller.name}</ListItem>
            ))}
          </List>
          <ConButton onClick={handleAddSeller}>Add Seller</ConButton>
          {showSellerForm && (
            <ModalWrapper>
              {/* <ModalContent> */}
              <CloseButton onClick={handleCloseSellerForm}>X</CloseButton>
                
                <Form onSubmit={handleSellerSubmit}>
                <Heading>Add Distributor Details</Heading>
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="text" name="location" placeholder="Location" required />
                  <input
                    type="datetime-local"
                    name="chargingRequestInitiation"
                    placeholder="Charging Request Initiation"
                    required
                  />
                  <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    required
                  />
                  <input
                    type="number"
                    name="energyRequirement"
                    placeholder="Energy Requirement (kWh)"
                    required
                  />
                  <input
                    type="number"
                    name="chargingRate"
                    placeholder="Charging Rate (kW)"
                    required
                  />
                  <input
                    type="number"
                    name="batteryStateOfCharge"
                    placeholder="Battery State of Charge (%)"
                    required
                  />
                  <input type="submit" value="Submit" />
                </Form>
              {/* </ModalContent> */}
            </ModalWrapper>
          )}
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Connect;
