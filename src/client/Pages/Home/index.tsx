import * as React from 'react';
import { connect } from 'react-redux';
import Warning from './Warning';

const Home = ({ user }: any) => (
    <div>
        <Warning />
        test
    </div>
);

function mapStateToProps(state: any) {
    return {
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Home);