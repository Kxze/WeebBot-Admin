import * as React from 'react';
import { connect } from "react-redux";
import { Card, Image } from 'semantic-ui-react';

const UserCard = ({ user }: any) => {
    return (
        <Card centered={true} style={{ width: '128px' }}>
            <Image src={user.avatar} />
            <Card.Content>
                <Card.Header>
                    {user.username}#{user.discriminator}
                    </Card.Header>
                <Card.Meta>
                    {user.guilds.length} guilds
                </Card.Meta>
            </Card.Content>
        </Card>
    );
};

export default connect((state: any) => ({
    user: state.auth.user
}))(UserCard);