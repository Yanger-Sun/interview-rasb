<template>
    <div :class="['charts-wrap', `is-${chartType}`]" :style="{ size, minHeight: size.height }">
        <div ref="charts" class="statistic-charts" :style="size"></div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, markRaw, defineExpose } from 'vue';
import * as echarts from 'echarts';
import {Debounce} from '@/lib/tool';
const emit = defineEmits(['chartClick', 'chart-finished', 'is-destoryed']);
const props = defineProps({
    options: {
        type: Object,
        default: () => {
            return {};
        }
    },
    size: {
        type: Object,
        default: () => {
            return {
                width: '100%',
                height: '100%'
            };
        }
    },
    autoUpdateSize: {
        type: Boolean,
        default: true
    },
    watchClick: {
        type: Boolean,
        default: false
    },
    chartType: {
        type: String,
    }
});

const charts = ref();
const echartsDom = ref();

watch(
    () => props.options,
    val => {
        echartsDom.value.clear();
        console.log('改变了')
        echartsDom.value.setOption(props.options);
    },
    {
        deep: true
    }
);


// const myChart = ref();
const myChart = { chart: null };
const initEcharts = () => {
    myChart.chart = echarts.init(charts.value);
    echartsDom.value = markRaw(myChart.chart);
    echartsDom.value.setOption(props.options);
    if (props.autoUpdateSize) {
        window.addEventListener('resize', Debounce(chartsResize, 500));
    }
    // 监听了点击事件
    if (props.watchClick) {
        myChart.chart.on('click', function (params) {
            emit('chartClick', params);
        });
    }

    myChart.chart.on('finished', () => {
        emit('chart-finished');
    })
};

const destroyEcharts = () => {
    if (props.onChartClick) {
        echartsDom.value.off('mousemove');
        echartsDom.value.off('click');
    }
    if (props.autoUpdateSize) {
        window.removeEventListener('resize', chartsResize);
    }
};

const chartsResize = () => {
    // setTimeout(() => {
    // echartsDom.value && echartsDom.value.resize();
    myChart.chart.dispose();
    initEcharts();
    // }, 10);
};

function toHighLight(params) {
    let data = props.options.series[params.seriesIndex || 0].data;
    data.forEach((item, i) => {
        myChart.chart.dispatchAction({
            type: "downplay",
            seriesIndex: params.seriesIndex,
            dataIndex: i,
        });
    })
    myChart.chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0,
        ...params,
    });
}

defineExpose({
    chartsResize,
    charts,
    myChart,
    echartsDom,
    toHighLight
});

onMounted(async () => {
    await initEcharts();
});

onUnmounted(() => {
    destroyEcharts();
});
</script>

<style lang="scss" scoped>
.charts-wrap {
    margin: 0 auto 10px;
    width: 100%;
    position: relative;

    &.is-bar {
        background-image: none;
        margin-bottom: 0;
    }
}

.statistic-charts {
    width: 100%;
    height: 100%;
}
</style>
