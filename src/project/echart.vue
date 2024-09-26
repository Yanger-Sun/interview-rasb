<template>
    <section>
        <div>
            <CusEchart :size="{ width: '100%', height: '200px' }" ref="echart1Ref" chartType="pie" :options="options1">
                <p class="echart_info echart-day_info">共计<span>{{ totalDay }}天</span></p>
            </CusEchart>
        </div>
        <div>
            <CusEchart :size="{ width: '100%', height: '200px' }" ref="echart2Ref" chartType="pie" :options="options2">
                <p class="echart_info  echart-amount_info">
                    <span>¥{{ totalAmount }}万元</span>
                    <span class="label">项目合同额</span>
                </p>
            </CusEchart>
        </div>
    </section>
</template>

<script setup lang="ts">
import { inject, watch, ref } from 'vue';
import CusEchart from '@/components/charts/index.vue';
import dayjs from 'dayjs';
import Big from 'big.js';
import { ProjectKey } from './symbols';
import { getPercent } from '@/lib/tool.ts';

const projectDetail = inject(ProjectKey);

const echart1Ref = ref();
const echart2Ref = ref();

function toDealData(chartData, formatter, colorList = ['#0099cc', '#FF5232', '#FDC40A', '#50F0A6', '#5FDFFA', '']) {
    return {
        color: colorList,
        legend: {
            orient: 'vertial',
            itemWidth: 16,
            itemHeight: 16,
            icon: 'circle',
            bottom: 0,
            data: chartData,
            textStyle: {
                color: 'rgba(0,0,0,0.65)'
            },
            formatter
        },
        series: [
            // 展示层
            {
                type: 'pie',
                center: ['50%', '35%'],
                radius: ['45%', '60%'],
                itemStyle: {
                    borderWidth: 5, //描边线宽
                    borderColor: '#fff',
                },
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                data: chartData,
            },
        ],
    }

}

const options1 = ref({});
const totalDay = ref(0);
const options2 = ref({});
const totalAmount = ref(0);

watch(() => projectDetail.value, (newProjectDetail) => {
    setOptions1();
    setOptions2();
}, { deep: true })
function setOptions1() {
    let today = dayjs().format('YYYY-MM-DD');
    let { startDate, endDate } = projectDetail.value;
    let chartData = dayjs(today).diff(startDate, 'day');
    totalDay.value = dayjs(endDate).diff(startDate, 'day');

    let data = [
        { value: chartData, name: '已用工天' },
        { value: totalDay.value - chartData, name: '剩余总共天' },
    ]
    let formatter = (name) => {
        const value = data.find(item => item.name === name).value
        return `${name}：${value} 天`
    }
    options1.value = toDealData(data, formatter, ['#0099cc', '#999999']);
}
function setOptions2() {
    let { costList, contractAmount } = projectDetail.value;
    let freeAmount = (costList || []).map(item => item.amount);
    if (freeAmount.length) {
        let freeTotal = (freeAmount || []).reduce((prev, next) => {
            return prev + next
        })
        let data = [
            { value: freeTotal, name: '支出' },
            { value: contractAmount - freeTotal, name: '结余' },
        ]
        let formatter = (name) => {
            const value = data.find(item => item.name === name).value;
            let rate = value / contractAmount;
            return `${name}：${value} 万元 占比${new Big(rate).times(100).toNumber().toFixed(2)}%`
        }
        totalAmount.value = getPercent(contractAmount, false);
        options2.value = toDealData(data, formatter);
    }
}


</script>

<style lang="scss" scoped>
section {
    width: 100%;

    &>div {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 50%;
    }

    .echart_info  {
        position: absolute;
        top: 30%;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        &.echart-day_info {
            span {
                font-size: 16px;
                color: #0099cc;
            }
        }

        &.echart-amount_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            transform: translateY(-25%);
            span.label {
                color: #999999;
            }
        }
    }
}
</style>