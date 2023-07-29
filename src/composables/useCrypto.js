import { ref, reactive, onMounted, computed } from 'vue';

const useCrypto = () => {
    const moneys = ref([
        { code: 'USD', text: 'Dolar de Estados Unidos'},
        { code: 'MXN', text: 'Peso Mexicano'},
        { code: 'EUR', text: 'Euro'},
        { code: 'GBP', text: 'Libra Esterlina'},
    ])

    const cryptoCash = ref([])

    const error = ref('')

    const quotes = ref({})

    const loading = ref(false)

    const quote = reactive({
        money: '',
        crypto: ''
    })

    onMounted( () => {
        fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`)
        .then(res => res.json())
        .then( ({Data}) => cryptoCash.value = Data)
    })

    const quoteCrypto = () => {
        //*** Validate quote is not empty */
        if ( Object.values(quote).includes('') ) {
            error.value = 'Field is required'
            return
        }

        error.value = ''
        getQuote()
    }

    const getQuote = async() => {
        loading.value = true
        quotes.value = {}

        try {
            const { crypto, money} = quote
    
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${money}`
    
            const res = await fetch(url)
            const data = await res.json()
    
            quotes.value = data.DISPLAY[crypto][money]
    
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    const viewResult = computed( () => {
        return Object.values(quotes.value).length > 0
    })

    return {
        //*** States */
        moneys,
        cryptoCash,
        error,
        quotes,
        loading,
        quote,

        //*** Methods */
        viewResult,
        quoteCrypto
    }
}

export default useCrypto