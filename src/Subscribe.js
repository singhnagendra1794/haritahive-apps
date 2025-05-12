import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const plans = [
    { name: 'Basic Plan', price: 499 },
    { name: 'Professional Plan', price: 699 },
    { name: 'Companies Plan', price: 999 },
    { name: 'Government Officials Plan', price: 1499 },
  ];

  const handleSubscription = async (plan) => {
    try {
      // Simulate a successful subscription (payment link will be added later)
      await setDoc(doc(db, 'users', user.uid), {
        subscription: {
          plan: plan.name,
          price: plan.price,
          status: 'active',
          subscriptionId: `test_${plan.name.toLowerCase().replace(' ', '_')}_${Date.now()}`,
        },
      }, { merge: true });

      alert('Subscription successful! (Payment link will be added later)');
      navigate('/projects');
    } catch (err) {
      setError('Failed to process subscription: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Choose Your Subscription Plan</h2>
      <p className="text-lg mb-4">
        Unlock premium features like the distance calculator and more! (Payment links coming soon)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{plan.name} - ₹{plan.price}/month</h3>
            <button
              onClick={() => handleSubscription(plan)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Subscribe Now (Test Mode)
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Subscribe;