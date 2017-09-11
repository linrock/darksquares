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
      section.left-side(
        @mouseenter="disableAutoscroll"
        @mouseleave="enableAutoscroll"
      )
        .left-side-inner
          mini-board-detailed(:squareSize="55")
          graph-or-loading(
            :width="443"
            :height="120"
            :game="game"
            :gameState="gameState"
            :clickedGraph="scrollToMove"
          )
      section.right-side
        game-info(:pgnHeaders="game.pgnHeaders" :fixed="true")
        .game-actions(v-if="canTakeActions && !isPromptOpen")
          .submit-game(@click="showSubmitGamePrompt" v-if="!game.submittedAt") Submit game
          .edit-game(@click="showEditGamePrompt") Edit
          .delete-game(@click="showDeleteGamePrompt") Delete
          .view-pgn.right(@click="showViewPgnPrompt") View PGN
        move-list(:game="game" :gameState="gameState" v-if="!isPromptOpen")
        game-delete-prompt(:game="game" :gameState="gameState" v-if="gameState.isDeleting")
        game-edit-prompt(:game="game" :gameState="gameState" v-if="gameState.isEditing")
        game-submit-prompt(:game="game" :gameState="gameState" v-if="gameState.isSubmitting")
        game-view-pgn-prompt(:game="game" :gameState="gameState" v-if="gameState.isViewingPgn")
    page-title(:title="pageTitle")

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
  import { userState } from '../store/user_state'
  import { resetBoardState, applyStateChange } from '../store/miniboard'
  import { activeGame } from '../store/active_game'
  import { getOrFetchGame } from '../store/games'
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
        game: null,
        gameState: {
          i: this.initialMoveIndex() || 0,
          isDeleting: false,
          isEditing: false,
          isSubmitting: false,
          isViewingPgn: false,
        },
        shouldScrollToMove: true,
        scrolledToMove: false,
        errorMessage: null
      }
    },

    created() {
      resetBoardState()
      const gameId = Number(this.id)
      if (Number.isNaN(gameId)) {
        this.errorMessage = "Game not found"
        return
      }
      getOrFetchGame(gameId).then(game => {
        applyStateChange(game.stateAtPositionIndex(this.gameState.i))
        this.game = game
        activeGame.setKey(this.game.key)
      }).catch(error => {
        this.errorMessage = error.response.data.error
        console.log(this.errorMessage)
      })
    },

    mounted() {
      window.scrollTo(0, 0)
      Mousetrap.bind('left', () => {
        const i = this.gameState.i
        if (i > 0) {
          this.gameState.i -= 1
        }
      })
      Mousetrap.bind('right', () => {
        const i = this.gameState.i
        if (i < this.game.positions.length - 1) {
          this.gameState.i += 1
        }
      })
    },

    updated() {
      if (!this.scrolledToMove) {
        this.scrollToMoveIfFar(this.initialMoveIndex())
        this.scrolledToMove = true
      }
    },

    destroyed() {
      Mousetrap.reset()
    },

    watch: {
      i() {
        if (!this.scrolledToMove || !this.shouldScrollToMove) {
          return
        }
        history.replaceState(null, null, `#${this.i}`)
        this.scrollToMoveIfFar(this.i)
        applyStateChange(this.game.stateAtPositionIndex(this.i))
      }
    },

    computed: {
      i() {
        return this.gameState.i
      },
      canTakeActions() {
        return this.game.user.username === userState.username
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
      }
    },

    methods: {
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
        if (isElementInViewport(this.moveEl(i))) {
          return
        }
        this.scrollToMove(i)
      },
      showingPrompt() {
        return this.gameState.isSubmitting || this.gameState.isDeleting
      },
      disableAutoscroll() {
        this.shouldScrollToMove = false
      },
      enableAutoscroll() {
        this.shouldScrollToMove = true
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

      .graph-or-loading
        margin-top 25px

      .graph-or-loading >>> .loading
        font-size 16px
        color rgba(0,0,0,0.4)
        margin-top 30px

  section.right-side
    padding 0 0 10px 40px
    margin-left 480px
    width 560px
    padding-left 40px
    min-height 472px

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
      display flex

      div
        margin-right 25px
        opacity 0.5

        &.right
          margin-right 0
          margin-left auto

        &:hover
          cursor pointer
          opacity 0.7

      .submit-game
        color highlight-color
        font-weight bold
        opacity 0.9

        &:hover
          opacity 1

    .move-list
      margin 36px 0 80px

</style>
