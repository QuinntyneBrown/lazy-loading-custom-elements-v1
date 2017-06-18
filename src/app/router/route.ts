export class Route {
    name: string;
    params: any;
    authRequired: boolean;
    path: string;
    segments: Array<any>;
    resolve: {():Promise<any>}
}