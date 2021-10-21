/* export const myMethods = {
  methods: {
      async newRegister(user) {
          const res = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(user),
          })
          const data = await res.json()
          this.users = [...this.users, data]
      },
      
      async fetchUsers() {
          const res = await fetch ('http://localhost:5000/users')
          const data = await res.json()
          return data
      },
  
      async fetchUser(id) {
        const res = await fetch (`http://localhost:5000/users/${id}`)
        const data = await res.json()
        return data
      },
    },

    async created() {
      this.users = await this.fetchUsers()
      this.rows = this.users.length
      console.log(this.rows, 'No rows')
    },
} */


const newRegister = async(user) => {
    const res = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
    })
    const data = await res.json()
    return data
}

const fetchUsers = async () => {
    const res = await fetch ('http://localhost:5000/users')
    const data = await res.json()
    return data
}

const fetchUser = async (id) => {
    const res = await fetch (`http://localhost:5000/users/${id}`)
    const data = await res.json()
    return data
}

export {
  newRegister,
  fetchUsers,
  fetchUser
}