const form = document.querySelector('.questions__form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const agreeCheckbox = document.querySelector('#agree');

const createModal = (title, message, isSuccess = true) => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #666;
  `;
  
  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  titleEl.style.cssText = `
    margin: 0 0 15px 0;
    color: ${isSuccess ? '#4CAF50' : '#f44336'};
  `;
  
  const messageEl = document.createElement('p');
  messageEl.textContent = message;
  messageEl.style.cssText = 'margin: 0;';
  
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(titleEl);
  modalContent.appendChild(messageEl);
  modal.appendChild(modalContent);
  
  return modal;
};

export const initFormValidation = () => {
  if (!form) return;
  
  const validator = new JustValidate('.questions__form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
    successFieldCssClass: 'is-valid',
  });
  
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальная длина имени - 3 символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимальная длина имени - 20 символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'email',
        errorMessage: 'Введите корректный email',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Необходимо согласие на обработку данных',
      },
    ])
    .onSuccess(async (event) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const data = {
        name: formData.get('name') || nameInput.value,
        email: formData.get('email') || emailInput.value,
        agree: agreeCheckbox.checked,
      };
      
      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          const modal = createModal(
            'Успешно!',
            'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
            true
          );
          document.body.appendChild(modal);
          form.reset();
        } else {
          throw new Error('Ошибка отправки формы');
        }
      } catch (error) {
        const modal = createModal(
          'Не удалось отправить обращение',
          'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.',
          false
        );
        document.body.appendChild(modal);
      }
    });
};

