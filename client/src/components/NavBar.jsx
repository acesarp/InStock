// import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import logo from '../assets/Logo/InStock-Logo.svg';


// export default class NavBar extends Component{
 
//     render(){

//         const Navbar = (props) => {
//             console.log(props);
//             let iClass
//             let wClass
//             if (props.match.path === '/inventories') {
//               iClass = 'inactive'
//               wClass = 'active'
//             } else {
//               iClass = 'active'
//               wClass = 'inactive'
//             }
//         }
//         return(
//             <section className="nav" >
//                 <div className="logo__link"><Link to={"/warehouses"}><img className="logo__img" src={Logo} alt="InStock Logo"/></Link></div>
//                 <div className="nav__bar" >
                    
//                     <div className="nav__tabs">
//                         <Link to={"/warehouses"}><p className={"nav__tabs--warehouses--${wClass}"} href="">Warehouses</p></Link>
//                         <Link to={"/inventories"}><p className="nav__tabs--inventory--${iClass}" href="">Inventory</p></Link>
                        
//                     </div>
//                 </div>
//             </section>
//         )
//     }
// }

  
import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../assets/logo/instock.svg';


    const Navbar = (props) => {
        console.log(props);
        let iClass;
        let wClass;
        if (props.path === '/inventories') {
            iClass = 'inactive'
            wClass = 'active'
        }
         else {
            iClass = 'active'
            wClass = 'inactive'
        }
    
    return (
        <div className="nav">
        <img className="nav__logo" src={logo} alt="logo" />
        <nav className="nav__wrapper">
            <ul className="nav__menu">
            <li className={`nav__list-locations nav__list-locations--${wClass}`}>
                <Link className={`nav__list-link--${wClass}`} to="/warehouses">Warehouses</Link>
            </li>
            <li className={`nav__list-inventory nav__list-inventory--${iClass}`}>
                <Link className={`nav__list-link--${iClass}`} to="/inventories">Inventory</Link>
            </li>
           
            </ul>
        </nav>
        </div>
    );
    }
export default Navbar

