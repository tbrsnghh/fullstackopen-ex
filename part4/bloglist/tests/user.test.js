const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert') // Dùng cái này thay cho expect
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt') // Cần để tạo passwordHash cho user mồi
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    // Mồi sẵn một user tên là 'root' để test vụ trùng lặp
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

describe('Test users', () => {
    test('user with invalid password', async () => {
        const newUser = {
            username: 'ha_dev',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(result.body.error, 'password must be at least 3 characters long')
    })

    test('user with duplicate username', async () => {
        const newUser = {
            username: 'root', 
            password: 'password123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.match(result.body.error, /expected `username` to be unique/)
    })
})

after(async () => {
    await mongoose.connection.close()
})