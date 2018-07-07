import * as React from 'react';
import { connect } from 'react-redux';
import { Message, Container, Header } from 'semantic-ui-react';
import Alert from './Alert';

const Home = () => (
    <div>
        <Alert />
        <Container text={true}>
            <Header as="h2">Welcome!</Header>
            <p>
                Hi. This is the Admin page of <a href="https://github.com/Kxze/WeebBot-v2">Weeb Bot</a>, a Discord bot designed to alert users of
            Emergency Quests on <a href="https://pso2.jp">Phantasy Star Online 2</a>, though if you're here you probably already know that. If you
            wish to enable alerts on your server, first make sure the bot is on your server (if it's not, simply click the <i>Invite</i> button on the sidebar).
            Then, simply login with your Discord account by clicking the <i>Login</i> button, go go the <i>Settings</i> page and configure the bot
            as you'd like.
            </p>
        </Container>
    </div>
);

export default Home;