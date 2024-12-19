import { useEffect, useState } from "react";
import CommonForm from "./common/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  newAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "../redux/addressSlice";
import AddressCard from "./AddressCard";
import { useToast } from "./ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressInfo , isLoading } = useSelector((state) => state.address);
  console.log("from address",addressInfo) ;
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressInfo.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          newAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);

  console.log(addressInfo, "addressList");

  if (isLoading) {
    return <p>Loading addresses...</p>; // Show loading state while fetching
  }

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressInfo && addressInfo.length > 0 ? (
          addressInfo.map((singleAddressItem) => (
            <AddressCard
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <p>No addresses available</p> // If no addresses are found
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
