import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography } from '@mui/material';
import { User } from '../data/mockUser';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AnalyticsViewProps {
  selectedUser: User | null;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ selectedUser }) => {

  const filterss = useSelector((state: RootState) => state.filter)
  const data = filterss?.data?.data ?? [];

  // 1️⃣ Time Series Line Chart Data
  const lineData = [
    {
      id: 'My Spend',
      data: data.map((d, i) => ({
        x: `${d.city}, ${d.state}`,
        y: d.mySpend.current,
      })),
    },
    {
      id: 'Same Store Spend',
      data: data.map((d, i) => ({
        x: `${d.city}, ${d.state}`,
        y: d.sameStoreSpend.current,
      })),
    },
  ];

  // 2️⃣ % Change Bar Chart Data
  const percentChangeData = data.map((d) => ({
    location: `${d.city}, ${d.state}`,
    MySpend: d.mySpend.percentChange,
    SameStore: d.sameStoreSpend.percentChange,
    NewStore: d.newStoreSpend.percentChange,
    LostStore: d.lostStoreSpend.percentChange,
  }));

  return (
    <div>
      <h2>Analytics View</h2>
      {selectedUser ? (
        <>
          <p>Analyzing data for: {selectedUser.name}</p>

          {/* Line Chart */}
          <Box height={400} mt={4}>
            <Typography variant="h6">Spend Over Locations</Typography>
            <ResponsiveLine
              data={lineData}
              margin={{ top: 40, right: 100, bottom: 60, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
              axisBottom={{
                legend: 'City, State',
                legendOffset: 40,
                legendPosition: 'middle',
                tickRotation: -45,
              }}
              axisLeft={{
                legend: 'Spend',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              colors={{ scheme: 'nivo' }}
              pointSize={8}
              useMesh={true}
            />
          </Box>

          {/* Bar Chart */}
          <Box height={400} mt={6}>
            <Typography variant="h6">% Change by Location</Typography>
            <ResponsiveBar
              data={percentChangeData}
              keys={['MySpend', 'SameStore', 'NewStore', 'LostStore']}
              indexBy="location"
              margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'set2' }}
              axisBottom={{
                tickRotation: -45,
                legend: 'Location',
                legendPosition: 'middle',
                legendOffset: 60,
              }}
              axisLeft={{
                legend: '% Change',
                legendPosition: 'middle',
                legendOffset: -50,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              animate={true}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemsSpacing: 4,
                  symbolSize: 20,
                  effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
                },
              ]}
            />
          </Box>
        </>
      ) : (
        <p>No user selected.</p>
      )}
    </div>
  );
};

export default AnalyticsView;
