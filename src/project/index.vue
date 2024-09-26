<template>
    <a-card title="项目节点" class="project-block">
        <StepVue />
    </a-card>

    <section class="project-cahrt-progress">
        <a-card title="项目概况" class="project-block">
            <chartVue />
        </a-card>
        <a-card title="项目成本" class="project-block">
            <ProgressVue />
        </a-card>
    </section>
</template>

<script setup lang="ts">
import axios from 'axios';
import StepVue from './step.vue';
import ProgressVue from './progress.vue';
import { onMounted, ref, provide } from 'vue';
import chartVue from './echart.vue';
import { ProjectKey } from './symbols';

const projectDetail = ref<Project>({});
provide(ProjectKey, projectDetail);
function getDetail() {
    axios.get('/mock-data/project.json').then(res => {
        projectDetail.value = res.data;
    })
}

onMounted(() => {
    getDetail();
})

</script>

<style lang="scss" scoped>
@import "@/assets/theme.scss";
.project-block {
    margin-bottom: 20px;
}

.project-cahrt-progress {
    display: flex;
}

@media screen and (max-width: 900px) {
    .project-cahrt-progress {
        flex-direction: column;

        .project-block {
            display: inline-block;
            width: 100%;
        }
    }
}

@media screen and (min-width: 900px) {
    .project-cahrt-progress {
        justify-content: space-between;

        .project-block {
            display: inline-block;
            width: calc((100% - 20px) / 2);
        }
    }
}

.ant-card{
    background-color: var(--card-background-color) !important;
    border-color: var(--card-border-color) !important;
    :deep{
        .ant-card-head-title{
            color: var(--ant-card-head-title) !important;
        }
    }
}
</style>