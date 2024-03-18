import { mount } from '@vue/test-utils';
import BrandModal from '../../src/components/VehicleCategories/AddNewBrand/AddNewBrand.vue';

describe('BrandModal.vue', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = mount(BrandModal, {
        props: {
          show: true,
          make: { id: 1, attributes: { name: 'Test Make' } }
        }
      });
    });
  
    // afterEach(() => {
    //   wrapper.destroy();
    // });
  
    it('renders the component properly', () => {
      expect(wrapper.exists()).toBe(true);
    });
  
    it('initializes data correctly', () => {
      expect(wrapper.vm.name).toBe('');
    });
  
    it('emits close event when closeModal method is called', async () => {
      await wrapper.vm.closeModal();
      expect(wrapper.emitted('close')).toBeTruthy();
    });
  
    it('emits addBrand event with correct data when confirm method is called', async () => {
      wrapper.setData({ name: 'Test Brand' });
      await wrapper.vm.confirm();
      expect(wrapper.emitted('addBrand')).toBeTruthy();
      expect(wrapper.emitted('addBrand')[0][0]).toEqual({ name: 'Test Brand', make: 1 });
    });
  
    it('clears name field after confirm method is called', async () => {
      wrapper.setData({ name: 'Test Brand' });
      await wrapper.vm.confirm();
      expect(wrapper.vm.name).toBe('');
    });
  
  });
