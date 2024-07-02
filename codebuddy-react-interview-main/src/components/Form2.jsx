import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, updateErrors, updateCurrentStep,validatationUpdate2 } from "../Redux/reducers/FormSlice";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const Form2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);
  const errors = useSelector((state) => state.form.errors);
  const previousFormValidated=useSelector((state)=>state.form.validatedForm1)

useEffect(()=> { if(!previousFormValidated){
    alert("Please fill the Form 1 first")
    navigate("/form1")
}},[]
)

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    if (
      !formData.firstName ||
      !nameRegex.test(formData.firstName) ||
      formData.firstName.length < 2 ||
      formData.firstName.length > 50
    ) {
      newErrors.firstName =
        "First name must be between 2 and 50 characters and only contain alphabets";
    }
    if (formData.lastName && !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last name can only contain alphabets";
    }
    if (!formData.address || formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters long";
    }
    dispatch(updateErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    dispatch(updateCurrentStep(1))
    navigate("/form1");
  };

  const handleSaveAndNext = () => {
    if (validate()) {
      dispatch(updateCurrentStep(3));
      dispatch(validatationUpdate2())
      navigate("/form3");
    }
  };

  const handleSave=()=>{
    useNavigate("/form2")
  }

  return (
    <div className="container mx-auto p-4 max-w-xl ">
      <h2 className="mb-12 text-center  text-4xl font-extrabold">Form 2</h2>
      <div className="mb-4">
        <label className="mb-4 block">First Name:</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => dispatch(updateFormData({...formData, firstName: e.target.value }))}
          className="w-full border p-2"
        />
        {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
        <label className="mb-4 block">Last Name:</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => dispatch(updateFormData({...formData, lastName: e.target.value }))}
          className="border w-full p-2"
        />
        {errors.lastName&&<span className="text-red-500">{errors.lastName}</span>}
        <label className="mb-4 block">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            dispatch(
              updateFormData({
                ...formData,
                address: e.target.value,
              }),
            )
          }
          className="border w-full p-2"
        />
        {errors.address&&<span className="text-red-500">{errors.address}</span>}
      </div>
      <div className="flex justify-between items-center">
        <button  className="flex items-center mr-2 rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
        onClick={()=>handleBack()}
        >
          <Icon icon="mdi:arrow-left" 
          
          />
          Back
        </button>
        <button className="flex items-center mr-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600">Save
          <Icon icon="mdi:file"/>
           </button>
        <button className="flex items-center  rounded bg-green-500 p-2 text-white hover:bg-green-600" 
         onClick={()=>handleSaveAndNext()}
        >Save and Next
          <Icon icon="mdi-arrow-right"/>
        </button>
      </div>
    </div>
  );
};

export default Form2;
