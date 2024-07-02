import { ValidatorFn, AbstractControl } from '@angular/forms';

export function fileSizeValidator(maxSize: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value as File;
      if (file) {
        const fileSize = file.size / (1024 * 1024);
        if (fileSize > maxSize) {
          return { 'fileSizeExceeded': { value: control.value } };
        }
      }
      return null;
    };
}