import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { State, User } from "../types";
import { login } from "../Actions";
import { Grid, Container, Dimmer, Loader, Image } from 'semantic-ui-react';
import UserCard from './UserCard';
import SidebarMenu from './SidebarMenu';
import LoginButton from './LoginButton';
import ErrorModal from "./ErrorModal";
import SuccessModal from './SuccessModal';

class Layout extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <ErrorModal display={this.props.error !== ""} />
                <SuccessModal display={this.props.success !== ""} />
                <Container className="layout">
                    <Grid divided={true} stackable={true}>
                        <Grid.Column width="3">
                            {this.props.user.username ? <UserCard /> : <LoginButton />}
                            <SidebarMenu />
                            <Image src="https://c5.patreon.com/external/logo/become_a_patron_button.png" href="https://www.patreon.com/kaze404" target="_blank" />
                            <Image src={require("../Images/discord.png")} href="https://discord.gg/0xMXCNAFbH032Ig1" target="_blank" />
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
    error: string;
    success: string;
    loading: boolean;
    fetchUser: () => void;
}

const mapStateToProps = (state: State) => ({
    user: state.auth.user,
    error: state.general.error,
    success: state.general.success,
    loading: state.general.loading
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    fetchUser: (): void => {
        dispatch(login());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);