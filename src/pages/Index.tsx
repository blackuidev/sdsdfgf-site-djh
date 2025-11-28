import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home'); // Redirect to the home page
    }, [navigate]);

    return (
        <div>
            {/* This component now redirects to /home */}
        </div>
    );
};

export default Index;