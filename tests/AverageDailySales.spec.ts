import { mount } from '@vue/test-utils';
import AverageDailySales from '../../src/components/Dashboard/Ecommerce/AverageDailySales.vue';

describe('AverageDailySales.vue', () => {
    it('renders the component correctly', () => {
      const wrapper = mount(AverageDailySales);
  
      expect(wrapper.exists()).toBe(true);
  
      const chartElement = wrapper.find('.chart');
      expect(chartElement.exists()).toBe(true);
  
      const expectedOptions = {
        chart: {
          type: 'bar',
          height: 150,
          width: 220,
          toolbar: {
            show: false,
          },
        },
        colors: ["#6FD3F7"],
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        grid: {
          borderColor: "#f0f0f0",
          show: false,
          strokeDashArray: 5,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: "rounded",
            columnWidth: "35%",
            horizontal: false,
          },
        },
        stroke: {
          show: false,
        },
        tooltip: {
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            fontSize: "14px",
          },
          y: {
            formatter: expect.any(Function),
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          labels: {
            show: false,
            style: {
              colors: "#9C9AB6",
              fontFamily: "Red Hat Display, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: ["#9C9AB6"],
              fontFamily: "Red Hat Display, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            },
          },
          show: false,
          tickAmount: 8,
        },
      };
      expect(wrapper.vm.averageDailySalesChart).toEqual(expectedOptions);
  
      const expectedSalesData = [
        {
          name: 'Sales',
          data: [100, 30, 65, 90, 40, 100, 35],
        },
      ];
      expect(wrapper.vm.sales).toEqual(expectedSalesData);
    });
});
