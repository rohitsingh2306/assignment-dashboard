import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type SpendMetric = 'mySpend' | 'sameStoreSpend' | 'newStoreSpend' | 'lostStoreSpend';

interface BarChartProps {
  data: any[];
  selectedAttributes: string[]; // e.g., ["My Spend", "New Store Spend"]
}

const attributeKeyMap: Record<string, SpendMetric> = {
  "My Spend": "mySpend",
  "Same Store Spend": "sameStoreSpend",
  "New Store Spend": "newStoreSpend",
  "Lost Store Spend": "lostStoreSpend"
};

const allAttributeLabels = Object.keys(attributeKeyMap);

const BarChart: React.FC<BarChartProps> = ({ data, selectedAttributes }) => {

  const filters = useSelector((state: RootState) => state.filter)

  const activeAttributes = selectedAttributes.length > 0 ? selectedAttributes : allAttributeLabels;
  const keys = activeAttributes.map(attr => attributeKeyMap[attr]);

  const filteredData = filters?.categories
    ? data.filter(item => item.category === filters.categories)
    : data;

  const chartData = filteredData.reduce((acc: any[], item) => {
    let existing = acc.find(d => d.category === item.category);
    if (!existing) {
      existing = { category: item.category };
      acc.push(existing);
    }

    activeAttributes.forEach(attr => {
      const key = attributeKeyMap[attr];
      existing[key] = (existing[key] || 0) + (item[key]?.current || 0);
    });

    return acc;
  }, []);

  console.log("chartData",chartData)

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={chartData}
        keys={keys}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        colors={{ scheme: 'nivo' }}
        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        axisLeft={{ tickSize: 5, tickPadding: 5 }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
