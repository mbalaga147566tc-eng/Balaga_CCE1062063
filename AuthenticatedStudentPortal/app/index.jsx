import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

export default function Index() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <LoadingScreen message="Checking your session..." />;
  return <Redirect href={isAuthenticated ? '/profile' : '/login'} />;
}
