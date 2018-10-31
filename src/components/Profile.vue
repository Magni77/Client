<template>
    <v-container fluid>
      <v-img :aspect-ratio="16/9" v-bind:src="profile.photo">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>

          <v-flex shrink>
            <div class="subheading">{{ profile.full_name }} </div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-spacer></v-spacer>
      <v-list>
        {{profile.location}}
      </v-list>
    </v-container>
</template>

<script>
// import VList from 'vuetify/src/components/VList/VList';

export default {
  name: 'Profile',
  components: {  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
  },
  watch: {
    $route(to) {
      this.$store.dispatch('getProfile', to.params.user_id);
    },
  },
  created() {
    this.$store.dispatch('getProfile', this.$route.params.user_id);
  },
};
</script>

<style scoped>

</style>
