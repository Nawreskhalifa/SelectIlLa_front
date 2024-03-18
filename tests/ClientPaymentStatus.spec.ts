import { mount } from '@vue/test-utils';
import ClientPaymentStatus from '@/components/Dashboard/CRMSystem/ClientPaymentStatus.vue';


describe('ClientPaymentStatus', () => {
  it('renders correctly', () => {
    const wrapper = mount(ClientPaymentStatus);
    expect(wrapper.exists()).toBe(true); 
  });
});
it('renders the correct title', () => {
  const wrapper = mount(ClientPaymentStatus);
  expect(wrapper.find('.card-title').text()).toBe('Client Payment Status');
});


