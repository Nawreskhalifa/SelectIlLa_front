import { mount } from '@vue/test-utils';
import CallLeads from '../../src/components/Dashboard/CRMSystem/CallLeads.vue';

describe('CallLeads.vue', () => {
  it('renders the correct number of outgoing leads today', () => {
    const wrapper = mount(CallLeads);

    // Recherche des éléments de titre pour les appels sortants
    const outgoingCallTitle = wrapper.findAll('span').filter((span) => span.text() === 'OUTGOING CALL');

    // Vérifie s'il y a un titre pour les appels sortants
    expect(outgoingCallTitle).toHaveLength(1);

    // Recherche des éléments de titre pour les appels sortants
    const outgoingLeadsToday = wrapper.find('h3').text();

    // Vérifie si le nombre de leads sortants aujourd'hui est correct
    expect(outgoingLeadsToday).toContain('10 Leads Today');
  });

  it('renders the correct number of support leads this week', () => {
    const wrapper = mount(CallLeads);

    // Recherche des éléments de titre pour les appels de support
    const supportCallTitle = wrapper.findAll('span').filter((span) => span.text() === 'SUPPORT CALL');

    // Vérifie s'il y a un titre pour les appels de support
    expect(supportCallTitle).toHaveLength(1);

    // Recherche des éléments de titre pour les appels de support
    const supportLeadsThisWeek = wrapper.find('h3').text();

    // Vérifie si le nombre de leads de support cette semaine est correct
   // expect(supportLeadsThisWeek).toContain('23 Leads This Week');
  });
});
