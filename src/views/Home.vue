<template>
  <!--<v-container fluid>-->
    <!--<v-slide-y-transition mode="out-in">-->
      <!--<v-layout column align-center>-->
        <!--<img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">-->
        <!--<blockquote>-->
          <!--&#8220;First, solve the problem. Then, write the code.&#8221;-->
          <!--<footer>-->
            <!--<small>-->
              <!--<em> {{ user }} </em>-->
            <!--</small>-->
          <!--</footer>-->
        <!--</blockquote>-->
      <!--</v-layout>-->
    <!--</v-slide-y-transition>-->
  <!--</v-container>-->
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
            <h1>THIS IS HOME PAGE</h1>
            <!--<post-input></post-input>-->
            <!--<post-content></post-content>-->
            <!--<post-list></post-list>-->
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>

</template>
<script>
import PostContent from '../components/PostContent.vue';
import PostInput from '../components/PostInput.vue';
import PostList from '../components/PostList.vue';

export default {
  name: 'home',
  components: { PostContent, PostInput, PostList },

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
