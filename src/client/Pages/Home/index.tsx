import * as React from 'react';
import { connect } from 'react-redux';

const Home = ({ user }: any) => (
    <p>{user.username}</p>
);

function mapStateToProps(state: any) {
    return {
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Home);