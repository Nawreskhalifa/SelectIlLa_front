import { mount } from '@vue/test-utils';
import AnsweredTickets from '../../src/components/Dashboard/SupportDesk/TicketsChart/AnsweredTickets.vue';

describe('AnsweredTickets', () => {
  it('renders component correctly', () => {
    const wrapper = mount(AnsweredTickets);

    // Vérifie si le composant est rendu correctement
    expect(wrapper.exists()).toBe(true);

    // Vérifie si le titre "ANSWERED TICKETS" est présent
    const title = wrapper.find('.info span');
    expect(title.text()).toContain('ANSWERED TICKETS');

    // Vérifie si le nombre de tickets répondus est correct
    const numberOfTickets = wrapper.find('.info h4');
    expect(numberOfTickets.text()).toBe('13');

    // Vérifie si la variation est affichée correctement
    const variation = wrapper.find('.info span.text-badge');
    expect(variation.text()).toContain('1.2%');
  });

  it('renders chart correctly', () => {
    const wrapper = mount(AnsweredTickets);

    // Vérifie si le graphique est rendu correctement
    const chart = wrapper.find('.chart');
    expect(chart.exists()).toBe(true);
  });
});
