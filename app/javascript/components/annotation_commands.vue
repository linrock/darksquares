<template>
  <div class="annotation-commands">
    <div @click="editAnnotation"></div>
    <div @click="deleteAnnotation">x</div>
  </div>
</template>

<script>
  import { deleteAnnotation } from '../api/requests'

  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },

    methods: {
      editAnnotation: function() {
        // make annotation input show up with text inside
      },
      deleteAnnotation: function() {
        deleteAnnotation(this.id)
      }
    }
  }
</script>
