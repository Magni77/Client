<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <post-input
            v-show="$store.getters.user.id === $route.params.user_id">
          </post-input>
          <post-list></post-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>

</template>
<script>
import PostInput from '../components/PostInput.vue';
import PostList from '../components/PostList.vue';

export default {
  name: 'ProfilePage',
  components: { PostInput, PostList },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
