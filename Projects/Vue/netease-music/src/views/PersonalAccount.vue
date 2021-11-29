<template>
    <transition appear>
        <div class="account">
            <AccountHeader @switch-tab="switchTab"/>
            <AccountBottom :active-tab="activeTab"/>
        </div>
    </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader.vue'
import AccountBottom from '../components/Account/AccountBottom.vue'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'PersonalAccount',
  components: {
    AccountBottom,
    AccountHeader
  },

  data () {
    return {
      activeTab: 'favourite'
    }
  },

  methods: {
    switchTab (tab) {
      this.activeTab = tab
    }
  },

  metaInfo: MetaInfo.account
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.account {
    position: fixed;
    z-index: 1999;
    inset: 0;
    @include bg_sub_color();
}

.v-enter,
.v-leave-to {
    transform: translateX(100%);
}

.v-enter-to,
.v-leave {
    transform: translateX(0);
}

.v-enter-active,
.v-leave-active {
    transition: transform 1s;
}
</style>
