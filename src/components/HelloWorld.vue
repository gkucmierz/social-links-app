<template>
  <div class="hello">
    <h3>Demo app that uses utilizes social-links npm module</h3>

    <input
      type="url"
      placeholder="social link"
      v-model="link"
    />
    <pre>{{ result }}</pre>

    <p>Force profile:</p>
    <v-select
      v-model="selected"
      placeholde="Profile name"
      :options="options"
      >
    </v-select>
  </div>
</template>

<script>
import { SocialLinks, TYPE_DESKTOP, TYPE_MOBILE } from 'social-links';

const sl = new SocialLinks();

const tryFn = fn => {
  try {
    return fn();
  } catch {
    return '';
  }
};

export default {
  name: 'HelloWorld',
  data() {
    return {
      link: '',
      result: {},
      selected: '',
      options: [...sl.profiles].map(([name]) => name)
    }
  },
  methods: {
    updateResult(link) {
      if (this.selected === '') {
        this.selected = sl.detectProfile(link);
      }
      const detectedProfile = this.selected;
      try {
        this.result = {
          input: link,
          detectedProfile,
          isValid: tryFn(() => sl.isValid(detectedProfile, link)),
          profileId: tryFn(() => sl.getProfileId(detectedProfile, link)),
          sanitize: tryFn(() => sl.sanitize(detectedProfile, link)),
          "sanitize (desktop)": tryFn(() => sl.sanitize(detectedProfile, link, TYPE_DESKTOP)),
          "sanitize (mobile)": tryFn(() => sl.sanitize(detectedProfile, link, TYPE_MOBILE)),
        };
      } catch (e) {
        this.result = {
          error: e
        }
      }
    }
  },
  watch: {
    link(link) {
      this.updateResult(link);
    },
    selected(profile) {
      const id = sl.getProfileId(sl.detectProfile(this.link ?? ''), this.link);
      this.link = sl.getLink(profile, id);
      this.updateResult(this.link);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

input {
  font-size: 1.5em;
  width: 100%;
}

pre {
  text-align: left;
}

</style>
