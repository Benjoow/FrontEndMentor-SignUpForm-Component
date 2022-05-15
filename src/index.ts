const isEmpty = (input: HTMLInputElement): boolean => input.value.trim() === "" ? true : false; 


const isEmailValid = (mailInput: HTMLInputElement): boolean => {
  const regex = new RegExp(/^[\w\.\?\-\!\?]+@[\w-\.?]+\.[\w]{2,3}$/);
  console.log(regex.test(mailInput.value))
  return regex.test(mailInput.value);
}


const isBetween = (input: HTMLInputElement, min: number, max: number): boolean => input.value.length < min || input.value.length > max ? false : true;


const showError = (inputdiv: HTMLDivElement, message: string): void => {
  let alertMessage: HTMLParagraphElement = inputdiv.querySelector(".alert-Message")!;
  let iconAlert: HTMLSpanElement = inputdiv.querySelector("input")!;
  iconAlert.classList.add("alert-icon");
  inputdiv.classList.add("alertInput");
  alertMessage.textContent = `${message}`;
}


const success = (inputdiv: HTMLDivElement): void => {
  let alertMessage: HTMLParagraphElement = inputdiv.querySelector(".alert-Message")!;
  let iconAlert: HTMLSpanElement = inputdiv.querySelector(".alert-icon")!;
  alertMessage.textContent = "";
  inputdiv.classList.remove("alertInput");
  iconAlert.classList.remove("alert-icon");
}


const checkName = (inputDiv: HTMLDivElement, inputValue: HTMLInputElement): void => {
  let label = inputValue.placeholder;
  if (isEmpty(inputValue)) {
    showError(inputDiv, `${label} cannot be empty`);
  } else {
      if (!isBetween(inputValue, 3, 12)) {
        showError(inputDiv, `${label} must be between 3 and 12 letters`);
      } else {
        success(inputDiv);
      }
    }
}


const checkEmail = (inputDiv: HTMLDivElement, inputValue: HTMLInputElement): void => {
  if (isEmpty(inputValue)) {
    showError(inputDiv, "Email cannot be empty");
  } else {
    if (!isEmailValid(inputValue)) {
      showError(inputDiv, "Looks like this is not an email");
    } else {
      success(inputDiv);
    }
  }
}


const submitForm = (event: Event): void => {
  event.preventDefault();
  const ListOfInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".formTrial__form-item input")!;

  ListOfInputs.forEach( input => {
    const inputDiv: HTMLDivElement = input.parentElement as HTMLDivElement;
    switch (input.id) {
      case "firstName":
        checkName(inputDiv, input);
        break;
      case "lastName":
        checkName(inputDiv, input);
        break;
      case "email":
        checkEmail(inputDiv, input);
        break;
      case "password":
        checkName(inputDiv, input); 
        break;
      default:
        console.log("Inputs issues");
    }
  })
}

document.addEventListener("submit", submitForm);

export {};