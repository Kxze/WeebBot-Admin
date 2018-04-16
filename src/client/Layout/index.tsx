import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { State, User } from "../types";
import { login } from "../Actions";
import { Grid, Container, Dimmer, Loader } from 'semantic-ui-react';
import UserCard from './UserCard';
import SidebarMenu from './SidebarMenu';
import LoginButton from './LoginButton';
import ErrorModal from "./ErrorModal";

class Layout extends React.Component<Props> {
    render() {
        return (
            <div>
                <ErrorModal display={this.props.error !== ""} />
                <Container className="layout">
                    <Grid divided={true} stackable={true}>
                        <Grid.Column width="3">
                            {this.props.user.username ? <UserCard /> : <LoginButton />}
                            <SidebarMenu />
                        </Grid.Column>
                        <Grid.Column width="9">
                            <Container>
                                <Dimmer active={this.props.loading} page={true}>
                                    <Loader>Loading...</Loader>
                                </Dimmer>
                                {this.props.children}
                            </Container>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

interface Props {
    user: User;
    error: string | undefined;
    loading: boolean;
    fetchUser: () => void;
}

const mapStateToProps = (state: State) => ({
    user: state.auth.user,
    error: state.general.error,
    loading: state.general.loading
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    fetchUser: (): void => {
        dispatch(login());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);