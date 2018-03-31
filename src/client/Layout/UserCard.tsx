import * as React from 'react';
import { Card, Image } from 'semantic-ui-react';

class UserCard extends React.Component {
    render() {
        return (
            <Card centered={true} style={{width: '128px'}}>
                <Image src="https://cdn.discordapp.com/avatars/91387943679172608/a_334ca29eb67d56410ed519a83c133655.gif" />
                <Card.Content>
                    <Card.Header>
                        Kaze#0001
                    </Card.Header>
                    <Card.Meta>
                        Teste!
                    </Card.Meta>
                    <Card.Description>
                        Testeteste
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default UserCard;