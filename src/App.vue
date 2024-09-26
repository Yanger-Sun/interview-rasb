<template>
  <a-config-provider :theme="themeProvider">
    <a-button type="primary" @click="changeTheme(curTheme == 'dark' ? 'light' : 'dark')">切换主题{{ curTheme }}</a-button>
    <projectVue />
  </a-config-provider>
</template>

<script setup>
import projectVue from '@/project/index.vue';
import { onMounted, ref } from 'vue';
import themeConfig from './config';

let themeProvider = ref({});
let curTheme = ref('light');
function changeTheme(theme) {
  curTheme.value = theme;
  themeProvider.value = themeConfig[theme]; // ant-design 变量
  document.documentElement.setAttribute("data-theme", theme);  //  ant-design不存在的变量 
}

onMounted(() => {
})
</script>

<style lang="scss" scoped>
span{
  color: var(--span-color);
}
</style>

<style lang="scss">
@import url('./assets/style-theme.scss');
</style>
