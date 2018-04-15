import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import { State, User } from "../types";
import { Modal, Header, Button } from 'semantic-ui-react';
import { error } from "../Actions";

const ErrorModal = ({ display, errorMessage, setError }: Props) => (
    <Modal basic={true} size="small" open={display}>
        <Header icon="erase" content="Error" />
        <Modal.Content>
            {errorMessage}
        </Modal.Content>
        <Modal.Actions>
            <Button basic={true} color="red" inverted={true} onClick={() => setError("")}>
                Close
            </Button>
        </Modal.Actions>
    </Modal>
);

interface Props {
    display: boolean;
    errorMessage: string | undefined;
    setError: (message: string) => void;
}

const mapStateToProps = (state: State) => ({
    errorMessage: state.general.error,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    setError: (message: string) => {
        dispatch(error(message));
    } 
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);