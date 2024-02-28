<template>
    <BreadCrumb PageTitle="Partners Details" />
    <PartnerDetails />
</template>

<script>
import PartnerDetails from "@/components/Partners/PartnerDetails/PartnerDetails.vue";
import BreadCrumb from "../../../components/Common/BreadCrumb.vue";

export default {
    components: {
        PartnerDetails,
        BreadCrumb,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
