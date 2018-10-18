<template>
  <v-text-field
    v-model="message"
    :prepend-icon="icon"
    box
    clear-icon="clear"
    clearable
    label="What do you think?"
    type="text"
    @click:append-outer="sendMessage"
    @click:prepend="changeIcon"
    @click:clear="clearMessage"
  >
    <v-btn
      slot="append-outer"
      style="top: -12px"
      offset-y
      @click="sendMessage"
      >
      <v-icon left>send</v-icon>
      Publish!
    </v-btn>

  </v-text-field>
</template>

<script>
export default {
  name: 'PostInput',
  data: () => ({
    password: 'Password',
    show: false,
    message: 'We should buy a bar!',
    marker: true,
    iconIndex: 0,
    icons: [
      'sentiment_very_satisfied',
      'sentiment_dissatisfied',
      'mood_bad',
    ],
  }),
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  methods: {
    sendMessage() {
        this.$store.dispatch('createPost', {text: this.message});
        this.resetIcon();
        this.clearMessage();
    },
    clearMessage() {
      this.message = '';
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++;
    },
  },
};
</script>
