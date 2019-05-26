
<template>
  <span>
    <background/>
    <layout>
      <main-form/>
    </layout>
  </span>
</template>

<script>
import Layout from './Layout/index'
import MainForm from './Layout/form'
import Background from './Layout/background'
export default {
  name: 'Login',
  components: {
    Layout,
    MainForm,
    Background
  }
}
</script>
