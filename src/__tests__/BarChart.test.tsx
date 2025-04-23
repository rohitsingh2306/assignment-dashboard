// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import BarChart from '../charts/BarChart';
// import '@testing-library/jest-dom';

// jest.mock('@nivo/bar', () => ({
//   ResponsiveBar: () => <div data-testid="mock-bar-chart">Mock Chart</div>,
// }));

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(() => ({ categories: null })),
// }));

// describe('BarChart', () => {
//   it('renders with mock chart', () => {
//     const testData = [
//       {
//         category: 'Food',
//         mySpend: { current: 100 },
//         sameStoreSpend: { current: 50 },
//         newStoreSpend: { current: 30 },
//         lostStoreSpend: { current: 10 },
//       },
//     ];

//     render(<BarChart data={testData} selectedAttributes={["My Spend"]} />);
//     expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
//   });

//   it('renders with multiple selected attributes', () => {
//     const testData = [
//       {
//         category: 'Food',
//         mySpend: { current: 100 },
//         sameStoreSpend: { current: 50 },
//         newStoreSpend: { current: 30 },
//         lostStoreSpend: { current: 10 },
//       },
//       {
//         category: 'Electronics',
//         mySpend: { current: 200 },
//         sameStoreSpend: { current: 60 },
//         newStoreSpend: { current: 40 },
//         lostStoreSpend: { current: 20 },
//       },
//     ];
  
//     render(
//       <BarChart
//         data={testData}
//         selectedAttributes={['My Spend', 'New Store Spend']}
//       />
//     );
  
//     // Check that the mock chart is rendered (mocked ResponsiveBar)
//     const chartElement = screen.getByTestId('mock-bar-chart');
//     expect(chartElement).toBeInTheDocument();
  
//     // Check that there are multiple bars rendered (since two attributes are selected)
//     expect(chartElement.querySelectorAll('div')).toHaveLength(2); // Mock implementation, in real tests we would count actual bars
//   });
  
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChart from '../charts/BarChart';
import '@testing-library/jest-dom';

type MockResponsiveBarProps = {
  data: { category:  number; [key: string]: number }[]; // Allow any other properties to be number
  keys: string[]; // Keys that are passed to the ResponsiveBar
};

// Mock ResponsiveBar with correct types
jest.mock('@nivo/bar', () => ({
  ResponsiveBar: ({ data, keys }: MockResponsiveBarProps) => (
    <div data-testid="mock-bar-chart">
      {data.map((item, index) => (
        <div key={index} data-testid={`mock-bar-${index}`}>
          {keys.map((key, idx) => (
            <span key={idx}>{key}: {item[key]}</span>
          ))}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({ categories: null })), // Default behavior, no filter
}));

describe('BarChart', () => {
  it('renders with mock chart and checks length of bars', () => {
    const testData = [
      {
        category: 'Food',
        mySpend: 100,
        sameStoreSpend: 50,
        newStoreSpend: 30,
        lostStoreSpend: 10,
      },
      
    ];

    render(
      <BarChart
        data={testData}
        selectedAttributes={['My Spend', 'New Store Spend']}
      />
    );

    // Check that the mock chart is rendered
    const chartElement = screen.getByTestId('mock-bar-chart');
    expect(chartElement).toBeInTheDocument();

    // Check if the length of the bars matches the length of the data (each data item should render one bar)
    const bars = screen.getAllByTestId(/^mock-bar-/); // We expect one div per category
    expect(bars).toHaveLength(2); // Two categories in testData
  });
});

describe('BarChart', () => {
  it('renders with mock chart', () => {
    const testData = [
      {
        category: 'Food',
        mySpend: { current: 100 },
        sameStoreSpend: { current: 50 },
        newStoreSpend: { current: 30 },
        lostStoreSpend: { current: 10 },
      },
    ];

    render(<BarChart data={testData} selectedAttributes={["My Spend"]} />);
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
  });

  it('renders with multiple selected attributes', () => {
    const testData = [
      {
        category: 'Food',
        mySpend: { current: 100 },
        sameStoreSpend: { current: 50 },
        newStoreSpend: { current: 30 },
        lostStoreSpend: { current: 10 },
      },
      {
        category: 'Electronics',
        mySpend: { current: 200 },
        sameStoreSpend: { current: 60 },
        newStoreSpend: { current: 40 },
        lostStoreSpend: { current: 20 },
      },
    ];
  
    render(
      <BarChart
        data={testData}
        selectedAttributes={['My Spend', 'New Store Spend']}
      />
    );
  
    // Check that the mock chart is rendered (mocked ResponsiveBar)
    const chartElement = screen.getByTestId('mock-bar-chart');
    expect(chartElement).toBeInTheDocument();
  
    // Check that there are multiple bars rendered (since two attributes are selected)
    expect(chartElement.querySelectorAll('div')).toHaveLength(2); // Mock implementation, in real tests we would count actual bars
  });
  
});
