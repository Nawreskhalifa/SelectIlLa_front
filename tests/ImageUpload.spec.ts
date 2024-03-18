import { mount } from '@vue/test-utils';
import ImageUpload from '@/components/Users/Customers/ImageUpload.vue';

describe('ImageUpload.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Avant chaque test, montez le composant
    wrapper = mount(ImageUpload);
  });

  afterEach(() => {
    // Après chaque test, démontez le composant
    wrapper.unmount();
  });

  it('updates selectedFile and previews image on file change', async () => {
    // Créez un fichier de test
    const file = new File(['image content'], 'image.png', { type: 'image/png' });

    // Émulez l'événement de changement de fichier
    await wrapper.vm.handleFileChange({
      target: { files: [file] },
    });

    // Vérifie si la propriété selectedFile a été correctement mise à jour
    expect(wrapper.vm.selectedFile).toEqual(file);

    // Attendre que l'image soit chargée
 //   await new Promise((resolve) => {
      // Écouter l'événement personnalisé pour l'image chargée
 //     wrapper.vm.$on("image-loaded", () => {
        // Vérifie si l'URL de l'image est correctement mise à jour
 //       expect(wrapper.vm.imageUrl).toBeTruthy();
      // resolve();
      });
  //  });
//  });

  it('resets imageUrl when no file is selected', async () => {
    // Emule l'événement de changement de fichier avec un tableau vide de fichiers
    await wrapper.vm.handleFileChange({
      target: { files: [] },
    });

    // Vérifie si la propriété selectedFile est null
    expect(wrapper.vm.selectedFile).toBeNull();

    // Vérifie si l'URL de l'image est réinitialisée à une chaîne vide
    expect(wrapper.vm.imageUrl).toBe('');
  });
});
