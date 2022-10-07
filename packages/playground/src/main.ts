import { createApp } from 'vue'
import App from './App.vue'
import milochauCore from './plugins/milochau-core'

// Styles
import './styles/main.scss'

const app = createApp(App);
app.use(milochauCore);
