
export default {
  '/src/icons/index.js': 
    {
      code: decodeURIComponent(`import%20Vue%20from%20'vue'%0Aimport%20SvgIcon%20from%20'%40%2Fcomponents%2FSvgIcon'%2F%2F%20svg%20component%0A%0A%2F%2F%20register%20globally%0AVue.component('svg-icon'%2C%20SvgIcon)%0Aconst%20req%20%3D%20require.context('.%2Fsvg'%2C%20false%2C%20%2F%5C.svg%24%2F)%0Aconst%20requireAll%20%3D%20requireContext%20%3D%3E%20requireContext.keys().map(requireContext)%0ArequireAll(req)%0A`)
    }    
  
}