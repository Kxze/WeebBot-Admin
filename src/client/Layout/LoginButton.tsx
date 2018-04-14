import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../Actions';
import { Button } from 'semantic-ui-react';

const LoginButton = ({ dispatch }: any) => (
    <Button onClick={() => dispatch(login())}>Login</Button>
);

export default connect()(LoginButton);