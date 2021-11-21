import {HttpException, HttpStatus} from "@nestjs/common";

export class ApiError {

    static Forbidden_Error(text: string) {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: text,
        }, HttpStatus.FORBIDDEN);
    }

    static Payment_Error(text: string) {
        throw new HttpException({
            status: HttpStatus.PAYMENT_REQUIRED,
            error: text,
        }, HttpStatus.PAYMENT_REQUIRED);
    }

}