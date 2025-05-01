import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { Card, Container, Spinner } from 'react-bootstrap';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/auth/profile');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text><strong>Name:</strong> {user?.name}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
