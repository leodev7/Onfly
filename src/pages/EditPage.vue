<template>
  <q-page>
    <div class="q-pa-md q-ma-xs">

      <!-- page header start -->
      <div class="row">
        <div class="q-my-md">
          <q-breadcrumbs class="text-brown-8">
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>

            <q-breadcrumbs-el label="Usuários" @click="toUserIndex()" style="font-weight: bold; cursor: pointer" />
            <q-breadcrumbs-el label="Editar usuário" />
          </q-breadcrumbs>
        </div>
      </div>
      <!-- page header end -->

      <q-space />

      <UserCard :userData="user" @userEdit="onUserEdit($event)" />

    </div>

  </q-page>
</template>

<script>
import UserCard from 'src/components/userCard/UserCard.vue'
import { api } from 'boot/axios'

export default {
  name: 'UserEdit',
  components: {
    UserCard
  },

  data () {
    return {
      userId: this.$route.params.userId,
      user: []
    }
  },

  mounted () {
    this.getUserById()
  },

  methods: {
    toUserIndex () {
      this.$router.push({ name: 'r_user_index' })
    },

    getUserById () {
      this.$q.loading.show()

      api.get(`${this.userId}`)
        .then((response) => {
          this.user = response.data.data
        })
        .catch(() => {
          this.$q.notify({ type: 'negative', message: 'Usuário não encontrado' })
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    onUserEdit (userData) {
      this.$q.loading.show()

      api.put(`${this.userId}`, { data: userData })
        .then((response) => {
          this.$q.notify({ type: 'positive', message: 'Atualizado com sucesso' })

          this.toUserIndex()
        })
        .catch((error) => {
          for (let index = 0; index < error.response.data.data.length; index++) {
            this.$q.notify({ type: 'negative', message: `Field ${error.response.data.data[index].field} ${error.response.data.data[index].message}` })
          }
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    }
  }
}

</script>
