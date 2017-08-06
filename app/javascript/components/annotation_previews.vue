<template>
  <div class="annotation-previews">
    <div class="annotation-preview" v-for="(annotations, i) in annotationPreviews">
      <annotation v-if="annotations[0]" :annotation="annotations[0]"/>
    </div>
  </div>
</template>

<script>
  import Annotation from './annotation_text.vue'

  export default {
    props: {
      annotations: Array
    },

    computed: {
      annotationPreviews: function() {
        let annotations = []
        for (let j = 0, l = this.annotations.length; j < l; j++) {
          if (this.annotations[j]) {
            annotations.push(this.annotations[j])
            if (annotations.length >= 3) {
              break
            }
          }
        }
        return annotations
      }
    },

    components: {
      Annotation
    }
  }
</script>

<style>
  .annotation-preview {
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 5px 0 10px;
    color: #005F2F;
    opacity: 0.9;
    clear: left;
  }
</style>
