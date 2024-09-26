<template>
    <section class="step-wrap">
        <div class="setp-item" :class="getClass(index).class" v-for="(item, index) in steps" :key="index"
            @click="changeStep(item)">
            <p class="icon">
                <template v-if="getClass(index).showNum">
                    <span class="number">{{ index + 1 }}</span>
                </template>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" class="design-iconfont">
                    <path
                        d="M20 0C6.66518 0 0 6.66964 0 20C0 33.3348 6.66518 40 20 40C33.3348 40 40 33.3348 40 20C40 6.66964 33.3348 0 20 0Z"
                        fill="#00A0E8" />
                    <path
                        d="M31.9284 15.7277L19.9641 28.5045C19.1784 29.2902 17.7052 29.2098 16.8659 28.4732C16.6159 28.3705 16.3793 28.2188 16.1784 28.0179L9.02665 20.3929C8.20968 19.5759 7.97754 18.4866 8.7945 17.6696C9.61147 16.8527 10.7008 17.0848 11.5177 17.9018L18.29 22.6786L29.5579 13.5848C30.3749 12.7679 31.232 12.3036 32.049 13.1205C32.8615 13.9375 32.7454 14.9107 31.9284 15.7277Z"
                        fill="#FFF" />
                </svg>
            </p>
            <p class="name">{{ item.title }}</p>
        </div>
    </section>
</template>

<script setup>
import { nextTick, toRefs, watch } from 'vue';

const props = defineProps({
    steps: {
        type: Array,
        default: () => {
            return []
        }
    },
    current: 0,
    canClick: false
})

const { steps, current, canClick } = toRefs(props);

watch(() => steps.value, (newStep) => {
    nextTick(() => {
        let itemsWidth = document.getElementsByClassName('step-wrap')[0].clientWidth / newStep.length;
        let eles = document.getElementsByClassName('step-item') || [];
        if (eles?.forEach) {
            eles.forEach(item => {
                item.style.paddingRight = (itemsWidth - 50) + 'px';
            })
        }
    })
}, {
    deep: true,
    immediate: true
})

const emit = defineEmits(['on-change']);

function getClass(index) {
    if (index == current.value) {
        return { class: 'is-current', showNum: false };
    }
    if (index < current.value) {
        return { class: 'is-finished', showNum: false };
    }
    return { class: 'is-waiting', showNum: true };
}

function changeStep(item) {
    if (canClick.value) {
        emit('on-change', item);
    }
}
</script>


<style lang="scss" scoped>
.step-wrap {
    display: flex;
    justify-content: center;

    p {
        padding: 0;
        margin: 0;
    }
}

.setp-item {
    text-align: center;
    padding-right: 260px;
    padding-bottom: 0;
    margin-bottom: 0;
    position: relative;

    &:before {
        content: '';
        width: calc(100% - 90px);
        background: #52616C;
        height: 4px;
        border-radius: 4px;
        position: absolute;
        top: 40px;
        right: 16px;
    }

    &:last-child {
        padding-right: 0;

        &:before {
            display: none;
        }
    }

    .icon {
        text-align: center;
        margin-bottom: 4px;

        svg {
            margin: 0 auto;
            width: 40px;
            height: 40px;
        }
    }

    .number {
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        font-weight: bold;
        background: #5A6973;
        color: #BDC2C6;
        border-radius: 50%;
    }

    .name {
        color: #52616C;
        font-size: 16px;
        font-weight: 500;
        font-family: "SourceHanSansCN";
        line-height: 20px;
    }

    &.is-current {
        &:after {
            content: '';
            width: calc((100% - 90px) / 2);
            // width: 114px;
            background: #00A0E8;
            height: 4px;
            border-radius: 4px;
            position: absolute;
            top: 40px;
            right: 130px;
            z-index: 2;
        }

        .name {
            color: #00A0E8;
        }
    }

    &.is-finished {
        &::before {
            background: #00A0E8;
        }

        .name {
            color: #00A0E8;
        }
    }
}
</style>