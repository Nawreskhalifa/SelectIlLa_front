<template>
    <BreadCrumb PageTitle="Add Partner" />
    <AddPartner />
</template>

<script>
import AddPartner from "@/components/Partners/AddPartner/AddPartner.vue";
import BreadCrumb from "@/components/Common/BreadCrumb.vue";

export default {
    components: {
        AddPartner,
        BreadCrumb,
    },

};
</script>

<style lang="scss" scoped></style>
