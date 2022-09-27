<template>
  <div class="hello">
    <h3>Demo app that uses utilizes social-links npm module</h3>

    <input
      type="url"
      placeholder="social link"
      v-model="link"
    />
    <pre>{{ result }}</pre>
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
    }
  },
  watch: {
    link(link) {
      const detectedProfile = sl.detectProfile(link);
      try {
        this.result = {
          input: link,
          detectedProfile,
          isValid: sl.isValid(detectedProfile, link),
          profileId: sl.getProfileId(detectedProfile, link),
          sanitize: sl.sanitize(detectedProfile, link),
          "sanitize (desktop)": tryFn(() => sl.sanitize(detectedProfile, link, TYPE_DESKTOP)),
          "sanitize (mobile)": tryFn(() => sl.sanitize(detectedProfile, link, TYPE_MOBILE)),
        };
      } catch (e) {
        this.result = {
          error: e
        }
      }
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
