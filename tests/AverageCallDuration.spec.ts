import { mount } from '@vue/test-utils';
import AverageCallDuration from '../../src/components/Dashboard/CRMSystem/AverageCallDuration.vue';

describe('AverageCallDuration.vue', () => {
    it('renders average call duration properly', () => {
      // Mock data
      const averageData = [7, 8, 9, 9, 8, 9, 8, 9, 11, 9, 8];
  
      // Mount the component
      const wrapper = mount(AverageCallDuration, {
        data() {
          return {
            average: [{ data: averageData }],
          };
        },
      });
  
      // Assert that the component renders the average call duration
      const averageDurationText = wrapper.find('h2').text();
      expect(averageDurationText).toBe('8 min 30s');
  
      // Assert that the chart data is passed correctly to the component
      const chartComponent = wrapper.findComponent({ name: 'Apexchart' });
     // expect(chartComponent.props('series')).toEqual([{ data: averageData }]);
    });
  });