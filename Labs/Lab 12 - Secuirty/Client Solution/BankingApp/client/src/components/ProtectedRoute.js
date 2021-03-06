import React from 'react';
import {Route, Redirect} from 'react-router-dom';

/*
{ component: Component, ...rest } => destruct the Route props into:

1) component property (Note: lowercase component) and assign it to a variable
    we call Component (Note: capital Component).
    Renaming is needed because React JSX requires custom components to have a capitalized
    first letter otherwise they are not rendered to the DOM.
2) isAuthenticated is parameter indicating whether the user is authenticated
3) Roles required to access the route
4) Assign the remaining properties defined on the props object into rest variable.
 */
function ProtectedRoute({ component: Component,
                                           isAuthenticated,
                                           user,
                                           authorizedRoles, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                    // Not logged in so redirect to login page with the from url to redirect to after login
                    return <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
                }
                // check if route is restricted by role
                else if (authorizedRoles && authorizedRoles.indexOf(user.role) === -1) {
                    alert(`You are NOT authorized to access ${rest.location.pathname}`);
                    // role not authorised so redirect to home page
                    return <Redirect to='/' />
                }
                // authorised so return component
                else
                    return <Component {...props} /> ;
            }}
        />
    );
}
export default ProtectedRoute;