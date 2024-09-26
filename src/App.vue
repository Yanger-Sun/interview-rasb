<template>
  <a-config-provider :theme="themeProvider">
    <AButton type="primary" @click="changeTheme(curTheme == 'dark' ? 'light' : 'dark')">切换主题{{ curTheme }}</AButton>
    <projectVue />
  </a-config-provider>
</template>

<script setup>
import projectVue from '@/project/index.vue';
import { onMounted, ref } from 'vue';
import themeConfig from './config';

// let matchMedia;
// function watchSystemThemeChange() {
//   matchMedia = window.matchMedia('(prefers-color-scheme:light)')
//   changeTheme(matchMedia?.matches ? 'light' : 'dark');
//   if (!matchMedia.onChange) {
//     matchMedia.addEventListener('change', (event) => {
//       // matched prefer
//       console.log('改变')
//       if (event.matches) {
//         changeTheme('light');
//       } else {
//         changeTheme('dark');
//       }
//     });
//   }
// }

let themeProvider = ref({});
let curTheme = ref('light');
function changeTheme(theme) {
  curTheme.value = theme;
  themeProvider.value = themeConfig[theme]; // ant-design 变量
  document.documentElement.setAttribute("data-theme", theme);  //  ant-design不存在的变量 
}

onMounted(() => {
  // watchSystemThemeChange();
})
</script>

<style lang="scss" scoped>
span{
  color: var(--span-color);
}
</style>

<style lang="scss">
@import url('./style-theme.scss');
</style>
