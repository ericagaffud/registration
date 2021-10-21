<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-10 ui">
        <h6>
              <i class="fas fa-circle blue fa-xs"></i>
              Document TAR
              <i class="fas fa-circle orange fa-xs"></i>
          </h6>
          <img src="../assets/cagayan-seal-400x400.png" width="110px">
          <br><br>
        <div id="ui">
          <div class="row mb-3">
            <div class="col-5">
              <h1>USERS</h1>
            </div>
            <div class="col-7">
              <b-form-input
                type="search"
                v-model="search"
                placeholder="Search...">
              </b-form-input>
            </div>
          </div>

          <div class="row">
            <b-table
              id="my-table"
              head-row-variant="primary"
              :items="filteredUsers"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="search"
              @filtered="onFiltered"
              hover>
            </b-table>
          </div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4">
              <b-pagination
                v-model="currentPage"
                :per-page="perPage" 
                :total-rows="rows"
                align="right"
                first-number
                last-number
                prev-text="Prev"
                next-text="Next">
              </b-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
    </div>
  </div>
</template>

<script>
import { fetchUsers } from './myMethods'

export default {
    name: 'User',
    data() {
      return {
        users: [],
        fields: [
          { key: 'username', sortable: true},
          { key: 'fullname', label: 'Full Name', sortable: true},
          { key: 'id_number', label: 'Employee ID Number', sortable: false},
          { key: 'job', label: 'Job Position', sortable: true},
          { key: 'office', sortable: true}
        ],
        search: '',
        currentPage: 1,
        perPage: 8,
        totalUsers: 1500, 
        totalRows: 1,
        rows: 0,
      }
    },
    
    methods: {
      onFiltered(filteredUsers) {
        this.rows = filteredUsers.length
        this.currentPage = 1
        console.log('onFilter')
      }
    },

    computed: {
      filteredUsers() {
        const value = this.search.charAt(0) + this.search.slice(1)
        return this.users.filter(function(user){
          return user.username.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                  user.fullname.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                  user.job.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
                  user.office.toLowerCase().indexOf(value.toLowerCase()) > -1
        })
      } ,
    },

    created() {
      fetchUsers()
        .then ( value => {
        value.forEach(user => {
          this.users.push(user)
        })
      this.rows = this.users.length
      this.currentPage = 1
      })
    },
}
</script>


<style>
  #ui {
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 30px;
    text-align: left;
    align-items: center;
  }

  .ui {
    align-items: center;
    text-align: center;
    margin-top: 20px;
  }
  
  .blue {
    color: blue;
    margin-right: 15px;
  }

  .orange {
    color: orange;
    margin-left: 15px;
  }

  h1 {
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font: bolder;
  }

  .height {
    height: 500px !important;
  }

  table,
  thead,
  tr,
  tbody,
  th,
  td {
    text-align: center;
  }
</style>