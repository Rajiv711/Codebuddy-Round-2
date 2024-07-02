import {  useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updateErrors, updateCurrentStep ,validatationUpdate1} from '../Redux/reducers/FormSlice';

const Form1 = () => {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form.formData);
  const errors = useSelector((state) => state.form.errors);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =/^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+{}:"<>?~`-]).{8,}$/;

    if (!formData.emailId || !emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Please Enter the valid email address";
    }
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password ="Password must contain at least 2 capital letters, 2 small letters, 2 numbers, and 2 special characters";
    }
    dispatch(updateErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handlleSaveAndNext = () => {
    if (validate()) {
      dispatch(validatationUpdate1())
       dispatch(updateCurrentStep(2));
       
      navigate("/form2");
    }
  };
  return (
      <div className="container mx-auto p-4 max-w-xl ">

      <h2 className="mb-4 p-3 text-center text-4xl">Form1</h2>
      <div className="mb-4">
        <label className="mb-2 block">Email ID:</label>
        <input
          type="text"
          value={formData.emailId}
          onChange={(e) =>
            dispatch(updateFormData({
              ...formData,
              emailId: e.target.value,
            }))
          }
          className="w-full border p-2"
          placeholder="Email ID"
        />
        {errors.emailId && <span className="text-red-500">{errors.emailId}</span>}
      </div>
      <div className="mb-4">
        <label className="mb-2 block">Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            dispatch(updateFormData({
              ...formData,
              password: e.target.value,
            }))
          }
          className="w-full border p-2"
          placeholder="Password"
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </div>

      <div className="flex justify-between items-center">
        <button disabled className="flex items-center mr-2 rounded bg-gray-500 p-2 text-white">
          <Icon icon="mdi:arrow-left" />
          Back
        </button>
        <button className="flex items-center mr-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600">Save
          <Icon icon="mdi:file"/>
           </button>
        <button className="flex items-center  rounded bg-green-500 p-2 text-white hover:bg-green-600" 
         onClick={()=>handlleSaveAndNext()}
        >Save and Next
          <Icon icon="mdi-arrow-right"/>
        </button>
      </div>

      </div>
  );
};

export default Form1;
