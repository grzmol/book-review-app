import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';



const SidenavItems = () => {

    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'user',
            text: 'My Profile',
            link: '/user',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'plus-square',
            text: 'Add Admins',
            link: '/user/register',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'sign-in',
            text: 'Login',
            link: '/login',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'sign-out',
            text: 'Logout',
            link: '/user/logout',
            restricted: false
        }
    ];

    const element = (item, i) => (
        <div key={i} className={item.type}>
        <Link to={item.link}>
            <FontAwesome name={item.icon}/>
            {item.text}
        </Link>
    </div>
    );

    const list = [];
    const showItems = () => {
        for(let i=0;i<items.length;i++){
            list.push(element(items[i], i));
        }

    };

    return <div>
        {showItems()}
        {list}
    </div>;
};

export default SidenavItems;
