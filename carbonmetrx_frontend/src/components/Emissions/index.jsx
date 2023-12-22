// src/components/EmissionsForm.jsx

import React, { useState } from 'react';

function EmissionsForm() {
    const [emissionsData, setEmissionsData] = useState({
        source: '',
        amount: '',
        unit: '',
    });

    const [errors, setErrors] = useState({});

    // Function to validate form data
    const validate = () => {
        let tempErrors = {};
        if (!emissionsData.source) tempErrors.source = "Source is required.";
        if (!emissionsData.amount) tempErrors.amount = "Amount is required.";
        else if (emissionsData.amount <= 0) tempErrors.amount = "Amount must be positive.";
        if (!emissionsData.unit) tempErrors.unit = "Unit is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Here, you would typically make an API call to submit the data
        // For example:
        // await api.post('/emissions', emissionsData);
    };

    // JSX for the form
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Source:</label>
                <input
                    type="text"
                    value={emissionsData.source}
                    onChange={e => setEmissionsData({...emissionsData, source: e.target.value})}
                />
                {errors.source && <div className="error">{errors.source}</div>}
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={emissionsData.amount}
                    onChange={e => setEmissionsData({...emissionsData, amount: e.target.value})}
                />
                {errors.amount && <div className="error">{errors.amount}</div>}
            </div>
            <div>
                <label>Unit:</label>
                <input
                    type="text"
                    value={emissionsData.unit}
                    onChange={e => setEmissionsData({...emissionsData, unit: e.target.value})}
                />
                {errors.unit && <div className="error">{errors.unit}</div>}
            </div>
            <button type="submit">Submit Emissions Data</button>
        </form>
    );
}

export default EmissionsForm;  // Correctly exporting the component