<template>
  <!-- form start -->
  <q-card>

    <q-card-section>
      <q-item-section>

        <q-item-label>
          <q-item>
            <p class="text-h6">Dados de registro</p>
          </q-item>
        </q-item-label>

        <q-item-label v-if="userData">
          <div class="row q-col-gutter-sm">
            <div class="col-xs-12 col-sm-6">
              <q-input dense outlined clearable color="black" text-color="black" v-model="userData.name" label="Nome" maxlength="191" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input dense outlined clearable color="black" text-color="black" v-model="userData.email" label="Email" maxlength="191" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select dense outlined clearable color="black" label="Sexo" v-model="userData.gender" :options="genders" option-value="id" option-label="name" emit-value map-options />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-toggle v-model="userData.status" label="Ativo" color="green" checked-icon="check" unchecked-icon="clear" true-value="active" false-value="inactive" />
            </div>
          </div>
        </q-item-label>

        <q-item-label v-else>
          <div class="row q-col-gutter-sm">
            <div class="col-xs-12 col-sm-6">
              <q-input dense outlined clearable color="black" text-color="black" v-model="user.name" label="Nome" maxlength="191" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input dense outlined clearable color="black" text-color="black" v-model="user.email" label="Email" maxlength="191" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select dense outlined clearable color="black" label="Sexo" v-model="user.gender" :options="genders" option-value="id" option-label="name" emit-value map-options />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-toggle v-model="user.status" label="Ativo" color="green" checked-icon="check" unchecked-icon="clear" true-value="active" false-value="inactive" />
            </div>
          </div>
        </q-item-label>

      </q-item-section>
    </q-card-section>

    <q-separator class="q-my-sm" />

    <q-card-section>
      <q-item-section>

        <q-item-label>
          <div class="text-right q-gutter-sm">
            <q-btn color="dark" icon="cancel" label="Cancelar" class="text-capitalize" @click="toUserIndex()" />
            <q-btn color="dark" icon="save" label="Salvar" class="text-capitalize" @click="userSave()" />
          </div>
        </q-item-label>

      </q-item-section>
    </q-card-section>

  </q-card>
  <!-- form end -->

</template>

<script>
export default {
  name: 'UserCard',
  props: [
    'userData'
  ],

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
    toUserIndex () {
      this.$router.push({ name: 'r_user_index' })
    },

    userSave () {
      if (this.userData) {
        this.userEdit()
      } else {
        this.userCreate()
      }
    },

    userCreate () {
      this.$emit('userCreate', this.user)
    },

    userEdit () {
      this.$emit('userEdit', this.userData)
    }
  }
}
</script>

<style>

</style>