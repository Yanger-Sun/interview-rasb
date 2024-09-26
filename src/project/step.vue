<template>
  <a-steps label-placement="vertical" :current="current" :items="steps" class="project-step">
    <template #progressDot="{ index, status, prefixCls }">
      <template v-if="status == 'finish'">
        <CheckCircleOutlined />
      </template>
      <template v-else>
        <component :is="steps[index].icon" />
      </template>
    </template>
  </a-steps>
</template>

<script setup lang="ts">
import { inject, computed, h } from 'vue';
import { StepProps } from 'ant-design-vue';
import { ProjectKey } from './symbols';
import { EditOutlined, FormOutlined, HighlightOutlined, TeamOutlined, CopyOutlined, CheckCircleOutlined, } from '@ant-design/icons-vue';

const projectDetail = inject(ProjectKey);
const Icons = [EditOutlined, FormOutlined, HighlightOutlined, TeamOutlined, CopyOutlined]
const steps = computed<StepProps>(() => {
  let statusList = projectDetail.value['status-list'] || [];
  if (statusList.length == 0) {
    return [];
  }
  return statusList.map((item, index) => {
    return {
      title: item.status,
      description: item.date,
      icon: h(Icons[index]),
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
    .ant-steps-icon{
      width: 32px !important;
      height: 32px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .ant-steps-item-tail {
      top: 15px !important;
      transform: translateX(6px);
      width: calc(100% - 20px) !important;
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
    .ant-steps-item-icon{
      transform: translateX(-16px);
      width: 32px !important;
      height: 32px  !important;
    .ant-steps-icon{
      background: #eeeeee;
    }
    }
    .ant-steps-item-process {
      // .ant-steps-item-icon {
      //   background-color: rgba(0, 0, 0, 0.06) !important;
      //   border-color: transparent !important;
      // }

      .ant-steps-icon {
        color: rgba(0, 0, 0, 0.65) !important;
      }
    }


    .ant-steps-item-finish {
      .ant-steps-icon{
        background: #1677ff;
        color: #ffffff;
        span{
          color: #ffffff !important;
        }
      }
      .ant-steps-item-title,
      .ant-steps-item-description {
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