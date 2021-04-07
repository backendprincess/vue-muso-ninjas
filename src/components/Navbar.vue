<template>
  <div class="navbar">
        <nav>
            <img src="@/assets/ninja.png">
            <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
            <div class="links">
                <div v-if="user">
                    <button v-if="user" @click="handleClick">Log out</button>
                </div>
                <div v-else>                
                    <router-link v-if="!user" class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link v-if="!user" class="btn" :to="{ name: 'Login' }">Login</router-link>
                </div>
            </div>
        </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const { logout } = useLogout()
        const { user } = getUser()

        const handleClick = async () => {
            await logout()
            router.push({ name: 'Login' })
        }

        return { handleClick, user }
    }
}
</script>

<style scoped>
    .navbar {
        padding: 16px 10px;
        margin-bottom: 60px;
        background: white;
    }

    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    nav h1 {
        margin-left: 20px;
    }

    nav .links {
        margin-left: auto;
    }

    nav .links a, button {
        margin-left: 16px;
        font-size: 14px;
    }

    nav img {
        max-height: 60px;
    }
</style>