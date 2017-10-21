<template>
  <div id="app">
    <el-row :gutter="15">
      <el-col :span="4">
        <nav-bar></nav-bar>
      </el-col>
      <el-col  :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navBar from './components/navBar'
export default {
  components:{
    navBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
