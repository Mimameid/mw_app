import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from 'features/user/auth/actions';

export function useAuthenticate() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useSelector((state) => ({
    loggedIn: state.user.auth.loggedIn,
  }));

  useEffect(() => {
    dispatch(authenticate()).then((data) => {
      if (data.error) {
        setLoading(false);
        return;
      }
    });
  }, [dispatch]);
  return { loggedIn, loading };
}
