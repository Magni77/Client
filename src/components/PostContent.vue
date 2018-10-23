<template>
  <v-card>
    <v-card-title>
      <div>
        <span class="grey--text">{{ post.created }}</span><br>
        <span>{{post.text}}</span><br>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="blue" @click="likePost">
        <v-icon
        >
          thumb_up
        </v-icon>
      </v-btn>
      <v-btn flat color="blue">{{ post.likesAmount }} Likes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { http } from './../common/http';

export default {
  name: 'PostContent',
  props: {
    post: Object,
  },
  methods: {
    likePost() {
      http.put(`posts/${this.post.id}/like`)
        .then((response) => {
          this.post = response.data;
        });
    },
  },
};


</script>
