import React, { useState } from 'react';
import axios from 'axios';

const LoanEligibilityForm = () => {
  // Use empty strings instead of null to prevent React "uncontrolled input" warnings
  const [formData, setFormData] = useState({
    Gender: "",
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    Applicant_Income: "",
    Coapplicant_Income: "",
    Loan_Amount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Property_Area: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null); // To store the prediction result

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Parse to number if the field is numeric and not empty
    const parsedValue = (type === 'number' || name === 'Credit_History') && value !== ""
      ? Number(value) 
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null); // Reset previous results
    
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict', formData);
      console.log(res.data?.prediction);
      setResult({ status: 'success', data: res.data?.prediction });
    } catch (error) {
      console.log(error);
      setResult({ status: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = "w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 shadow-sm";
  const labelStyles = "block text-sm font-semibold text-gray-600 mb-1.5";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="bg-white/80 backdrop-blur-lg p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-4xl border border-white">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-2">
            Loan Eligibility Predictor
          </h2>
          <p className="text-gray-500">Fill out the details below to check your eligibility instantly.</p>
        </div>

        {/* Result Banner */}
        {result && (
          <div className={`mb-8 p-4 rounded-xl text-center font-semibold text-lg animate-fade-in-down ${
            result.status === 'error' ? 'bg-red-100 text-red-700' : 
            result
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-orange-100 text-orange-700 border border-orange-200'
          }`}>
            {result.status === 'error' ? result.message : `Prediction Result: ${result.data ? "Eligible" : "Not Eligible"}`}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- Section 1: Personal Details --- */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div>
                <label className={labelStyles}>Gender</label>
                <select name="Gender" value={formData.Gender} onChange={handleChange} required className={inputStyles}>
                  <option value="" disabled>Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Marital Status</label>
                <select name="Married" value={formData.Married} onChange={handleChange} required className={inputStyles}>
                  <option value="" disabled>Select Status</option>
                  <option value="Yes">Married</option>
                  <option value="No">Single</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Dependents</label>
                <input type="number" min="0" name="Dependents" value={formData.Dependents} onChange={handleChange} required placeholder="0" className={inputStyles} />
              </div>

              <div>
                <label className={labelStyles}>Education</label>
                <select name="Education" value={formData.Education} onChange={handleChange} required className={inputStyles}>
                  <option value="" disabled>Select Education</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Not Graduate">Not Graduate</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Self Employed</label>
                <select name="Self_Employed" value={formData.Self_Employed} onChange={handleChange} required className={inputStyles}>
                  <option value="" disabled>Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

            </div>
          </div>

          {/* --- Section 2: Financial & Loan Details --- */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial & Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className={labelStyles}>Applicant Income ($)</label>
                <input type="number" name="Applicant_Income" value={formData.Applicant_Income} onChange={handleChange} required placeholder="e.g. 4500" className={inputStyles} />
              </div>

              <div>
                <label className={labelStyles}>Coapplicant Income ($)</label>
                <input type="number" name="Coapplicant_Income" value={formData.Coapplicant_Income} onChange={handleChange} required placeholder="e.g. 1500" className={inputStyles} />
              </div>

              <div>
                <label className={labelStyles}>Loan Amount (in thousands)</label>
                <input type="number" name="Loan_Amount" value={formData.Loan_Amount} onChange={handleChange} required placeholder="e.g. 130" className={inputStyles} />
              </div>

              <div>
                <label className={labelStyles}>Loan Term (Days/Months)</label>
                <input type="number" name="Loan_Amount_Term" value={formData.Loan_Amount_Term} onChange={handleChange} required placeholder="e.g. 360" className={inputStyles} />
              </div>

              <div>
                <label className={labelStyles}>Credit History</label>
                <select name="Credit_History" value={formData.Credit_History} onChange={handleChange} required className={inputStyles}>
                  <option value="" disabled>Select Credit History</option>
                  <option value={1}>1 - Good / Meets Guidelines</option>
                  <option value={0}>0 - Bad / Fails Guidelines</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Property Area</label>
                <select name="Property_Area" value={formData.Property_Area} onChange={handleChange} required className={inputStyles}>
                  <option value="" disabled>Select Area</option>
                  <option value="Urban">Urban</option>
                  <option value="Semiurban">Semiurban</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 mt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-xl text-white font-bold text-lg transition-all duration-300 transform shadow-lg ${
                isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Predict Eligibility'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default LoanEligibilityForm;