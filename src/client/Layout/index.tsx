import * as React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import UserCard from './UserCard';
import SidebarMenu from './SidebarMenu';

class Layout extends React.Component {
    render() {
        return (
            <Container className="layout">
                <Grid divided={true} stackable={true}>
                    <Grid.Column width="3">
                        <UserCard />
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

export default Layout;