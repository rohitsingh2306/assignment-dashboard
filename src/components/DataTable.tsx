import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type Props = {
  data: any[];
  selectedAttributes: string[]; // e.g., ['My Spend', 'Same Store Spend']
};

const attributeKeyMap: Record<string, string> = {
  'My Spend': 'mySpend',
  'Same Store Spend': 'sameStoreSpend',
  'New Store Spend': 'newStoreSpend',
  'Lost Store Spend': 'lostStoreSpend',
};


const spendFields = ['current', 'reference', 'absoluteChange', 'percentChange'];

const allAttributes = Object.keys(attributeKeyMap);


const DataTable: React.FC<Props> = ({ data,selectedAttributes }) => {
  const attributesToDisplay =
    selectedAttributes.length === 0 ? allAttributes : selectedAttributes;

    const filters = useSelector((state: RootState) => state.filter)

    

    console.log("filters",filters)

    const filteredData = data.filter((item) => {
      const { countries, states, sectors, categories ,dateRange } = filters;
      const [startDate, endDate] = filters.dateRange;

    const itemStartDate = new Date(item.startDate);
  const itemEndDate = new Date(item.endDate);

  const dateValid = (
    (!startDate || itemStartDate >= new Date(startDate)) && 
    (!endDate || itemEndDate <= new Date(endDate))
  );
    
      return (
        (!countries || item.country === countries) &&
        (!states || item.state === states) &&
        (!sectors || item.sector === sectors) &&
        (!categories || item.category === categories)
        && dateValid
         
      );
    });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Category</TableCell>

            {attributesToDisplay.map((attr) =>
              spendFields.map((field) => (
                <TableCell key={`${attr}-${field}`}>
                  {attr} ({field})
                </TableCell>
              ))
            )}

          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.country}</TableCell>
              <TableCell>{item.state}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell>{item.sector}</TableCell>
              <TableCell>{item.category}</TableCell>

               {/* Dynamic spend values */}
               {attributesToDisplay.map((attr) => {
                const key = attributeKeyMap[attr];
                return spendFields.map((field) => (
                  <TableCell key={`${index}-${attr}-${field}`}>
                    {item[key]?.[field] ?? '-'}
                  </TableCell>
                ));
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
