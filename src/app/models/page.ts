export class Page<Type> {
    constructor(
        public total: number,
        public per_page: number,
        public current_page: number,
        public data: Type[],
    ){
    }
}
