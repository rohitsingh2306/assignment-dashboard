import React from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel, Button, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import dayjs from 'dayjs';
import {
  setCountries,
  setStates,
  setSectors,
  setCategories,
  setDateRange,
  setAttributeChange,
  clearFilters
} from "../redux/slices/filterSlice";
import ClearAllIcon from '@mui/icons-material/ClearAll';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);

  const currentDate = dayjs();
  const minDate = currentDate.subtract(14, 'months');
  const maxDate = currentDate;

  const handleCountryChange = (e: any) => {
    dispatch(setCountries(e.target.value));
  };

  const handleStateChange = (e: any) => {
    dispatch(setStates(e.target.value));
  };

  const handleSectorChange = (e: any) => {
    dispatch(setSectors(e.target.value));
  };

  const handleCategoryChange = (e: any) => {
    dispatch(setCategories(e.target.value));
  };

  const handleDateRangeChange = (newRange: any) => {
    dispatch(setDateRange(newRange));
  };

  const handleAttributeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedAttributes = event.target.value as string[];
    dispatch(setAttributeChange(selectedAttributes));
  };

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        padding: 3,
        backgroundColor: '#fafafa',
        boxShadow: 2,
        maxWidth: 500,
        margin: 'auto',
        mt: 4
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Filters
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          value={filters.dateRange}
          onChange={(newValue) => handleDateRangeChange(newValue)}
          calendars={1}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
              size: 'small'
            }
          }}
        />
      </LocalizationProvider>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Country</InputLabel>
        <Select value={filters.countries} onChange={handleCountryChange} label="Country">
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>State</InputLabel>
        <Select value={filters.states} onChange={handleStateChange} label="State">
          <MenuItem value="Maharashtra">Maharashtra</MenuItem>
          <MenuItem value="Karnataka">Karnataka</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Sector</InputLabel>
        <Select value={filters.sectors} onChange={handleSectorChange} label="Sector">
          <MenuItem value="Retail">Retail</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Industrial">Industrial</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Category</InputLabel>
        <Select value={filters.categories} onChange={handleCategoryChange} label="Category">
          <MenuItem value="Juice">Juice</MenuItem>
          <MenuItem value="Snacks">Snacks</MenuItem>
          <MenuItem value="Frozen Foods">Frozen Foods</MenuItem>
          <MenuItem value="Beverages">Beverages</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Attribute Selector</InputLabel>
        <Select
          multiple
          value={filters.attributeSelected}
          onChange={(event: any) => handleAttributeChange(event)}
          label="Attribute Selector"
        >
          <MenuItem value="My Spend">My Spend</MenuItem>
          <MenuItem value="Same Store Spend">Same Store Spend</MenuItem>
          <MenuItem value="New Store Spend">New Store Spend</MenuItem>
          <MenuItem value="Lost Store Spend">Lost Store Spend</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ClearAllIcon />}
          onClick={() => dispatch(clearFilters())}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPanel;

