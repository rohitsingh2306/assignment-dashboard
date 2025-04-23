import reducer, {
    setCountries,
    setStates,
    clearFilters,
    setAttributeChange
  } from '../filterSlice'
  
  describe('filterSlice reducer', () => {
    const initialState = reducer(undefined, { type: '' })
  
    it('should return the initial state', () => {
      expect(initialState.countries).toBe('')
      expect(initialState.states).toBe('')
      expect(initialState.sectors).toBe('')
      expect(initialState.categories).toBe('')
      expect(initialState.attributeSelected).toEqual([])
    })
  
    it('should handle setCountries', () => {
      const newState = reducer(initialState, setCountries('India'))
      expect(newState.countries).toBe('India')
    })
  
    it('should handle setStates', () => {
      const newState = reducer(initialState, setStates('Karnataka'))
      expect(newState.states).toBe('Karnataka')
    })
  
    it('should handle setAttributeChange', () => {
      const attrs = ['sector', 'category']
      const newState = reducer(initialState, setAttributeChange(attrs))
      expect(newState.attributeSelected).toEqual(attrs)
    })
  
    it('should handle clearFilters', () => {
      const modified = {
        ...initialState,
        countries: 'India',
        states: 'Goa',
        attributeSelected: ['city']
      }
  
      const newState = reducer(modified, clearFilters())
      expect(newState.countries).toBe('')
      expect(newState.states).toBe('')
      expect(newState.attributeSelected).toEqual([])
      expect(newState.dateRange).toEqual([null, null])
    })
  })
  