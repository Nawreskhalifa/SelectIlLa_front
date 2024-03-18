import { mount } from '@vue/test-utils';
import BreadCrumb from '@/components/Common/BreadCrumb.vue';
import { RouterLinkStub } from '@vue/test-utils'; // Stub for router-link

describe('BreadCrumb', () => {
  it('renders correct breadcrumb items', () => {
    const PageTitle = 'Edit Category';
    const PrevPage = 'Categories Events List';
    const url = '/categories-event';

    const wrapper = mount(BreadCrumb, {
      props: {
        PageTitle,
        PrevPage,
        url
      },
      global: {
        components: {
          'router-link': RouterLinkStub // Stubbing router-link
        }
      }
    });

    const breadcrumbItems = wrapper.findAll('.breadcrumb-item');

    // Check if the correct number of breadcrumb items is rendered
    expect(breadcrumbItems.length).toBe(2);

    // Check the text content of each breadcrumb item
    expect(breadcrumbItems[0].text()).toBe(PrevPage);
    expect(breadcrumbItems[1].text()).toBe(PageTitle);

    // Check if router-link is rendered with correct props
    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.props().to).toBe(url);
    expect(routerLink.text()).toBe(PrevPage);
  });

  it('renders default values correctly', () => {
    const PageTitle = 'Edit Category';

    const wrapper = mount(BreadCrumb, {
      props: {
        PageTitle
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    });

    const breadcrumbItems = wrapper.findAll('.breadcrumb-item');

    // Check if the correct number of breadcrumb items is rendered
    expect(breadcrumbItems.length).toBe(2);

    // Check the text content of each breadcrumb item
    expect(breadcrumbItems[0].text()).toBe('Dashboard');
    expect(breadcrumbItems[1].text()).toBe(PageTitle);

    // Check if router-link is rendered with correct default props
    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.props().to).toBe('/');
    expect(routerLink.text()).toBe('Dashboard');
  });
});
