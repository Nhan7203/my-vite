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
    const password_parttern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
    const name_parttern = /^[^\d!@#$%^&*(),.?":{}|<>]+$/u
    if (registerValues.name === "") {
        errors.name = "Name is Required!"
        errors.check = true
    } else if (!name_parttern.test(registerValues.name.trim())){
        errors.name = "The name should not have special characters"
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
    }else if (!password_parttern.test(registerValues.password)) {
        errors.password = "password with at least 1 uppercase character, 1 digit and 8 characters"
        errors.check = true
    }

    if (registerValues.phoneNumber === "") {
        errors.phoneNumber = "phoneNumber is Required!"
        errors.check = true
    }else if (!(registerValues.phoneNumber.charAt(0) == "0") || !(registerValues.phoneNumber.length == 10)) {
        errors.phoneNumber = "PhoneNumber is wrong"
        errors.check = true
    }

    if (registerValues.address === "") {
        errors.address = "address is Required!"
        errors.check = true
    } else if(registerValues.address.length < 3) {
        errors.address = "Address must be at least 3 characters"
        errors.check = true
    }

    return errors
}