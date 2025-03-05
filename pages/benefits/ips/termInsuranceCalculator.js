import { useState } from "react";

export default function TermInsuranceCalculator({ formConfig = {} }) {
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSelectedOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  let isConfigFetched = false;
  if (formConfig) {
    isConfigFetched = formConfig.length > 0 ? true : false;
  }
  return (
    <>
      {isConfigFetched ? (
      <form onSubmit={handleSubmit} className="form-container">
        <h3>{formConfig?.fields?.configName}</h3>

        {formConfig?.fields?.config?.fields
          .filter((field) => field.type === "radio")
          .map((field) => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              <div className="field-input">
                {field.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name={field.id}
                      value={option.value}
                      checked={formData[field.id] === option.value}
                      required={field.required}
                      onChange={handleChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="dropdown-group">
          {formConfig?.fields?.config?.fields
            .filter((field) => field.type === "dropdown")
            .map((field) => {

                return (
              <div key={field.id} className="form-group">
                <label htmlFor={field.id}>{field.label}</label>
                <div key={field.id} className="field-input">
                  <select
                    name={field.id}
                    onChange={handleChange}
                    required={field.required}
                    >
                    <option value="">{field.default}</option>
                    {field.options
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}   
                  </select>
                </div>
              </div>
            )})}
          </div>


        {formConfig?.fields?.config?.fields
          .filter(
            (field) => field.type !== "radio" && field.type !== "dropdown"
          )
          .map((field) => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              <div className="field-input">
                <input
                  type={field.type}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

        {/* Conditional Fields */}
        {formConfig?.fields?.config?.conditionalFields && Object.entries(formConfig?.fields?.config?.conditionalFields).map(
          ([key, fields]) => {
            if (
              selectedOption["residentStatus"] === key ||
              selectedOption["tobaccoConsumer"] === key
            ) {
              return fields.map((field) => (
                <div key={field.id} className="form-group">
                  <label htmlFor={field.id}>{field.label}</label>
                  <div className="field-input">
                    {field.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        name={field.id}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </div>
              ));
            }
            return null;
          }
        )}

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      ) : null
      }
    </>
  );
}
