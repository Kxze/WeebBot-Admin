import * as React from 'react';
import { connect } from "react-redux";
import { Form, Checkbox, Button } from 'semantic-ui-react';

const channels = [
    { key: 'g', text: '#general', value: 'male' },
    { key: 'f', text: '#fightan', value: 'mazxcvle' },
    { key: 's', text: '#shootan', value: 'mabnfgdle' },
    { key: 'w', text: '#topdecking', value: 'mamhgjmle' },
    { key: 'wzxcv', text: '#catgirls-online', value: 'malqweqwee' },
    { key: 'wzxcwev', text: '#absolute-suffering', value: 'mal5345e' },
    { key: 'wvbcv', text: '#web-artisans', value: 'mfmjnhale' },
    { key: 'bgfw', text: '#real-talk', value: 'maQWSsqwle' },
];

const Settings = ({ user }: any) => {

    const getServers = () => {
        if (!user.guilds) { return []; }
        return user.guilds.map((guild: any) => ({ key: guild.id, text: guild.name, value: guild.id }));
    };

    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Select fluid={true} options={getServers()} label="Server" placeholder="Server" />
                <Form.Select fluid={true} options={channels} label="Channel" placeholder="Channel" />
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

export default connect((state: any) => ({
    user: state.auth.user
}))(Settings);