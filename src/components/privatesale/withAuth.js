import React from 'react';
import { withRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
    const RequiresAuth = (props) => {
        const { router } = props;
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

        React.useEffect(() => {
            if (!accessToken && router) {
                router.replace('/login');
            }
        }, [accessToken, router]);

        if (!accessToken) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return withRouter(RequiresAuth);
};

export default withAuth;