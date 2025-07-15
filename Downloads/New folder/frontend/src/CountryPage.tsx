import { Link, useParams, Navigate } from 'react-router-dom';
import { dlFieldsData } from './countries';

const CountryPage = () => {
  const { countryName } = useParams<{ countryName: string }>();
  
  const country = dlFieldsData.find(
    c => c.name.toLowerCase() === countryName?.toLowerCase()
  );

  if (!country) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary">
          ← Back to Countries
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{country.name}</h1>
        <p className="text-xl text-muted-foreground">
          Select a state/province to view driver's license fields
        </p>
      </div>
      
      <div className="row g-4">
        {country.states.map((state) => (
          <div key={state.name} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{state.name}</h5>
                <p className="card-text text-muted">
                  {state.fields.length} driver's license fields
                </p>
                <Link
                  to={`/country/${encodeURIComponent(country.name)}/state/${encodeURIComponent(state.name)}`}
                  className="btn btn-success"
                >
                  Select State
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryPage;
