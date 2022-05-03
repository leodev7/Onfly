<template>
  <q-page>
    <div class="q-pa-md q-ma-xs">

      <!-- page header start -->
      <div class="row">
        <div class="q-my-md">
          <q-breadcrumbs class="text-brown">
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

      <!-- form start -->
      <q-card>

        <q-card-section>
          <q-item-section>

            <q-item-label>
              <q-item>
                <p class="text-h6">Dados de registro</p>
              </q-item>
            </q-item-label>

            <q-item-label>
              <div class="row">
                <div class="col-xs-12 col-sm-6">
                  <q-item>
                    <q-input dense outlined clearable color="black" text-color="black" class="full-width" v-model="user.name" label="Nome" maxlength="191" />
                  </q-item>
                </div>
                <div class="col-xs-12 col-sm-6">
                  <q-item>
                    <q-input dense outlined clearable color="black" text-color="black" class="full-width" v-model="user.email" label="Email" maxlength="191" />
                  </q-item>
                </div>
                <div class="col-xs-12 col-sm-6">
                  <q-item>
                    <q-select clearable outlined dense color="black" class="full-width" label="Sexo" v-model="user.gender" :options="genders" option-value="id" option-label="name" emit-value map-options />
                  </q-item>
                </div>
                <div class="col-xs-12 col-sm-6">
                  <q-item>
                    <q-toggle v-model="user.status" label="Ativo" color="green" checked-icon="check" unchecked-icon="clear" true-value="active" false-value="inactive" />
                  </q-item>
                </div>
              </div>
            </q-item-label>

          </q-item-section>
        </q-card-section>

        <q-separator class="q-my-sm" />

        <q-card-section>
          <q-item-section>

            <q-item-label>
              <q-item class="float-right q-gutter-xs">
                <q-btn color="dark" icon="cancel" label="Cancelar" class="text-capitalize" @click="toUserIndex()" />
                <q-btn color="dark" icon="save" label="Salvar" class="text-capitalize" @click="onUserCreate()" />
              </q-item>
            </q-item-label>

          </q-item-section>
        </q-card-section>

      </q-card>
      <!-- form end -->

    </div>

  </q-page>
</template>

<script>

export default {
  name: 'UserCreate',

  data () {
    return {
      genders: [ 
        { id: 'male', name: 'Masculino' },
        { id: 'female', name: 'Feminino' }
      ],
      user: {
        name: null,
        email: null,
        gender: null,
        status: 'active'
      }
    }
  },

  methods: {

    toDashboard () {
      this.$router.push({ name: 'r_dashboard' })
    },

    toUserIndex () {
      this.$router.push({ name: 'r_user_index' })
    },

    onUserCreate () {
      this.$q.loading.show()

      this.$axios({ method: 'post', url: 'https://gorest.co.in/public/v1/users', data: this.user, headers: { 'Authorization': 'Bearer d949591f556c81ec7595da23ade6a76d6ca39cedb4c88556b779001b64d1692a' } })
        .then((response) => {
          this.$q.notify({ type: 'positive', message: 'Cadastrado com sucesso' })
          this.toUserIndex()
        })
        .catch((error) => {
          for (let index = 0; index < error.response.data.data.length; index++) {
            this.$q.notify({ type: 'negative', message: `Field ${error.response.data.data[index].field} ${error.response.data.data[0].message}` })
          }
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    }
  }
}

</script>
