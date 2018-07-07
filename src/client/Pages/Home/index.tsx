import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import Alert from './Alert';

const Home = ({ user }: any) => (
    <div>
        <Alert />
    </div>
);

export default Home;