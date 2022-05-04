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
            <q-breadcrumbs-el label="Cadastrar usuário" />
          </q-breadcrumbs>
        </div>
      </div>
      <!-- page header end -->

      <q-space />

      <UserCard @userCreate="onUserCreate($event)" />

    </div>

  </q-page>
</template>

<script>
import UserCard from 'src/components/userCard/UserCard.vue'

export default {
  name: 'UserCreate',
  components: {
    UserCard
  },

  methods: {
    toUserIndex () {
      this.$router.push({ name: 'r_user_index' })
    },
    
    onUserCreate (userData) {
      this.$q.loading.show()

      this.$axios({ method: 'post', url: 'https://gorest.co.in/public/v1/users', data: userData, headers: { 'Authorization': 'Bearer d949591f556c81ec7595da23ade6a76d6ca39cedb4c88556b779001b64d1692a' } })
        .then((response) => {
          this.$q.notify({ type: 'positive', message: 'Cadastrado com sucesso' })

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
