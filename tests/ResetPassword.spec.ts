import { shallowMount } from '@vue/test-utils';
import ResetPassword from '@/components/Authentication/ResetPassword/ResetPassword.vue';

describe('ResetPassword', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(ResetPassword);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains input fields for password and confirm password', () => {
    const wrapper = shallowMount(ResetPassword);
    const passwordInput = wrapper.find('input[type="password"][placeholder="**************"]');
    const confirmPasswordInput = wrapper.find('input[type="password"][placeholder="**************"]');
    expect(passwordInput.exists()).toBe(true);
    expect(confirmPasswordInput.exists()).toBe(true);
  });

  it('contains a button to reset password', () => {
    const wrapper = shallowMount(ResetPassword);
    const resetPasswordButton = wrapper.find('button[type="submit"]');
    expect(resetPasswordButton.exists()).toBe(true);
    expect(resetPasswordButton.text()).toBe('Reset Password');
  });

  
});
