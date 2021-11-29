<template>
    <div id="app">
        <HomeHeader/>
        <AppTab/>
        <keep-alive :include="['HomeArtists', 'HomeSearch']">
            <router-view/>
        </keep-alive>
        <MusicPlayer/>
    </div>
</template>

<script>
import HomeHeader from './components/HomeHeader.vue'
import AppTab from './components/AppTab.vue'
import MusicPlayer from './views/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    HomeHeader,
    AppTab,
    MusicPlayer
  }
}
</script>
