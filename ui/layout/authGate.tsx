'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function AuthGate() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user && user.email) {
      const createUser = async () => {
        try {
          await fetch('/api/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name || user.nickname || '',
              email: user.email,
              image: user.picture,
              role: 'EMPLOYEE',
              refId: user.sub?.replace('google-oauth2|', ''), // sub: "github|xxxxx"
              department: '',
              position: '',
            }),
          });
        } catch (err) {
          console.error('Create user failed', err);
        }
      };

      createUser();
    }
  }, [user]);

  return null; // veya loading göster
}
