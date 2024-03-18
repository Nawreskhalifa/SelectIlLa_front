import { shallowMount } from '@vue/test-utils';
import ForgotPassword from '@/components/Authentication/ForgotPassword/ForgotPassword.vue';
import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: []
});

describe('ForgotPassword', () => {
  it('renders the email input field', () => {
    const wrapper = shallowMount(ForgotPassword, {
      global: {
        plugins: [router]
      }
    });
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);
  });
  
});
