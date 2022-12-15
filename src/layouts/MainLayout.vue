<template>
  <div>
    <vLoader v-if="loading" />
    <div class="app-main-layout" v-else>
      <NavBar @click="isOpen = !isOpen" />
      <SideBar v-model="isOpen" :key="locale" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'TooltipCreateNewRecord'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/app/SideBar";
import NavBar from "@/components/app/NavBar";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  components: {
    SideBar,
    NavBar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
    // locale() {
    //   console.log("locale change");
    // },
  },
};
</script>
