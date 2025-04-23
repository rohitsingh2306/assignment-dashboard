import React  from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import dayjs from 'dayjs'; // Add this import
import {
  setCountries,
  setStates,
  setSectors,
  setCategories,
  setDateRange,
  setAttributeChange,
  clearFilters
} from "../redux/slices/filterSlice"
import ClearAllIcon from '@mui/icons-material/ClearAll';

export interface FilterState {
  sector: string[];
  category: string[];
  dateRange: [Date | null, Date | null];
}

const FilterPanel: React.FC<{ onFilterChange: (filters: FilterState) => void }> = ({ onFilterChange }) => {
  // const [filters, setFilters] = useState<FilterState>({
  //   sector: [],
  //   category: [],
  //   dateRange: [null, null],
  // });

  // const handleSectorChange = (event: any) => {
  //   setFilters({ ...filters, sector: event.target.value });
  // };

  // const handleCategoryChange = (event: any) => {
  //   setFilters({ ...filters, category: event.target.value });
  // };

  // const handleDateChange = (dates: [Date | null, Date | null]) => {
  //   setFilters({ ...filters, dateRange: dates });
  // };

  const dispatch = useDispatch()
const filters = useSelector((state: RootState) => state.filter)

const currentDate = dayjs(); // current date
const minDate = currentDate.subtract(14, 'months'); // 12 months ago
const maxDate = currentDate; // Today (can't select future dates)

//console.log("filters",filters)

const handleCountryChange = (e:any) => {
  dispatch(setCountries(e.target.value))
}

const handleStateChange = (e:any) => {
  dispatch(setStates(e.target.value))
}

const handleSectorChange = (e:any) => {
  dispatch(setSectors(e.target.value))
}

const handleCategoryChange = (e:any) => {
  dispatch(setCategories(e.target.value))
}

const handleDateRangeChange = (newRange:any) => {
  dispatch(setDateRange(newRange))
}

const handleAttributeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  const selectedAttributes = event.target.value as string[];  // Type it as a string array
  dispatch(setAttributeChange(selectedAttributes));
};

  // const applyFilters = () => {
  //   onFilterChange(filters); // Pass the updated filters to the parent
  // };

  return (
    <Box>
         {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
               // value={value}
                // onChange={(newValue) => {
                //     setValue(newValue as DateRangePickerValueType);
                // }}
                // renderInput={(params: TextFieldProps) => (
                //     <TextField {...params} />
                // )}
            />
        </LocalizationProvider> */}
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        value={filters.dateRange}
        onChange={(newValue) => handleDateRangeChange(newValue)}
        calendars={1}
        minDate={minDate}  // Disable dates before 12 months ago
        maxDate={maxDate}  // Disable future dates
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'normal',
          },
        }}
      />
    </LocalizationProvider>
        <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
          
          value={filters.countries}
          onChange={handleCountryChange}
          label="Country"
        >
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>State</InputLabel>
        <Select
          
          value={filters.states}
          onChange={handleStateChange}
          label="State"
        >
          <MenuItem value="Maharashtra">Maharashtra</MenuItem>
          <MenuItem value="Karnataka">Karnataka</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Sector</InputLabel>
        <Select
          
          value={filters.sectors}
          onChange={handleSectorChange}
          label="Sector"
        >
          <MenuItem value="Retail">Retail</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Industrial">Industrial</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          
          value={filters.categories}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="Juice">Juice</MenuItem>
          <MenuItem value="Snacks">Snacks</MenuItem>
          <MenuItem value="Frozen Foods">Frozen Foods</MenuItem>
          <MenuItem value="Beverages">Beverages</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Attribute Selector</InputLabel>
        <Select
  multiple
  value={filters.attributeSelected}
  onChange={(event:any) => handleAttributeChange(event)}
  label="Category"
>
  <MenuItem value="My Spend">My Spend</MenuItem>
  <MenuItem value="Same Store Spend">Same Store Spend</MenuItem>
  <MenuItem value="New Store Spend">New Store Spend</MenuItem>
  <MenuItem value="Lost Store Spend">Lost Store Spend</MenuItem>
</Select>
      </FormControl>
      <Button
      variant="outlined"
      color="secondary"
      startIcon={<ClearAllIcon />}
      onClick={()=>dispatch(clearFilters())}
    >
      Clear All
    </Button>

      {/* Date picker component (simple placeholder for now) */}
      {/* <Button onClick={applyFilters} variant="contained">Apply Filters</Button> */}
    </Box>
  );
};

export default FilterPanel;
