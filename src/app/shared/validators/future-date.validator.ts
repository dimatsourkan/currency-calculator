import { AbstractControl, ValidationErrors } from "@angular/forms";

export const futureDateValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }

    const today = new Date();

    if (today > control.value) {
        return null;
    }

    return { futureDate: true };
};
