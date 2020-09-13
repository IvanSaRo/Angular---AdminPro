// las interfaces son como clases capadas que sirven para poner ciertas restricciones y forzar que un objeto tenga cierta forma

export interface RegisterForm {

    name : string,
    email: string, 
    password: string, 
    repeatPassword: string, 
    terms: boolean,


}
