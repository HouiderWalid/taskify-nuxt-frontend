export default class DashboardRoutes {

    static OVERVIEW = {
        NAME: 'overview',
        PATH: '/'
    }

    static DIET = {
        NAME: 'diet',
        PATH: '/'
    }

    static getAllRoutes(){
        return [
            this.OVERVIEW,
            this.DIET,
        ]
    }

    static getAllRoutesNames(){
        return this.getAllRoutes().map(route => route.NAME)
    }
}