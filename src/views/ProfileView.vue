<template>
  <div>
    <div class="page-title">
      <h3>{{ "profileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message_EnterName" | localize }}</small
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from "materialize-css";
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProfileView",
  metaInfo() {
    return {
      title: this.$title("profileTitle"),
    };
  },
  data: () => ({
    name: "",
    isRuLocale: true,
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-Ru";
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-Ru" : "en-Us",
        });
      } catch (e) {
        console.log("error");
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
