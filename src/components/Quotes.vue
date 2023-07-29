<script setup>
    defineProps({
        quotes: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="contenedor-resultado">
        <h2>Quote</h2>
        <div class="resultado">
            <img 
                :src="'https://cryptocompare.com/' + quotes.IMAGEURL"
                alt="img crypto"
            />

            <div>
                <p>The price is: <span>{{ quotes.PRICE }}</span> </p>
                <p>Highest price of the day: <span>{{ quotes.HIGHDAY }}</span> </p>
                <p>Lowest price of the day: <span>{{ quotes.LOWDAY }}</span> </p>
                <p>Variation last 24 hours: <span>{{ quotes.CHANGEPCT24HOUR }}%</span> </p>
                <p>Last update: <span>{{ quotes.LASTUPDATE }}</span> </p>
            </div>
        </div>
    </div>
</template>