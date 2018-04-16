import * as React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { State } from '../../types';

const Warning = ({ warning }: Props) => (
    <div>
        <Message 
            warning={true}
            header="Warning!"
            content={warning}
            hidden={warning === undefined}
            style={{ wordWrap: "break-word" }}
            />
    </div>
);

interface Props {
    warning?: string;
}

const mapStateToProps = (state: State) => ({
    warning: state.general.warning,
});

export default connect(mapStateToProps)(Warning);