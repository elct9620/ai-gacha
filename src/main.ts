import './style.css'
import { Application } from '@hotwired/stimulus'

import GachaController from './controllers/gacha_controller'
import CardController from './controllers/card_controller'
import StatusController from './controllers/status_controller'
import ConfigController from './controllers/config_controller'

const app = Application.start()
app.register('gacha', GachaController)
app.register('card', CardController)
app.register('status', StatusController)
app.register('config', ConfigController)

if(import.meta.env.DEV) {
  window.Stimulus = app
}
