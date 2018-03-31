import * as React from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SidebarMenu extends React.Component {
    state = { activeItem: 'home' };

    handleItemClick = (e: Event, props: MenuItemProps) => this.setState({ activeItem: props.name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu pointing={true} vertical={true} fluid={true}>
                <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick as any} as={Link} to="/" />
                <Menu.Item name="settings" active={activeItem === 'settings'} onClick={this.handleItemClick as any} as={Link} to="/settings" />
            </Menu>
        );
    }
}

export default SidebarMenu;