import { shallowMount } from '@vue/test-utils';
import EmailConfirmation from '@/components/Authentication/EmailConfirmation/EmailConfirmation.vue'; // Assurez-vous d'importer le composant correctement depuis l'emplacement réel

describe('EmailConfirmation', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EmailConfirmation);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays correct text content', () => {
    const wrapper = shallowMount(EmailConfirmation);
    expect(wrapper.find('h4').text()).toBe('Your Email Verified!');
    expect(wrapper.find('p').text()).toBe('Your mail is verified! Your account is now safe from unwanted activities.');
  });
/*
  it('contains a link to the home page', () => {
    const wrapper = shallowMount(EmailConfirmation);
    const link = wrapper.find('router-link-stub');
    expect(link.exists()).toBe(true);
    expect(link.props().to).toBe('/');
  });
  */
});
