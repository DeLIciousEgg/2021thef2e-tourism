<template>
  <Header />
  <div class="container mx-auto">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}
</script>
