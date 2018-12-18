export default function(Vue){
	Vue.directive('height',{
		inserted(el,binding){
			if(typeof binding.value == 'number'){
				$(el).height($(window).height() - binding.value)
			}else{
				$(el).height($(window).height())
			}
		}
	})
}