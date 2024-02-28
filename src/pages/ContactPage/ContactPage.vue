<template>
  <BreadCrumb PageTitle="Contacts" />
  <ContactPage></ContactPage>
</template>

<script>
import ContactPage from "../../components/Contacts/ClientsContact/ClientContact.vue";
import BreadCrumb from "../../components/Common/BreadCrumb.vue";

export default {
  components: {
    ContactPage,
    BreadCrumb,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
