import { Controller } from "@hotwired/stimulus"

export default class extends Controller<HTMLDivElement> {
  start() {
    this.show()
    this.pluse()
    this.element.innerText = '生成中⋯⋯'
  }

  failed() {
    this.stopPluse()
    this.element.innerText = '失敗'
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
