<template>
  <suspense>
    <router-view/>
  </suspense>
</template>


<style lang="less">
body{
  margin: 0;
  padding: 0;
  height: 100vh;
  min-width: 750px;
  user-select: none;
}
*::-webkit-scrollbar {
    width: 5px;
    // height: 10px; // 高度写不写，都不影响，因为会根据内容的长度自动计算
}

*::-webkit-scrollbar-thumb {
    background: #fff; // 滑块颜色
    border-radius: 5px; // 滑块圆角
}

// 兼容Firefox、IE
* {
    scrollbar-width: 10px;
    scrollbar-base-color: green;
    scrollbar-track-color: red;
    scrollbar-arrow-color: blue;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  // width: 100%;
  // min-height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
