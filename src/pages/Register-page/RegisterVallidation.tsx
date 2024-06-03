export interface IRegisterValues {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    address: string;
    check?: boolean;
}

export default function RegisterVallidation(registerValues: IRegisterValues) {
    const errors = {} as IRegisterValues;
    errors.check = false

    const email_parttern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const password_parttern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"

    if (registerValues.name === "") {
        errors.name = "Name is Required!"
        errors.check = true
    }

    if (registerValues.email === "") {
        errors.email = "email is Required!"
        errors.check = true
    }else if (!email_parttern.test(registerValues.email)) {
        errors.email = "Email is not correct format"
        errors.check = true
    }

    if (registerValues.password === "") {
        errors.password = "password is Required!"
        errors.check = true
    }else if (registerValues.email.match(password_parttern)) {
        errors.password = "password with at least 1 uppercase character, 1 digit and 8 characters"
        errors.check = true
    }

    if (registerValues.phoneNumber === "") {
        errors.phoneNumber = "phoneNumber is Required!"
        errors.check = true
    }else if (!(registerValues.phoneNumber.charAt(0) == "0") && !(registerValues.phoneNumber.length == 10)) {
        errors.phoneNumber = "PhoneNumber is wrong"
        errors.check = true
    }

    if (registerValues.address === "") {
        errors.address = "address is Required!"
        errors.check = true
    }

    return errors
}