import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

function AuthCheck() {
  const { token } = useAuth();
  return <>{!token && <Redirect to="/" />}</>;
}

export default withRouter(AuthCheck);
