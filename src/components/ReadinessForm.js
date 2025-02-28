import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const ReadinessForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [employees, setEmployees] = useState('');
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/readiness-score', {
            state: {
                companyName: companyName,
                employees: employees,
                locationName: location,
                industryType: industry,
            },
        });
    };

    return (
        <div id="readinessform" className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Left Google Map */}
            <div className="md:w-1/2 w-full flex justify-center md:justify-start mt-6 mb-6 md:mt-14 md:mb-14 md:ml-16">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1234567890!2d144.9537363159045!3d-37.81720984264285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57754e6e9b93f07!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1612334567890!5m2!1sen!2sau" 
                    width="100%" 
                    height="600" 
                    className="rounded-md border-0 w-3/4 md:w-full"
                    allowFullScreen="" 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            {/* Right form */}
            <div className="md:w-1/2 w-full flex justify-center items-center mt-6 mb-6 md:mt-14 md:mb-14 px-4">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg w-full md:w-3/4 max-w-lg space-y-3"
                >
                    {/* Form content */}
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">
                        Development Report
                    </h2>
                    <div>
                        <label htmlFor="companyName" className="block text-gray-700">District</label>
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            placeholder="Enter your company name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employees" className="block text-gray-700">Tehsil</label>
                        <input
                            type="text"
                            id="employees"
                            value={employees}
                            onChange={(e) => setEmployees(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            placeholder="Enter total number of employees"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-gray-700">Village Name</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            placeholder="Enter company location"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="industry" className="block text-gray-700">Facility Type</label>
                        <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            required
                        >
                            <option value="">Select Facility Type</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Manufacturing">Agriculture</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
                        >
                            Check Development Score
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReadinessForm;
