import { Controller } from "@hotwired/stimulus"

export default class extends Controller<HTMLDivElement> {
  start() {
    this.show()
    this.pluse()
    this.element.innerText = '根據雲端伺服器的狀態會在幾秒到幾分鐘內生成結果。'
  }

  failed() {
    this.stopPluse()
    this.element.innerText = '產生的內容有無法顯示的部分，請重新嘗試。'
  }

  success() {
    this.hide()
    this.element.innerText = '完成'
  }

  show() {
    this.element.classList.remove('hidden')
  }

  hide() {
    this.element.classList.add('hidden')
  }

  pluse() {
    this.element.classList.add('animate-pulse')
  }

  stopPluse() {
    this.element.classList.remove('animate-pulse')
  }
}
