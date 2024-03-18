import { mount } from '@vue/test-utils';
import AverageEnrollmentRate from '../../src/components/Dashboard/LMSCourses/AverageEnrollmentRate.vue';  

describe('AverageEnrollmentRate.vue', () => {
  it('renders the component correctly', () => {
    // Montez le composant
    const wrapper = mount(AverageEnrollmentRate);

    // Vérifiez si le composant est rendu correctement
    expect(wrapper.exists()).toBe(true);

    // Vérifiez si le titre est rendu correctement
    const titleElement = wrapper.find('.card-title');
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toContain('Average Enrollment Rate');

    // Vérifiez si le dropdown est rendu correctement
    const dropdownButton = wrapper.find('.dropdown-toggle');
    expect(dropdownButton.exists()).toBe(true);

   

    // Vérifiez si le graphique est rendu correctement
    const chartElement = wrapper.find('#averageEnrollmentRateChart');
    expect(chartElement.exists()).toBe(true);

    // Vérifiez si les options du graphique sont correctes
    const chartOptions = wrapper.vm.averageEnrollmentRateChart;
    expect(chartOptions).toHaveProperty('chart');
    expect(chartOptions.chart).toHaveProperty('height', 265);
    expect(chartOptions.chart).toHaveProperty('type', 'line');
    // Assurez-vous que d'autres propriétés sont correctes en fonction de vos besoins
  });
});
