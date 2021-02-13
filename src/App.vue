<template>
  <div class="container mt-5">
    <h1 class="mb-3">Laravel Vue Pagination Demo</h1>
    <p class="mb-5">
      A Vue.js pagination component for Laravel paginators that works with
      Bootstrap.
    </p>

    <form class="mb-5" @submit.prevent>
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="limit">Limit</label><br />
          <input
            type="number"
            id="limit"
            class="form-control"
            v-model="limit"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="size">Size</label><br />
          <select id="size" class="form-control" v-model="size">
            <option value="small">Small</option>
            <option value="default">Default</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="align">Align</label><br />
          <select id="align" class="form-control" v-model="align">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div class="form-group col-md-3">
          <label for="align">Results</label><br />
          <select
            id="align"
            class="form-control"
            v-model="maxResults"
            @change="getResults"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <div class="form-row d-flex align-items-center">
        <div class="form-group col-md-2">
          <div class="form-group">
            <label class="form-check-label" for="show-disabled">Max ID:</label>
            <input
              class="form-control"
              type="text"
              v-model="maxID"
              @change="getResults"
            />
          </div>
        </div>
        <div class="form-group col-md-6">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="show-disabled"
              v-model="showDisabled"
            />
            <label class="form-check-label" for="show-disabled"
              >Show Disabled</label
            >
          </div>
        </div>
      </div>
    </form>
    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in users" :key="i">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_at }}</td>
            <td>{{ user.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="overflow-auto">
          <pagination
            class="mb-0"
            :data="laravelData"
            @pagination-change-page="getResults"
            :limit="limit"
            :show-disabled="showDisabled"
            :size="size"
            :align="align"
          />

          <!--pagination
                        :data="laravelResourceData"
                        @pagination-change-page="getResourceResults"
                        :limit="limit"
                        :show-disabled="showDisabled"
                        :size="size"
                        :align="align" /-->
        </div>
      </div>
    </div>

    <footer class="my-5 text-muted small">
      <div class="row">
        <div class="col-md-9">
          <p>
            Laravel Vue Pagination was created by
            <a href="https://gilbitron.me">Gilbert Pellegrom</a> from
            <a href="https://dev7studios.co">Dev7studios</a>. Released under the
            MIT license.
          </p>
        </div>
        <div class="col-md-3 text-right">
          <p>
            <a href="https://github.com/gilbitron/laravel-vue-pagination"
              >GitHub</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import LaravelVuePagination from './LaravelVuePagination.vue'
import axios from 'axios'

const dummyData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 20 }
]

export default {
  data() {
    return {
      laravelData: {
        data: []
      },
      limit: 2,
      showDisabled: false,
      size: 'default',
      align: 'left',
      maxResults: 20,
      maxID: null,
      url: 'https://radiant-springs-71638.herokuapp.com'
    }
  },
  computed: {
    queryString() {
      const maxID = Number(this.maxID) > 0 ? `&max_id=${this.maxID}` : ''
      return `active=1&max_results=${this.maxResults}${maxID}`
    },
    users() {
      return this.laravelData.data || []
    }
  },
  mounted() {
    this.getResults(this.maxResults)
    // this.getResourceResults();
  },

  methods: {
    async getResults(page) {
      if (!page) {
        page = 1
      }
      const url = `${this.url}/api/users`
      const response = await axios.get(
        `${url}?page=${page}&${this.queryString}`
      )

      this.laravelData = response.data.users
    }
  },

  watch: {
    limit(newVal) {
      this.limit = parseInt(newVal)
      if (this.limit < 0) {
        this.limit = 0
      }
    }
  },

  components: {
    pagination: LaravelVuePagination
  }
}
</script>
