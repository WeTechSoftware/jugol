import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectIdToken,
  selectCheckUserInformation,
} from '../../redux/features/auth/authSlice';

export default function useAuthRoutes(): boolean {
  const idToken = useSelector(selectIdToken);
  const checkUserInformation = useSelector(selectCheckUserInformation);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (idToken && !checkUserInformation) {
      console.log("Logout: ", { idToken: idToken, checkUserInformation: checkUserInformation });
      setIsAuthenticated(true);
      return
    } else {
      setIsAuthenticated(false);
    }
  }, [idToken, checkUserInformation]);

  return !!idToken && !checkUserInformation;
}
