<template lang="pug">
  main#game
    sub-header
      template(v-if="game")
        div
          | Game {{ id }}
        div(v-if="game.name")
          .separator &mdash;
          | {{ game.name }}
        .author(v-if="game.user")
          .separator &mdash;
          | {{ authorText }}

    .error-message(v-if="errorMessage") {{ errorMessage }}
    .content(v-if="game")
      section.left-side
        .left-side-inner
          mini-board-detailed(
            :squareSize="55"
            :shouldShowLabels="true"
            :perspective="perspective"
          )
          .board-actions
            img.flip-board(src="/icons/flip-board.svg" @click="flipBoard")
          graph-or-loading(
            :width="443"
            :height="120"
            :game="game"
            :clickedGraph="scrollToMove"
            graphMode="click"
          )
      section.right-side
        game-info(:pgnHeaders="game.pgnHeaders" :fixed="true")
        .game-actions
          .left(v-if="canTakeActions && !isPromptOpen")
            .action.submit-game(@click="showSubmitGamePrompt" v-if="!game.submittedAt") Submit game
            .action.edit-game(@click="showEditGamePrompt") Edit
            .action.delete-game(@click="showDeleteGamePrompt") Delete
          .right(v-if="!isPromptOpen")
            .action.source-url(v-if="game.sourceUrl")
              a(:href="game.sourceUrl" target="_blank")
                img.external-link-icon(src="/icons/external-link.svg")
                | Source URL
            .action.view-pgn(@click="showViewPgnPrompt") View PGN
        move-list(:game="game" v-if="!isPromptOpen")
        .game-result {{ gameResult }}
        .prompt-container
          game-delete-prompt(:game="game" :gameState="gameState" v-if="gameState.isDeleting")
          game-edit-prompt(:game="game" :gameState="gameState" v-if="gameState.isEditing")
          game-submit-prompt(:game="game" :gameState="gameState" v-if="gameState.isSubmitting")
          game-view-pgn-prompt(:game="game" :gameState="gameState" v-if="gameState.isViewingPgn")
    page-title(:title="pageTitle" v-if="errorMessage || game")

</template>

