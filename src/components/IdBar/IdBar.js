import React, {Component} from 'react';
import './IdBar.css';
import CybLink from '../CybLink';

const IdBar = ({defaultEthAccount, defaultCyberAccount}) => (
    <div className='id-bar'>
        <SettingsLink/>
        <WalletLink/>
        <CurrentUser defaultEthAccount={defaultEthAccount} defaultCyberAccount={defaultCyberAccount}/>
    </div>
);

export const SettingsLink = () => (
    <CybLink dura='settings.cyb' className='id-bar__settings'>Settings</CybLink>
);

export const WalletLink = () => (
    <CybLink dura='wallet.cyb' className='id-bar__wallet'>Wallet</CybLink>
);

class CurrentUser extends Component {

    state = {
        open: false
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        const {open} = this.state;
        const {defaultEthAccount, defaultCyberAccount} = this.props;

        return (
            <div className='user-popup__container'>
                <div className='id-bar__user' onClick={this.toggle}/>
                <div className={`user-popup ${open ? 'user-popup--open' : ''}`}>
                    <div>ETH: {defaultEthAccount}</div>
                    <hr className='separator'/>
                    <div>CYBER: {defaultCyberAccount} </div>
                </div>
            </div>
        );
    }
}

export {CurrentUser}

export default IdBar;
