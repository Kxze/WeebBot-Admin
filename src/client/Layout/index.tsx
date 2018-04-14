import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { State, User } from "../types";
import { login } from "../Actions";
import { Grid, Container } from 'semantic-ui-react';
import UserCard from './UserCard';
import SidebarMenu from './SidebarMenu';
import LoginButton from './LoginButton';

class Layout extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <Container className="layout">
                <Grid divided={true} stackable={true}>
                    <Grid.Column width="3">
                        {this.props.user.username ? <UserCard /> : <LoginButton />}
                        <SidebarMenu />
                    </Grid.Column>
                    <Grid.Column width="9">
                        <Container>
                            {this.props.children}
                        </Container>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

interface Props {
    user: User;
    fetchUser: () => void;
}

const mapStateToProps = (state: State) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    fetchUser: (): void => {
        dispatch(login());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);