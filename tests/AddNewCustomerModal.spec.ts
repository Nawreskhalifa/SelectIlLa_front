import { mount } from '@vue/test-utils';
import AddNewCustomerModal from '@/components/Users/Customers/AddNewCustomerModal.vue';

describe('AddNewCustomerModal', () => {
  it('renders correctly', () => {
    const wrapper = mount(AddNewCustomerModal);
    
    // Vérifie si le composant est rendu
    expect(wrapper.exists()).toBe(true);
    
    // Vérifie si le titre du modal est correct
    expect(wrapper.find('.modal-title').text()).toBe('Add New Customer');
  });

  it('submits the form correctly', async () => {
    const wrapper = mount(AddNewCustomerModal);

    // Mock the form submission
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    // Vérifie si le formulaire est soumis
    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('submits the form correctly', async () => {
    const wrapper = mount(AddNewCustomerModal);
  
    // Mock the form submission
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
  
    // Vérifie si le formulaire est soumis
    expect(wrapper.emitted('submit')).toBeTruthy();
  });
  
});
