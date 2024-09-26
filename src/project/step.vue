<template>
  <a-steps label-placement="vertical" :current="current" :items="steps" class="project-step"></a-steps>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { StepProps } from 'ant-design-vue';
import {ProjectKey} from './symbols';

const projectDetail = inject(ProjectKey);

const steps = computed<StepProps>(() => {
  let statusList = projectDetail.value['status-list'] || [];
  if(statusList.length == 0){
    return [];
  }
  return statusList.map(item => {
    return {
      title: item.status,
      description: item.date
    }
  })
})

const current = computed(() => {
  return steps.value.findIndex(item => !item.description)
})
</script>

<style lang="scss" scoped>
.project-step {
  :deep {
    .ant-steps-item-tail {
      &:before {
        content: '';
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        right: 0;
        position: absolute;
        width: calc(100% - 48px);
        height: 1px;
        background: rgba(5, 5, 5, 0.06);
      }
    }
    .ant-steps-item-process{
      .ant-steps-item-icon{
       background-color: rgba(0, 0, 0, 0.06) !important; 
       border-color: transparent !important;
      }
      .ant-steps-icon{
        color: rgba(0, 0, 0, 0.65) !important;
      }
    }

    .ant-steps-item-finish {
      .ant-steps-item-title,
      .ant-steps-item-description{
        color: #1677ff !important;
      }
      &+.ant-steps-item-finish {
        .ant-steps-item-container {
          .ant-steps-item-tail {
            &:after {
              width: 50%;
            }
          }
        }
      }


    }

  }
}
</style>