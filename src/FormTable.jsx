import React, { useState } from "react";

// WizardForm.react.jsx
// Single-file React component implementing a 3-step wizard form using Tailwind CSS.
// Usage: import WizardForm from './WizardForm.react.jsx' and render <WizardForm />
// Assumes Tailwind is already configured in your project.

export default function FormTable() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validateStep(currentStep = step) {
    const err = {};
    if (currentStep === 1) {
      if (!form.firstName.trim()) err.firstName = "First name is required";
      if (!form.lastName.trim()) err.lastName = "Last name is required";
      if (!form.email.trim()) err.email = "Email is required";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        err.email = "Email is invalid";
    }

    if (currentStep === 2) {
      if (!form.street.trim()) err.street = "Street is required";
      if (!form.city.trim()) err.city = "City is required";
      if (!form.state.trim()) err.state = "State is required";
      if (!form.zip.trim()) err.zip = "ZIP code is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function submit(e) {
    e.preventDefault();
    // Validate all steps before submit
    const valid = validateStep(1) && validateStep(2);
    if (!valid) return setStep( valid ? 3 : 1 );

    // Replace with real submit logic (API call etc.)
    // For demo, we'll just show browser alert
    alert("Form submitted:\n" + JSON.stringify(form, null, 2));
  }

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Signup Wizard</h2>
          <p className="text-sm text-gray-500">Complete the steps to finish registration.</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: "#34D399" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Step 1</span>
            <span>Step 2</span>
            <span>Step 3</span>
          </div>
        </div>

        <form onSubmit={submit}>
          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.firstName ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Last name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.lastName ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Street</label>
                <input
                  value={form.street}
                  onChange={(e) => update("street", e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    errors.street ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="123 Main St"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.city ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Chennai"
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.state ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Tamil Nadu"
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">ZIP</label>
                  <input
                    value={form.zip}
                    onChange={(e) => update("zip", e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      errors.zip ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="600001"
                  />
                  {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review your details</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  <strong>Name: </strong>
                  {form.firstName} {form.lastName}
                </p>
                <p>
                  <strong>Email: </strong>
                  {form.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {form.street}, {form.city}, {form.state} - {form.zip}
                </p>
              </div>

              <div className="text-sm text-gray-500">
                You can go back to edit any step before submitting.
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={back}
                  className="px-4 py-2 rounded-md border mr-2 hover:bg-gray-100"
                >
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {step < 3 && (
                <button
                  type="button"
                  onClick={next}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Next
                </button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">Hint: This component uses only React + Tailwind. No external libs.</div>
    </div>
  );
}
