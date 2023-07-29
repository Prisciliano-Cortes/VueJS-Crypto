<script setup>
    import useCrypto from './composables/useCrypto'
    import Alert from './components/Alert.vue'
    import Quotes from './components/Quotes.vue'
    import Spinner from './components/Spinner.vue'

    const { 
        cryptoCash, 
        error, 
        loading, 
        moneys, 
        quote, 
        quotes, 
        quoteCrypto, 
        viewResult 
    } = useCrypto()
</script>

<template>
    <div class="contenedor">
        <h1 class="titulo">Quote <span>Cryptocurrency</span></h1>

        <div class="contenido">
            <Alert v-if="error">
                {{ error }}
            </Alert>
            <form 
                class="formulario"
                @submit.prevent="quoteCrypto"
            >
                <div class="campo">
                    <label for="moneda">Money:</label>
                    <select 
                        id="moneda"
                        v-model="quote.money"
                    >
                        <option 
                            v-for="money in moneys"
                            :key="money.code"
                            :value="money.code"
                        >
                            {{ money.text }}
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label for="crypto">CryptoMoney:</label>
                    <select 
                        id="crypto"
                        v-model="quote.crypto"
                    >
                        <option 
                            v-for="crypto in cryptoCash"
                            :key="crypto.CoinInfo.Name"
                            :value="crypto.CoinInfo.Name"
                        >
                            {{ crypto.CoinInfo.FullName }}
                        </option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value="Quote"
                />
            </form>

            <Spinner 
                v-if="loading"
            />

            <Quotes 
                v-if="viewResult"
                :quotes="quotes"
            />
        </div>
    </div>
</template>