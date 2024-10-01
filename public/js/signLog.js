// Bismillh
function clienter() {
    if (client === 'admin' || admU) {

        if(admU)showTostError(errorData)
            // To see admin pageshowTostError(errorData)
        const body = document.querySelector('.main')
        const container = document.querySelector('.container.Two')

        container.classList.add('admins')
        container.classList.remove('logins')
        container.classList.remove('signups')
        body.style.background = "url('../Images/admin_log_bg.jpg')"
        body.style.backgroundPosition = 'center bottom'
        document.querySelector('.select-btn').style.display = 'none'
    }
    else if(errorData) {
        showTostError(errorData)


        // To see Login page
        const body = document.querySelector('.main')
        const container = document.querySelector('.container.Two')

        container.classList.add('logins')
        container.classList.remove('signups')
        container.classList.remove('admins');
        body.style.background = "url('../Images/user_log.jpg')"
        body.style.backgroundPosition = 'center bottom'
    }
}
clienter()


function onLoad() {
    // Buttons
    const btn_1 = document.querySelector('.selecter.first')
    const btn_2 = document.querySelector('.selecter.midle')
    const body = document.querySelector('.main')

    // Container/To animate
    const container = document.querySelector('.container.Two')

    // Click Events of Buttens
    btn_1.addEventListener('click', () => {
        container.classList.add('signups')
        container.classList.remove('logins')
        container.classList.remove('admins')
        body.style.background = "url('../Images/user_sign _bg.jpg')"
        body.style.backgroundPosition = 'center bottom'
    })
    btn_2.addEventListener('click', () => {
        container.classList.add('logins')
        container.classList.remove('signups')
        container.classList.remove('admins');
        body.style.background = "url('../Images/user_log.jpg')"
        body.style.backgroundPosition = 'center bottom'
    })
}
onLoad()


// show Password
function showPass(className) {
    const passInput = document.querySelectorAll(`input[class=${className}]`)
    passInput.forEach(data => { data.type === 'password' ? data.type = 'text' : data.type = 'password' });
}

// User Signup
function signUp() {

    const name = document.querySelector('input[name=name').value
    const phone = document.querySelector('input[name=phone').value
    const email = document.querySelector('input[name=email').value
    const cpass = document.querySelector('#cpass').value
    const password = document.querySelector('input[name=password').value
    const btn_2 = document.querySelector('.selecter.midle')
    const buttonMain = document.querySelector('.select-btn')

    if (validateSignUp(password, email, phone, cpass)) {
        fetch('http://localhost:3333/userSignup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                phone,
                email,
                password
            })
        })
            .then(response => response.json())  // Convert the JSON response to a JavaScript object
            .then(data => data.error ? showTostError(data.errorMessage)
                :btn_2.click())
    }


}


// validate signup
function validateSignUp(pass, email, phone, cpass) {
    const name = document.querySelector('input[name=name').value
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@!%*?&]{8,}$/
    const phonePattern = /^\d{10}$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const namePattern = /^[A-Za-z\s]+$/


    if( pass==='' || email==='' || phone==='' || name===''){
        showTostError('Please fill all field')
        return false
    }else if(name.length<4){
        showTostError('Name should contail atleast 5 letters')
        return false
    }else if(!namePattern.test(name)){
        showTostError('You cant use numbers in your name')
        return false
    }else if (!phonePattern.test(phone)) {
        showTostError('Invalid phone number')
        return false
    } else if (!emailPattern.test(email)) {
        showTostError('Invalid email adress')
        return false
    } else if (!passwordPattern.test(pass)) {
        showTostError('Please enter a password with including atleast one number,symbol,capital and small letters and it should contain eight charecters')
        return false
    } else if (pass !== cpass) {
        showTostError('Password not matching')
        return false
    }

    return true

}



// Validate Lagin
document.querySelector('.M-forms.Two form').addEventListener('submit', (evnt) => {
    const phoneMail = document.querySelector('.M-forms.Two input[type=text]').value
    const type = document.querySelector('.M-forms.Two #west')

    const EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const PhonePattern = /^\d{10}$/

    // verfy the weather of email or phone
    if (EmailPattern.test(phoneMail)) type.value = 'email'
    else if (PhonePattern.test(phoneMail)) type.value = 'phone'
    else {
        evnt.preventDefault()
        return showTostError('Please enter valid email or phone');
    }

})



// Admin Login
document.querySelector('.M-forms.Three form').addEventListener('submit', (evnt) => {
    const mail = document.querySelector('.M-forms.Three input[type=text]').value
    const password = document.querySelector('.M-forms.Three input[type=password]').value

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10}$/;


    if (emailPattern.test(mail)) { }
    else {
        evnt.preventDefault()
        return showTostError('Please enter valid email or phone');
    }
})


// show toast error
function showTostError(info) {
    const toast = document.querySelector('.toast')

    toast.innerHTML = info
    toast.style.bottom = '30px'
    toast.style.opacity = '1'

    setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.bottom = '-100px'

    }, 2000)

}


// If error found
