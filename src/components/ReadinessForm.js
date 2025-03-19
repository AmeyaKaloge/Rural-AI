import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReadinessForm = () => {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    const navigate = useNavigate();

    // Fetch all states from backend
    useEffect(() => {
        fetch('http://localhost:5000/api/states')
            .then((res) => res.json())
            .then((data) => setStates(data))
            .catch((error) => console.error('Error fetching states:', error));
    }, []);

    // Fetch districts when state is selected
    useEffect(() => {
        if (selectedState) {
            fetch(`http://localhost:5000/api/districts/${selectedState}`)
                .then((res) => res.json())
                .then((data) => setDistricts(data))
                .catch((error) => console.error('Error fetching districts:', error));
        } else {
            setDistricts([]);
            setBlocks([]);
            setVillages([]);
        }
    }, [selectedState]);

    // Fetch blocks when district is selected
    useEffect(() => {
        if (selectedState && selectedDistrict) {
            fetch(`http://localhost:5000/api/blocks/${selectedState}/${selectedDistrict}`)
                .then((res) => res.json())
                .then((data) => setBlocks(data))
                .catch((error) => console.error('Error fetching blocks:', error));
        } else {
            setBlocks([]);
            setVillages([]);
        }
    }, [selectedDistrict]);

    // Fetch villages when block is selected
    useEffect(() => {
        if (selectedState && selectedDistrict && selectedBlock) {
            fetch(`http://localhost:5000/api/villages/${selectedState}/${selectedDistrict}/${selectedBlock}`)
                .then((res) => res.json())
                .then((data) => setVillages(data))
                .catch((error) => console.error('Error fetching villages:', error));
        } else {
            setVillages([]);
        }
    }, [selectedBlock]);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/readiness-score', {
            state: {
                state: selectedState,
                district: selectedDistrict,
                block: selectedBlock,
                village: selectedVillage,
            },
        });
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-4">Select Location</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-lg">
                
                {/* State Selection */}
                <div>
                    <label className="block text-gray-700">State</label>
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    >
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                {/* District Selection */}
                <div>
                    <label className="block text-gray-700">District</label>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        disabled={!selectedState}
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Block Selection */}
                <div>
                    <label className="block text-gray-700">Block / Tehsil</label>
                    <select
                        value={selectedBlock}
                        onChange={(e) => setSelectedBlock(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        disabled={!selectedDistrict}
                    >
                        <option value="">Select Block</option>
                        {blocks.map((block) => (
                            <option key={block} value={block}>
                                {block}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Village Selection */}
                <div>
                    <label className="block text-gray-700">Village / Habitation</label>
                    <select
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        disabled={!selectedBlock}
                    >
                        <option value="">Select Village</option>
                        {villages.map((village) => (
                            <option key={village.name} value={village.name}>
                                {village.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                    >
                        Proceed
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReadinessForm;
