import crudBuilder from './index'

const endpoints = crudBuilder({
  model: 'User',
  methods: {
    create: {}
  }
})