<script>
  import Mousetrap from 'mousetrap'
  import PageTitle from '../layouts/page_title'
  import SubHeader from '../layouts/sub_header'
  import GraphOrLoading from '../components/graph_or_loading.vue'
  import MiniBoardDetailed from '../components/mini_board_detailed.vue'
  import GameInfo from '../components/game_info'
  import MoveList from '../components/move_list'
  import GameSubmitPrompt from '../components/game_submit_prompt'
  import GameEditPrompt from '../components/game_edit_prompt'
  import GameDeletePrompt from '../components/game_delete_prompt'
  import GameViewPgnPrompt from '../components/game_view_pgn_prompt'
  import { resetBoardState, showGamePosition } from '../store/miniboard'
  import { isElementInViewport } from '../util'

  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        gameState: {
          isDeleting: false,
          isEditing: false,
          isSubmitting: false,
          isViewingPgn: false,
        },
        scrolledToMove: false,
        errorMessage: null,
        perspective: 'white'
      }
    },

    created() {
      this.$store.dispatch('setPositionIndex', this.initialMoveIndex())
      const gameId = Number(this.id)
      if (Number.isNaN(gameId)) {
        this.errorMessage = "Game not found"
        return
      }
      if (this.game) {
        this.initializeGame()
      } else {
        this.$store.dispatch('fetchGame', gameId).catch(error => {
          this.errorMessage = error.response.data.error
          console.log(this.errorMessage)
        })
      }
    },

    mounted() {
      window.scrollTo(0, 0)
      if (this.game && !this.scrolledToMove && !this.isPromptOpen) {
        this.scrollToMoveIfFar(this.$store.getters.positionIndex)
        this.scrolledToMove = true
      }
      Mousetrap.bind('left', () => {
        const i = this.$store.getters.positionIndex
        if (i > 0) {
          this.$store.dispatch('setPositionIndex', i - 1)
        }
      })
      Mousetrap.bind('right', () => {
        const i = this.$store.getters.positionIndex
        if (i < this.game.positions.length - 1) {
          this.$store.dispatch('setPositionIndex', i + 1)
        }
      })
      Mousetrap.bind('esc', () => {
        this.gameState.isSubmitting = false
        this.gameState.isEditing = false
        this.gameState.isDeleting = false
        this.gameState.isViewingPgn = false
      })
    },

    updated() {
      if (!this.scrolledToMove && !this.isPromptOpen) {
        this.scrollToMoveIfFar(this.$store.getters.positionIndex)
        this.scrolledToMove = true
      }
    },

    destroyed() {
      Mousetrap.reset()
    },

    watch: {
      i() {
        if (!this.scrolledToMove) {
          return
        }
        history.replaceState(null, null, `#${this.$store.getters.positionIndex}`)
        this.scrollToMoveIfFar(this.i)
        showGamePosition(this.game, this.i)
      },
      game() {
        this.initializeGame()
      },
    },

    computed: {
      i() {
        return this.$store.getters.positionIndex
      },
      game() {
        return this.$store.getters.getGame(this.id)
      },
      username() {
        return this.$store.getters.username
      },
      canTakeActions() {
        return this.game.user.username === this.username
      },
      authorText() {
        if (this.game.submittedAt) {
          return `submitted by ${this.game.user.username} ${this.game.submittedAtTimeAgo}`
        } else {
          return `created by ${this.game.user.username} ${this.game.createdAtTimeAgo}`
        }
      },
      isPromptOpen() {
        return this.gameState.isEditing || this.gameState.isDeleting ||
               this.gameState.isSubmitting || this.gameState.isViewingPgn
      },
      pageTitle() {
        if (this.errorMessage) {
          return "Error"
        } else if (this.game) {
          if (this.game.name) {
            return this.game.name
          } else if (this.game.id) {
            return `Game ${this.game.id}`
          }
        }
      },
      gameResult() {
        return this.game.gameResult
      }
    },

    methods: {
      initializeGame() {
        showGamePosition(this.game, this.$store.getters.positionIndex)
        this.perspective = this.game.perspective
        this.$store.dispatch(`setActiveItemKey`, this.game.key)
        this.$store.dispatch(`setActiveGameId`, { id: this.game.id })
      },
      initialMoveIndex() {
        const hash = window.location.hash
        if (hash) {
          const i = Number(hash.replace(/#/, ''))
          if (Number.isInteger(i)) {
            return i
          }
        }
        return 0
      },
      flipBoard() {
        this.perspective = this.perspective === 'white' ? 'black' : 'white'
      },
      moveEl(i) {
        return this.$el.querySelector(`#move-${i}`)
      },
      scrollToMove(i) {
        if (i === 0) {
          window.scrollTo(0, 0)
          return
        }
        const offsetTop = this.moveEl(i).offsetTop
        window.scrollTo(0, offsetTop - 250)
      },
      scrollToMoveIfFar(i) {
        if (i === 0) {
          window.scrollTo(0, 0)
          return
        }
        const moveEl = this.moveEl(i)
        if (!moveEl || isElementInViewport(moveEl)) {
          return
        }
        this.scrollToMove(i)
      },
      showSubmitGamePrompt() {
        this.gameState.isSubmitting = true
      },
      showEditGamePrompt() {
        this.gameState.isEditing = true
      },
      showDeleteGamePrompt() {
        this.gameState.isDeleting = true
      },
      showViewPgnPrompt() {
        this.gameState.isViewingPgn = true
      }
    },

    components: {
      PageTitle,
      SubHeader,
      GameInfo,
      MoveList,
      GraphOrLoading,
      MiniBoardDetailed,
      GameDeletePrompt,
      GameEditPrompt,
      GameSubmitPrompt,
      GameViewPgnPrompt,
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../common.styl"

  main
    overflow-x hidden

  .sub-header
    .separator
      display inline
      margin 0 7px

    .author
      opacity 0.5
      font-size 12px

  .error-message
    display flex
    width 1200px
    margin-left 80px
    padding 30px 0

  .content
    display flex
    width 1200px
    margin-left 80px

  section.left-side
    position fixed
    top main-header-height + sub-header-height
    padding-top 30px
    padding-bottom 15px
    width 480px
    height "calc(100% - %s - %s)" % (main-header-height sub-header-height)
    overflow-y auto

    .left-side-inner
      width 443px

      .board-actions
        text-align center
        height 0

        .flip-board
          width 20px
          position relative
          top -19px
          opacity 0.15
          transition opacity 0.2s ease

          &:hover
            cursor pointer
            opacity 0.4

      .graph-or-loading
        margin-top 25px

      .graph-or-loading >>> .loading
        font-size 16px
        color rgba(0,0,0,0.4)
        margin-top 30px

  section.right-side
    padding 0 0 10px 40px
    border-left 1px solid rgba(0,0,0,0.07)
    margin-left 480px
    width 560px
    padding-left 40px
    min-height 645px

    .game-info
      background white
      width 519px

      & >>> .content
        padding 27px 0 15px
        border-bottom 1px solid rgba(0,0,0,0.05)
        box-shadow 0 0 10px 5px white

      & >>> .spacer
        box-sizing content-box
        padding 27px 0 15px

    .game-actions
      padding-top 12px
      font-size 12px
      line-height 12px
      height 24px
      display flex

      a
        display flex
        color inherit
        text-decoration none

      .left
        display flex
        margin-left 0
        margin-right auto

        .action
          margin-right 25px

      .right
        display flex
        margin-right 0
        margin-left auto

        .action
          margin-left 25px

      .action
        opacity 0.5

        &:hover
          cursor pointer
          opacity 0.7

      .submit-game
        color highlight-color
        font-weight bold
        opacity 0.9

        &:hover
          opacity 1

      .source-url
        display flex
        height 12px

      .external-link-icon
        height 17px
        margin-right 5px
        position relative
        top -1px

    .move-list
      margin 36px 0

    .game-result
      font-size 14px
      padding-top 20px
      border-top 1px solid rgba(0,0,0,0.05)
      margin-bottom 45px

</style>
