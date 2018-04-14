import * as React from 'react';
import { State } from "../types";
import { connect, Dispatch } from "react-redux";
import { changeItem } from "../Actions";
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SidebarMenu = ({ activeItem, changeSidebarItem }: Props) => {
    return (
        <Menu pointing={true} vertical={true} fluid={true}>
            <Menu.Item name="home" active={activeItem === 'home'} onClick={() => changeSidebarItem("home")} as={Link} to="/" />
            <Menu.Item name="settings" active={activeItem === 'settings'} onClick={() => changeSidebarItem("settings")} as={Link} to="/settings" />
        </Menu>
    );
};

interface Props {
    activeItem: string;
    changeSidebarItem: (Item: string) => void;
}

const mapStateToProps = (state: State) => ({
    activeItem: state.sidebar.activeItem
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    changeSidebarItem: (item: string) => {
        dispatch(changeItem(item));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);