import cx from 'classnames';
import Link from 'next/link';

interface MenuNavbarPropsType {
    title:string;
    active?:boolean;
    to:string;
}

const MenuNavbar = (props : Partial<MenuNavbarPropsType>) => {
    const { active, title, to = "/" } = props;
    const classTitle = cx({
        "nav-link": true,
        "active": active
    })
    return(
        <li className="nav-item my-auto">
            <Link href={to}>
                <a className={classTitle} aria-current="page">{ title }</a> 
            </Link>
        </li>
    )
}


export default MenuNavbar;