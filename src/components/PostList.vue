<template>
  <v-container grid-list-xl>
    <v-layout v-bind="binding">
      <v-flex v-for="item in items" :key="item.id">
        <post-content :post="item"></post-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PostContent from '../components/PostContent.vue';

  export default {
    name: 'PostList',
    components: { PostContent },
    computed: {
      items () {
        return this.$store.getters.posts;
      },
      binding () {
        const binding = {};
        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true;

        return binding
      }
    },
    watch: {
     '$route' (to, from) {
         this.$store.dispatch('getProfilePosts', to.params.user_id);
      }
    },
    created() {
      this.$store.dispatch('getProfilePosts', this.$route.params.user_id);
    },

  }
</script>
