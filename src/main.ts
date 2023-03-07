import './style.css'
import { Application } from '@hotwired/stimulus'

import GachaController from './controllers/gacha_controller'

const app = Application.start()
app.register('gacha', GachaController)

if(import.meta.env.DEV) {
  window.Stimulus = app
}
