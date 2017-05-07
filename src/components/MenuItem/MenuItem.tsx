import * as React from 'react';
import { withRouter } from 'react-router-dom';
import MenuItemModel from '../../models/MenuItem';
import Link from './primitives/Link';
import { CUSTOM } from '../../contracts/EMenuItemType';
import { trailingSlash } from '../../utils/Formatting';

interface IMenuItemProps {
    location?: any; // injected
    menuItem: MenuItemModel;
    children?: React.ReactChildren;
}

function MenuItem( props: IMenuItemProps ) {
    const { menuItem, location, children } = props;

    const active = location.pathname === menuItem.url;
    const external = menuItem.type === CUSTOM;
    const url = external
        ? menuItem.url
        : trailingSlash( menuItem.url );

    return (
        <Link
            active={active}
            url={url}
            external={external}
        >
            {children ? children : menuItem.title}
        </Link>
    );
}

export default withRouter( MenuItem );