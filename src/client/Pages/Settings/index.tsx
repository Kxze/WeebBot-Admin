import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { Form, Checkbox, Button } from 'semantic-ui-react';
import { State, User, Channel } from '../../types';
import { getChannels, setShips } from "../../Actions";
import ShipSelect from "./shipSelect";

const Settings = ({ user, getServerChannels, serverChannels, setServerShips, channelShips }: Props) => {

    const getServers = () => {
        if (!user.guilds) { return []; }
        return user.guilds.map((guild: any) => ({ key: guild.id, text: guild.name, value: guild.id }));
    };

    function onSelectChange(e: any, data: any) {
        const serverId = data.value;
        getServerChannels(serverId);
    }

    function onChannelSelect(e: any, { value }: any) {
        const channelId = value;
        const channel = serverChannels.find(channel => channel.key == channelId);
        if (channel) {
            setServerShips(channel.ships);
        }
    }

    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Select fluid={true} options={getServers()} label="Server" placeholder="Server" onChange={onSelectChange}/>
                <Form.Select fluid={true} options={serverChannels} label="Channel" placeholder="Channel" onChange={onChannelSelect} />
            </Form.Group>
            <Form.Field>
                <b>Ships:</b>
            </Form.Field>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <ShipSelect key={i} ship={i} />)}
            <Button type="submit">Save</Button>
        </Form>
    );

};

interface Props {
    user: any;
    serverChannels: Channel[];
    channelShips: number[];
    getServerChannels: (serverId: string) => void;
    setServerShips: (ships: number[]) => void;
}

const mapStateToProps = (state: State) => ({
    user: state.auth.user,
    serverChannels: state.settings.channels,
    channelShips: state.settings.ships,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    getServerChannels: (serverId: string) => {
        dispatch(getChannels(serverId));
    },
    setServerShips: (ships: number[]) => {
        dispatch(setShips(ships));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);