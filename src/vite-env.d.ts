/// <reference types="vite/client" />
import { Application } from '@hotwired/stimulus'

declare global {
  interface Window {
   	Stimulus: Application;
  }
}
