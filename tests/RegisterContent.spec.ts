import { shallowMount } from '@vue/test-utils';
import RegisterContent from '@/components/Authentication/Register/RegisterContent.vue';

describe('RegisterContent', () => {
  it('renders all input fields', () => {
    const wrapper = shallowMount(RegisterContent);
    
    // Check if name input exists
    const nameInput = wrapper.find('input[type="text"]');
    expect(nameInput.exists()).toBe(true);

    // Check if email input exists
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);

    // Check if password input exists
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);

    // Check if confirm password input exists
    const confirmPasswordInput = wrapper.find('input[type="password"]');
    expect(confirmPasswordInput.exists()).toBe(true);

    // Check if remember me checkbox exists
    const rememberMeCheckbox = wrapper.find('input[type="checkbox"]');
    expect(rememberMeCheckbox.exists()).toBe(true);
  });

  it('renders the register button', () => {
    const wrapper = shallowMount(RegisterContent);
    const registerButton = wrapper.find('button[name="Register"]');
    expect(registerButton.exists()).toBe(true);
  });


});
