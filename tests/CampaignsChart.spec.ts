import { mount } from '@vue/test-utils';
import CampaignsChart from '../../src/components/Dashboard/CRMSystem/CampaignsChart.vue';

describe('CampaignsChart.vue', () => {
  it('renders the correct number of campaigns data', () => {
    const wrapper = mount(CampaignsChart);

    // Recherche des éléments de titre pour les données de campagne
    const titles = wrapper.findAll('span.d-block.text-black-emphasis.fw-medium');

    // Vérifie s'il y a trois titres de données de campagne
    expect(titles).toHaveLength(3);

    // Recherche des éléments de titre pour les données de campagne
    const totalSent = titles[0].text();
    const reached = titles[1].text();
    const opened = titles[2].text();

    // Vérifie si les titres de données de campagne sont corrects
    expect(totalSent).toContain('Total Sent');
    expect(reached).toContain('Reached');
    expect(opened).toContain('Opened');
  });

  it('renders the correct number of campaigns values', () => {
    const wrapper = mount(CampaignsChart);

    // Recherche des éléments de valeur pour les données de campagne
    const values = wrapper.findAll('h5.fw-black.mb-1');

    // Vérifie s'il y a trois valeurs de données de campagne
    expect(values).toHaveLength(3);

    // Recherche des éléments de valeur pour les données de campagne
    const totalSentValue = values[0].text();
    const reachedValue = values[1].text();
    const openedValue = values[2].text();

    // Vérifie si les valeurs de données de campagne sont correctes
    expect(totalSentValue).toContain('5218');
    expect(reachedValue).toContain('5218');
    expect(openedValue).toContain('5218');
  });
});
