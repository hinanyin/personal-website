import lazyload from './lazyload'

let LazyPlugin = {}

LazyPlugin.install = (Vue) => {
    Vue.directive('lazy', lazyload)
}

export default LazyPlugin