import { mount } from '@vue/test-utils';
import AverageSpeedOfAnswer from '../../src/components/Dashboard/SupportDesk/AverageSpeedOfAnswer.vue';

describe('AverageSpeedOfAnswer', () => {
  it('renders average speed of answer correctly', () => {
    const wrapper = mount(AverageSpeedOfAnswer);
    // Vérifie si le composant est rendu correctement
    expect(wrapper.exists()).toBe(true);

    // Vérifie si le titre est correct
    const title = wrapper.find('.content span');
    expect(title.text()).toBe('Average Speed Of Answer');

    // Vérifie si le temps moyen est correct
    const time = wrapper.find('h2');
    expect(time.text()).toBe('1 min 12s');

    // Vérifie si la description est correcte
    const description = wrapper.find('p');
    expect(description.text()).toBe(
      'Measure how quickly support staff answer incoming calls.'
    );
  });
});
