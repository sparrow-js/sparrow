
export default {
  '/src/utils/clipboard.js': 
    {
      code: decodeURIComponent(`import%20Vue%20from%20'vue'%0Aimport%20Clipboard%20from%20'clipboard'%0A%0Afunction%20clipboardSuccess()%20%7B%0A%20%20Vue.prototype.%24message(%7B%0A%20%20%20%20message%3A%20'Copy%20successfully'%2C%0A%20%20%20%20type%3A%20'success'%2C%0A%20%20%20%20duration%3A%201500%0A%20%20%7D)%0A%7D%0A%0Afunction%20clipboardError()%20%7B%0A%20%20Vue.prototype.%24message(%7B%0A%20%20%20%20message%3A%20'Copy%20failed'%2C%0A%20%20%20%20type%3A%20'error'%0A%20%20%7D)%0A%7D%0A%0Aexport%20default%20function%20handleClipboard(text%2C%20event)%20%7B%0A%20%20const%20clipboard%20%3D%20new%20Clipboard(event.target%2C%20%7B%0A%20%20%20%20text%3A%20()%20%3D%3E%20text%0A%20%20%7D)%0A%20%20clipboard.on('success'%2C%20()%20%3D%3E%20%7B%0A%20%20%20%20clipboardSuccess()%0A%20%20%20%20clipboard.destroy()%0A%20%20%7D)%0A%20%20clipboard.on('error'%2C%20()%20%3D%3E%20%7B%0A%20%20%20%20clipboardError()%0A%20%20%20%20clipboard.destroy()%0A%20%20%7D)%0A%20%20clipboard.onClick(event)%0A%7D%0A`)
    }    
  
}