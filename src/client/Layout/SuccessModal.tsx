import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { State, User } from "../types";
import { Modal, Header, Button } from 'semantic-ui-react';
import { success } from "../Actions";

const SuccessModal = ({ display, successMessage, setSuccess }: Props) => (
    <Modal basic={true} size="small" open={display}>
        <Header icon="check" content="Success!" />
        <Modal.Content>
            {successMessage}
        </Modal.Content>
        <Modal.Actions>
            <Button basic={true} color="green" onClick={() => setSuccess("")}>
                Close
            </Button>
        </Modal.Actions>
    </Modal>
);

interface Props {
    display: boolean;
    successMessage: string;
    setSuccess: (message: string) => void;
}

const mapStateToProps = (state: State) => ({
    successMessage: state.general.success,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    setSuccess: (message: string) => {
        dispatch(success(message));
    } 
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal);