<template>
  <q-page>
    <div class="q-pa-md q-ma-xs">

      <!-- page header start -->
      <div class="row">
        <div class="q-my-md">
          <q-breadcrumbs class="text-brown-8">
            <q-breadcrumbs-el label="Usuários" />
          </q-breadcrumbs>
        </div>
      </div>
      <!-- page header end -->

      <q-space />

      <!-- page table start -->
      <q-card>

        <q-table hide-pagination row-key="id" :rows="usersData" :columns="userColumns" :pagination="pagination" :rows-per-page-options="[12]" @request="onUserFilter">
          <template v-slot:top>
            <q-card-section class="full-width">
              <div class="row q-mb-md">
                <div class="col-xs-12 col-sm-8">
                  <p class="text-h6">Usuários</p>
                  <p v-if="pagination.total">Exibindo {{ pagination.total }} registro(s) encontrado(s)</p>
                  <p v-else>Nenhum registro encontrado</p>
                </div>

                <div class="col-xs-12 col-sm-4 text-right">
                  <q-btn color="dark" class="text-capitalize" label="Cadastrar" icon="add" @click="toUserCreate()" />
                </div>
              </div>

              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-xs-12 col-sm-3">
                  <q-input clearable outlined dense color="black" label="Nome" v-model="filter.name" />
                </div>
                <div class="col-xs-12 col-sm-3">
                  <q-input clearable outlined dense color="black" label="Email" v-model="filter.email" />
                </div>
                <div class="col-xs-12 col-sm-3">
                  <q-select clearable outlined dense color="black" label="Sexo" v-model="filter.gender" :options="filterOptions.genders" option-value="id" option-label="name" emit-value map-options />
                </div>
                <div class="col-xs-12 col-sm-3">
                  <q-select clearable outlined dense color="black" label="Situação" v-model="filter.status" :options="filterOptions.status" option-value="id" option-label="name" emit-value map-options />
                </div>
              </div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 text-right">
                  <q-btn color="dark" class="text-capitalize" label="Pesquisar" icon="search" @click="onUserSearch()" />
                  <q-btn color="red" class="text-capitalize q-ml-sm" label="Limpar" icon="delete" @click="clearAllFilter()" />
                </div>
              </div>

            </q-card-section>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge color="green" v-if="props.row.status === 'active'">
                Sim
              </q-badge>
              <div v-if="props.row.status === 'inactive'">
                Não
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-gender="props">
            <q-td :props="props">
              <div v-if="props.row.gender === 'male'">
                Masculino
              </div>
              <div v-else-if="props.row.gender === 'female'">
                Feminino
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn color="dark" size="sm" label="Editar" icon="edit" class="text-capitalize q-ml-sm" @click="toUserEdit(props.row.id)" />
              <q-btn color="red" size="sm" label="Excluir" icon="delete" class="text-capitalize q-ml-sm" @click="confirmDeleteDialog(props.row)" />
            </q-td>
          </template>

          <template v-slot:no-data>
            <div class="row full-width">
              <div class="q-mt-xs q-px-xs col-12">
                <p>Nenhum registro encontrado</p>
              </div>
            </div>
          </template>

        </q-table>

        <div class="col-12 q-py-lg" style="display: flex;justify-content: space-around;">
          <q-pagination color="grey-8" direction-links @click="goToPage(pagination.page++)" :min="1" :max="pagination.total > pagination.limit ? pagination.page + 2 : pagination.page" :max-pages="1" v-model="pagination.page" />
        </div>

      </q-card>
      <!-- page table end -->

    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'UserIndex',

  data () {
    return {
      usersData: [],
      userColumns: [
        { align: 'left', name: 'id', field: 'id', label: 'Id' },
        { align: 'left', name: 'name', field: 'name', label: 'Nome' },
        { align: 'left', name: 'email', field: 'email', label: 'Email' },
        { align: 'left', name: 'gender', field: 'gender', label: 'Sexo' },
        { align: 'left', name: 'status', field: 'status', label: 'Ativo' },
        { align: 'right', name: 'action', field: 'action', label: 'Ações' }
      ],

      filter: {
        name: null,
        email: null,
        gender: null,
        status: null
      },

      filterOptions: {
        genders: [ 
          { id: 'male', name: 'Masculino' },
          { id: 'female', name: 'Feminino' }
        ],
        status: [ 
          { id: 'active', name: 'Ativo' },
          { id: 'inactive', name: 'Inativo' }
        ]
      },

      pagination: {
        page: 1,
        rowsPerPage: 12,
        pagesNumber: 1,
        rowsNumber: 1
      }
    }
  },

  mounted () {
    this.onUserFilter({
      pagination: this.pagination
    })
  },

  methods: {

    toUserCreate () {
      this.$router.push({ name: 'r_user_create' })
    },

    toUserEdit (userId) {
      this.$router.push({ name: 'r_user_edit', params: { userId: userId } })
    },

    onUserSearch () {
      this.pagination.page = 1
      this.onUserFilter()
    },

    goToPage (page) {
      this.pagination.page = page
      this.onUserFilter()
    },

    clearAllFilter () {
      this.filter = {
        name: null,
        email: null,
        gender: null,
        status: null
      }

      this.onUserSearch()
    },

    onUserFilter (props) {
      this.$q.loading.show()

      var url = '?page='

      let page = this.pagination.page
      if (props) {
        page = props.pagination.page
      }
      url += `${page}`

      if (this.filter.name) {
        url += `&name=${this.filter.name}`
      }
      
      if (this.filter.email) {
        url += `&email=${this.filter.email}`
      }

      if (this.filter.gender) {
        url += `&gender=${this.filter.gender}`
      }

      if (this.filter.status) {
        url += `&status=${this.filter.status}`
      }

      api.get(url)
        .then((response) => {
          this.pagination = response.data.meta.pagination
          this.usersData = response.data.data
        })
        .catch((err) => {
          this.$q.notify({ type: 'negative', message: 'Erro na solicitação' })
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    confirmDeleteDialog (userId) {
      this.$q.dialog({
        html: true,
        title: `Deseja excluir o(a) usuário(a)<br />${userId.name}?`,
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'red'
        }
      }).onOk(() => {
        this.toUserDelete(userId.id)
      })
    },

    toUserDelete (userId) {
      this.$q.loading.show()

      api.delete(`${userId}`)
        .then(() => {
          this.$q.notify({ type: 'positive', message: 'Usuário excluido' })
        })
        .catch(() => {
          this.$q.notify({ type: 'negative', message: 'Erro ao excluir usuário' })
        })
        .finally(() => {
          this.onUserFilter()
          this.$q.loading.hide()
        })
    }
  }

}

</script>
