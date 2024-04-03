<template>
    <div>

    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'home',
    setup() {
        const store = useStore()
        const { locale } = useI18n();

        return {
            locale,
            store
        }
    }
})
</script>

<style scoped></style>