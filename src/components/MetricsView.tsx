import React from 'react';
import FilterPanel from '../components/FilterPanel';
import { Box, Typography } from '@mui/material';
import DataTable from './DataTable';  // Placeholder component for the data table
import BarChart from '../charts/BarChart';    // Placeholder component for the bar chart
import {  useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const MetricsView: React.FC<{ selectedUser: any | null }> = ({ selectedUser }) => {
  // const [filters, setFilters] = useState<FilterState | null>(null);
  // const [filteredData, setFilteredData] = useState<any[]>([]);

  const filterss = useSelector((state: RootState) => state.filter)
  console.log("filters",filterss)

  // Sample mock data for the table and chart
  // const mockData = [
  //   { sector: 'Retail', category: 'Juice', spend: 5000, change: 10 },
  //   { sector: 'Food', category: 'Snacks', spend: 3000, change: 5 },
  //   { sector: 'Retail', category: 'Snacks', spend: 4000, change: -3 },
  //   // Add more data as necessary
  // ];

  // const handleFilterChange = (newFilters: FilterState) => {
  //   setFilters(newFilters);
  // };

  // Function to filter data based on selected filters
  // useEffect(() => {
  //   if (filters) {
  //     let filtered = mockData;

  //     // Filter by Sector
  //     if (filters.sector.length > 0) {
  //       filtered = filtered.filter(item => filters.sector.includes(item.sector));
  //     }

  //     // Filter by Category
  //     if (filters.category.length > 0) {
  //       filtered = filtered.filter(item => filters.category.includes(item.category));
  //     }

  //     // Additional filter logic for other attributes like Date Range, etc.

  //     //setFilteredData(filtered);  // Update filtered data
  //   }
  // }, [filters]);

  return (
    <Box>
      <Typography variant="h4" mb={2}>Metrics View</Typography>
      <FilterPanel  />
      
      {/* Data Table */}
      <DataTable data={filterss?.data?.data} selectedAttributes={filterss.attributeSelected}/>

      {/* Bar Chart */}
      <BarChart data={filterss?.data?.data} selectedAttributes={filterss.attributeSelected} />
    </Box>
  );
};

export default MetricsView;
