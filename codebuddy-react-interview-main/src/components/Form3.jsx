import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateCurrentStep,
  updateErrors,
  updateFormData,
  validatationUpdate2,
  clearForm,
} from "../Redux/reducers/FormSlice";

const Form3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);
  const errors = useSelector((state) => state.form.errors);
  const previousFormValidated = useSelector((state) => state.form.validatedForm2);

  useEffect(() => {
    if (!previousFormValidated) {
      alert("Please fill out previous forms first");
      navigate("/form1");
    }
  });

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    if (
      !formData.countryCode ||
      (formData.countryCode === "+91" && formData.countryCode === "+1")
    ) {
      newErrors.countryCode = "Please select the country codes between +91 and +1 only";
    }
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Only 10 digit phone Number is allowed";
    }
    if (!formData.acceptTermsAndCondition) {
      newErrors.checkBox = "Please accept the terms and conditions";
    }
    dispatch(updateErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    dispatch(updateCurrentStep(2));
    navigate("/form2");
  };
  const handleSave = () => {
    if (validate()) {
      const submitData = { ...formData };
      delete submitData.acceptTermsAndCondition;

      fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify(submitData),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Success:', data);
          dispatch(clearForm());
          navigate("/posts");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="container mx-auto max-w-xl p-4">
      <h2 className="mb-4 p-3 text-center text-4xl">Form 3</h2>
      <div className="mb-4">
        <label className="mb-2 block">Country Code:</label>
        <select
          type="text"
          className="w-full border p-2"
          value={formData.countryCode}
          onChange={(e) =>
            dispatch(
              updateFormData({
                countryCode: e.target.value,
              }),
            )
          }
        >
          <option value="" className="text-black">
            -
          </option>
          <option value="+91" className="text-black">
            India (+91)
          </option>
          <option value="+1" className="text-black">
            America (+1)
          </option>
        </select>
        {errors.countryCode && <span className="text-red-500">{errors.countryCode}</span>}
      </div>
      <div className="mb-4">
        <label className="mb-2 block">Phone Number:</label>
        <input
          type="text"
          className="w-full border p-2"
          placeholder="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) =>
            dispatch(
              updateFormData({
                phoneNumber: e.target.value,
              }),
            )
          }
        />
        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
      </div>
      <div className="mb-4">
        <label mb-2 block>
          <input
            type="checkbox"
            className="mr-2"
            checked={formData.acceptTermsAndCondition}
            onChange={(e) =>
              dispatch(
                updateFormData({
                  acceptTermsAndCondition: e.target.checked,
                }),
              )
            }
          />
          Accept Terms & Conditions
        </label>

        {errors.checkBox && <div className="text-red-500">{errors.checkBox}</div>}
      </div>
      <button onClick={handleBack} className="mr-2 rounded bg-gray-500 p-2 text-white">
        Back
      </button>
      <button onClick={handleSave} className="rounded bg-blue-500 p-2 text-white">
        Save
      </button>
    </div>
  );
};

export default Form3;
