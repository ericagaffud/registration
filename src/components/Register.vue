<template>
  <div class="container" id="register">
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4 ui">
          <h6>
              <i class="fas fa-circle blue fa-xs"></i>
              Document TAR
              <i class="fas fa-circle orange fa-xs"></i>
          </h6>
          <img src="../assets/cagayan-seal-400x400.png" width="110px">
          <h4>Register to TAR</h4><br>
          <div id="ui">
            <b-alert
              :show="dismissCountDown"
              fade
              variant="primary"
              @dismiss-count-down="countDownChanged">
              SUCCEFULLY REGISTERED!
            </b-alert>

            <form @submit.prevent="submit" autocomplete="off">
              <b-form-group 
                id="userfield"
                label="Username"
                label-for="username">
                <b-form-input id="username" name="username" v-model="username" v-model.trim="$v.username.$model" :class="{'is-invalid': validationStatus($v.username)}"></b-form-input>
                <div v-if="!$v.username.required" class="invalid-feedback">This field is required</div>
                <div v-if="!$v.username.maxLength" class="invalid-feedback">Username must have at most ({{ $v.username.$params.maxLength.max }}) letters.</div>
                <div v-if="!$v.username.alphaNum" class="invalid-feedback">Invalid Input</div>
                <div v-if="!$v.username.isUnique" class="text-danger">This username is already registered</div>
              </b-form-group>

              <b-form-group 
                id="passfield"
                label="Password"
                label-for="password">
                <b-form-input type="password" id="password" name="password" v-model="password" v-model.trim="$v.password.$model" :class="{'is-invalid': validationStatus($v.password)}"></b-form-input>
                <div v-if="!$v.password.required" class="invalid-feedback">This field is required</div>
                <div v-if="!$v.password.maxLength" class="invalid-feedback">You have meet the maximum ({{ $v.password.$params.maxLength.max }}) letters.</div>
              </b-form-group>

              <b-form-group 
                id="idfield"
                label="Employee ID Number"
                label-for="id_number">
                <b-form-input id="id_number" name="id_number" v-model="id_number" v-model.trim="$v.id_number.$model" :class="{'is-invalid': validationStatus($v.id_number)}"></b-form-input>
                <div v-if="!$v.id_number.required" class="invalid-feedback">This field is required</div>
                <div v-if="!$v.id_number.maxLength" class="invalid-feedback">You have meet the maximum ({{ $v.id_number.$params.maxLength.max }}) numbers.</div>
                <div v-if="!$v.id_number.alphaNum" class="invalid-feedback">Invalid Input</div>
              </b-form-group>

              <b-form-group 
                id="fullfield"
                label="Full Name"
                label-for="fullname">
                <b-form-input id="fullname" name="fullname" v-model="fullname" v-model.trim="$v.fullname.$model" :class="{'is-invalid': validationStatus($v.fullname)}"></b-form-input>
                <div v-if="!$v.fullname.required" class="invalid-feedback">This field is required</div>
                <div v-if="!$v.fullname.maxLength" class="invalid-feedback">You have meet the maximum ({{ $v.fullname.$params.maxLength.max }}) letters.</div>
              </b-form-group>

              <b-form-group 
                id="jobfield"
                label="Job Position"
                label-for="job">
                <b-form-input id="job" name="job" v-model="job" v-model.trim="$v.job.$model" :class="{'is-invalid': validationStatus($v.job)}"></b-form-input>
                <div v-if="!$v.job.required" class="invalid-feedback">This field is required</div>
                <div v-if="!$v.job.maxLength" class="invalid-feedback">You have meet the maximum ({{ $v.job.$params.maxLength.max }}) letters.</div>
              </b-form-group>

              <b-form-group id="office" label="Office" label-for="office">
                <b-form-select
                  id="office"
                  name="office"
                  v-model.trim="$v.office.$model"
                  :class="{'is-invalid': validationStatus($v.office)}"
                  class="w-100 p-2">
                  <option value="" disabled> Select Office </option>
                  <option :value="office.name" :key="office.name" v-for="office in offices"> {{office.name}} </option>
                  <div v-if="!$v.office.required" class="invalid-feedback">This field is required.</div>
                </b-form-select>
              </b-form-group><br>

              <div class="d-grid gap-3">
                <b-button variant="primary" type="submit">
                  <b-spinner v-if="loading" small label="Small Spinner"></b-spinner>
                  <span v-if="loading"> REGISTERING... </span>
                  <span v-else class="px-1">REGISTER</span>
                </b-button>
              </div>
            </form>
          </div>
        <div class="col-lg-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength, alphaNum } from "vuelidate/lib/validators"
import { fetchUsers, newRegister } from './myMethods'

export default {
    name: 'Register',
    data: function() {
      return {
        username: '',
        id_number: '',
        password: '',
        fullname: '',
        job: '',
        office:'',
        offices: [],
        users: null,
        /* users: [], */
        loading: false,
        dismissSecs: 5,
        dismissCountDown: 0
      }
    },

    validations: {
      username: {
        required,
        maxLength: maxLength(20),
        alphaNum,
        async isUnique (value) {
          if (value === '') {
            return true
          }
          else if (this.userUnique(value)) {
            return false
          }
          return true
        }
      },
      password: {
        required,
        maxLength: maxLength(20)
      },
      id_number: {
        required,
        maxLength: maxLength(85),
        alphaNum
      },
      fullname: {
        required,
        maxLength: maxLength(60)
      },
      job: {
        required,
        maxLength: maxLength(45)
      },
      office: {
        required
      }
    },
    mounted: function() {
        var v = this;
        v.$http.get(`http://localhost:5000/offices`)
        .then(function(resp) {
            v.offices = resp.data;
        })
        .catch(function(err) {
            console.log(err)
        });
    },

    methods: {
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false
        },

        submit() {
            this.submitSession()
            
            this.$v.$touch()
            if (this.$v.$pending || this.$v.$error || this.$v.$invalid) return
            alert('Data Submit')

            this.$v.$reset()

            this.newReg()
            this.showSuccess()

            this.username = null
            this.id_number = null
            this.password = null
            this.fullname = null
            this.job = null
            this.office = null
        },

        submitSession() {
          this.loading= !false
          setTimeout(()=>{
            this.loading= !true
          }),1500
        },
        
        async newReg() {
            const newUser = {
                id: Math.floor(Math.random() * 100000),
                username: this.username,
                id_number: this.id_number,
                password: this.password,
                fullname: this.fullname,
                job: this.job,
                office: this.office,

              }
            const newReg = await newRegister(newUser);
            console.log(newReg)

        },

        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },

        showSuccess() {
          this.dismissCountDown = this.dismissSecs
        },

        userUnique(value) {
          if ((this.users.findIndex((user) => user.username.toLowerCase() === value.toLowerCase())) >= 0 ) {
            console.log('userused')
            return Boolean
          }
        }
  },
  created() {
    fetchUsers()
      .then ( value => {
        this.users = value
      })
  }

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

</style>

