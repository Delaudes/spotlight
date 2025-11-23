import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RouterService } from "./router.service";

@Injectable()
export class AngularRouterService implements RouterService {
    constructor(private router: Router) { }

    navigateTo(path: string): void {
        this.router.navigate([path]);
    }
}