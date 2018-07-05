import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { Form, Checkbox, Button } from 'semantic-ui-react';
import { State, User, Channel } from '../../types';
import { getChannels, setShips } from "../../Actions";

const Settings = ({ user, getServerChannels, serverChannels, setServerShips }: Props) => {

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
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 01</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 02</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 03</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 04</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 05</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 06</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 07</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 08</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 09</label>} />
            </Form.Field>
            <Form.Field>
                <Checkbox toggle={true} label={<label>Ship 10</label>} />
            </Form.Field>
            <Button type="submit">Save</Button>
        </Form>
    );

};

interface Props {
    user: any;
    serverChannels: Channel[];
    getServerChannels: (serverId: string) => void;
    setServerShips: (ships: number[]) => void;
}

const mapStateToProps = (state: State) => ({
    user: state.auth.user,
    serverChannels: state.settings.channels
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