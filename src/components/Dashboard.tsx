import React, { useState } from 'react';
import { Box, Tabs, Tab, Button, Typography } from '@mui/material';
import MetricsView from './MetricsView';
import AnalyticsView from './AnalyticsView';
import UserModal from './UserModal';
import { User } from '../data/mockUser';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Metrics View" />
          <Tab label="Analytics View" />
        </Tabs>

        <Box display="flex" alignItems="center" gap={2}>
          {selectedUser && (
            <Typography variant="body1" color="text.secondary">
              Current User: {selectedUser.name}
            </Typography>
          )}
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            My Members
          </Button>
        </Box>
      </Box>

      <Box mt={2}>
        {activeTab === 0 && <MetricsView selectedUser={selectedUser} />}
        {activeTab === 1 && <AnalyticsView selectedUser={selectedUser} />}
      </Box>

      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectUser={(user) => setSelectedUser(user)}
      />
    </Box>
  );
};

export default Dashboard;
