<template>
    <section class="project-cost_list">
        <ul class="project-cost_header">
            <li class="num">序号</li>
            <li class="project-cost_right">
                <span class="type">费用类型</span>
                <p>
                    <span class="">费用金额</span>
                    <span>占比</span>
                </p>
            </li>
        </ul>

        <ul class="project-cost_body" v-for="(cost, costIndex) in costList" :key="costIndex">
            <li class="num">
                <span>{{ costIndex + 1 }}</span>
            </li>
            <li class="project-cost_body_right">
                <section class="project-cost_right">
                    <span class="type">{{ cost.name }}</span>
                    <p>
                        <span class="amount">{{ cost.amount }}万元</span>
                        <span>{{ cost.rate.toFixed(2) + '%' }}</span>
                    </p>
                </section>
                <div class="project-amount_progress-wrap">
                    <a-progress :stroke-color="cost.rate < 40 ? '#e6f4ff' : '#1677ff'" :percent="cost.rate"
                        :show-info="false" />
                    <span class="rate-txt" :style="setStyle(cost.rate)">{{ cost.rate + '%' }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import Big from 'big.js';
import {ProjectKey} from './symbols';

const projectDetail = inject(ProjectKey);
const costList = computed(() => {
    let list = projectDetail.value.costList || [];
    return list.map(item => {
        return {
            ...item,
            amount: getPercent(item.amount, false),
            rate: getPercent(item.proportion || 0),
        }
    })
})

function getPercent(num: number, getRate = true) {
    return getRate ? new Big(num).times(100).toNumber() : new Big(num).div(10000).toNumber();
}

function setStyle(rate: number) {
    return {
        left: rate < 5 ? 0 : (rate - 5) + '%',
        color: rate < 40 ? '#222222' : '#ffffff'
    }
}



</script>

<style lang="scss" scoped>
.project-cost_list {
    .ant-progress {
        margin-bottom: 0;

        :deep {
            .ant-progress-outer {
                height: 20px !important;

                .ant-progress-bg {
                    height: 20px !important;
                    // background: #e6f4ff !important;
                }
            }

            .ant-progress-status-active {
                .ant-progress-bg {
                    background: #e6f4ff !important;
                }
            }
        }
    }
    .project-cost_header{
            li, span{
                color: #888888;
            }
    }
    ul {
        display: flex;
        margin-bottom: 10px;
        align-items: center;

        .num {
            width: 32px;
            margin-right: 20px;

            span {
                display: inline-block;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #e6f4ff;
                line-height: 32px;
                text-align: center;
            }
        }

        .project-cost_body_right {
            flex: 52px;
        }

        .project-cost_right {
            display: flex;
            justify-content: space-between;
            flex: 52px;

            P {
                span {
                    margin-left: 10px;
                    display: inline-block;
                    min-width: 50px;
                    text-align: right;
                    &.amount{
                        color: #1677ff;
                    }
                }
            }
        }
    }

    .project-amount_progress-wrap {
        position: relative;

        .rate-txt {
            position: absolute;
            top: 1px;
            left: 0;
            display: inline-flex;
            height: 22px;
            font-size: 12px;
            display: flex;
            align-items: center;
        }
    }
}
</style>