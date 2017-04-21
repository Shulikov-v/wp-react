import * as React from 'react';
import { Route } from 'react-router-dom';
import MenuItemModel from '../../models/MenuItem';
import MenuModel from '../../models/Menu';
import MenuItem from '../MenuItem/MenuItem';
import List from './primitives/List';
import ListItem from './primitives/ListItem';

interface IMenuProps {
    menu: MenuModel;
    onBottom?: boolean;
}

export default function Menu( props: IMenuProps ): React.ReactElement<any> {
    const { menu, onBottom } = props;

    return (
        <List onBottom={onBottom}>
            {menu.items.map(( menuItem: MenuItemModel ) => (
                <ListItem key={menuItem.id}>
                    <Route
                        path={menuItem.url}
                        children={({ match }) => (
                            <MenuItem
                                menuItem={menuItem}
                                active={match != null}
                            />
                        )}
                    />
                </ListItem>
            ))}
        </List>
    );
}