import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {

    private router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
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
        config.fallbackRoute('');
    }

}
