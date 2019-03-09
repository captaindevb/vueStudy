<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="0" @click="$router.push('/')">HOME</el-menu-item>
      <el-menu-item index="1"><router-link to='/noticeList'>NOTICE</router-link></el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>

export default {
 
}
</script>
