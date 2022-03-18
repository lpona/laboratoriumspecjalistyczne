import React, {Component, ReactNode} from "react";
import { getUser, removeUserSession } from '../../Utils/Common';
import Footer from '../Footer/Footer';
import './Dashboard.scss';
import data from "../../../src/top250movies.json";
export class Dashboard extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
          // serialData:{},
        }
    }
    readonly user = getUser();
    // handle click event of logout button
    readonly handleLogout = () => {
        removeUserSession();
        this.props.history.push('/login');
    };

   render(): ReactNode {
    const x = data;
    console.log(x, "asdasd");
    const listaid = x.map(x => { return <div><img src={x.image}/></div>})
        return (
            <div className='dashboard'>
            Welcome {this.user.name}!<br />
            <br />
        
            <input type='button' onClick={this.handleLogout} value='Logout' className='buttonOut' />
            <br />
            <div className='idlist'>
            {listaid}
                    </div>
            <Footer />
        </div>
 
       );
        }
    }
