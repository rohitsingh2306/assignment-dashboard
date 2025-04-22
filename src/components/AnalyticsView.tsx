import React from 'react';
import { User } from '../data/mockUser'; // adjust path as needed

interface AnalyticsViewProps {
  selectedUser: User | null;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ selectedUser }) => {
  return (
    <div>
      <h2>Analytics View</h2>
      {selectedUser ? (
        <p>Analyzing data for: {selectedUser.name}</p>
      ) : (
        <p>No user selected.</p>
      )}
    </div>
  );
};

export default AnalyticsView;
