import React, { Component } from 'react';
import { Title } from '@cybercongress/ui';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTransactions, resend } from '../../redux/wallet';
import CybLink from '../../components/CybLink';

import { Hash } from '../../components/TxQueue/TxQueue';
import ScrollContainer from '../../components/ScrollContainer/ScrollContainer';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import Loader from 'react-loader-spinner';


class TxQueue extends Component {
    componentDidMount() {
        this.props.getTransactions(this.props.defaultAccount);
    }

    resend = (txHash) => {
        this.props.resend(txHash);
    }

    render() {
        const { transactions } = this.props;

        return (
            <ScrollContainer>
                <Title>/transaction</Title>
                <Table>
                    <thead>
                        <tr>
                            <th>type</th>
                            <th>hash</th>
                            <th>date</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map(item => (
                        <tr key={item.txHash}>
                            <td>
                                {item.type}
                            </td>
                            <td>
                                {
                                    item.type === 'eth' ? (
                                        <CybLink dura={`${item.txHash}.eth`}>
                                            <Hash>{item.txHash}</Hash>
                                        </CybLink>
                                    ) : (
                                        <Hash>{item.txHash}</Hash>
                                    )
                                }                                
                            </td>
                            <td>
                                {moment(item.date).format('D/MM YYYY h:mm:ss')}
                            </td>
                            <td>
                                {
                                    item.type === 'eth' && item.status === 'pending' ? (
                                        <div>
                                            <Loader type='Watch' color='#438cef' height={ 27 } width={ 27 } style={ 'TxQueue_spinner' } />
                                        { item.canResend ? (
                                            <Button onClick={ () => this.resend(item.txHash) }>resend</Button>
                                        ) : '' }
                                        </div>
                                    ) : (
                                        item.status
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </ScrollContainer>
        );
    }
}

export default connect(
    state => ({
        transactions: state.wallet.transactions,
        defaultAccount: state.wallet.defaultAccount,
    }),
    {
        getTransactions,
        resend,
    },
)(TxQueue);
