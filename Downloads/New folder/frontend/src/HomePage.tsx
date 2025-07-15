//import React from 'react';
import { Link } from 'react-router-dom';
import { dlFieldsData } from './countries';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Driver's License Field Explorer</h1>
        <p className="text-xl text-muted-foreground">
          Select a country to explore state-specific driver's license fields
        </p>
      </div>
      
      <div className="row g-4 justify-content-center">
        {dlFieldsData.map((country) => (
          <div key={country.name} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{country.name}</h5>
                <p className="card-text text-muted">
                  {country.states.length} states/provinces available
                </p>
                <Link
                  to={`/country/${encodeURIComponent(country.name)}`}
                  className="btn btn-primary"
                >
                  Get States
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;