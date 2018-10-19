<template>
  <v-card>
    <v-card-title>
      <div>
        <span class="grey--text">{{ post.created }}</span><br>
        <span>{{post.text}}</span><br>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="blue">Like</v-btn>
      <v-btn flat color="blue">Smth else?</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'PostContent',
  props: {
    post: Object,
  },
};


</script>
