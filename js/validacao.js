export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.'
    },
    quantidade: {
        valueMissing: 'O campo de quantidade em estoque não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.' 
    },
    telefone: {
        valueMissing: 'O campo de telefone não pode estar vazio.',
        patternMismatch: 'O telefone digitado não é válido.',
        customError: 'O DDD deve ser válido e o número deve ter 11 dígitos.'
    },
    instagram: {
        valueMissing: 'O campo de Instagram não pode estar vazio.',
        patternMismatch: 'O Instagram deve começar com @ seguido do nome de usuário.',
        customError: 'O Instagram deve começar com @ seguido do nome de usuário.'
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.'
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input),
    telefone:input => validaTelefone(input),
    instagram:input => validaInstagram(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validaTelefone(input) {
    const telefone = input.value.replace(/\D/g, '')
    let mensagem = ''
    const dddValido = /^(\d{2})/.test(telefone)
    const numeroValido = /^\d{11}$/.test(telefone)

    if (!telefone) {
        mensagem = 'O campo de telefone não pode estar vazio.'
    } else if (!dddValido || !numeroValido) {
        mensagem = 'O DDD deve ser válido e o número deve ter 11 dígitos.'
    }

    input.setCustomValidity(mensagem)
}

function validaInstagram(input) {
    const instagram = input.value
    let mensagem = ''

    if (!instagram) {
        mensagem = 'O campo de Instagram não pode estar vazio.'
    } else if (!/^@\w{3,}$/.test(instagram)) {
        mensagem = 'O Instagram deve começar com @ seguido do nome de usuário.'
    }

    input.setCustomValidity(mensagem)
}

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('blur', () => valida(input));
});