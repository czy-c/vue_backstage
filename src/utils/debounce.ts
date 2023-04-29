export const debounce=function(fn: { apply: (arg0: any, arg1: IArguments) => void; }, delay: number | undefined){
	let timer: number | null | undefined = null
	return function(){
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			fn.apply(fn,args)
		}, delay)
	}
}