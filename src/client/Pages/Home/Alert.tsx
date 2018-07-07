import * as React from 'react';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { State, User, EQAlert } from "../../types";
import { getEq } from '../../Actions';

class Alert extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchEq();
  }

  render() {
    const eq = this.props.eq.eq;

    return (
      <Message icon={true} info={!eq} warning={!!eq}>
        <Icon name="alarm" />
        <Message.Content>
          <Message.Header>Emergency Quest Alerts</Message.Header>
          <p>{eq ? `Emergency Quest on Ship 2: ${eq.name}` : "No alerts at the moment"}</p>
        </Message.Content>
      </Message>
    );
  }
}

interface Props {
  eq: EQAlert;
  fetchEq: () => void;
}

const mapStateToProps = (state: State) => ({
  eq: state.home.eq,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  fetchEq: () => {
    dispatch(getEq());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);