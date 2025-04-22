import React from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { mockUsers, User } from '../data/mockUser';



interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSelectUser: (user: User) => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onSelectUser }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Select a Member</Typography>
        <List>
          {mockUsers.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton onClick={() => {
                onSelectUser(user);
                onClose();
              }}>
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default UserModal;
