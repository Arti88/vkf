import {PLATFORM} from 'aurelia-pal';
import {AppRouter} from 'aurelia-router'

export class App {

    private router: AppRouter;

    configureRouter(config, router) {
        this.router = router;
        config.map([{
            route: '',
            name: 'main',
            moduleId: PLATFORM.moduleName('pages/main')
        }, {
            route: 'user/:id',
            name: 'user',
            moduleId: PLATFORM.moduleName('pages/user')
        }]);
    }

}
