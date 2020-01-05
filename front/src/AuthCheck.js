import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

function AuthCheck() {
    return <>{!sessionStorage.getItem('token') && <Redirect to="/" />}</>;
}

export default withRouter(AuthCheck);
