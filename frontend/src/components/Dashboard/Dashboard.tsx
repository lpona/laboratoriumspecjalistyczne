import * as React from "react";
import { Component, ReactNode } from "react";
import { getUser, removeUserSession } from '../../Utils/Common';
import Footer from '../Footer/Footer';
import './Dashboard.scss';


export class Dashboard extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
        }
    }

    readonly user = getUser();

    // handle click event of logout button
    readonly handleLogout = () => {
        removeUserSession();
        this.props.history.push('/login');
    };

    render(): ReactNode {
        return (
            <div className='dashboard'>
                Welcome {this.user.name}!<br />
                <br />
                <input type='button' onClick={this.handleLogout} value='Logout' className='buttonOut' />
                <Footer />
            </div>
        );
    }
}
