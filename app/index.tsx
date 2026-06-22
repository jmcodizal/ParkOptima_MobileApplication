import { Redirect } from 'expo-router';

import { useAuth } from '@/app/auth';

export default function Index() {
  const { isAuthenticated } = useAuth();

  return <Redirect href={isAuthenticated ? '/monitor' as any : '/login'} />;
}
