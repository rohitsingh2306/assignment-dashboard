import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserModal from '../components/UserModal';
import { mockUsers } from '../data/mockUser';

describe('UserModal Component', () => {
  const onClose = jest.fn();
  const onSelectUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with list of users when open', () => {
    render(
      <UserModal open={true} onClose={onClose} onSelectUser={onSelectUser} />
    );

    // Heading
    expect(screen.getByText('Select a Member')).toBeInTheDocument();

    // User list rendering
    mockUsers.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it('does not render modal content when closed', () => {
    render(
      <UserModal open={false} onClose={onClose} onSelectUser={onSelectUser} />
    );

    // Modal should not be visible
    expect(screen.queryByText('Select a Member')).not.toBeInTheDocument();
  });

  it('calls onSelectUser and onClose when a user is clicked', () => {
    render(
      <UserModal open={true} onClose={onClose} onSelectUser={onSelectUser} />
    );

    const firstUser = mockUsers[0];
    const userButton = screen.getByText(firstUser.name);
    fireEvent.click(userButton);

    expect(onSelectUser).toHaveBeenCalledWith(firstUser);
    expect(onClose).toHaveBeenCalled();
  });
});
