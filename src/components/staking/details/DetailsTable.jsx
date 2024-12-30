import React from 'react'
import { handleBalancePadding } from '../../../utils/Helpers'


//main table component for staking details
const DetailsTable = ({totalStaked = 100, totalReward=100}) => {
  return (
    <table className='w-full border-separate border-spacing-y-2'>
      <tbody>
        <TableRow>
          <RowKey rowKey='Total Staked' />
          <RowValue rowValue={handleBalancePadding(totalStaked) + ' $FLXT'}  />
        </TableRow>
        <TableRow>
          <RowKey rowKey='Historical Rewards' />
          <RowValue rowValue={handleBalancePadding(totalReward) + ' $FLXT'} />
        </TableRow>
      </tbody>
    </table>
  )
}

// TableRow component is the row in the table
const TableRow = ({ children }) => {
  return (
      <tr
          className='w-full text-medium  bg-[#323232]'
      >
          {children}
      </tr>
  );
}

// RowKey component is the title of data in the row
const RowKey = ({ rowKey }) => {
  return (
      <td
          className='w-[50%] font-medium px-3 py-2 text-sm text-accent rounded-md rounded-e-none'
      >
          {rowKey}
      </td>
  );
}

// RowValue component is the value of data in the row
const RowValue = ({ rowValue }) => {
  return (
      <td
          className='w-[50%] text-sm font-normal px-4 py-3 text-high rounded-s-none rounded-e-md'
      >
          {rowValue}
      </td>
  );
}


export default DetailsTable