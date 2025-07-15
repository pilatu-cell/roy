import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { dlFieldsData } from './countries';
import {submitFormData} from './api'

const StateDetailPage = () => {
  const { countryName, stateName } = useParams<{ countryName: string; stateName: string }>();
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const country = dlFieldsData.find(
    c => c.name.toLowerCase() === countryName?.toLowerCase()
  );
  
  const state = country?.states.find(
    s => s.name.toLowerCase() === stateName?.toLowerCase()
  );

  if (!country || !state) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const normalizeDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${dd}${mm}${yyyy}`;
    };
    
    const processedFormData = { ...formData };

    ['DBA', 'DBB', 'DBD'].forEach((key) => {
      const value = processedFormData[key];
      if (value && typeof value === 'string') {
        processedFormData[key] = normalizeDate(value);
      }
    });
    
    const fullFormData = {
      ...processedFormData,
      country: country.name,
      state: state.name,
    };
    
    
    try {
      const response= await submitFormData( 'http://localhost:30/getDlBarcode', fullFormData)
      if (response.url) {
        setDownloadUrl(response.url);
        alert('Form submitted successfully!');
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    }
   //console.log('Form submitted:', formData);
    
  };

  const handleInputChange = (code: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [code]: value
    }));
  };

  const renderField = (field: any) => {
    const commonProps = {
      id: field.code,
      className: "form-control",
      required: field.required,
      value: formData[field.code] || '',
      placeholder: field.placeholder || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
        handleInputChange(field.code, field.type === 'number' ? Number(e.target.value) : e.target.value)
    };

    switch (field.type) {
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return <input {...commonProps} type="date" />;
      case 'number':
        return <input {...commonProps} type="number" min="0" />;
      default:
        return <input {...commonProps} type="text" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link 
          to={`/country/${encodeURIComponent(country.name)}`} 
          className="btn btn-outline-secondary"
        >
          ← Back to {country.name}
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{state.name}, {country.name}</h1>
        <p className="text-xl text-muted-foreground">
          Driver's License Fields
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header">
              <h3 className="card-title mb-0">Enter Driver's License Information</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {state.fields.map((field) => (
                    <div key={field.code} className="col-md-6 mb-3">
                      <label htmlFor={field.code} className="form-label">
                        {field.label}
                        {field.required && <span className="text-danger"> *</span>}
                        <small className="text-muted ms-1">({field.code})</small>
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit Driver's License Data
                  </button>
                  {downloadUrl && (
                    <div className="mt-3">
                      <a 
                        href={`http://localhost:30${downloadUrl}`} 
                        download 
                        className="btn btn-success btn-lg"
                      >
                        Download My Barcode
                      </a>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDetailPage;
