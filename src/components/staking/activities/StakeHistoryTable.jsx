import React from 'react';
import PropTypes from 'prop-types';
import { CustomBtn } from '../../Buttons/FilledBtn';
import Divider from '../../dividers/Divider';


/// TABLE USED IN ACTIVITIES COMPONENT
const StakeHistoryTable = ({ amount, lockDuration, earnedReward, dueDate, className='' }) => {
    return (
        <table className={`w-full p-0 m-0 ${className} font-sans bg-[#1F1F1F] rounded-t-md`}>
            <thead className='w-full text-left bg-[#323232]'>
                <TableRow >
                    <th className='w-[40%] px-3 py-2 text-lg text-accent rounded-md rounded-e-none'>Staked</th>
                    <th className='w-[60%] px-3 py-2 text-lg text-high rounded-s-none rounded-e-md'>{amount} $FLXT</th>
                </TableRow>
            </thead>
            <tbody>
                <TableRow>
                    <RowKey rowKey='Lock Duration' />
                    <RowValue rowValue={lockDuration} />
                </TableRow>
                <TableRow>
                    <RowKey rowKey='Due Date' />
                    <RowValue rowValue={dueDate} />
                </TableRow>
                <TableRow>
                    <RowKey rowKey='Earned Reward' />
                    <RowValue rowValue={earnedReward} />
                </TableRow>
                <TableRow>
                    <td colSpan="2" className='px-3 py-3'>
                        <Divider className='w-full mb-3' />
                        <CustomBtn title='Unstake' icon='bx-right-arrow-alt' className='flex items-center justify-center w-fit gap-1 px-0 text-high py-2 font-normal' right
                            onClick={() => console.log('Unstake')}
                        />
                    </td>
                </TableRow>
            </tbody>
        </table>
    );
};

// TableRow component is the row in the table
const TableRow = ({ children }) => {
    return (
        <tr
            className='w-full text-medium '
        >
            {children}
        </tr>
    );
}

// RowKey component is the title of data in the row
const RowKey = ({ rowKey }) => {
    return (
        <td
            className='w-[40%] font-medium text-sm font-sans px-4 py-3'
        >
            {rowKey}
        </td>
    );
}

// RowValue component is the value of data in the row
const RowValue = ({ rowValue }) => {
    return (
        <td
            className='w-[60%] font-normal text-sm px-4 py-3'
        >
            {rowValue}
        </td>
    );
}



// PROP TYPE FOR TABLE 
StakeHistoryTable.propTypes = {
    amount: PropTypes.number.isRequired,
    lockDuration: PropTypes.string.isRequired,
    earnedReward: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

export default StakeHistoryTable;