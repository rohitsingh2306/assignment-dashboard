// src/redux/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DateRange } from '@mui/x-date-pickers-pro'

interface FilterState {
  countries: string 
  states: string
  sectors: string
  categories: string
  data:SpendDataState
  attributeSelected: string[]; // if it's an array of strings
  dateRange: DateRange<Date | any>
}

interface SpendDetails {
    current: number;
    reference: number;
    absoluteChange: number;
    percentChange: number;
  }
  

interface SpendEntry {
    country: string;
    state: string;
    city: string;
    sector: string;
    category: string;
    startDate: string;
    endDate: string;
    mySpend: SpendDetails;
    sameStoreSpend: SpendDetails;
    newStoreSpend: SpendDetails;
    lostStoreSpend: SpendDetails;
  }

  interface SpendDataState {
    data: SpendEntry[];
  }

const initialState: FilterState = {
  countries: "",
  states: "",
  sectors: "",
  categories: "",
  attributeSelected: [],
  data: {
    data: [ // 👇 Your array goes here
    {
      country: "India",
      state: "Maharashtra",
      city: "Mumbai",
      sector: "Retail",
      category: "Juice",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 120000,
        reference: 100000,
        absoluteChange: 20000,
        percentChange: 20
      },
      sameStoreSpend: {
        current: 95000,
        reference: 90000,
        absoluteChange: 5000,
        percentChange: 5.56
      },
      newStoreSpend: {
        current: 15000,
        reference: 10000,
        absoluteChange: 5000,
        percentChange: 50
      },
      lostStoreSpend: {
        current: 10000,
        reference: 15000,
        absoluteChange: -5000,
        percentChange: -33.33
      }
    },
    {
      country: "India",
      state: "Karnataka",
      city: "Bengaluru",
      sector: "Retail",
      category: "Snacks",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 90000,
        reference: 85000,
        absoluteChange: 5000,
        percentChange: 5.88
      },
      sameStoreSpend: {
        current: 70000,
        reference: 75000,
        absoluteChange: -5000,
        percentChange: -6.67
      },
      newStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      },
      lostStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      }
    },
    {
      country: "USA",
      state: "California",
      city: "San Francisco",
      sector: "Hospitality",
      category: "Beverages",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 130000,
        reference: 110000,
        absoluteChange: 20000,
        percentChange: 18.18
      },
      sameStoreSpend: {
        current: 100000,
        reference: 95000,
        absoluteChange: 5000,
        percentChange: 5.26
      },
      newStoreSpend: {
        current: 20000,
        reference: 10000,
        absoluteChange: 10000,
        percentChange: 100
      },
      lostStoreSpend: {
        current: 10000,
        reference: 15000,
        absoluteChange: -5000,
        percentChange: -33.33
      }
    },
    {
      country: "USA",
      state: "Texas",
      city: "Austin",
      sector: "Retail",
      category: "Frozen Foods",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: {
        current: 80000,
        reference: 70000,
        absoluteChange: 10000,
        percentChange: 14.29
      },
      sameStoreSpend: {
        current: 60000,
        reference: 55000,
        absoluteChange: 5000,
        percentChange: 9.09
      },
      newStoreSpend: {
        current: 10000,
        reference: 10000,
        absoluteChange: 0,
        percentChange: 0
      },
      lostStoreSpend: {
        current: 10000,
        reference: 5000,
        absoluteChange: 5000,
        percentChange: 100
      }
    }
  ], 
  },
  dateRange: [null, null],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string>) {
      state.countries = action.payload
    },
    setStates(state, action: PayloadAction<string>) {
      state.states = action.payload
    },
    setSectors(state, action: PayloadAction<string>) {
      state.sectors = action.payload
    },
    setCategories(state, action: PayloadAction<string>) {
      state.categories = action.payload
    },
    setDateRange(state, action: PayloadAction<DateRange<Date | any>>) {
      state.dateRange = action.payload
    },
    setAttributeChange(state, action: PayloadAction<string[]>) {
        state.attributeSelected = action.payload; // Correctly assign the payload to the state
      },
      setData(state,action){
        state.data.data = action.payload
      },
    clearFilters(state) {
      state.countries = ""
      state.states = ""
      state.sectors = ""
      state.categories = ""
      state.attributeSelected= []
      state.data= {
        data: [ // 👇 Your array goes here
        {
          country: "India",
          state: "Maharashtra",
          city: "Mumbai",
          sector: "Retail",
          category: "Juice",
          startDate: "2024-04-01",
          endDate: "2024-04-30",
          mySpend: {
            current: 120000,
            reference: 100000,
            absoluteChange: 20000,
            percentChange: 20
          },
          sameStoreSpend: {
            current: 95000,
            reference: 90000,
            absoluteChange: 5000,
            percentChange: 5.56
          },
          newStoreSpend: {
            current: 15000,
            reference: 10000,
            absoluteChange: 5000,
            percentChange: 50
          },
          lostStoreSpend: {
            current: 10000,
            reference: 15000,
            absoluteChange: -5000,
            percentChange: -33.33
          }
        },
        {
          country: "India",
          state: "Karnataka",
          city: "Bengaluru",
          sector: "Retail",
          category: "Snacks",
          startDate: "2024-04-01",
          endDate: "2024-04-30",
          mySpend: {
            current: 90000,
            reference: 85000,
            absoluteChange: 5000,
            percentChange: 5.88
          },
          sameStoreSpend: {
            current: 70000,
            reference: 75000,
            absoluteChange: -5000,
            percentChange: -6.67
          },
          newStoreSpend: {
            current: 10000,
            reference: 5000,
            absoluteChange: 5000,
            percentChange: 100
          },
          lostStoreSpend: {
            current: 10000,
            reference: 5000,
            absoluteChange: 5000,
            percentChange: 100
          }
        },
        {
          country: "USA",
          state: "California",
          city: "San Francisco",
          sector: "Hospitality",
          category: "Beverages",
          startDate: "2024-04-01",
          endDate: "2024-04-30",
          mySpend: {
            current: 130000,
            reference: 110000,
            absoluteChange: 20000,
            percentChange: 18.18
          },
          sameStoreSpend: {
            current: 100000,
            reference: 95000,
            absoluteChange: 5000,
            percentChange: 5.26
          },
          newStoreSpend: {
            current: 20000,
            reference: 10000,
            absoluteChange: 10000,
            percentChange: 100
          },
          lostStoreSpend: {
            current: 10000,
            reference: 15000,
            absoluteChange: -5000,
            percentChange: -33.33
          }
        },
        {
          country: "USA",
          state: "Texas",
          city: "Austin",
          sector: "Retail",
          category: "Frozen Foods",
          startDate: "2024-04-01",
          endDate: "2024-04-30",
          mySpend: {
            current: 80000,
            reference: 70000,
            absoluteChange: 10000,
            percentChange: 14.29
          },
          sameStoreSpend: {
            current: 60000,
            reference: 55000,
            absoluteChange: 5000,
            percentChange: 9.09
          },
          newStoreSpend: {
            current: 10000,
            reference: 10000,
            absoluteChange: 0,
            percentChange: 0
          },
          lostStoreSpend: {
            current: 10000,
            reference: 5000,
            absoluteChange: 5000,
            percentChange: 100
          }
        }
      ], 
      }
      state.dateRange = [null, null]
    },
  },
})

export const {
  setCountries,
  setStates,
  setSectors,
  setCategories,
  setDateRange,
  clearFilters,
  setData,
 setAttributeChange
} = filterSlice.actions

export default filterSlice.reducer
