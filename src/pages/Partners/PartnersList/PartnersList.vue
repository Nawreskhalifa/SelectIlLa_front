<template>
    <BreadCrumb PageTitle="Partners List" />
    <PartnersList />
</template>

<script>
import PartnersList from "@/components/Partners/PartnersList/PartnersList.vue";
import BreadCrumb from "../../../components/Common/BreadCrumb.vue";

export default {
    components: {
        PartnersList,
        BreadCrumb,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
