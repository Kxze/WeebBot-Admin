import * as React from 'react';
import { Form, Checkbox, InputOnChangeData, CheckboxProps } from 'semantic-ui-react';
import { connect, Dispatch } from 'react-redux';
import { State } from '../../types';
import { setShips } from '../../Actions';

const ShipSelect = ({ channelShips, ship, setStateShips }: Props) => {

  function isChecked(ship: number) {
    return channelShips.includes(ship);
  }

  function onCheckboxChange(event: React.SyntheticEvent, { checked }: CheckboxProps) {
    if (checked) {
      const channelShipsCopy = channelShips.slice(0);
      channelShipsCopy.push(ship);
      
      setStateShips(channelShipsCopy);
    } else {
      const ships = channelShips.filter(i => i !== ship);
      setStateShips(ships);
    }
  }

  return (
    <Form.Field>
      <Checkbox
        checked={isChecked(ship)}
        toggle={true}
        label={<label>Ship {ship}</label>}
        onChange={onCheckboxChange}
      />
    </Form.Field>
  );
};

interface Props {
  channelShips: number[];
  ship: number;
  setStateShips: (ships: number[]) => void;
}

const mapStateToProps = (state: State) => ({
  channelShips: state.settings.ships,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  setStateShips: (ships: number[]) => {
    dispatch(setShips(ships));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShipSelect);
