export class RequestUser extends Request{

    user: {
        email: string,
        exp : number,
        iat: number};

}